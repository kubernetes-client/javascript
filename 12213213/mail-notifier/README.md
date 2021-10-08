mail-notifier
=============

> Notify your nodejs scripts of incoming imap mail.

introduction
------------
Send `mail` event for each new email in IMAP INBOX. 

synopsis
--------
Start listening new mails :

```javascript
var notifier = require('mail-notifier');

var imap = {
  user: "yourimapuser",
  password: "yourimappassword",
  host: "imap.host.com",
  port: 993, // imap port
  tls: true,// use secure connection
  tlsOptions: { rejectUnauthorized: false }
};

notifier(imap).on('mail',function(mail){console.log(mail);}).start();
```  

Keep it running forever :

```javascript
var n = notifier(imap);
n.on('end', function () { // session closed
  n.start();
}).on('mail',function(m){
  console.log(m.from[0].address, m.subject);
}).start();
```

installation
------------

    $ npm install mail-notifier

API
===

notifier(config)
----------------
The constructor function creates a new `notifier`. Parameter provide options needed for imap connection.
`config` :

* `host` :  imap server host
* `port` :  imap server port number
* `user` :  imap user name
* `password` :  imap password
* `tls` :  need a tle connection to server
* `tlsOptions` : see `tls` module options
* `markSeen`: mark mail as read defaults to true
* `box` : mail box read from defaults to 'INBOX'
* `search`: search query defaults to ['UNSEEN']

For backward compatibility `username` is also supported.

.start()
------------------------------------
Start listening for incomming emails.

.stop()
------------------------------------
Stop listening and close IMAP connection.

Events
======

'connected'
-----
Sent when a connection to the server has been made.

'mail'
-----
Sent on incoming new unread email. The parsed Mail is given as first parameter to the event listener.

'error'
-----
Sent when an error occurs with the IMAP connection. The first parameter is the `err` object.

'end'
-----
Sent when the IMAP connection is closed. This usually happens after a `stop` method call.

Dependencies
============

This module relies heavily on [node-imap](https://github.com/mscdex/node-imap). For more advanced usage, please consider
using it directly.


Debugging
=========

Debugging is enabled via the [visionmedia/debug](https://github.com/visionmedia/debug) module.

To enable debug info add `mailnotifier` to the DEBUG env variable :

```sg
$>DEBUG=mailnotifier node sample/simple-mail-notifier.js
```

Or to also have imap module debug info :

```sg
$>DEBUG=mailnotifier,imap node sample/simple-mail-notifier.js
```

