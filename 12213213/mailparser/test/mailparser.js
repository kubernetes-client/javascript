"use strict";

var MailParser = require("../lib/mailparser").MailParser,
    encodinglib = require("encoding"),
    fs = require("fs");

exports["General tests"] = {
    "Many chunks": function(test) {
        var encodedText = "Content-Type: text/plain; charset=utf-8\r\n" +
            "\r\n" +
            "ÕÄ\r\n" +
            "ÖÜ", // \r\nÕÄÖÜ
            mail = new Buffer(encodedText, "utf-8");

        test.expect(1);
        var mailparser = new MailParser();

        for (var i = 0, len = mail.length; i < len; i++) {
            mailparser.write(new Buffer([mail[i]]));
        }

        mailparser.end();
        mailparser.on("end", function(mail) {
            test.equal(mail.text, "ÕÄ\nÖÜ");
            test.done();
        });
    },

    "Many chunks - split line endings": function(test) {
        var chunks = [
            "Content-Type: text/plain; charset=utf-8\r",
            "\nSubject: Hi Mom\r\n\r\n",
            "hello"
        ];

        test.expect(1);
        var mailparser = new MailParser();

        var writeNextChunk = function() {
            var chunk = chunks.shift();
            if (chunk !== undefined) {
                mailparser.write(chunk, 'utf8');
                if (typeof setImmediate == "function") {
                    setImmediate(writeNextChunk);
                } else {
                    process.nextTick(writeNextChunk);
                }
            } else {
                mailparser.end();
            }
        };

        mailparser.on("end", function(mail) {
            test.equal(mail.text, "hello");
            test.done();
        });

        if (typeof setImmediate == "function") {
            setImmediate(writeNextChunk);
        } else {
            process.nextTick(writeNextChunk);
        }
    },

    "Headers only": function(test) {
        var encodedText = "Content-type: text/plain; charset=utf-8\r\n" +
            "Subject: ÕÄÖÜ",
            mail = new Buffer(encodedText, "utf-8");

        test.expect(1);
        var mailparser = new MailParser();
        mailparser.end(mail);
        mailparser.on("end", function(mail) {
            test.equal(mail.subject, "ÕÄÖÜ");
            test.done();
        });
    },

    "Body only": function(test) {
        var encodedText = "\r\n" +
            "===",
            mail = new Buffer(encodedText, "utf-8");

        test.expect(1);
        var mailparser = new MailParser();
        mailparser.end(mail);
        mailparser.on("end", function(mail) {
            test.equal(mail.text, "===");
            test.done();
        });
    },

    "Different line endings": function(test) {
        var encodedText = "Content-type: text/plain; charset=utf-8\r" +
            "Subject: ÕÄÖÜ\n" +
            "\r" +
            "1234\r\n" +
            "ÕÄÖÜ\r\n" +
            "ÜÖÄÕ\n" +
            "1234",
            mail = new Buffer(encodedText, "utf-8");

        test.expect(2);
        var mailparser = new MailParser();
        mailparser.end(mail);
        mailparser.on("end", function(mail) {
            test.equal(mail.subject, "ÕÄÖÜ");
            test.equal(mail.text, "1234\nÕÄÖÜ\nÜÖÄÕ\n1234");
            test.done();
        });
    },

    "Headers event": function(test) {
        var encodedText = "Content-type: multipart/mixed; boundary=ABC\r\n" +
            "X-Test: =?UTF-8?Q?=C3=95=C3=84?= =?UTF-8?Q?=C3=96=C3=9C?=\r\n" +
            "Subject: ABCDEF\r\n" +
            "\r\n" +
            "--ABC\r\n" +
            "Content-Type: application/octet-stream\r\n" +
            "Content-Transfer-Encoding: base64\r\n" +
            "Content-Disposition: attachment; filename=\"test.pdf\"\r\n" +
            "\r\n" +
            "AAECAwQFBg==\r\n" +
            "--ABC--",
            mail = new Buffer(encodedText, "utf-8");

        test.expect(3);
        var mailparser = new MailParser();

        mailparser.on("headers", function(headers) {
            test.equal(headers.subject, "ABCDEF");
            test.equal(headers['x-test'], "ÕÄÖÜ");
        });

        mailparser.end(mail);
        mailparser.on("end", function() {
            test.ok(1, "Parsing ended");
            test.done();
        });
    },

    "No priority": function(test) {
        var encodedText = "Content-type: text/plain; charset=utf-8\r" +
            "Subject: ÕÄÖÜ\n" +
            "\r" +
            "1234",
            mail = new Buffer(encodedText, "utf-8");

        test.expect(1);
        var mailparser = new MailParser();
        mailparser.end(mail);
        mailparser.on("end", function(mail) {
            test.equal(mail.priority, "normal");
            test.done();
        });
    },

    "MS Style priority": function(test) {
        var encodedText = "Content-type: text/plain; charset=utf-8\r" +
            "Subject: ÕÄÖÜ\n" +
            "X-Priority: 1 (Highest)\n" +
            "\r" +
            "1234",
            mail = new Buffer(encodedText, "utf-8");

        test.expect(1);
        var mailparser = new MailParser();
        mailparser.end(mail);
        mailparser.on("end", function(mail) {
            test.equal(mail.priority, "high");
            test.done();
        });
    },

    "Single reference": function(test) {
        var encodedText = "Content-type: text/plain\r" +
            "References: <mail1>\n" +
            "\r" +
            "1234",
            mail = new Buffer(encodedText, "utf-8");

        test.expect(1);
        var mailparser = new MailParser();
        mailparser.end(mail);
        mailparser.on("end", function(mail) {
            test.deepEqual(mail.references, ["mail1"]);
            test.done();
        });
    },

    "Multiple reference values": function(test) {
        var encodedText = "Content-type: text/plain\r" +
            "References: <mail1>\n" +
            "    <mail2> <mail3>\n" +
            "\r" +
            "1234",
            mail = new Buffer(encodedText, "utf-8");

        test.expect(1);
        var mailparser = new MailParser();
        mailparser.end(mail);
        mailparser.on("end", function(mail) {
            test.deepEqual(mail.references, ["mail1", "mail2", "mail3"]);
            test.done();
        });
    },

    "Multiple reference fields": function(test) {
        var encodedText = "Content-type: text/plain\r" +
            "References: <mail1>\n" +
            "References: <mail3>\n" +
            "\r" +
            "1234",
            mail = new Buffer(encodedText, "utf-8");

        test.expect(1);
        var mailparser = new MailParser();
        mailparser.end(mail);
        mailparser.on("end", function(mail) {
            test.deepEqual(mail.references, ["mail1", "mail3"]);
            test.done();
        });
    },

    "Single in-reply-to": function(test) {
        var encodedText = "Content-type: text/plain\r" +
            "in-reply-to: <mail1>\n" +
            "\r" +
            "1234",
            mail = new Buffer(encodedText, "utf-8");

        test.expect(1);
        var mailparser = new MailParser();
        mailparser.end(mail);
        mailparser.on("end", function(mail) {
            test.deepEqual(mail.inReplyTo, ["mail1"]);
            test.done();
        });
    },

    "Multiple in-reply-to values": function(test) {
        var encodedText = "Content-type: text/plain\r" +
            "in-reply-to: <mail1>\n" +
            "    <mail2> <mail3>\n" +
            "\r" +
            "1234",
            mail = new Buffer(encodedText, "utf-8");

        test.expect(1);
        var mailparser = new MailParser();
        mailparser.end(mail);
        mailparser.on("end", function(mail) {
            test.deepEqual(mail.inReplyTo, ["mail1", "mail2", "mail3"]);
            test.done();
        });
    },

    "Multiple in-reply-to fields": function(test) {
        var encodedText = "Content-type: text/plain\r" +
            "in-reply-to: <mail1>\n" +
            "in-reply-to: <mail3>\n" +
            "\r" +
            "1234",
            mail = new Buffer(encodedText, "utf-8");

        test.expect(1);
        var mailparser = new MailParser();
        mailparser.end(mail);
        mailparser.on("end", function(mail) {
            test.deepEqual(mail.inReplyTo, ["mail1", "mail3"]);
            test.done();
        });
    },

    "Reply To address": function(test) {
        var encodedText = "Reply-TO: andris <andris@disposebox.com>\r" +
            "Subject: ÕÄÖÜ\n" +
            "\r" +
            "1234",
            mail = new Buffer(encodedText, "utf-8");

        test.expect(1);
        var mailparser = new MailParser();
        mailparser.end(mail);
        mailparser.on("end", function(mail) {
            test.deepEqual(mail.replyTo, [{
                name: "andris",
                address: "andris@disposebox.com"
            }]);
            test.done();
        });
    }

};

