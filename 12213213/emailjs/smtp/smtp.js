/*
 * SMTP class written using python's (2.7) smtplib.py as a base
 */
const { Socket } = require('net');
const { createHmac } = require('crypto');
const { hostname } = require('os');
const { connect, createSecureContext, TLSSocket } = require('tls');
const { EventEmitter } = require('events');

const SMTPResponse = require('./response');
const SMTPError = require('./error');

/**
 * @readonly
 * @type {5000}
 */
const TIMEOUT = 5000;

/**
 * @readonly
 * @type {25}
 */
const SMTP_PORT = 25;

/**
 * @readonly
 * @type {465}
 */
const SMTP_SSL_PORT = 465;

/**
 * @readonly
 * @type {587}
 */
const SMTP_TLS_PORT = 587;

/**
 * @readonly
 * @type {'\r\n'}
 */
const CRLF = '\r\n';

/**
 * @readonly
 * @enum
 */
const AUTH_METHODS = {
	PLAIN: /** @type {'PLAIN'} */ ('PLAIN'),
	CRAM_MD5: /** @type {'CRAM-MD5'} */ ('CRAM-MD5'),
	LOGIN: /** @type {'LOGIN'} */ ('LOGIN'),
	XOAUTH2: /** @type {'XOAUTH2'} */ ('XOAUTH2'),
};

/**
 * @type {0 | 1}
 */
let DEBUG = 0;

/**
 * @param {...string} args the message(s) to log
 * @returns {void}
 */
const log = (...args) => {
	if (DEBUG === 1) {
		args.forEach(d => console.log(d));
	}
};

/**
 * @param {function(...*): void} callback the function to call
 * @param {...*} args the arguments to apply to the function
 * @returns {void}
 */
const caller = (callback, ...args) => {
	if (typeof callback === 'function') {
		callback.apply(null, args);
	}
};

const SMTPState = {
	NOTCONNECTED: 0,
	CONNECTING: 1,
	CONNECTED: 2,
};

class SMTP extends EventEmitter {
	/**
	 * @typedef {Object} SMTPSocketOptions
	 * @property {string} key
	 * @property {string} ca
	 * @property {string} cert
	 *
	 * @typedef {Object} SMTPOptions
	 * @property {number} [timeout]
	 * @property {string} [user]
	 * @property {string} [password]
	 * @property {string} [domain]
	 * @property {string} [host]
	 * @property {number} [port]
	 * @property {boolean|SMTPSocketOptions} [ssl]
	 * @property {boolean|SMTPSocketOptions} [tls]
	 * @property {string[]} [authentication]
	 *
	 * @constructor
	 * @param {SMTPOptions} [options] instance options
	 */
	constructor({
		timeout,
		host,
		user,
		password,
		domain,
		port,
		ssl,
		tls,
		authentication,
	} = {}) {
		super();

		/**
		 * @private
		 * @type {number}
		 */
		this._state = SMTPState.NOTCONNECTED;

		/**
		 * @private
		 * @type {boolean}
		 */
		this._secure = false;

		/**
		 * @type {Socket|TLSSocket}
		 */
		this.sock = null;

		/**
		 * @type {{ [i: string]: string | boolean }}
		 */
		this.features = null;

		/**
		 * @type {SMTPResponse.SMTPResponse}
		 */
		this.monitor = null;

		/**
		 * @type {string[]}
		 */
		this.authentication = Array.isArray(authentication)
			? authentication
			: [
					AUTH_METHODS.CRAM_MD5,
					AUTH_METHODS.LOGIN,
					AUTH_METHODS.PLAIN,
					AUTH_METHODS.XOAUTH2,
			  ];

		/**
		 * @type {number} }
		 */
		this.timeout = typeof timeout === 'number' ? timeout : TIMEOUT;

		/**
		 * @type {string} }
		 */
		this.domain = typeof domain === 'string' ? domain : hostname();

		/**
		 * @type {string} }
		 */
		this.host = typeof host === 'string' ? host : 'localhost';

		/**
		 * @type {boolean|SMTPSocketOptions}
		 */
		this.ssl =
			ssl != null &&
			(typeof ssl === 'boolean' ||
				(typeof ssl === 'object' && Array.isArray(ssl) === false))
				? ssl
				: false;

		/**
		 * @type {boolean|SMTPSocketOptions}
		 */
		this.tls =
			tls != null &&
			(typeof tls === 'boolean' ||
				(typeof tls === 'object' && Array.isArray(tls) === false))
				? tls
				: false;

		/**
		 * @type {number}
		 */
		this.port = port || (ssl ? SMTP_SSL_PORT : tls ? SMTP_TLS_PORT : SMTP_PORT);

		/**
		 * @type {boolean}
		 */
		this.loggedin = user && password ? false : true;

		// keep these strings hidden when quicky debugging/logging
		this.user = /** @returns {string} */ () => user;
		this.password = /** @returns {string} */ () => password;
	}

