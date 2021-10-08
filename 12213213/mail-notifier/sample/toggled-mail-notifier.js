var notifier = require('../index.js');

var started = true;

function toggleState(){
  if(started){
    n.stop();
  }else{
    n.start();
  }
  started = !started;
  setTimeout(toggleState,3000);
}

var imap = {
  user: "jerome.creignou",
  password: "password",
  host: "imap.host.com",
  port: 993, // imap port
  tls: true,// use secure connection
  tlsOptions: { rejectUnauthorized: false }
};

var n  = notifier(imap).on('mail', function(mail){
  console.log(mail);
});

n.on('end',function(){
  console.log('...notification ended...');
});

n.on('error',function(err){
  console.log('...notification error : %s', err);
});

n.start();

setTimeout(toggleState,3000);