exports["Text encodings"] = {

    "Plaintext encoding: Default": function(test) {
        var encodedText = [13, 10, 213, 196, 214, 220], // \r\nÕÄÖÜ
            mail = new Buffer(encodedText);

        test.expect(1);

        var mailparser = new MailParser();
        mailparser.end(mail);
        mailparser.on("end", function(mail) {
            test.equal(mail.text, "ÕÄÖÜ");
            test.done();
        });
    },

    "Plaintext encoding: Header defined": function(test) {
        var encodedText = "Content-Type: TEXT/PLAIN; CHARSET=UTF-8\r\n" +
            "\r\n" +
            "ÕÄÖÜ",
            mail = new Buffer(encodedText, "utf-8");

        test.expect(1);
        var mailparser = new MailParser();
        mailparser.end(mail);
        mailparser.on("end", function(mail) {
            test.equal(mail.text, "ÕÄÖÜ");
            test.done();
        });
    },

    "HTML encoding: From <meta>": function(test) {
        var encodedText = "Content-Type: text/html\r\n" +
            "\r\n" +
            "<html><head><meta charset=\"utf-8\"/></head><body>ÕÄÖÜ",
            mail = new Buffer(encodedText, "utf-8");

        test.expect(1);

        var mailparser = new MailParser();
        mailparser.end(mail);
        mailparser.on("end", function(mail) {
            test.equal((mail.html || "").substr(-4), "ÕÄÖÜ");
            test.done();
        });
    },

    "HTML encoding: Conflicting headers": function(test) {
        var encodedText = "Content-Type: text/html; charset=iso-8859-1\r\n" +
            "\r\n" +
            "<html><head><meta charset=\"utf-8\"/></head><body>ÕÄÖÜ",
            mail = new Buffer(encodedText, "utf-8");

        test.expect(1);

        var mailparser = new MailParser();
        mailparser.end(mail);
        mailparser.on("end", function(mail) {
            test.equal((mail.html || "").substr(-4), "ÕÄÖÜ");
            test.done();
        });
    },
    "HTML encoding: Header defined": function(test) {
        var encodedText = "Content-Type: text/html; charset=iso-UTF-8\r\n" +
            "\r\n" +
            "ÕÄÖÜ",
            mail = new Buffer(encodedText, "utf-8");

        test.expect(1);
        var mailparser = new MailParser();
        mailparser.end(mail);
        mailparser.on("end", function(mail) {
            test.equal(mail.html, "ÕÄÖÜ");
            test.done();
        });
    },
    "Mime Words": function(test) {
        var encodedText = "Content-type: text/plain; charset=utf-8\r\n" +
            "From: =?utf-8?q??= <sender@email.com>\r\n" +
            "To: =?ISO-8859-1?Q?Keld_J=F8rn_Simonsen?= <to@email.com>\r\n" +
            "Subject: =?iso-8859-1?Q?Avaldu?= =?iso-8859-1?Q?s_lepingu_?=\r\n =?iso-8859-1?Q?l=F5petamise?= =?iso-8859-1?Q?ks?=\r\n",
            mail = new Buffer(encodedText, "utf-8");

        var mailparser = new MailParser();
        mailparser.end(mail);
        mailparser.on("end", function(mail) {
            test.equal(mail.subject, "Avaldus lepingu lõpetamiseks");
            test.equal(mail.from[0].name, "");
            test.equal(mail.to[0].name, "Keld Jørn Simonsen");
            test.done();
        });
    }
};

exports["Binary attachment encodings"] = {
    "Quoted-Printable": function(test) {
        var encodedText = "Content-Type: application/octet-stream\r\n" +
            "Content-Transfer-Encoding: QUOTED-PRINTABLE\r\n" +
            "\r\n" +
            "=00=01=02=03=FD=FE=FF",
            mail = new Buffer(encodedText, "utf-8");

        var mailparser = new MailParser();
        mailparser.end(mail);
        mailparser.on("end", function(mail) {
            test.equal(Array.prototype.slice.apply(mail.attachments && mail.attachments[0] && mail.attachments[0].content && mail.attachments[0].content || []).join(","), "0,1,2,3,253,254,255");
            test.done();
        });
    },
    "Base64": function(test) {
        var encodedText = "Content-Type: application/octet-stream\r\n" +
            "Content-Transfer-Encoding: base64\r\n" +
            "\r\n" +
            "AAECA/3+/w==",
            mail = new Buffer(encodedText, "utf-8");

        var mailparser = new MailParser();
        mailparser.end(mail);
        mailparser.on("end", function(mail) {
            test.equal(Array.prototype.slice.apply(mail.attachments && mail.attachments[0] && mail.attachments[0].content && mail.attachments[0].content || []).join(","), "0,1,2,3,253,254,255");
            test.done();
        });
    },
    "8bit": function(test) {
        var encodedText = "Content-Type: application/octet-stream\r\n" +
            "\r\n" +
            "ÕÄÖÜ",
            mail = new Buffer(encodedText, "utf-8");

        var mailparser = new MailParser();
        mailparser.end(mail);
        mailparser.on("end", function(mail) {
            test.equal(Array.prototype.slice.apply(mail.attachments && mail.attachments[0] && mail.attachments[0].content && mail.attachments[0].content || []).join(","), "195,149,195,132,195,150,195,156");
            test.done();
        });
    },
    "UUENCODE": function(test) {
        var encodedText = "Content-Type: application/octet-stream\r\n" +
            "Content-Transfer-Encoding: uuencode\r\n" +
            "\r\n" +
            "begin 644 buffer.bin\r\n" +
            "#0V%T\r\n" +
            "`\r\n" +
            "end",
            mail = new Buffer(encodedText, "utf-8");

        var mailparser = new MailParser();
        mailparser.end(mail);
        mailparser.on("end", function(mail) {
            test.equal(mail.attachments[0].content.toString(), "Cat");
            test.done();
        });
    }

};