	/**
	 * @param {0 | 1} level -
	 * @returns {void}
	 */
	debug(level) {
		DEBUG = level;
	}

	/**
	 * @returns {number} the current state
	 */
	state() {
		return this._state;
	}

	/**
	 * @returns {boolean} whether or not the instance is authorized
	 */
	authorized() {
		return this.loggedin;
	}

	/**
	 * @typedef {Object} ConnectOptions
	 * @property {boolean} [ssl]
	 *
	 * @param {function(...*): void} callback function to call after response
	 * @param {number} [port] the port to use for the connection
	 * @param {string} [host] the hostname to use for the connection
	 * @param {ConnectOptions} [options={}] the options
	 * @returns {void}
	 */
	connect(callback, port = this.port, host = this.host, options = {}) {
		this.port = port;
		this.host = host;
		this.ssl = options.ssl || this.ssl;

		if (this._state !== SMTPState.NOTCONNECTED) {
			this.quit(() =>
				this.connect(
					callback,
					port,
					host,
					options
				)
			);
		}

		/**
		 * @returns {void}
		 */
		const connected = () => {
			log(`connected: ${this.host}:${this.port}`);

			if (this.ssl && !this.tls) {
				// if key/ca/cert was passed in, check if connection is authorized
				if (
					typeof this.ssl !== 'boolean' &&
					this.sock instanceof TLSSocket &&
					!this.sock.authorized
				) {
					this.close(true);
					caller(
						callback,
						SMTPError(
							'could not establish an ssl connection',
							SMTPError.CONNECTIONAUTH
						)
					);
				} else {
					this._secure = true;
				}
			}
		};

		/**
		 * @param {Error} err err
		 * @returns {void}
		 */
		const connectedErrBack = err => {
			if (!err) {
				connected();
			} else {
				this.close(true);
				caller(
					callback,
					SMTPError('could not connect', SMTPError.COULDNOTCONNECT, err)
				);
			}
		};

		const response = (err, msg) => {
			if (err) {
				if (this._state === SMTPState.NOTCONNECTED && !this.sock) {
					return;
				}
				this.close(true);
				caller(callback, err);
			} else if (msg.code == '220') {
				log(msg.data);

				// might happen first, so no need to wait on connected()
				this._state = SMTPState.CONNECTED;
				caller(callback, null, msg.data);
			} else {
				log(`response (data): ${msg.data}`);
				this.quit(() => {
					caller(
						callback,
						SMTPError(
							'bad response on connection',
							SMTPError.BADRESPONSE,
							err,
							msg.data
						)
					);
				});
			}
		};

		this._state = SMTPState.CONNECTING;
		log(`connecting: ${this.host}:${this.port}`);

		if (this.ssl) {
			this.sock = connect(
				this.port,
				this.host,
				typeof this.ssl === 'object' ? this.ssl : {},
				connected
			);
		} else {
			this.sock = new Socket();
			this.sock.connect(
				this.port,
				this.host,
				connectedErrBack
			);
		}

		this.monitor = SMTPResponse.monitor(this.sock, this.timeout, () =>
			this.close(true)
		);
		this.sock.once('response', response);
		this.sock.once('error', response); // the socket could reset or throw, so let's handle it and let the user know
	}

	/**
	 * @param {string} str the string to send
	 * @param {*} callback function to call after response
	 * @returns {void}
	 */
	send(str, callback) {
		if (this.sock && this._state === SMTPState.CONNECTED) {
			log(str);

			this.sock.once('response', (err, msg) => {
				if (err) {
					caller(callback, err);
				} else {
					log(msg.data);
					caller(callback, null, msg);
				}
			});
			this.sock.write(str);
		} else {
			this.close(true);
			caller(
				callback,
				SMTPError('no connection has been established', SMTPError.NOCONNECTION)
			);
		}
	}

