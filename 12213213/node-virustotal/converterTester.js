"use strict";
const vt = require("./code.js");
const fs = require("fs");
const con = vt.MakePublicConnection();
con.setKey("e2513a75f92a4169e8a47b4ab1df757f83ae45008b4a8a49903450c8402add4d");
const converted = vt.formatConverter(con.checkIPv4);
converted("1.1.1.1", function(err, data) {
  if(err!= null) {
    console.log("err:");
    console.dir(err);
    return;
  }
  console.log("data");
  console.dir(data);
  return;
});