exports["Attachment Content-Id"] = {
    "Default": function(test) {
        var encodedText = "Content-Type: application/octet-stream\r\n" +
            "Content-Transfer-Encoding: QUOTED-PRINTABLE\r\n" +
            "Content-Disposition: attachment; filename=\"=?UTF-8?Q?=C3=95=C3=84=C3=96=C3=9C?=\"\r\n" +
            "\r\n" +
            "=00=01=02=03=FD=FE=FF",
            mail = new Buffer(encodedText, "utf-8");

        var mailparser = new MailParser();
        mailparser.end(mail);
        mailparser.on("end", function(mail) {
            test.equal(mail.attachments && mail.attachments[0] && mail.attachments[0].contentId, "ef694232fea1c01c16fb8a03a0ca710c@mailparser");
            test.done();
        });
    },

    "Defined": function(test) {
        var encodedText = "Content-Type: application/octet-stream\r\n" +
            "Content-Transfer-Encoding: QUOTED-PRINTABLE\r\n" +
            "Content-Disposition: attachment; filename=\"=?UTF-8?Q?=C3=95=C3=84=C3=96=C3=9C?=\"\r\n" +
            "Content-Id: test@localhost\r\n" +
            "\r\n" +
            "=00=01=02=03=FD=FE=FF",
            mail = new Buffer(encodedText, "utf-8");

        var mailparser = new MailParser();
        mailparser.end(mail);
        mailparser.on("end", function(mail) {
            test.equal(mail.attachments && mail.attachments[0] && mail.attachments[0].contentId, "test@localhost");
            test.done();
        });
    }
};

exports["Attachment filename"] = {

    "Content-Disposition filename": function(test) {
        var encodedText = "Content-Type: application/octet-stream\r\n" +
            "Content-Transfer-Encoding: QUOTED-PRINTABLE\r\n" +
            "Content-Disposition: attachment; filename=\"=?UTF-8?Q?=C3=95=C3=84=C3=96=C3=9C?=\"\r\n" +
            "\r\n" +
            "=00=01=02=03=FD=FE=FF",
            mail = new Buffer(encodedText, "utf-8");

        var mailparser = new MailParser();
        mailparser.end(mail);
        mailparser.on("end", function(mail) {
            test.equal(mail.attachments && mail.attachments[0] && mail.attachments[0].content && mail.attachments[0].fileName, "ÕÄÖÜ");
            test.done();
        });
    },
    "Content-Disposition filename*": function(test) {
        var encodedText = "Content-Type: application/octet-stream\r\n" +
            "Content-Transfer-Encoding: QUOTED-PRINTABLE\r\n" +
            "Content-Disposition: attachment; filename*=\"UTF-8''%C3%95%C3%84%C3%96%C3%9C\"\r\n" +
            "\r\n" +
            "=00=01=02=03=FD=FE=FF",
            mail = new Buffer(encodedText, "utf-8");

        var mailparser = new MailParser();
        mailparser.end(mail);
        mailparser.on("end", function(mail) {
            test.equal(mail.attachments && mail.attachments[0] && mail.attachments[0].content && mail.attachments[0].fileName, "ÕÄÖÜ");
            test.done();
        });
    },
    "Content-Disposition filename*X*": function(test) {
        var encodedText = "Content-Type: application/octet-stream\r\n" +
            "Content-Transfer-Encoding: QUOTED-PRINTABLE\r\n" +
            "Content-Disposition: attachment;\r\n" +
            "    filename*0*=UTF-8''%C3%95%C3%84;\r\n" +
            "    filename*1*=%C3%96%C3%9C\r\n" +
            "\r\n" +
            "=00=01=02=03=FD=FE=FF",
            mail = new Buffer(encodedText, "utf-8");

        var mailparser = new MailParser();
        mailparser.end(mail);
        mailparser.on("end", function(mail) {
            test.equal(mail.attachments && mail.attachments[0] && mail.attachments[0].content && mail.attachments[0].fileName, "ÕÄÖÜ");
            test.done();
        });
    },

    "Content-Type name": function(test) {
        var encodedText = "Content-Type: application/octet-stream; name=\"=?UTF-8?Q?=C3=95=C3=84=C3=96=C3=9C?=\"\r\n" +
            "Content-Transfer-Encoding: QUOTED-PRINTABLE\r\n" +
            "\r\n" +
            "=00=01=02=03=FD=FE=FF",
            mail = new Buffer(encodedText, "utf-8");

        var mailparser = new MailParser();
        mailparser.end(mail);
        mailparser.on("end", function(mail) {
            test.equal(mail.attachments && mail.attachments[0] && mail.attachments[0].content && mail.attachments[0].fileName, "ÕÄÖÜ");
            test.done();
        });
    },
    "Content-Type name*": function(test) {
        var encodedText = "Content-Type: application/octet-stream;\r\n" +
            "    name*=UTF-8''%C3%95%C3%84%C3%96%C3%9C\r\n" +
            "Content-Transfer-Encoding: QUOTED-PRINTABLE\r\n" +
            "\r\n" +
            "=00=01=02=03=FD=FE=FF",
            mail = new Buffer(encodedText, "utf-8");

        var mailparser = new MailParser();
        mailparser.end(mail);
        mailparser.on("end", function(mail) {
            test.equal(mail.attachments && mail.attachments[0] && mail.attachments[0].content && mail.attachments[0].fileName, "ÕÄÖÜ");
            test.done();
        });
    },
    "Content-Type name*X*": function(test) {
        var encodedText = "Content-Type: application/octet-stream;\r\n" +
            "    name*0*=UTF-8''%C3%95%C3%84;\r\n" +
            "    name*1*=%C3%96%C3%9C\r\n" +
            "Content-Transfer-Encoding: QUOTED-PRINTABLE\r\n" +
            "\r\n" +
            "=00=01=02=03=FD=FE=FF",
            mail = new Buffer(encodedText, "utf-8");

        var mailparser = new MailParser();
        mailparser.end(mail);
        mailparser.on("end", function(mail) {
            test.equal(mail.attachments && mail.attachments[0] && mail.attachments[0].content && mail.attachments[0].fileName, "ÕÄÖÜ");
            test.done();
        });
    },
    "Default name from Content-type": function(test) {
        var encodedText = "Content-Type: application/pdf\r\n" +
            "Content-Transfer-Encoding: QUOTED-PRINTABLE\r\n" +
            "\r\n" +
            "=00=01=02=03=FD=FE=FF",
            mail = new Buffer(encodedText, "utf-8");

        var mailparser = new MailParser();
        mailparser.end(mail);
        mailparser.on("end", function(mail) {
            test.equal(mail.attachments && mail.attachments[0] && mail.attachments[0].content && mail.attachments[0].generatedFileName, "attachment.pdf");
            test.done();
        });
    },
    "Default name": function(test) {
        var encodedText = "Content-Type: application/octet-stream\r\n" +
            "Content-Transfer-Encoding: QUOTED-PRINTABLE\r\n" +
            "\r\n" +
            "=00=01=02=03=FD=FE=FF",
            mail = new Buffer(encodedText, "utf-8");

        var mailparser = new MailParser();
        mailparser.end(mail);
        mailparser.on("end", function(mail) {
            test.equal(mail.attachments && mail.attachments[0] && mail.attachments[0].content && mail.attachments[0].generatedFileName, "attachment.bin");
            test.done();
        });
    },
    "Multiple filenames - Same": function(test) {
        var encodedText = "Content-Type: multipart/mixed; boundary=ABC\r\n" +
            "\r\n" +
            "--ABC\r\n" +
            "Content-Type: application/octet-stream; name=\"test.txt\"\r\n" +
            "\r\n" +
            "=00=01=02=03=FD=FE=FF\r\n" +
            "--ABC\r\n" +
            "Content-Type: application/octet-stream; name=\"test.txt\"\r\n" +
            "\r\n" +
            "=00=01=02=03=FD=FE=FF\r\n" +
            "--ABC--",
            mail = new Buffer(encodedText, "utf-8");

        var mailparser = new MailParser();
        mailparser.end(mail);
        mailparser.on("end", function(mail) {
            test.equal(mail.attachments && mail.attachments[0] && mail.attachments[0].content && mail.attachments[0].generatedFileName, "test.txt");
            test.equal(mail.attachments && mail.attachments[1] && mail.attachments[1].content && mail.attachments[1].generatedFileName, "test-1.txt");
            test.done();
        });
    },
    "Multiple filenames - Different": function(test) {
        var encodedText = "Content-Type: multipart/mixed; boundary=ABC\r\n" +
            "\r\n" +
            "--ABC\r\n" +
            "Content-Type: application/octet-stream\r\n" +
            "\r\n" +
            "=00=01=02=03=FD=FE=FF\r\n" +
            "--ABC\r\n" +
            "Content-Type: application/octet-stream; name=\"test.txt\"\r\n" +
            "\r\n" +
            "=00=01=02=03=FD=FE=FF\r\n" +
            "--ABC--",
            mail = new Buffer(encodedText, "utf-8");

        var mailparser = new MailParser();
        mailparser.end(mail);
        mailparser.on("end", function(mail) {
            test.equal(mail.attachments && mail.attachments[0] && mail.attachments[0].content && mail.attachments[0].generatedFileName, "attachment.bin");
            test.equal(mail.attachments && mail.attachments[1] && mail.attachments[1].content && mail.attachments[1].generatedFileName, "test.txt");
            test.done();
        });
    },
    "Multiple filenames - with number": function(test) {
        var encodedText = "Content-Type: multipart/mixed; boundary=ABC\r\n" +
            "\r\n" +
            "--ABC\r\n" +
            "Content-Type: application/octet-stream; name=\"somename.txt\"\r\n" +
            "\r\n" +
            "=00=01=02=03=FD=FE=FF\r\n" +
            "--ABC\r\n" +
            "Content-Type: application/octet-stream; name=\"somename-1.txt\"\r\n" +
            "\r\n" +
            "=00=01=02=03=FD=FE=FF\r\n" +
            "--ABC\r\n" +
            "Content-Type: application/octet-stream; name=\"somename.txt\"\r\n" +
            "\r\n" +
            "=00=01=02=03=FD=FE=FF\r\n" +
            "--ABC\r\n" +
            "Content-Type: application/octet-stream; name=\"somename-1-1.txt\"\r\n" +
            "\r\n" +
            "=00=01=02=03=FD=FE=FF\r\n" +
            "--ABC--",
            mail = new Buffer(encodedText, "utf-8");

        var mailparser = new MailParser();
        mailparser.end(mail);
        mailparser.on("end", function(mail) {
            test.equal(mail.attachments && mail.attachments[0] && mail.attachments[0].content && mail.attachments[0].generatedFileName, "somename.txt");
            test.equal(mail.attachments && mail.attachments[1] && mail.attachments[1].content && mail.attachments[1].generatedFileName, "somename-1-1.txt");
            test.equal(mail.attachments && mail.attachments[2] && mail.attachments[2].content && mail.attachments[2].generatedFileName, "somename-2.txt");
            test.equal(mail.attachments && mail.attachments[3] && mail.attachments[3].content && mail.attachments[3].generatedFileName, "somename-1-1-3.txt");
            test.done();
        });
    },
    "Generate filename from Content-Type": function(test) {
        var encodedText = "Content-Type: multipart/mixed; boundary=ABC\r\n" +
            "\r\n" +
            "--ABC\r\n" +
            "Content-Type: application/pdf\r\n" +
            "\r\n" +
            "=00=01=02=03=FD=FE=FF\r\n" +
            "--ABC--",
            mail = new Buffer(encodedText, "utf-8");

        var mailparser = new MailParser();
        mailparser.end(mail);
        mailparser.on("end", function(mail) {
            test.equal(mail.attachments && mail.attachments[0] && mail.attachments[0].content && mail.attachments[0].generatedFileName, "attachment.pdf");
            test.done();
        });
    },
    "Filename with semicolon": function(test) {
        var encodedText = "Content-Type: multipart/mixed; boundary=ABC\r\n" +
            "\r\n" +
            "--ABC\r\n" +
            "Content-Disposition: attachment; filename=\"hello;world;test.txt\"\r\n" +
            "\r\n" +
            "=00=01=02=03=FD=FE=FF\r\n" +
            "--ABC--",
            mail = new Buffer(encodedText, "utf-8");

        var mailparser = new MailParser();
        mailparser.end(mail);
        mailparser.on("end", function(mail) {
            test.equal(mail.attachments && mail.attachments[0] && mail.attachments[0].content && mail.attachments[0].generatedFileName, "hello;world;test.txt");
            test.done();
        });
    }

};

