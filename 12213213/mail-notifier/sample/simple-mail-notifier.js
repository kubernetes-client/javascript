var notifier = require('../index.js');

var imap = {
  user: "jerome.creignou",
  password: "password",
  host: "imap.host.com",
  port: 993, // imap port
  tls: true,// use secure connection
  tlsOptions: { rejectUnauthorized: false }
};

notifier(imap).on('mail',function(mail){console.log(mail);}).start();