	/**
	 * @param {string} cmd command to issue
	 * @param {function(...*): void} callback function to call after response
	 * @param {(number[] | number)} [codes=[250]] array codes
	 * @returns {void}
	 */
	command(cmd, callback, codes = [250]) {
		const codesArray = Array.isArray(codes)
			? codes
			: typeof codes === 'number'
				? [codes]
				: [250];

		const response = (err, msg) => {
			if (err) {
				caller(callback, err);
			} else {
				if (codesArray.indexOf(Number(msg.code)) !== -1) {
					caller(callback, err, msg.data, msg.message);
				} else {
					const suffix = msg.message ? `: ${msg.message}` : '';
					const errorMessage = `bad response on command '${
						cmd.split(' ')[0]
					}'${suffix}`;
					caller(
						callback,
						SMTPError(errorMessage, SMTPError.BADRESPONSE, null, msg.data)
					);
				}
			}
		};

		this.send(cmd + CRLF, response);
	}

	/**
	 * SMTP 'helo' command.
	 *
	 * Hostname to send for self command defaults to the FQDN of the local
	 * host.
	 *
	 * @param {function(...*): void} callback function to call after response
	 * @param {string} domain the domain to associate with the 'helo' request
	 * @returns {void}
	 */
	helo(callback, domain) {
		this.command(`helo ${domain || this.domain}`, (err, data) => {
			if (err) {
				caller(callback, err);
			} else {
				this.parse_smtp_features(data);
				caller(callback, err, data);
			}
		});
	}

	/**
	 * @param {function(...*): void} callback function to call after response
	 * @returns {void}
	 */
	starttls(callback) {
		const response = (err, msg) => {
			if (err) {
				err.message += ' while establishing a starttls session';
				caller(callback, err);
			} else {
				const secureContext = createSecureContext(
					typeof this.tls === 'object' ? this.tls : {}
				);
				const secureSocket = new TLSSocket(this.sock, { secureContext });

				secureSocket.on('error', err => {
					this.close(true);
					caller(callback, err);
				});

				this._secure = true;
				this.sock = secureSocket;

				SMTPResponse.monitor(this.sock, this.timeout, () => this.close(true));
				caller(callback, msg.data);
			}
		};

		this.command('starttls', response, [220]);
	}

	/**
	 * @param {string} data the string to parse for features
	 * @returns {void}
	 */
	parse_smtp_features(data) {
		//  According to RFC1869 some (badly written)
		//  MTA's will disconnect on an ehlo. Toss an exception if
		//  that happens -ddm

		data.split('\n').forEach(ext => {
			const parse = ext.match(/^(?:\d+[-=]?)\s*?([^\s]+)(?:\s+(.*)\s*?)?$/);

			// To be able to communicate with as many SMTP servers as possible,
			// we have to take the old-style auth advertisement into account,
			// because:
			// 1) Else our SMTP feature parser gets confused.
			// 2) There are some servers that only advertise the auth methods we
			// support using the old style.

			if (parse != null) {
				// RFC 1869 requires a space between ehlo keyword and parameters.
				// It's actually stricter, in that only spaces are allowed between
				// parameters, but were not going to check for that here.  Note
				// that the space isn't present if there are no parameters.
				this.features[parse[1].toLowerCase()] = parse[2] || true;
			}
		});
	}

	/**
	 * @param {function(...*): void} callback function to call after response
	 * @param {string} domain the domain to associate with the 'ehlo' request
	 * @returns {void}
	 */
	ehlo(callback, domain) {
		this.features = {};
		this.command(`ehlo ${domain || this.domain}`, (err, data) => {
			if (err) {
				caller(callback, err);
			} else {
				this.parse_smtp_features(data);

				if (this.tls && !this._secure) {
					this.starttls(() => this.ehlo(callback, domain));
				} else {
					caller(callback, err, data);
				}
			}
		});
	}

	/**
	 * @param {string} opt the features keyname to check
	 * @returns {boolean} whether the extension exists
	 */
	has_extn(opt) {
		return this.features[opt.toLowerCase()] === undefined;
	}

	/**
	 * SMTP 'help' command, returns text from the server
	 * @param {function(...*): void} callback function to call after response
	 * @param {string} domain the domain to associate with the 'help' request
	 * @returns {void}
	 */
	help(callback, domain) {
		this.command(domain ? `help ${domain}` : 'help', callback, [211, 214]);
	}