exports["Plaintext format"] = {
    "Default": function(test) {
        var encodedText = "Content-Type: text/plain;\r\n\r\nFirst line \r\ncontinued",
            mail = new Buffer(encodedText, "utf-8");

        var mailparser = new MailParser();
        mailparser.end(mail);
        mailparser.on("end", function(mail) {
            test.equal(mail.text, "First line \ncontinued");
            test.done();
        });
    },
    "Flowed": function(test) {
        var encodedText = "Content-Type: text/plain; format=flowed\r\n\r\nFirst line \r\ncontinued \r\nand so on",
            mail = new Buffer(encodedText, "utf-8");

        var mailparser = new MailParser();
        mailparser.end(mail);
        mailparser.on("end", function(mail) {
            test.equal(mail.text, "First line continued and so on");
            test.done();
        });
    },
    "Flowed Signature": function(test) {
        var encodedText = "Content-Type: text/plain; format=flowed\r\n\r\nHow are you today?\r\n" +
            "-- \r\n" +
            "Signature\r\n",
            mail = new Buffer(encodedText, "utf-8");

        var mailparser = new MailParser();
        mailparser.end(mail);
        mailparser.on("end", function(mail) {
            test.equal(mail.text, "How are you today?\n-- \nSignature\n");
            test.done();
        });
    },
    "Fixed": function(test) {
        var encodedText = "Content-Type: text/plain; format=fixed\r\n\r\nFirst line \r\ncontinued \r\nand so on",
            mail = new Buffer(encodedText, "utf-8");

        var mailparser = new MailParser();
        mailparser.end(mail);
        mailparser.on("end", function(mail) {
            test.equal(mail.text, "First line \ncontinued \nand so on");
            test.done();
        });
    },
    "DelSp": function(test) {
        var encodedText = "Content-Type: text/plain; format=flowed; delsp=yes\r\n\r\nFirst line \r\ncontinued \r\nand so on",
            mail = new Buffer(encodedText, "utf-8");

        var mailparser = new MailParser();
        mailparser.end(mail);
        mailparser.on("end", function(mail) {
            test.equal(mail.text, "First linecontinuedand so on");
            test.done();
        });
    },
    "Quoted printable, Flowed": function(test) {
        var encodedText = "Content-Type: text/plain; format=flowed\r\nContent-Transfer-Encoding: QUOTED-PRINTABLE\r\n\r\nFoo =\n\nBar =\n\nBaz",
            mail = new Buffer(encodedText, "utf-8");

        var mailparser = new MailParser();
        mailparser.end(mail);
        mailparser.on("end", function(mail) {
            test.equal(mail.text, "Foo Bar Baz");
            test.done();
        });
    },
    "Quoted printable, Flowed Signature": function(test) {
        var encodedText = "Content-Type: text/plain; format=flowed\r\nContent-Transfer-Encoding: QUOTED-PRINTABLE\r\n\r\nHow are you today?\r\n" +
            "-- \r\n" +
            "Signature\r\n",
            mail = new Buffer(encodedText, "utf-8");

        var mailparser = new MailParser();
        mailparser.end(mail);
        mailparser.on("end", function(mail) {
            test.equal(mail.text, "How are you today?\n-- \nSignature\n");
            test.done();
        });
    },
    "Quoted printable, DelSp": function(test) {
        var encodedText = "Content-Type: text/plain; format=flowed; delsp=yes\r\nContent-Transfer-Encoding: QUOTED-PRINTABLE\r\n\r\nFoo =\n\nBar =\n\nBaz",
            mail = new Buffer(encodedText, "utf-8");

        var mailparser = new MailParser();
        mailparser.end(mail);
        mailparser.on("end", function(mail) {
            test.equal(mail.text, "FooBarBaz");
            test.done();
        });
    }
};

