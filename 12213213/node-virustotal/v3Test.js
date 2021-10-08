"use strict";
const v3 = require('./v3.js');
const vt = v3.makeAPI();
const fileContents = require('fs').readFileSync('./obvious_virus.svg');
const hashed = v3.sha256('http://wikionemore.com/');
vt/*.ipLookup('8.8.8.8', function(err, res){
	console.log(err);
	console.log(JSON.stringify(res));
}).ipCommentLookup('8.8.8.8', function(err, res){
	console.log(err);
	console.log(JSON.stringify(res));
}).ipCommentLookup('8.8.8.8', function(err, res){
	console.log(err);
	console.log(JSON.stringify(res));
}).*/.uploadFile(fileContents, /*'temp.txt', 'application/octet-stream',*/ function(err, res){
	console.log(err);
	console.log(JSON.stringify(res));
})/*.urlLookup(hashed, function(err, res){
  if (err) {
    console.log('Well, crap.');
    console.log(err);
    return;
  }
  console.log(JSON.stringify(res));
  return;
})*/;