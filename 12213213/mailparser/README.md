MailParser
==========

[![Build Status](https://api.travis-ci.org/andris9/mailparser.svg)](http://travis-ci.org/andris9/mailparser)
[![NPM version](https://badge.fury.io/js/mailparser.svg)](http://badge.fury.io/js/mailparser)

**MailParser** is an asynchronous and non-blocking parser for
[node.js](http://nodejs.org) to parse mime encoded e-mail messages.
Handles even large attachments with ease - attachments can be parsed
in chunks and streamed if needed.

**MailParser** parses raw source of e-mail messages into a structured object.

No need to worry about charsets or decoding *quoted-printable* or
*base64* data, **MailParser** does all of it for you. All the textual output
from **MailParser** (subject line, addressee names, message body) is always UTF-8.

For a 25MB e-mail it takes less than a second to parse if attachments are not streamed but buffered and about 3-4 seconds if they are streamed. Expect high RAM usage though if you do not stream the attachments.

If you want to send e-mail instead of parsing it, check out my other module [Nodemailer](https://github.com/andris9/Nodemailer).

## ICONV NOTICE

Since v0.4 `node-iconv` is not included by default as a dependency. If you need to support encodings not covered by `iconv-lite` you should add `iconv` as a dependency to your own project so `mailparser` could pick it up.

## Support mailparser development

[![Donate to author](https://www.paypalobjects.com/en_US/i/btn/btn_donate_SM.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=DB26KWR2BQX5W)

Installation
------------

    npm install mailparser

Usage
-----

Require MailParser module

    var MailParser = require("mailparser").MailParser;

Create a new MailParser object

    var mailparser = new MailParser([options]);

Options parameter is an object with the following properties:

  * **debug** - if set to true print all incoming lines to console
  * **streamAttachments** - if set to true, stream attachments instead of including them
  * **unescapeSMTP** - if set to true replace double dots in the beginning of the file
  * **defaultCharset** - the default charset for *text/plain* and *text/html* content, if not set reverts to *Latin-1*
  * **showAttachmentLinks** - if set to true, show inlined attachment links `<a href="cid:...">filename</a>`

MailParser object is a writable Stream - you can pipe directly
files to it or you can send chunks with `mailparser.write`

When the headers have received, "headers" is emitted. The headers have not been pre-processed (except that mime words have been converted to UTF-8 text).

    mailparser.on("headers", function(headers){
        console.log(headers.received);
    });

When the parsing ends an `'end'` event is emitted which has an
object with parsed e-mail structure as a parameter.

    mailparser.on("end", function(mail){
        mail; // object structure for parsed e-mail
    });

### Parsed mail object

  * **headers** - unprocessed headers in the form of - `{key: value}` - if there were multiple fields with the same key then the value is an array
  * **from** - an array of parsed `From` addresses - `[{address:'sender@example.com',name:'Sender Name'}]` (should be only one though)
  * **to** - an array of parsed `To` addresses
  * **cc** - an array of parsed `Cc` addresses
  * **bcc** - an array of parsed 'Bcc' addresses
  * **subject** - the subject line
  * **references** - an array of reference message id values (not set if no reference values present)
  * **inReplyTo** - an array of In-Reply-To message id values (not set if no in-reply-to values present)
  * **priority** - priority of the e-mail, always one of the following: *normal* (default), *high*, *low*
  * **text** - text body
  * **html** - html body
  * **date** - date field as a `Date()` object. If date could not be resolved or is not found this field is not set. Check the original date string from `headers.date`
  * **attachments** - an array of attachments

### Decode a simple e-mail

This example decodes an e-mail from a string

    var MailParser = require("mailparser").MailParser,
        mailparser = new MailParser();

    var email = "From: 'Sender Name' <sender@example.com>\r\n"+
                "To: 'Receiver Name' <receiver@example.com>\r\n"+
                "Subject: Hello world!\r\n"+
                "\r\n"+
                "How are you today?";

    // setup an event listener when the parsing finishes
    mailparser.on("end", function(mail_object){
        console.log("From:", mail_object.from); //[{address:'sender@example.com',name:'Sender Name'}]
        console.log("Subject:", mail_object.subject); // Hello world!
        console.log("Text body:", mail_object.text); // How are you today?
    });

    // send the email source to the parser
    mailparser.write(email);
    mailparser.end();

### Pipe file to MailParser

This example pipes a `readableStream` file to **MailParser**

    var MailParser = require("mailparser").MailParser,
        mailparser = new MailParser(),
        fs = require("fs");

    mailparser.on("end", function(mail_object){
        console.log("Subject:", mail_object.subject);
    });

    fs.createReadStream("email.eml").pipe(mailparser);

### Attachments

By default any attachment found from the e-mail will be included fully in the
final mail structure object as Buffer objects. With large files this might not
be desirable so optionally it is possible to redirect the attachments to a Stream
and keep only the metadata about the file in the mail structure.

    mailparser.on("end", function(mail_object){
        for(var i=0; i<mail_object.attachments.length; i++){
            console.log(mail_object.attachments[i].fileName);
        }
    });

#### Default behavior

By default attachments will be included in the attachment objects as Buffers.

    attachments = [{
        contentType: 'image/png',
        fileName: 'image.png',
        contentDisposition: 'attachment',
        contentId: '5.1321281380971@localhost',
        transferEncoding: 'base64',
        length: 126,
        generatedFileName: 'image.png',
        checksum: 'e4cef4c6e26037bcf8166905207ea09b',
        content: <Buffer ...>
    }];

The property `generatedFileName` is usually the same as `fileName` but if several
different attachments with the same name exist or there is no `fileName` set, an
unique name is generated.

Property `content` is always a Buffer object (or SlowBuffer on some occasions)

#### Attachment streaming

Attachment streaming can be used when providing an optional options parameter
to the `MailParser` constructor.

    var mp = new MailParser({
        streamAttachments: true
    }

This way there will be no `content` property on final attachment objects
(but the other fields will remain).

To catch the streams you should listen for `attachment` events on the MailParser
object. The parameter provided includes file information (`contentType`,
`fileName`, `contentId`) and a readable Stream object `stream`.

    var mp = new MailParser({
        streamAttachments: true
    }

    mp.on("attachment", function(attachment, mail){
        var output = fs.createWriteStream(attachment.generatedFileName);
        attachment.stream.pipe(output);
    });

`generatedFileName` is unique for the parsed mail - if several attachments with
the same name exist, `generatedFileName` is updated accordingly. Also there
might not be `fileName` parameter at all, so it is better to rely on
`generatedFileName`.

#### Testing attachment integrity

Attachment objects include `length` property which is the length of the attachment
in bytes and `checksum` property which is a `md5` hash of the file.

### Running tests

Install **MailParser** with dev dependencies

    npm install --dev mailparser

And then run

    npm test mailparser

There aren't many tests yet but basics should be covered.

## Issues

**S/MIME**

Currently it is not possible to verify signed content as the incoming text is
split to lines when parsing and line ending characters are not preserved. One
can assume it is always \r\n but this might not be always the case.

**Seeking**

Due to the line based parsing it is also not possible to explicitly state
the beginning and ending bytes of the attachments for later source seeking.
Node.js doesn't support the concept of seeking very well anyway.

## License

**MIT**