exports["Transfer encoding"] = {
    "Quoted-Printable Default charset": function(test) {
        var encodedText = "Content-type: text/plain\r\nContent-Transfer-Encoding: quoted-printable\r\n\r\n=D5=C4=D6=DC",
            mail = new Buffer(encodedText, "utf-8");

        var mailparser = new MailParser();
        mailparser.end(mail);
        mailparser.on("end", function(mail) {
            test.equal(mail.text, "ÕÄÖÜ");
            test.done();
        });
    },
    "Quoted-Printable UTF-8": function(test) {
        var encodedText = "Content-type: text/plain; charset=utf-8\r\nContent-Transfer-Encoding: QUOTED-PRINTABLE\r\n\r\n=C3=95=C3=84=C3=96=C3=9C",
            mail = new Buffer(encodedText, "utf-8");

        var mailparser = new MailParser();
        mailparser.end(mail);
        mailparser.on("end", function(mail) {
            test.equal(mail.text, "ÕÄÖÜ");
            test.done();
        });
    },
    "Base64 Default charset": function(test) {
        var encodedText = "Content-type: text/plain\r\nContent-Transfer-Encoding: bAse64\r\n\r\n1cTW3A==",
            mail = new Buffer(encodedText, "utf-8");

        var mailparser = new MailParser();
        mailparser.end(mail);
        mailparser.on("end", function(mail) {
            test.equal(mail.text, "ÕÄÖÜ");
            test.done();
        });
    },
    "Base64 UTF-8": function(test) {
        var encodedText = "Content-type: text/plain; charset=utf-8\r\nContent-Transfer-Encoding: bAse64\r\n\r\nw5XDhMOWw5w=",
            mail = new Buffer(encodedText, "utf-8");

        var mailparser = new MailParser();
        mailparser.end(mail);
        mailparser.on("end", function(mail) {
            test.equal(mail.text, "ÕÄÖÜ");
            test.done();
        });
    },
    "Mime Words": function(test) {
        var encodedText = "Content-type: text/plain; charset=utf-8\r\nSubject: =?iso-8859-1?Q?Avaldu?= =?iso-8859-1?Q?s_lepingu_?=\r\n =?iso-8859-1?Q?l=F5petamise?= =?iso-8859-1?Q?ks?=\r\n",
            mail = new Buffer(encodedText, "utf-8");

        var mailparser = new MailParser();
        mailparser.end(mail);
        mailparser.on("end", function(mail) {
            test.equal(mail.subject, "Avaldus lepingu lõpetamiseks");
            test.done();
        });
    },
    "Mime Words with invalid linebreaks (Sparrow)": function(test) {
        var encodedText = "Content-type: text/plain; charset=utf-8\r\n" +
            "Subject: abc=?utf-8?Q?=C3=B6=C\r\n" +
            " 3=B5=C3=BC?=",
            mail = new Buffer(encodedText, "utf-8");

        var mailparser = new MailParser();
        mailparser.end(mail);
        mailparser.on("end", function(mail) {
            test.equal(mail.subject, "abcöõü");
            test.done();
        });
    },
    "8bit Default charset": function(test) {
        var encodedText = "Content-type: text/plain\r\nContent-Transfer-Encoding: 8bit\r\n\r\nÕÄÖÜ",
            textmap = encodedText.split('').map(function(chr) {
                return chr.charCodeAt(0);
            }),
            mail = new Buffer(textmap);

        var mailparser = new MailParser();
        mailparser.end(mail);
        mailparser.on("end", function(mail) {
            test.equal(mail.text, "ÕÄÖÜ");
            test.done();
        });
    },
    "8bit UTF-8": function(test) {
        var encodedText = "Content-type: text/plain; charset=utf-8\r\nContent-Transfer-Encoding: 8bit\r\n\r\nÕÄÖÜ",
            mail = new Buffer(encodedText, "utf-8");

        var mailparser = new MailParser();
        mailparser.end(mail);
        mailparser.on("end", function(mail) {
            test.equal(mail.text, "ÕÄÖÜ");
            test.done();
        });
    },
    "Invalid Quoted-Printable": function(test) {
        var encodedText = "Content-type: text/plain; charset=utf-8\r\nContent-Transfer-Encoding: QUOTED-PRINTABLE\r\n\r\n==C3==95=C3=84=C3=96=C3=9C=",
            mail = new Buffer(encodedText, "utf-8");

        var mailparser = new MailParser();
        mailparser.end(mail);
        mailparser.on("end", function(mail) {
            test.equal(mail.text, "=�=�ÄÖÜ");
            test.done();
        });
    },
    "Invalid BASE64": function(test) {
        var encodedText = "Content-type: text/plain; charset=utf-8\r\nContent-Transfer-Encoding: base64\r\n\r\nw5XDhMOWw5",
            mail = new Buffer(encodedText, "utf-8");

        var mailparser = new MailParser();
        mailparser.end(mail);
        mailparser.on("end", function(mail) {
            test.equal(Array.prototype.map.call(mail.text, function(chr) {
                return chr.charCodeAt(0);
            }).join(","), "213,196,214,65533");
            test.done();
        });
    },
    "gb2312 mime words": function(test) {
        var encodedText = "From: =?gb2312?B?086yyZjl?= user@ldkf.com.tw\r\n\r\nBody",
            mail = new Buffer(encodedText, "utf-8");

        var mailparser = new MailParser();
        mailparser.end(mail);
        mailparser.on("end", function(mail) {
            test.deepEqual(mail.from, [{
                address: 'user@ldkf.com.tw',
                name: '游采樺'
            }]);
            test.done();
        });
    },
    "Valid Date header": function(test) {
        var encodedText = "Date: Wed, 08 Jan 2014 09:52:26 -0800\r\n\r\n1cTW3A==",
            mail = new Buffer(encodedText, "utf-8");

        var mailparser = new MailParser();
        mailparser.end(mail);
        mailparser.on("end", function(mail) {
            test.equal(mail.date.toISOString(), "2014-01-08T17:52:26.000Z");
            test.equal(mail.headers.date, "Wed, 08 Jan 2014 09:52:26 -0800");
            test.done();
        });
    },
    "Invalid Date header": function(test) {
        var encodedText = "Date: zzzzz\r\n\r\n1cTW3A==",
            mail = new Buffer(encodedText, "utf-8");

        var mailparser = new MailParser();
        mailparser.end(mail);
        mailparser.on("end", function(mail) {
            test.ok(!mail.date);
            test.equal(mail.headers.date, "zzzzz");
            test.done();
        });
    },
    "Missing Date header": function(test) {
        var encodedText = "Subject: test\r\n\r\n1cTW3A==",
            mail = new Buffer(encodedText, "utf-8");

        var mailparser = new MailParser();
        mailparser.end(mail);
        mailparser.on("end", function(mail) {
            test.ok(!mail.date);
            test.equal(mail.headers.date, undefined);
            test.done();
        });
    },
    "Received Headers": function(test) {
        var encodedTest = "Received: by 10.25.25.72 with SMTP id 69csp2404548lfz;\r\n" +
            "        Fri, 6 Feb 2015 20:15:32 -0800 (PST)\r\n" +
            "X-Received: by 10.194.200.68 with SMTP id jq4mr7518476wjc.128.1423264531879;\r\n" +
            "        Fri, 06 Feb 2015 15:15:31 -0800 (PST)\r\n" +
            "Received: from mail.formilux.org (flx02.formilux.org. [195.154.117.161])\r\n" +
            "        by mx.google.com with ESMTP id wn4si6920692wjc.106.2015.02.06.15.15.31\r\n" +
            "        for <test@example.com>;\r\n" +
            "        Fri, 06 Feb 2015 15:15:31 -0800 (PST)\r\n" +
            "Received: from flx02.formilux.org (flx02.formilux.org [127.0.0.1])\r\n" +
            "        by mail.formilux.org (Postfix) with SMTP id 9D262450C77\r\n" +
            "        for <test@example.com>; Sat,  7 Feb 2015 00:15:31 +0100 (CET)\r\n" +
            "Date: Fri, 6 Feb 2015 16:13:51 -0700 (MST)\r\n" +
            "\r\n" +
            "1cTW3A==",
            mail = new Buffer(encodedTest, "utf-8");

        var mailparser = new MailParser();
        mailparser.end(mail);
        mailparser.on("end", function(mail) {
            test.ok(mail.date);
            test.ok(mail.receivedDate);
            test.equal(mail.date.toISOString(), "2015-02-06T23:13:51.000Z");
            test.equal(mail.receivedDate.toISOString(), "2015-02-07T04:15:32.000Z");
            test.done();
        });
    }
};

