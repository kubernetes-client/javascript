const fs = require("fs");
const shelljs = require("shelljs");
const readline = require("readline");
const request = require("request");
const publicAPI = require("./code.js");
const rl = readline.createInterface(process.stdin, /*process.stdout*/ null);
const sendPrompt = function(){
  rl.resume();
  process.stdout.write(">");
  return;
};
var mode = "public";
var defaultKeystore = {
  public: ["e2513a75f92a4169e8a47b4ab1df757f83ae45008b4a8a49903450c8402add4d"],
  honey: [],
  intel: [],
  private: []
};
var mode = "public";
var workingKeystore = defaultKeystore;
var workingConnection = publicAPI.MakePublicConnection();
workingConnection.setKey(workingKeystore.public[0]);
rl.on("line", function(input){
  rl.pause();
  var segments = input.split(" ");
  var initial = segments[0];
  switch(initial) {
    case "pwd":
      console.log(process.cwd());
      sendPrompt();
      return;
    case "exit":
      process.exit(0);
      return;
    case "cd":
      if ((segments.length > 1)&&(segments[1] != "~")) {
        process.chdir(segments[1]);
      }
      sendPrompt();
      return;
    case "printKeyring":
      console.dir(workingKeystore);
      sendPrompt();
      return;
    case "saveKeyring":
      if (segments.length > 2) {
        shelljs.touch(segments[1]);
        fs.writeFileSync("./" + segments[1], JSON.stringify(workingKeystore));
      }
      sendPrompt();
      return;
    case "loadKeyring":
      if (segments.length > 1) {
        try {
          const raw = fs.readFileSync(segments[1]);
          const parsed = JSON.parse(raw);
          workingKeystore = parsed;
        } catch (e) {
          console.log(e);
        }
      }
      sendPrompt();
      return;
    case "printMode":
      console.log(mode);
      sendPrompt();
      return;
    case "addKey":
      if (segments.length > 2){
        addKeySwitch:
        switch(segments[1]) {
          case "public":
            workingKeystore.public[workingKeystore.public.length] = segments[2];
            break addKeySwitch;
          case "private":
            workingKeystore.private[workingKeystore.private.length] = segments[2];
            break addKeySwitch;
          case "intel":
            workingKeystore.intel[workingKeystore.intel.length] = segments[2];
            break addKeySwitch;
          case "honey":
            workingKeystore.honey[workingKeystore.honey.length] = segments[2];
            break addKeySwitch;
          default:
            break addKeySwitch;
        }
      }
      sendPrompt();
      return;
    case "deleteKey":
      if (segments.length > 2){
        deleteKeySwitch:
        switch(segments[1]) {
          case "public":
            workingKeystore.public = workingKeystore.public.splice(parseInt(segments[2]), 1);
            break deleteKeySwitch;
          case "private":
            workingKeystore.private = workingKeystore.private.splice(parseInt(segments[2]), 1);
            break deleteKeySwitch;
          case "intel":
            workingKeystore.intel = workingKeystore.intel.splice(parseInt(segments[2]), 1);
            break deleteKeySwitch;
          case "honey":
          workingKeystore.honey = workingKeystore.honey.splice(parseInt(segments[2]), 1);
            break deleteKeySwitch;
          default:
            break deleteKeySwitch;
        }
      }
      sendPrompt();
      return;
    case "setKey":
      if (segments.length > 2) {
        setKeySwitch:
        switch(segments[1]) {
          case "":
            sendPrompt();
            return;
          case "public":
            mode = segments[1];
            workingConnection = publicAPI.MakePublicConnection();
            workingConnection.setKey(workingKeystore.public[parseInt(segments[2])]);
            break setKeySwitch;
          case "private":
            mode = segments[1];
            workingConnection = publicAPI.makePrivateConnection();
            workingConnection.setKey(workingKeystore.private[parseInt(segments[2])]);
            break setKeySwitch;
          case "intel":
            mode = segments[1];
            workingConnection = publicAPI.makeIapiConnection();
            workingConnection.setKey(workingKeystore.intel[parseInt(segments[2])]);
            break setKeySwitch;
          case "honey":
            mode = segments[1];
            workingConnection = publicAPI.MakeHoneypot2Connection();
            workingConnection.setKey(workingKeystore.honey[parseInt(segments[2])]);
            break setKeySwitch;
          default:
            break setKeySwitch;
        }
      }
      sendPrompt();
      return;
    case "getDelay":
      if ((mode=="public") || (mode=="honey")) {
        console.log(workingConnection.getDelay());
      } else {
        console.log(0);
      }
      sendPrompt();
      return;
    case "setDelay":
      if (segments.length > 1) {
        if ((mode=="public") || (mode=="honey")) {
          workingConnection.setDelay(parseInt(segments[1]));
        }
      }
      sendPrompt();
      return;
    case "help":
      console.log("CLI documentation can be found in \"insert directory of node-virustotal here\"/README.md .");
      sendPrompt();
      return;
    case "IPv4Report":
      if ("mode" != "intel") {
        if (segments.length > 1) {
          workingConnection.checkIPv4(segments[1], function(response){
            console.dir(response);
            sendPrompt();
            return;
          }, function(err){
            console.log(err);
            sendPrompt();
            return;
          });
          return;
        }
        sendPrompt();
        return;
      }
      console.log("error: feature not usable in Intel API");
      sendPrompt();
      return;
    case "DomainReport":
      if ("mode" != "intel") {
        if (segments.length > 1) {
          workingConnection.getDomainReport(segments[1], function(response){
            console.dir(response);
            sendPrompt();
            return;
          }, function(err){
            console.log(err);
            sendPrompt();
            return;
          });
          return;
        }
        sendPrompt();
        return;
      }
      console.log("error: feature not usable in Intel API");
      sendPrompt();
      return;
    case "submitURL":
      if (segments.length > 1) {
        workingConnection.submitUrlForScanning(segments[1], function(result){
          console.dir(result);
          sendPrompt();
          return;
        }, function(err){
          console.log(err);
          sendPrompt();
          return;
        });
        return;
      }
      sendPrompt();
      return;
    case "getUrlReport":
      if (segments.length > 1) {
        workingConnection.retrieveUrlAnalysis(segments[1], function(result){
          console.dir(result);
          sendPrompt();
          return;
        }, function(err){
          console.log(err);
          sendPrompt();
          return;
        });
        return;
      }
      sendPrompt();
      return;
    case "publishUrlComment":
      if (segments.length > 2) {
        workingConnection.publishUrlComment(segments[1], segments.slice(2, segments.length).join(" "), function(result){
          console.dir(result);
          sendPrompt();
          return;
        }, function(err){
          console.log(err);
          sendPrompt();
          return;
        });
        return;
      }
      sendPrompt();
      return;
    case "publishFileComment":
      if (segments.length > 2) {
        workingConnection.publishFileComment(segments[1], segments.slice(2, segments.length).join(" "), function(result){
          console.dir(result);
          sendPrompt();
          return;
        }, function(err){
          console.log(err);
          sendPrompt();
          return;
        });
        return;
      }
      sendPrompt();
      return;
    case "sendFile":
      if (segments.length > 2) {
        workingConnection.publishFileComment(segments[1], segments[2], fs.readFileSync(segments[3]), function(result){
          console.dir(result);
          sendPrompt();
          return;
        }, function(err){
          console.log(err);
          sendPrompt();
          return;
        });
        return;
      }
      sendPrompt();
      return;
    case "rescanFile":
      if (mode=="intel" || (mode=="private")) {
        sendPrompt();
        return;
      }
      if (segments.length > 1) {
        workingConnection.rescanFile(segments[1], function(result){
          console.dir(result);
          sendPrompt();
          return;
        }, function(err){
          console.log(err);
          sendPrompt();
          return;
        });
        return;
      }
      sendPrompt();
      return;
    case "getFileReport":
      if (segments.length > 1) {
        workingConnection.getFileReport(segments[1], function(response){
          console.dir(response);
          sendPrompt();
          return;
        }, function(err){
          console.log(err);
          sendPrompt();
          return;
        });
      }
      sendPrompt();
      return;
    case "getUrlComments":
      if (mode != "private") {
        console.log("Feature only usable in private mode.");
        sendPrompt();
        return;
      }
      if (segments.length > 1) {
        workingConnection.getUrlComments(segments[1], function(data){
          console.dir(data);
          sendPrompt();
          return;
        }, function(err){
          console.log(err);
          sendPrompt();
          return;
        });
      }
      sendPrompt();
      return;
    case "getFileComments":
      if (mode != "private") {
        console.log("Feature only usable in private mode.");
        sendPrompt();
        return;
      }
      if (segments.length > 1) {
        workingConnection.getFileComments(segments[1], function(data){
          console.dir(data);
          sendPrompt();
          return;
        }, function(err){
          console.log(err);
          sendPrompt();
          return;
        });
      }
      sendPrompt();
      return;
    case "getFile":
      if (mode != "private") {
        console.log("Feature only usable in private mode.");
        sendPrompt();
        return;
      }
      if (segments.length > 2) {
        workingConnection.getFile(segments[1], function(data){
          console.log("Warning: downloading known or suspected malware to " + segments[2] + " .");
          fs.writeFileSync(segments[2], data);
          sendPrompt()
          return;
        }, function(err){
          console.log(err);
          sendPrompt();
          return;
        });
      }
      sendPrompt();
      return;
    case "fileRescan":
      if (mode != "private") {
        console.log("Only usable in private mode.");
        sendPrompt();
        return;
      }
      if (segments.length < 2) {
        console.log("Need resource specified.");
        sendPrompt();
        return;
      }
      const rescanURL = ("https://www.virustotal.com/vtapi/v2/file/rescan?apikey=" + workingConnection.getKey()) + ("&resource=" + segments[1]);
      request({url: rescanURL, method: "POST", gzip: true, headers: { "User-Agent": "gzip"}}, function(error, response, body){
        if (error) {
          console.log(error);
          sendPrompt();
          return;
        }
        console.log(body);
        sendPrompt();
        return;
      });
      return;
    case "cancelRescan":
      if (mode != "private") {
        console.log("Only usable in private mode.");
        sendPrompt();
        return;
      }
      if (segments.length < 2) {
        console.log("Need resource specified.");
        sendPrompt();
        return;
      }
      const cancelURL = ("https://www.virustotal.com/vtapi/v2/file/rescan/delete?apikey=" + workingConnection.getKey()) + ("&resource=" + segments[1]);
      request({url: cancelURL, method: "POST", gzip: true, headers: { "User-Agent": "gzip"}}, function(error, response, body){
        if (error) {
          console.log(error);
          sendPrompt();
          return;
        }
        console.log(body);
        sendPrompt();
        return;
      });
      return;
    case "getFileBehavior":
      if (mode != "private") {
        console.log("Only usable in private mode.");
        sendPrompt();
        return;
      }
      if (segments.length < 2) {
        console.log("Need resource specified.");
        sendPrompt();
        return;
      }
      workingConnection.getFileBehavior(segments[1], function(response){
        console.dir(response);
        sendPrompt();
        return;
      }, function(err){
        console.log(err);
        sendPrompt();
        return;
      });
      return;
    case "getFileNetworkActivity":
      if (mode != "private") {
        console.log("Only usable in private mode.");
        sendPrompt();
        return;
      }
      if (segments.length < 2) {
        console.log("Need resource specified.");
        sendPrompt();
        return;
      }
      workingConnection.getFileNetworkActivity(segments[1], function(response){
        console.dir(response);
        sendPrompt();
        return;
      }, function(err){
        console.log(err);
        sendPrompt();
        return;
      });
      return;
    case "getClusters":
      if (mode != "private") {
        console.log("Only usable in private mode.");
        sendPrompt();
        return;
      }
      if (segments.length < 4) {
        console.log("Need year, month, and date specified.");
        sendPrompt();
        return;
      }
      workingConnection.getClusters(segments[1], segments[2], segments[3], function(response){
        console.dir(response);
        sendPrompt();
        return;
      }, function(err){
        console.log(err);
        sendPrompt();
        return;
      });
      return;
    case "getFileFeed":
    case "getUrlFeed":
      if (segments.length < 6) {
        console.log("Need resource specified.");
        sendPrompt();
        return;
      }
      var jobName = {};
      if (initial=="getFileFeed") {
        jobName = workingConnection.getFileFeed;
      } else {
        jobName = workingConnection.getUrlFeed;
      }
      jobName(segments[1],segments[2],segments[3],segments[4],segments[5],function(resp){
        console.dir(resp);
        sendPrompt();
        return;
      }, function(err){
        console.log(err);
        sendPrompt();
        return;
      });
      return;
    case "getNextFalsePositive":
      if (mode != "private") {
        console.log("Mode Error");
        sendPrompt();
        return;
      }
      workingConnection.getNextFalsePositive(function(resp){
        console.dir(resp);
        sendPrompt();
        return;
      }, function(err){
        console.log(err);
        sendPrompt();
        return;
      });
      return;
    case "deleteNotification":
      if (mode != "private") {
        console.log("Mode Error");
        sendPrompt();
        return;
      }
      if (segments.length < 2) {
        console.log("Need Notification ID.");
        sendPrompt();
        return;
      }
      workingConnection.deleteNotifications(segments[1], function(resp){
        console.dir(resp);
        sendPrompt();
        return;
      }, function(err){
        console.log(err);
        sendPrompt();
        return;
      });
      return;
    case "search":
      if (mode != "private") {
        console.log("Mode Error");
        sendPrompt();
        return;
      }
      if (segments.length < 2) {
        console.log("Need Query.");
        sendPrompt();
        return;
      }
      var actualQuery = segments.splice(0, 1).join(" ");
      workingConnection.search2(actualQuery, function(resp){
        console.dir(resp);
        sendPrompt();
        return;
      }, function(err){
        console.log(err);
        sendPrompt();
        return;
      });
      return;
    case "exportRuleset":
      if (mode != "private") {
        console.log("Mode Error");
        sendPrompt();
        return;
      }
      if (segments.length < 2) {
        console.log("Need RulesetID.");
        sendPrompt();
        return;
      }
      workingConnection.exportRuleset(segments[1], function(resp){
        console.dir(resp);
        sendPrompt();
        return;
      }, function(err){
        console.log(err);
        sendPrompt();
        return;
      });
      return;
    default:
      console.log("feature not yet implemented");
      sendPrompt();
      return;
  }
});
sendPrompt();
