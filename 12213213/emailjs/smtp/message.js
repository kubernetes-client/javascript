const fs = require('fs');
const { hostname } = require('os');
const { Stream } = require('stream');
const addressparser = require('addressparser');
const { mimeWordEncode } = require('emailjs-mime-codec');
const { getRFC2822Date } = require('./date');

const CRLF = '\r\n';

/**
 * MIME standard wants 76 char chunks when sending out.
 * @type {76}
 */
const MIMECHUNK = 76;

/**
 * meets both base64 and mime divisibility
 * @type {456}
 */
const MIME64CHUNK = /** @type {456} */ (MIMECHUNK * 6);

/**
 * size of the message stream buffer
 * @type {12768}
 */
const BUFFERSIZE = /** @type {12768} */ (MIMECHUNK * 24 * 7);

/**
 * @type {number}
 */
let counter = 0;

/**
 * @returns {string} the generated boundary
 */
function generate_boundary() {
	let text = '';
	const possible =
		"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'()+_,-./:=?";

	for (let i = 0; i < 69; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}

	return text;
}

/**
 * @param {string} l the person to parse into an address
 * @returns {string} the parsed address
 */
function person2address(l) {
	return addressparser(l)
		.map(({ name, address }) => {
			return name
				? `${mimeWordEncode(name).replace(/,/g, '=2C')} <${address}>`
				: address;
		})
		.join(', ');
}

/**
 * @param {string} header_name the header name to fix
 * @returns {string} the fixed header name
 */
function fix_header_name_case(header_name) {
	return header_name
		.toLowerCase()
		.replace(/^(.)|-(.)/g, match => match.toUpperCase());
}

class Message {
	/**
	 * @typedef {Object} MessageHeaders
	 * @property {string?} content-type
	 * @property {string} [subject]
	 * @property {string} [text]
	 * @property {MessageAttachment} [attachment]
	 * @param {MessageHeaders} headers hash of message headers
	 */
	constructor(headers) {
		this.attachments = [];

		/**
		 * @type {MessageAttachment}
		 */
		this.alternative = null;
		this.header = {
			'message-id': `<${new Date().getTime()}.${counter++}.${
				process.pid
			}@${hostname()}>`,
			date: getRFC2822Date(),
		};

		this.content = 'text/plain; charset=utf-8';
		for (const header in headers) {
			// allow user to override default content-type to override charset or send a single non-text message
			if (/^content-type$/i.test(header)) {
				this.content = headers[header];
			} else if (header === 'text') {
				this.text = headers[header];
			} else if (
				header === 'attachment' &&
				typeof headers[header] === 'object'
			) {
				const attachment = headers[header];
				if (Array.isArray(attachment)) {
					for (let i = 0; i < attachment.length; i++) {
						this.attach(attachment[i]);
					}
				} else {
					this.attach(attachment);
				}
			} else if (header === 'subject') {
				this.header.subject = mimeWordEncode(headers.subject);
			} else if (/^(cc|bcc|to|from)/i.test(header)) {
				this.header[header.toLowerCase()] = person2address(headers[header]);
			} else {
				// allow any headers the user wants to set??
				// if(/cc|bcc|to|from|reply-to|sender|subject|date|message-id/i.test(header))
				this.header[header.toLowerCase()] = headers[header];
			}
		}
	}

	/**
	 * @param {MessageAttachment} options attachment options
	 * @returns {Message} the current instance for chaining
	 */
	attach(options) {
		/*
			legacy support, will remove eventually...
			arguments -> (path, type, name, headers)
		*/
		if (typeof options === 'string' && arguments.length > 1) {
			options = {
				path: options,
				type: arguments[1],
				name: arguments[2],
			};
		}

		// sender can specify an attachment as an alternative
		if (options.alternative) {
			this.alternative = options;
			this.alternative.charset = options.charset || 'utf-8';
			this.alternative.type = options.type || 'text/html';
			this.alternative.inline = true;
		} else {
			this.attachments.push(options);
		}

		return this;
	}

