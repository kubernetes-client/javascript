const { SMTP, state } = require('./smtp');
const { Message, create } = require('./message');
const addressparser = require('addressparser');

class Client {
	/**
	 * @typedef {Object} SMTPOptions
	 * @property {number} [timeout]
	 * @property {string} [user]
	 * @property {string} [password]
	 * @property {string} [domain]
	 * @property {string} [host]
	 * @property {number} [port]
	 * @property {boolean} [ssl]
	 * @property {boolean} [tls]
	 * @property {string[]} [authentication]
	 *
	 * @typedef {Object} MessageStack
	 * @property {function(Error, Message): void} [callback]
	 * @property {Message} [message]
	 * @property {string} [returnPath]
	 * @property {string} [from]
	 * @property {string} [subject]
	 * @property {string|Array} [to]
	 * @property {Array} [cc]
	 * @property {Array} [bcc]
	 * @property {string} [text]
	 * @property {*} [attachment]
	 *
	 * @constructor
	 * @param {SMTPOptions} server smtp options
	 */
	constructor(server) {
		this.smtp = new SMTP(server);
		//this.smtp.debug(1);

		/**
		 * @type {MessageStack[]}
		 */
		this.queue = [];

		/**
		 * @type {NodeJS.Timer}
		 */
		this.timer = null;

		/**
		 * @type {boolean}
		 */
		this.sending = false;

		/**
		 * @type {boolean}
		 */
		this.ready = false;
	}

	/**
	 * @param {Message|MessageStack} msg msg
	 * @param {function(Error, MessageStack): void} callback callback
	 * @returns {void}
	 */
	send(msg, callback) {
		/**
		 * @type {Message}
		 */
		const message =
			msg instanceof Message
				? msg
				: this._canMakeMessage(msg)
					? create(msg)
					: null;

		if (message == null) {
			callback(
				new Error('message is not a valid Message instance'),
				/** @type {MessageStack} */ (msg)
			);
			return;
		}

		message.valid((valid, why) => {
			if (valid) {
				const stack = {
					message,
					to: addressparser(message.header.to),
					from: addressparser(message.header.from)[0].address,
					callback: (callback || function() {}).bind(this),
				};

				if (message.header.cc) {
					stack.to = stack.to.concat(addressparser(message.header.cc));
				}

				if (message.header.bcc) {
					stack.to = stack.to.concat(addressparser(message.header.bcc));
				}

				if (
					message.header['return-path'] &&
					addressparser(message.header['return-path']).length
				) {
					stack.returnPath = addressparser(
						message.header['return-path']
					)[0].address;
				}

				this.queue.push(stack);
				this._poll();
			} else {
				callback(new Error(why), /** @type {MessageStack} */ (msg));
			}
		});
	}

	/**
	 * @private
	 * @returns {void}
	 */
	_poll() {
		clearTimeout(this.timer);

		if (this.queue.length) {
			if (this.smtp.state() == state.NOTCONNECTED) {
				this._connect(this.queue[0]);
			} else if (
				this.smtp.state() == state.CONNECTED &&
				!this.sending &&
				this.ready
			) {
				this._sendmail(this.queue.shift());
			}
		}
		// wait around 1 seconds in case something does come in,
		// otherwise close out SMTP connection if still open
		else if (this.smtp.state() == state.CONNECTED) {
			this.timer = setTimeout(() => this.smtp.quit(), 1000);
		}
	}

	/**
	 * @private
	 * @param {MessageStack} stack stack
	 * @returns {void}
	 */
	_connect(stack) {
		/**
		 * @param {Error} err callback error
		 * @returns {void}
		 */
		const connect = err => {
			if (!err) {
				const begin = err => {
					if (!err) {
						this.ready = true;
						this._poll();
					} else {
						stack.callback(err, stack.message);

						// clear out the queue so all callbacks can be called with the same error message
						this.queue.shift();
						this._poll();
					}
				};

				if (!this.smtp.authorized()) {
					this.smtp.login(begin);
				} else {
					this.smtp.ehlo_or_helo_if_needed(begin);
				}
			} else {
				stack.callback(err, stack.message);

				// clear out the queue so all callbacks can be called with the same error message
				this.queue.shift();
				this._poll();
			}
		};

		this.ready = false;
		this.smtp.connect(connect);
	}