	/**
	 * @param {function(...*): void} callback function to call after response
	 * @returns {void}
	 */
	rset(callback) {
		this.command('rset', callback);
	}

	/**
	 * @param {function(...*): void} callback function to call after response
	 * @returns {void}
	 */
	noop(callback) {
		this.send('noop', callback);
	}

	/**
	 * @param {function(...*): void} callback function to call after response
	 * @param {string} from the sender
	 * @returns {void}
	 */
	mail(callback, from) {
		this.command(`mail FROM:${from}`, callback);
	}

	/**
	 * @param {function(...*): void} callback function to call after response
	 * @param {string} to the receiver
	 * @returns {void}
	 */
	rcpt(callback, to) {
		this.command(`RCPT TO:${to}`, callback, [250, 251]);
	}

	/**
	 * @param {function(...*): void} callback function to call after response
	 * @returns {void}
	 */
	data(callback) {
		this.command('data', callback, [354]);
	}

	/**
	 * @param {function(...*): void} callback function to call after response
	 * @returns {void}
	 */
	data_end(callback) {
		this.command(`${CRLF}.`, callback);
	}

	/**
	 * @param {string} data the message to send
	 * @returns {void}
	 */
	message(data) {
		log(data);
		this.sock.write(data);
	}

	/**
	 * SMTP 'verify' command -- checks for address validity.
	 *
	 * @param {string} address the address to validate
	 * @param {function(...*): void} callback function to call after response
	 * @returns {void}
	 */
	verify(address, callback) {
		this.command(`vrfy ${address}`, callback, [250, 251, 252]);
	}

	/**
	 * SMTP 'expn' command -- expands a mailing list.
	 *
	 * @param {string} address the mailing list to expand
	 * @param {function(...*): void} callback function to call after response
	 * @returns {void}
	 */
	expn(address, callback) {
		this.command(`expn ${address}`, callback);
	}

	/**
	 * Calls this.ehlo() and, if an error occurs, this.helo().
	 *
	 * If there has been no previous EHLO or HELO command self session, self
	 * method tries ESMTP EHLO first.
	 *
	 * @param {function(...*): void} callback function to call after response
	 * @param {string} [domain] the domain to associate with the command
	 * @returns {void}
	 */
	ehlo_or_helo_if_needed(callback, domain) {
		// is this code callable...?
		if (!this.features) {
			const response = (err, data) => caller(callback, err, data);
			this.ehlo((err, data) => {
				if (err) {
					this.helo(response, domain);
				} else {
					caller(callback, err, data);
				}
			}, domain);
		}
	}