exports["Multipart content"] = {
    "Simple": function(test) {
        var encodedText = "Content-type: multipart/mixed; boundary=ABC\r\n\r\n--ABC\r\nContent-type: text/plain; charset=utf-8\r\n\r\nÕÄÖÜ\r\n--ABC--",
            mail = new Buffer(encodedText, "utf-8");

        var mailparser = new MailParser();
        mailparser.end(mail);
        mailparser.on("end", function(mail) {
            test.equal(mail.text, "ÕÄÖÜ");
            test.done();
        });
    },
    "Nested": function(test) {
        var encodedText = "Content-type: multipart/mixed; boundary=ABC\r\n" +
            "\r\n" +
            "--ABC\r\n" +
            "Content-type: multipart/related; boundary=DEF\r\n" +
            "\r\n" +
            "--DEF\r\n" +
            "Content-type: text/plain; charset=utf-8\r\n" +
            "\r\n" +
            "ÕÄÖÜ\r\n" +
            "--DEF--\r\n" +
            "--ABC--",
            mail = new Buffer(encodedText, "utf-8");

        var mailparser = new MailParser();
        mailparser.end(mail);
        mailparser.on("end", function(mail) {
            test.equal(mail.text, "ÕÄÖÜ");
            test.done();
        });
    },
    "Inline text (Sparrow)": function(test) {
        var encodedText = "Content-type: multipart/mixed; boundary=ABC\r\n" +
            "\r\n" +
            "--ABC\r\n" +
            "Content-Type: text/plain; charset=\"utf-8\"\r\n" +
            "Content-Transfer-Encoding: 8bit\r\n" +
            "Content-Disposition: inline\r\n" +
            "\r\n" +
            "ÕÄÖÜ\r\n" +
            "--ABC--",
            mail = new Buffer(encodedText, "utf-8");

        var mailparser = new MailParser();
        mailparser.end(mail);
        mailparser.on("end", function(mail) {
            test.equal(mail.text, "ÕÄÖÜ");
            test.done();
        });
    },
    "Different Levels": function(test) {
        var encodedText = "Content-type: multipart/mixed; boundary=ABC\r\n" +
            "\r\n" +
            "--ABC\r\n" +
            "Content-type: text/html; charset=utf-8\r\n" +
            "\r\n" +
            "ÕÄÖÜ2\r\n" +
            "--ABC\r\n" +
            "Content-type: multipart/related; boundary=DEF\r\n" +
            "\r\n" +
            "--DEF\r\n" +
            "Content-type: text/plain; charset=utf-8\r\n" +
            "\r\n" +
            "ÕÄÖÜ1\r\n" +
            "--DEF--\r\n" +
            "--ABC--",
            mail = new Buffer(encodedText, "utf-8");

        var mailparser = new MailParser();
        mailparser.end(mail);

        mailparser.on("end", function(mail) {
            test.equal(mail.text, "ÕÄÖÜ1");
            test.equal(mail.html, "ÕÄÖÜ2");
            test.done();
        });
    }
};

