const SMTPError = require('./error');

/**
 * @typedef {import('net').Socket} Socket
 * @typedef {import('tls').TLSSocket} TLSSocket
 */

class SMTPResponse {
	/**
	 * @constructor
	 * @param {Socket | TLSSocket} stream the open socket to stream a response from
	 * @param {number} timeout the time to wait (in milliseconds) before closing the socket
	 * @param {function(Error): void} onerror the function to call on error
	 */
	constructor(stream, timeout, onerror) {
		let buffer = '';

		/**
		 * @returns {void}
		 */
		const notify = () => {
			if (buffer.length) {
				// parse buffer for response codes
				const line = buffer.replace('\r', '');
				if (
					!line
						.trim()
						.split(/\n/)
						.pop()
						.match(/^(\d{3})\s/)
				) {
					return;
				}

				const match = line ? line.match(/(\d+)\s?(.*)/) : null;
				const data =
					match !== null
						? { code: match[1], message: match[2], data: line }
						: { code: -1, data: line };

				stream.emit('response', null, data);
				buffer = '';
			}
		};

		/**
		 * @param {Error} err the error object
		 * @returns {void}
		 */
		const error = err => {
			stream.emit(
				'response',
				SMTPError('connection encountered an error', SMTPError.ERROR, err)
			);
		};

		/**
		 * @param {Error} err the error object
		 * @returns {void}
		 */
		const timedout = err => {
			stream.end();
			stream.emit(
				'response',
				SMTPError(
					'timedout while connecting to smtp server',
					SMTPError.TIMEDOUT,
					err
				)
			);
		};

		/**
		 * @param {string | Buffer} data the data
		 * @returns {void}
		 */
		const watch = data => {
			if (data !== null) {
				buffer += data.toString();
				notify();
			}
		};

		/**
		 * @param {Error} err the error object
		 * @returns {void}
		 */
		const close = err => {
			stream.emit(
				'response',
				SMTPError('connection has closed', SMTPError.CONNECTIONCLOSED, err)
			);
		};

		/**
		 * @param {Error} err the error object
		 * @returns {void}
		 */
		const end = err => {
			stream.emit(
				'response',
				SMTPError('connection has ended', SMTPError.CONNECTIONENDED, err)
			);
		};

		/**
		 * @param {Error} [err] the error object
		 * @returns {void}
		 */
		this.stop = err => {
			stream.removeAllListeners('response');
			stream.removeListener('data', watch);
			stream.removeListener('end', end);
			stream.removeListener('close', close);
			stream.removeListener('error', error);

			if (err != null && typeof onerror === 'function') {
				onerror(err);
			}
		};

		stream.on('data', watch);
		stream.on('end', end);
		stream.on('close', close);
		stream.on('error', error);
		stream.setTimeout(timeout, timedout);
	}
}

exports.SMTPResponse = SMTPResponse;

/**
 * @param {Socket | TLSSocket} stream the open socket to stream a response from
 * @param {number} timeout the time to wait (in milliseconds) before closing the socket
 * @param {function(Error): void} onerror the function to call on error
 * @returns {SMTPResponse} the smtp response
 */
exports.monitor = (stream, timeout, onerror) =>
	new SMTPResponse(stream, timeout, onerror);
