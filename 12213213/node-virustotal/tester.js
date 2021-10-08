"use strict";
const vt = require("./code.js");
const fs = require("fs");
const con = vt.MakePublicConnection();
con.setKey("e2513a75f92a4169e8a47b4ab1df757f83ae45008b4a8a49903450c8402add4d");
console.log(con.getKey());
con.setDelay(15000);
console.log(con.getDelay());
con.checkIPv4("90.156.201.27",function(data){
  console.dir(data);
}, function(err){
  console.error(err);
});
con.getDomainReport("wikionemore.com",function(data){
  console.dir(data);
}, function(err){
  console.error(err);
});/*
con.submitUrlForScanning("http://wikionemore.com",function(data){
  console.dir(data);
}, function(err){
  console.error(err);
});*/
con.retrieveUrlAnalysis("http://wikionemore.com",function(data){
  console.dir(data);
}, function(err){
  console.error(err);
});/*
con.publishUrlComment("http://wikionemore.com", "Ignore this comment. I'm just testing an API.", function(data){
  console.dir(data);
}, function(err){
  console.error(err);
});
con.submitFileForAnalysis("obvious_virus.svg", "text/svg", fs.readFileSync("./obvious_virus.svg"), function(data){
  console.log(data);
}, function(mistake){
  console.log(mistake);
});
con.rescanFile("de053e0e115fc94a81eb3dc074b02c68efaa60ff4251f386e299d8814ff657a6", function(data){
  console.log(data);
}, function(mistake){
  console.log(mistake);
});
con.getFileReport("52d3df0ed60c46f336c131bf2ca454f73bafdc4b04dfa2aea80746f5ba9e6d1c-1273894724", function(data){
  console.log(data);
}, function(mistake){
  console.log(mistake);
});
con.publishFileComment("de053e0e115fc94a81eb3dc074b02c68efaa60ff4251f386e299d8814ff657a6", "Ignore this comment. I'm just testing an API.", function(data){
  console.dir(data);
}, function(err){
  console.error(err);
});*/
con.UrlEvaluation("http://wikionemore.com",function(data){
  console.dir(data);
}, function(err){
  console.error(err);
});/*
con.FileEvaluation("obvious_virus.svg", "text/svg", fs.readFileSync("./obvious_virus.svg"), function(data){
  console.log(data);
}, function(mistake){
  console.log(mistake);
});*/
/*
var con = vt.makePrivateConnection();
con.setKey("e2513a75f92a4169e8a47b4ab1df757f83ae45008b4a8a49903450c8402add4d");
con.getIP4Report("90.156.201.27",function(data){
  console.dir(data);
}, function(err){
  console.error(err);
});*/

/*Sidenote: That's a real phishing site. It was shut down, but I still advise against going to it.*/