	/**
	 * legacy support, will remove eventually...
	 * should use Message.attach() instead
	 * @param {string} html html data
	 * @param {string} [charset='utf-8'] the charset to encode as
	 * @returns {Message} the current Message instance
	 */
	attach_alternative(html, charset) {
		this.alternative = {
			data: html,
			charset: charset || 'utf-8',
			type: 'text/html',
			inline: true,
		};

		return this;
	}

	/**
	 * @param {function(boolean, string): void} callback This callback is displayed as part of the Requester class.
	 * @returns {void}
	 */
	valid(callback) {
		if (!this.header.from) {
			callback(false, 'message does not have a valid sender');
		}

		if (!(this.header.to || this.header.cc || this.header.bcc)) {
			callback(false, 'message does not have a valid recipient');
		} else if (this.attachments.length === 0) {
			callback(true, undefined);
		} else {
			const failed = [];

			this.attachments.forEach(attachment => {
				if (attachment.path) {
					if (fs.existsSync(attachment.path) == false) {
						failed.push(`${attachment.path} does not exist`);
					}
				} else if (attachment.stream) {
					if (!attachment.stream.readable) {
						failed.push('attachment stream is not readable');
					}
				} else if (!attachment.data) {
					failed.push('attachment has no data associated with it');
				}
			});

			callback(failed.length === 0, failed.join(', '));
		}
	}

	/**
	 * returns a stream of the current message
	 * @returns {MessageStream} a stream of the current message
	 */
	stream() {
		return new MessageStream(this);
	}

	/**
	 * @param {function(Error, string): void} callback the function to call with the error and buffer
	 * @returns {void}
	 */
	read(callback) {
		let buffer = '';
		const str = this.stream();
		str.on('data', data => (buffer += data));
		str.on('end', err => callback(err, buffer));
		str.on('error', err => callback(err, buffer));
	}
}

/**
 * @typedef {Object} MessageAttachmentHeaders
 * @property {string} content-type
 * @property {string} content-transfer-encoding
 * @property {string} content-disposition
 */

/**
 * @typedef {Object} MessageAttachment
 * @property {string} [name]
 * @property {string} [type]
 * @property {string} [charset]
 * @property {string} [method]
 * @property {string} [path]
 * @property {NodeJS.ReadWriteStream} [stream]
 * @property {boolean} [inline]
 * @property {MessageAttachment} [alternative]
 * @property {MessageAttachment[]} [related]
 * @property {*} [encoded]
 * @property {*} [data]
 * @property {MessageAttachmentHeaders} [headers]
 */