exports["Attachment info"] = {
    "Included integrity": function(test) {
        var encodedText = "Content-type: multipart/mixed; boundary=ABC\r\n" +
            "\r\n" +
            "--ABC\r\n" +
            "Content-Type: application/octet-stream\r\n" +
            "Content-Transfer-Encoding: quoted-printable\r\n" +
            "Content-Disposition: attachment\r\n" +
            "\r\n" +
            "=00=01=02=03=04=05=06\r\n" +
            "--ABC--",
            expectedHash = "9aa461e1eca4086f9230aa49c90b0c61",
            mail = new Buffer(encodedText, "utf-8");

        var mailparser = new MailParser();

        for (var i = 0, len = mail.length; i < len; i++) {
            mailparser.write(new Buffer([mail[i]]));
        }
        mailparser.end();

        mailparser.on("end", function(mail) {
            test.equal(mail.attachments && mail.attachments[0] && mail.attachments[0].checksum, expectedHash);
            test.equal(mail.attachments && mail.attachments[0] && mail.attachments[0].length, 7);
            test.done();
        });
    },
    "Stream integrity base64": function(test) {
        var encodedText = "Content-type: multipart/mixed; boundary=ABC\r\n" +
            "\r\n" +
            "--ABC\r\n" +
            "Content-Type: application/octet-stream\r\n" +
            "Content-Transfer-Encoding: base64\r\n" +
            "Content-Disposition: attachment\r\n" +
            "\r\n" +
            "AAECAwQFBg==\r\n" +
            "--ABC--",
            expectedHash = "9aa461e1eca4086f9230aa49c90b0c61",
            mail = new Buffer(encodedText, "utf-8");

        var mailparser = new MailParser({
            streamAttachments: true
        });

        for (var i = 0, len = mail.length; i < len; i++) {
            mailparser.write(new Buffer([mail[i]]));
        }

        test.expect(3);

        mailparser.on("attachment", function(attachment) {
            test.ok(attachment.stream, "Stream detected");
        });

        mailparser.end();

        mailparser.on("end", function(mail) {
            test.equal(mail.attachments && mail.attachments[0] && mail.attachments[0].checksum, expectedHash);
            test.equal(mail.attachments && mail.attachments[0] && mail.attachments[0].length, 7);
            test.done();
        });
    },
    "Stream integrity - 8bit": function(test) {
        var encodedText = "Content-type: multipart/mixed; boundary=ABC\r\n" +
            "\r\n" +
            "--ABC\r\n" +
            "Content-Type: application/octet-stream\r\n" +
            "Content-Transfer-Encoding: 8bit\r\n" +
            "Content-Disposition: attachment\r\n" +
            "\r\n" +
            "ÕÄ\r\n" +
            "ÖÜ\r\n" +
            "--ABC--",
            expectedHash = "cad0f72629a7245dd3d2cbf41473e3ca",
            mail = new Buffer(encodedText, "utf-8");

        var mailparser = new MailParser({
            streamAttachments: true
        });

        for (var i = 0, len = mail.length; i < len; i++) {
            mailparser.write(new Buffer([mail[i]]));
        }

        test.expect(4);

        mailparser.on("attachment", function(attachment, node) {
            test.ok(attachment.stream, "Stream detected");
            test.ok(node);
        });

        mailparser.end();

        mailparser.on("end", function(mail) {
            test.equal(mail.attachments && mail.attachments[0] && mail.attachments[0].checksum, expectedHash);
            test.equal(mail.attachments && mail.attachments[0] && mail.attachments[0].length, 10);
            test.done();
        });
    },
    "Stream integrity - binary, non utf-8": function(test) {
        var encodedText = "Content-type: multipart/mixed; boundary=ABC\r\n" +
            "\r\n" +
            "--ABC\r\n" +
            "Content-Type: application/octet-stream\r\n" +
            "Content-Transfer-Encoding: 8bit\r\n" +
            "Content-Disposition: attachment\r\n" +
            "\r\n" +
            "ÕÄ\r\n" +
            "ÖÜ\r\n" +
            "ŽŠ\r\n" +
            "--ABC--",
            expectedHash = "34bca86f8cc340bbd11446ee16ee3cae",
            mail = encodinglib.convert(encodedText, "latin-13");

        var mailparser = new MailParser({
            streamAttachments: true
        });

        for (var i = 0, len = mail.length; i < len; i++) {
            mailparser.write(new Buffer([mail[i]]));
        }

        test.expect(3);

        mailparser.on("attachment", function(attachment) {
            test.ok(attachment.stream, "Stream detected");
        });

        mailparser.end();

        mailparser.on("end", function(mail) {
            test.equal(mail.attachments && mail.attachments[0] && mail.attachments[0].checksum, expectedHash);
            test.equal(mail.attachments && mail.attachments[0] && mail.attachments[0].length, 10);
            test.done();
        });
    },
    "Stream integrity - qp, non utf-8": function(test) {
        var encodedText = "Content-type: multipart/mixed; boundary=ABC\r\n" +
            "\r\n" +
            "--ABC\r\n" +
            "Content-Type: application/octet-stream; charset=iso-8859-13\r\n" +
            "Content-Transfer-Encoding: quoted-printable\r\n" +
            "Content-Disposition: attachment\r\n" +
            "\r\n" +
            "=d5=c4\r\n" +
            "=d6=dc\r\n" +
            "=de=d0\r\n" +
            "--ABC--",
            expectedHash = "34bca86f8cc340bbd11446ee16ee3cae",
            mail = new Buffer(encodedText, "utf-8");

        var mailparser = new MailParser({
            streamAttachments: true
        });

        for (var i = 0, len = mail.length; i < len; i++) {
            mailparser.write(new Buffer([mail[i]]));
        }

        test.expect(3);

        mailparser.on("attachment", function(attachment) {
            test.ok(attachment.stream, "Stream detected");
        });

        mailparser.end();

        mailparser.on("end", function(mail) {
            test.equal(mail.attachments && mail.attachments[0] && mail.attachments[0].checksum, expectedHash);
            test.equal(mail.attachments && mail.attachments[0] && mail.attachments[0].length, 10);
            test.done();
        });
    },
    "Stream integrity - uuencode": function(test) {
        var encodedText = "Content-type: multipart/mixed; boundary=ABC\r\n" +
            "\r\n" +
            "--ABC\r\n" +
            "Content-Type: application/octet-stream\r\n" +
            "Content-Transfer-Encoding: uuencode\r\n" +
            "\r\n" +
            "begin 644 buffer.bin\r\n" +
            "#0V%T\r\n" +
            "`\r\n" +
            "end\r\n" +
            "--ABC--",
            expectedHash = "fa3ebd6742c360b2d9652b7f78d9bd7d",
            mail = new Buffer(encodedText, "utf-8");

        var mailparser = new MailParser({
            streamAttachments: true
        });

        for (var i = 0, len = mail.length; i < len; i++) {
            mailparser.write(new Buffer([mail[i]]));
        }

        test.expect(3);

        mailparser.on("attachment", function(attachment) {
            test.ok(attachment.stream, "Stream detected");
        });

        mailparser.end();

        mailparser.on("end", function(mail) {
            test.equal(mail.attachments && mail.attachments[0] && mail.attachments[0].checksum, expectedHash);
            test.equal(mail.attachments && mail.attachments[0] && mail.attachments[0].length, 3);
            test.done();
        });
    },
    "Attachment in root node": function(test) {
        var encodedText = "Content-Type: application/octet-stream\r\n" +
            "Content-Transfer-Encoding: 8bit\r\n" +
            "Content-Disposition: attachment\r\n" +
            "\r\n" +
            "ÕÄ\r\n" +
            "ÖÜ",
            expectedHash = "cad0f72629a7245dd3d2cbf41473e3ca",
            mail = new Buffer(encodedText, "utf-8");

        var mailparser = new MailParser({
            streamAttachments: true
        });

        for (var i = 0, len = mail.length; i < len; i++) {
            mailparser.write(new Buffer([mail[i]]));
        }

        test.expect(4);

        mailparser.on("attachment", function(attachment, node) {
            test.ok(attachment.stream, "Stream detected");
            test.ok(node);
        });

        mailparser.end();

        mailparser.on("end", function(mail) {
            test.equal(mail.attachments && mail.attachments[0] && mail.attachments[0].checksum, expectedHash);
            test.equal(mail.attachments && mail.attachments[0] && mail.attachments[0].length, 10);
            test.done();
        });
    },
    "Stream multiple attachments": function(test) {
        var encodedText = "Content-type: multipart/mixed; boundary=ABC\r\n" +
            "\r\n" +
            "--ABC\r\n" +
            "Content-Type: application/octet-stream\r\n" +
            "Content-Transfer-Encoding: base64\r\n" +
            "Content-Disposition: attachment\r\n" +
            "\r\n" +
            "AAECAwQFBg==\r\n" +
            "--ABC\r\n" +
            "Content-Type: application/octet-stream\r\n" +
            "Content-Transfer-Encoding: base64\r\n" +
            "Content-Disposition: attachment\r\n" +
            "\r\n" +
            "AAECAwQFBg==\r\n" +
            "--ABC\r\n" +
            "Content-Type: application/octet-stream\r\n" +
            "Content-Transfer-Encoding: base64\r\n" +
            "Content-Disposition: attachment; filename=\"test.txt\"\r\n" +
            "\r\n" +
            "AAECAwQFBg==\r\n" +
            "--ABC--",
            mail = new Buffer(encodedText, "utf-8");

        var mailparser = new MailParser({
            streamAttachments: true
        });

        test.expect(3); // should be 3 attachments
        mailparser.on("attachment", function(attachment) {
            test.ok(attachment.stream, "Stream detected");
        });

        mailparser.end(mail);

        mailparser.on("end", function() {
            test.done();
        });
    },

    "Pass mail node to headers event": function(test) {
        var encodedText = "Content-type: multipart/mixed; boundary=ABC\r\n" +
            "Subject: ABCDEF\r\n" +
            "\r\n" +
            "--ABC\r\n" +
            "Content-Type: application/octet-stream\r\n" +
            "Content-Transfer-Encoding: base64\r\n" +
            "Content-Disposition: attachment\r\n" +
            "\r\n" +
            "AAECAwQFBg==\r\n" +
            "--ABC--",
            mail = new Buffer(encodedText, "utf-8");

        var mailparser = new MailParser({
            streamAttachments: true
        });

        for (var i = 0, len = mail.length; i < len; i++) {
            mailparser.write(new Buffer([mail[i]]));
        }

        test.expect(2);

        mailparser.on("attachment", function(attachment, email) {
            test.equal(email.subject, "ABCDEF");
        });

        mailparser.end();

        mailparser.on("end", function() {
            test.ok(1, "Done");
            test.done();
        });
    },
    "Detect Content-Type by filename": function(test) {
        var encodedText = "Content-type: multipart/mixed; boundary=ABC\r\n" +
            "\r\n" +
            "--ABC\r\n" +
            "Content-Type: application/octet-stream\r\n" +
            "Content-Transfer-Encoding: base64\r\n" +
            "Content-Disposition: attachment; filename=\"test.pdf\"\r\n" +
            "\r\n" +
            "AAECAwQFBg==\r\n" +
            "--ABC--",
            mail = new Buffer(encodedText, "utf-8");

        var mailparser = new MailParser();

        mailparser.write(mail);
        mailparser.end();

        mailparser.on("end", function(mail) {
            test.equal(mail.attachments && mail.attachments[0] && mail.attachments[0].contentType, "application/pdf");
            test.done();
        });
    },

    "Inline attachments": function(test) {
        var encodedText = "Content-type: multipart/mixed; boundary=ABC\r\n" +
            "X-Test: =?UTF-8?Q?=C3=95=C3=84?= =?UTF-8?Q?=C3=96=C3=9C?=\r\n" +
            "Subject: ABCDEF\r\n" +
            "\r\n" +
            "--ABC\r\n" +
            "Content-Type: text/html\r\n" +
            "\r\n" +
            "<p>test 1</p>\r\n" +
            "--ABC\r\n" +
            "Content-Type: application/octet-stream\r\n" +
            "Content-Transfer-Encoding: base64\r\n" +
            "Content-Disposition: attachment; filename=\"test.pdf\"\r\n" +
            "\r\n" +
            "AAECAwQFBg==\r\n" +
            "--ABC\r\n" +
            "Content-Type: text/html\r\n" +
            "\r\n" +
            "<p>test 2</p>\r\n" +
            "--ABC--",
            mail = new Buffer(encodedText, "utf-8");

        test.expect(1);
        var mailparser = new MailParser({
            showAttachmentLinks: true
        });

        mailparser.end(mail);
        mailparser.on("end", function(mail) {
            test.equal(mail.html, '<p>test 1</p><br/>\n\n<div class="mailparser-attachment"><a href="cid:754dc77d28e62763c4916970d595a10f@mailparser">&lt;test.pdf&gt;</a></div><br/>\n<p>test 2</p>');
            test.done();
        });
    }
};