	/**
	 * Log in on an SMTP server that requires authentication.
	 *
	 * If there has been no previous EHLO or HELO command self session, self
	 * method tries ESMTP EHLO first.
	 *
	 * This method will return normally if the authentication was successful.
	 *
	 * @param {function(...*): void} callback function to call after response
	 * @param {string} [user] the username to authenticate with
	 * @param {string} [password] the password for the authentication
	 * @param {{ method: string, domain: string }} [options] login options
	 * @returns {void}
	 */
	login(callback, user, password, options) {
		const login = {
			user: user ? () => user : this.user,
			password: password ? () => password : this.password,
			method: options && options.method ? options.method.toUpperCase() : '',
		};

		const domain = options && options.domain ? options.domain : this.domain;

		const initiate = (err, data) => {
			if (err) {
				caller(callback, err);
				return;
			}

			let method = null;

			/**
			 * @param {string} challenge challenge
			 * @returns {string} base64 cram hash
			 */
			const encode_cram_md5 = challenge => {
				const hmac = createHmac('md5', login.password());
				hmac.update(Buffer.from(challenge, 'base64').toString('ascii'));
				return Buffer.from(`${login.user()} ${hmac.digest('hex')}`).toString(
					'base64'
				);
			};

			/**
			 * @returns {string} base64 login/password
			 */
			const encode_plain = () =>
				Buffer.from(`\u0000${login.user()}\u0000${login.password()}`).toString(
					'base64'
				);

			/**
			 * @see https://developers.google.com/gmail/xoauth2_protocol
			 * @returns {string} base64 xoauth2 auth token
			 */
			const encode_xoauth2 = () =>
				Buffer.from(
					`user=${login.user()}\u0001auth=Bearer ${login.password()}\u0001\u0001`
				).toString('base64');

			// List of authentication methods we support: from preferred to
			// less preferred methods.
			if (!method) {
				const preferred = this.authentication;
				let auth = '';

				if (this.features && this.features.auth) {
					if (typeof this.features.auth === 'string') {
						auth = this.features.auth;
					}
				}

				for (let i = 0; i < preferred.length; i++) {
					if (auth.includes(preferred[i])) {
						method = preferred[i];
						break;
					}
				}
			}

			/**
			 * handle bad responses from command differently
			 * @param {Error} err err
			 * @param {*} data data
			 * @returns {void}
			 */
			const failed = (err, data) => {
				this.loggedin = false;
				this.close(); // if auth is bad, close the connection, it won't get better by itself
				caller(
					callback,
					SMTPError('authorization.failed', SMTPError.AUTHFAILED, err, data)
				);
			};

			/**
			 * @param {Error} err err
			 * @param {*} data data
			 * @returns {void}
			 */
			const response = (err, data) => {
				if (err) {
					failed(err, data);
				} else {
					this.loggedin = true;
					caller(callback, err, data);
				}
			};

			/**
			 * @param {Error} err err
			 * @param {*} data data
			 * @param {string} msg msg
			 * @returns {void}
			 */
			const attempt = (err, data, msg) => {
				if (err) {
					failed(err, data);
				} else {
					if (method === AUTH_METHODS.CRAM_MD5) {
						this.command(encode_cram_md5(msg), response, [235, 503]);
					} else if (method === AUTH_METHODS.LOGIN) {
						this.command(
							Buffer.from(login.password()).toString('base64'),
							response,
							[235, 503]
						);
					}
				}
			};

			/**
			 * @param {Error} err err
			 * @param {*} data data
			 * @param {string} msg msg
			 * @returns {void}
			 */
			const attempt_user = (err, data, msg) => {
				if (err) {
					failed(err, data);
				} else {
					if (method === AUTH_METHODS.LOGIN) {
						this.command(
							Buffer.from(login.user()).toString('base64'),
							attempt,
							[334]
						);
					}
				}
			};

			switch (method) {
				case AUTH_METHODS.CRAM_MD5:
					this.command(`AUTH  ${AUTH_METHODS.CRAM_MD5}`, attempt, [334]);
					break;
				case AUTH_METHODS.LOGIN:
					this.command(`AUTH ${AUTH_METHODS.LOGIN}`, attempt_user, [334]);
					break;
				case AUTH_METHODS.PLAIN:
					this.command(
						`AUTH ${AUTH_METHODS.PLAIN} ${encode_plain()}`,
						response,
						[235, 503]
					);
					break;
				case AUTH_METHODS.XOAUTH2:
					this.command(
						`AUTH ${AUTH_METHODS.XOAUTH2} ${encode_xoauth2()}`,
						response,
						[235, 503]
					);
					break;
				default:
					const msg = 'no form of authorization supported';
					const err = SMTPError(msg, SMTPError.AUTHNOTSUPPORTED, null, data);
					caller(callback, err);
					break;
			}
		};

		this.ehlo_or_helo_if_needed(initiate, domain);
	}

	/**
	 * @param {boolean} [force=false] whether or not to force destroy the connection
	 * @returns {void}
	 */
	close(force = false) {
		if (this.sock) {
			if (force) {
				log('smtp connection destroyed!');
				this.sock.destroy();
			} else {
				log('smtp connection closed.');
				this.sock.end();
			}
		}

		if (this.monitor) {
			this.monitor.stop();
			this.monitor = null;
		}

		this._state = SMTPState.NOTCONNECTED;
		this._secure = false;
		this.sock = null;
		this.features = null;
		this.loggedin = !(this.user() && this.password());
	}

	/**
	 * @param {function(...*): void} [callback] function to call after response
	 * @returns {void}
	 */
	quit(callback) {
		this.command(
			'quit',
			(err, data) => {
				caller(callback, err, data);
				this.close();
			},
			[221, 250]
		);
	}
}

exports.SMTP = SMTP;
exports.state = SMTPState;
exports.authentication = AUTH_METHODS;
exports.DEFAULT_TIMEOUT = TIMEOUT;