class MessageStream extends Stream {
	/**
	 * @param {Message} message the message to stream
	 */
	constructor(message) {
		super();

		/**
		 * @type {Message}
		 */
		this.message = message;

		/**
		 * @type {boolean}
		 */
		this.readable = true;

		/**
		 * @type {boolean}
		 */
		this.paused = false;

		/**
		 * @type {Buffer}
		 */
		this.buffer = Buffer.alloc(MIMECHUNK * 24 * 7);

		/**
		 * @type {number}
		 */
		this.bufferIndex = 0;

		/**
		 * @returns {void}
		 */
		const output_mixed = () => {
			const boundary = generate_boundary();
			output(
				`Content-Type: multipart/mixed; boundary="${boundary}"${CRLF}${CRLF}--${boundary}${CRLF}`
			);

			if (this.message.alternative == null) {
				output_text(this.message);
				output_message(boundary, this.message.attachments, 0, close);
			} else {
				const cb = () =>
					output_message(boundary, this.message.attachments, 0, close);
				output_alternative(this.message, cb);
			}
		};

		/**
		 * @param {string} boundary the boundary text between outputs
		 * @param {MessageAttachment[]} list the list of potential messages to output
		 * @param {number} index the index of the list item to output
		 * @param {function(): void} callback the function to call if index is greater than upper bound
		 * @returns {void}
		 */
		const output_message = (boundary, list, index, callback) => {
			if (index < list.length) {
				output(`--${boundary}${CRLF}`);
				if (list[index].related) {
					output_related(list[index], () =>
						output_message(boundary, list, index + 1, callback)
					);
				} else {
					output_attachment(list[index], () =>
						output_message(boundary, list, index + 1, callback)
					);
				}
			} else {
				output(`${CRLF}--${boundary}--${CRLF}${CRLF}`);
				callback();
			}
		};

		/**
		 * @param {MessageAttachment} attachment the metadata to use as headers
		 * @returns {void}
		 */
		const output_attachment_headers = attachment => {
			let data = [];
			const headers = {
				'content-type':
					attachment.type +
					(attachment.charset ? `; charset=${attachment.charset}` : '') +
					(attachment.method ? `; method=${attachment.method}` : ''),
				'content-transfer-encoding': 'base64',
				'content-disposition': attachment.inline
					? 'inline'
					: `attachment; filename="${mimeWordEncode(attachment.name)}"`,
			};

			// allow sender to override default headers
			for (const header in attachment.headers || {}) {
				headers[header.toLowerCase()] = attachment.headers[header];
			}

			for (const header in headers) {
				data = data.concat([
					fix_header_name_case(header),
					': ',
					headers[header],
					CRLF,
				]);
			}

			output(data.concat([CRLF]).join(''));
		};

		/**
		 * @param {MessageAttachment} attachment the metadata to use as headers
		 * @param {function(): void} callback the function to call after output is finished
		 * @returns {void}
		 */
		const output_attachment = (attachment, callback) => {
			const build = attachment.path
				? output_file
				: attachment.stream
					? output_stream
					: output_data;
			output_attachment_headers(attachment);
			build(attachment, callback);
		};

		/**
		 * @param {MessageAttachment} attachment the metadata to use as headers
		 * @param {function(): void} callback the function to call after output is finished
		 * @returns {void}
		 */
		const output_data = (attachment, callback) => {
			output_base64(
				attachment.encoded
					? attachment.data
					: Buffer.from(attachment.data).toString('base64'),
				callback
			);
		};

		/**
		 * @param {MessageAttachment} attachment the metadata to use as headers
		 * @param {function(NodeJS.ErrnoException): void} next the function to call when the file is closed
		 * @returns {void}
		 */
		const output_file = (attachment, next) => {
			const chunk = MIME64CHUNK * 16;
			const buffer = Buffer.alloc(chunk);
			const closed = fd => fs.closeSync(fd);

			/**
			 * @param {Error} err the error to emit
			 * @param {number} fd the file descriptor
			 * @returns {void}
			 */
			const opened = (err, fd) => {
				if (!err) {
					const read = (err, bytes) => {
						if (!err && this.readable) {
							let encoding =
								attachment && attachment.headers
									? attachment.headers['content-transfer-encoding'] || 'base64'
									: 'base64';
							if (encoding === 'ascii' || encoding === '7bit') {
								encoding = 'ascii';
							} else if (encoding === 'binary' || encoding === '8bit') {
								encoding = 'binary';
							} else {
								encoding = 'base64';
							}
							// guaranteed to be encoded without padding unless it is our last read
							output_base64(buffer.toString(encoding, 0, bytes), () => {
								if (bytes == chunk) {
									// we read a full chunk, there might be more
									fs.read(fd, buffer, 0, chunk, null, read);
								} // that was the last chunk, we are done reading the file
								else {
									this.removeListener('error', closed);
									fs.close(fd, next);
								}
							});
						} else {
							this.emit(
								'error',
								err || { message: 'message stream was interrupted somehow!' }
							);
						}
					};

					fs.read(fd, buffer, 0, chunk, null, read);
					this.once('error', closed);
				} else {
					this.emit('error', err);
				}
			};

			fs.open(attachment.path, 'r', opened);
		};

		/**
		 * @param {MessageAttachment} attachment the metadata to use as headers
		 * @param {function(): void} callback the function to call after output is finished
		 * @returns {void}
		 */
		const output_stream = (attachment, callback) => {
			if (attachment.stream.readable) {
				let previous = Buffer.alloc(0);

				attachment.stream.resume();

				attachment.stream.on('end', () => {
					output_base64(previous.toString('base64'), callback);
					this.removeListener('pause', attachment.stream.pause);
					this.removeListener('resume', attachment.stream.resume);
					this.removeListener('error', attachment.stream.resume);
				});

				attachment.stream.on('data', buff => {
					// do we have bytes from a previous stream data event?
					let buffer = Buffer.isBuffer(buff) ? buff : Buffer.from(buff);

					if (previous.byteLength > 0) {
						buffer = Buffer.concat([previous, buffer]);
					}

					const padded = buffer.length % MIME64CHUNK;
					previous = Buffer.alloc(padded);

					// encode as much of the buffer to base64 without empty bytes
					if (padded > 0) {
						// copy dangling bytes into previous buffer
						buffer.copy(previous, 0, buffer.length - padded);
					}
					output_base64(buffer.toString('base64', 0, buffer.length - padded));
				});

				this.on('pause', attachment.stream.pause);
				this.on('resume', attachment.stream.resume);
				this.on('error', attachment.stream.resume);
			} else {
				this.emit('error', { message: 'stream not readable' });
			}
		};

		/**
		 * @param {string} data the data to output as base64
		 * @param {function(): void} [callback] the function to call after output is finished
		 * @returns {void}
		 */
		const output_base64 = (data, callback) => {
			const loops = Math.ceil(data.length / MIMECHUNK);
			let loop = 0;
			while (loop < loops) {
				output(data.substring(MIMECHUNK * loop, MIMECHUNK * (loop + 1)) + CRLF);
				loop++;
			}
			if (callback) {
				callback();
			}
		};

		/**
		 * @param {Message} message the message to output
		 * @returns {void}
		 */
		const output_text = message => {
			let data = [];

			data = data.concat([
				'Content-Type:',
				message.content,
				CRLF,
				'Content-Transfer-Encoding: 7bit',
				CRLF,
			]);
			data = data.concat(['Content-Disposition: inline', CRLF, CRLF]);
			data = data.concat([message.text || '', CRLF, CRLF]);

			output(data.join(''));
		};

		/**
		 * @param {Message} message the message to output
		 * @param {function(): void} callback the function to call after output is finished
		 * @returns {void}
		 */
		const output_alternative = (message, callback) => {
			const boundary = generate_boundary();
			output(
				`Content-Type: multipart/alternative; boundary="${boundary}"${CRLF}${CRLF}--${boundary}${CRLF}`
			);
			output_text(message);
			output(`--${boundary}${CRLF}`);

			/**
			 * @returns {void}
			 */
			const finish = () => {
				output([CRLF, '--', boundary, '--', CRLF, CRLF].join(''));
				callback();
			};

			if (message.alternative.related) {
				output_related(message.alternative, finish);
			} else {
				output_attachment(message.alternative, finish);
			}
		};

		/**
		 * @param {MessageAttachment} message the message to output
		 * @param {function(): void} callback the function to call after output is finished
		 * @returns {void}
		 */
		const output_related = (message, callback) => {
			const boundary = generate_boundary();
			output(
				`Content-Type: multipart/related; boundary="${boundary}"${CRLF}${CRLF}--${boundary}${CRLF}`
			);
			output_attachment(message, () => {
				output_message(boundary, message.related, 0, () => {
					output(`${CRLF}--${boundary}--${CRLF}${CRLF}`);
					callback();
				});
			});
		};

		/**
		 * @returns {void}
		 */
		const output_header_data = () => {
			if (this.message.attachments.length || this.message.alternative) {
				output(`MIME-Version: 1.0${CRLF}`);
				output_mixed();
			} // you only have a text message!
			else {
				output_text(this.message);
				close();
			}
		};

		/**
		 * @returns {void}
		 */
		const output_header = () => {
			let data = [];

			for (const header in this.message.header) {
				// do not output BCC in the headers (regex) nor custom Object.prototype functions...
				if (
					!/bcc/i.test(header) &&
					this.message.header.hasOwnProperty(header)
				) {
					data = data.concat([
						fix_header_name_case(header),
						': ',
						this.message.header[header],
						CRLF,
					]);
				}
			}

			output(data.join(''));
			output_header_data();
		};

		/**
		 * @param {string} data the data to output
		 * @param {function(...args): void} [callback] the function
		 * @param {*[]} [args] array of arguments to pass to the callback
		 * @returns {void}
		 */
		const output = (data, callback, args) => {
			const bytes = Buffer.byteLength(data);

			// can we buffer the data?
			if (bytes + this.bufferIndex < this.buffer.length) {
				this.buffer.write(data, this.bufferIndex);
				this.bufferIndex += bytes;
				if (callback) {
					callback.apply(null, args);
				}
			}
			// we can't buffer the data, so ship it out!
			else if (bytes > this.buffer.length) {
				if (this.bufferIndex) {
					this.emit('data', this.buffer.toString('utf-8', 0, this.bufferIndex));
					this.bufferIndex = 0;
				}

				const loops = Math.ceil(data.length / this.buffer.length);
				let loop = 0;
				while (loop < loops) {
					this.emit(
						'data',
						data.substring(
							this.buffer.length * loop,
							this.buffer.length * (loop + 1)
						)
					);
					loop++;
				}
			} // we need to clean out the buffer, it is getting full
			else {
				if (!this.paused) {
					this.emit('data', this.buffer.toString('utf-8', 0, this.bufferIndex));
					this.buffer.write(data, 0);
					this.bufferIndex = bytes;
					// we could get paused after emitting data...
					if (this.paused) {
						this.once('resume', () => callback.apply(null, args));
					} else if (callback) {
						callback.apply(null, args);
					}
				} // we can't empty out the buffer, so let's wait till we resume before adding to it
				else {
					this.once('resume', () => output(data, callback, args));
				}
			}
		};

		/**
		 * @param {*} [err] the error to emit
		 * @returns {void}
		 */
		const close = err => {
			if (err) {
				this.emit('error', err);
			} else {
				this.emit('data', this.buffer.toString('utf-8', 0, this.bufferIndex));
				this.emit('end');
			}
			this.buffer = null;
			this.bufferIndex = 0;
			this.readable = false;
			this.removeAllListeners('resume');
			this.removeAllListeners('pause');
			this.removeAllListeners('error');
			this.removeAllListeners('data');
			this.removeAllListeners('end');
		};

		this.once('destroy', close);
		process.nextTick(output_header);
	}

	/**
	 * pause the stream
	 * @returns {void}
	 */
	pause() {
		this.paused = true;
		this.emit('pause');
	}

	/**
	 * resume the stream
	 * @returns {void}
	 */
	resume() {
		this.paused = false;
		this.emit('resume');
	}

	/**
	 * destroy the stream
	 * @returns {void}
	 */
	destroy() {
		this.emit(
			'destroy',
			this.bufferIndex > 0 ? { message: 'message stream destroyed' } : null
		);
	}

	/**
	 * destroy the stream at first opportunity
	 * @returns {void}
	 */
	destroySoon() {
		this.emit('destroy');
	}
}

exports.Message = Message;
exports.BUFFERSIZE = BUFFERSIZE;
exports.create = headers => new Message(headers);