exports["Advanced nested HTML"] = function(test) {
    var mail = fs.readFileSync(__dirname + "/nested.eml");

    test.expect(2);
    var mailparser = new MailParser();

    for (var i = 0, len = mail.length; i < len; i++) {
        mailparser.write(new Buffer([mail[i]]));
    }

    mailparser.end();
    mailparser.on("end", function(mail) {
        test.equal(mail.text, "\nDear Sir,\n\nGood evening.\n\n\n \n\n\n\nThe footer\n");
        test.equal(mail.html, "<p>Dear Sir</p>\n<p>Good evening.</p>\n<p></p><p>The footer</p>\n");
        test.done();
    });
};

exports["MBOX format"] = {
    "Not a mbox": function(test) {
        var encodedText = "Content-Type: text/plain; charset=utf-8\r\n" +
            "\r\n" +
            "ÕÄ\r\n" +
            "ÖÜ", // \r\nÕÄÖÜ
            mail = new Buffer(encodedText, "utf-8");

        test.expect(1);
        var mailparser = new MailParser();

        for (var i = 0, len = mail.length; i < len; i++) {
            mailparser.write(new Buffer([mail[i]]));
        }

        mailparser.end();
        mailparser.on("end", function() {
            test.equal(mailparser._isMbox, false);
            test.done();
        });
    },

    "Is a mbox": function(test) {
        var encodedText = "From MAILER-DAEMON Fri Jul  8 12:08:34 2011\r\n" +
            "Content-Type: text/plain; charset=utf-8\r\n" +
            "\r\n" +
            "ÕÄ\r\n" +
            "ÖÜ", // \r\nÕÄÖÜ
            mail = new Buffer(encodedText, "utf-8");

        test.expect(1);
        var mailparser = new MailParser();

        for (var i = 0, len = mail.length; i < len; i++) {
            mailparser.write(new Buffer([mail[i]]));
        }

        mailparser.end();
        mailparser.on("end", function() {
            test.equal(mailparser._isMbox, true);
            test.done();
        });
    },

    "Don't unescape '>From '": function(test) {
        var encodedText = "Content-Type: text/plain; charset=utf-8\r\n" +
            "\r\n" +
            ">From test\r\n" +
            ">>From pest", // \r\nÕÄÖÜ
            mail = new Buffer(encodedText, "utf-8");

        test.expect(1);
        var mailparser = new MailParser();

        for (var i = 0, len = mail.length; i < len; i++) {
            mailparser.write(new Buffer([mail[i]]));
        }

        mailparser.end();
        mailparser.on("end", function(mail) {
            test.equal(mail.text, ">From test\n>>From pest");
            test.done();
        });
    },

    "Unescape '>From '": function(test) {
        var encodedText = "From MAILER-DAEMON Fri Jul  8 12:08:34 2011\r\n" +
            "Content-Type: text/plain; charset=utf-8\r\n" +
            "\r\n" +
            ">From test\r\n" +
            ">>From pest", // \r\nÕÄÖÜ
            mail = new Buffer(encodedText, "utf-8");

        test.expect(1);
        var mailparser = new MailParser();

        for (var i = 0, len = mail.length; i < len; i++) {
            mailparser.write(new Buffer([mail[i]]));
        }

        mailparser.end();
        mailparser.on("end", function(mail) {
            test.equal(mail.text, "From test\n>From pest");
            test.done();
        });
    }
};