	/**
	 * @private
	 * @param {MessageStack} msg message stack
	 * @returns {boolean} can make message
	 */
	_canMakeMessage(msg) {
		return (
			msg.from &&
			(msg.to || msg.cc || msg.bcc) &&
			(msg.text !== undefined || this._containsInlinedHtml(msg.attachment))
		);
	}

	/**
	 * @private
	 * @param {*} attachment attachment
	 * @returns {boolean} does contain
	 */
	_containsInlinedHtml(attachment) {
		if (Array.isArray(attachment)) {
			return attachment.some(att => {
				return this._isAttachmentInlinedHtml(att);
			});
		} else {
			return this._isAttachmentInlinedHtml(attachment);
		}
	}

	/**
	 * @private
	 * @param {*} attachment attachment
	 * @returns {boolean} is inlined
	 */
	_isAttachmentInlinedHtml(attachment) {
		return (
			attachment &&
			(attachment.data || attachment.path) &&
			attachment.alternative === true
		);
	}

	/**
	 * @private
	 * @param {MessageStack} stack stack
	 * @param {function(MessageStack): void} next next
	 * @returns {function(Error): void} callback
	 */
	_sendsmtp(stack, next) {
		/**
		 * @param {Error} [err] error
		 * @returns {void}
		 */
		return err => {
			if (!err && next) {
				next.apply(this, [stack]);
			} else {
				// if we snag on SMTP commands, call done, passing the error
				// but first reset SMTP state so queue can continue polling
				this.smtp.rset(() => this._senddone(err, stack));
			}
		};
	}

	/**
	 * @private
	 * @param {MessageStack} stack stack
	 * @returns {void}
	 */
	_sendmail(stack) {
		const from = stack.returnPath || stack.from;
		this.sending = true;
		this.smtp.mail(this._sendsmtp(stack, this._sendrcpt), '<' + from + '>');
	}

	/**
	 * @private
	 * @param {MessageStack} stack stack
	 * @returns {void}
	 */
	_sendrcpt(stack) {
		if (stack.to == null || typeof stack.to === 'string') {
			throw new TypeError('stack.to must be array');
		}

		const to = stack.to.shift().address;
		this.smtp.rcpt(
			this._sendsmtp(stack, stack.to.length ? this._sendrcpt : this._senddata),
			`<${to}>`
		);
	}

	/**
	 * @private
	 * @param {MessageStack} stack stack
	 * @returns {void}
	 */
	_senddata(stack) {
		this.smtp.data(this._sendsmtp(stack, this._sendmessage));
	}

	/**
	 * @private
	 * @param {MessageStack} stack stack
	 * @returns {void}
	 */
	_sendmessage(stack) {
		const stream = stack.message.stream();

		stream.on('data', data => this.smtp.message(data));
		stream.on('end', () => {
			this.smtp.data_end(
				this._sendsmtp(stack, () => this._senddone(null, stack))
			);
		});

		// there is no way to cancel a message while in the DATA portion,
		// so we have to close the socket to prevent a bad email from going out
		stream.on('error', err => {
			this.smtp.close();
			this._senddone(err, stack);
		});
	}

	/**
	 * @private
	 * @param {Error} err err
	 * @param {MessageStack} stack stack
	 * @returns {void}
	 */
	_senddone(err, stack) {
		this.sending = false;
		stack.callback(err, stack.message);
		this._poll();
	}
}

exports.Client = Client;

/**
 * @param {SMTPOptions} server smtp options
 * @returns {Client} the client
 */
exports.connect = server => new Client(server);
