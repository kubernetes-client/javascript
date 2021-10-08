/*jslint node: true, vars: true, indent: 4 */
'use strict';

var util = require('util'),
    Imap = require('imap'),
    debug = require('debug'),
    MailParser = require('mailparser').MailParser,
    EventEmitter = require('events').EventEmitter;

var dbg = debug('mailnotifier');

function Notifier(opts) {
    EventEmitter.call(this);
    var self = this;
    self.options = opts;
    if (self.options.username) { //backward compat
        self.options.user = self.options.username;
    }
    self.options.box = self.options.box || 'INBOX';
    self.options.debug = debug('imap');
}
util.inherits(Notifier, EventEmitter);

module.exports = function (opts) {
    return new Notifier(opts);
};


Notifier.prototype.start = function () {
    var self = this;
    self.imap = new Imap(self.options);
    self.imap.once('end', function () {
        dbg('imap end');
        self.emit('end');
    });
    self.imap.once('error', function (err) {
        dbg('imap error : %s', err);
        self.emit('error', err);
    });
    self.imap.once('close', function (haserr) {
        dbg('imap close : %s', haserr ? 'normal' : 'errored');
    });
    self.imap.on('uidvalidity', function (uidvalidity) {
        dbg('new uidvalidity : %s', uidvalidity);
    });
    self.imap.once('ready', function () {
        self.emit('connected');
        self.imap.openBox(self.options.box, false, function (err, box) {
            if (err) {
                dbg('unable to open box : %s', err);
                self.emit('error', err);
                return;
            }
            self.scan();
            self.imap.on('mail', function (id) {
                dbg('mail event : %s', id);
                self.scan();
            });
        });
    });
    self.imap.connect();
    return this;
};

Notifier.prototype.scan = function () {
    var self = this, search = self.options.search || ['UNSEEN'];
    dbg('scanning %s with filter `%s`.', self.options.box,  search);
    self.imap.search(search, function (err, seachResults) {
        if (err) {
            self.emit('error', err);
            return;
        }
        if (!seachResults || seachResults.length === 0) {
            dbg('no new mail in %s', self.options.box);
            return;
        }
        dbg('found %d new messages', seachResults.length);
        var fetch = self.imap.fetch(seachResults, {
            markSeen: self.options.markSeen !== false,
            bodies: ''
        });
        fetch.on('message', function (msg) {
            var mp = new MailParser();
            mp.once('end', function (mail) {
                self.emit('mail', mail);
            });
            msg.once('body', function (stream, info) {
                stream.pipe(mp);
            });
        });
        fetch.once('end', function () {
            dbg('Done fetching all messages!');
        });
        fetch.once('error', function (err) {
            dbg('fetch error : ', err);
            self.emit('error', err);
        });
    });
    return this;
};

Notifier.prototype.stop = function () {
    if (this.imap.state !== 'disconnected') {
        this.imap.end();
    }
    dbg('notifier stopped');
    return this;
};
