const request = require("request");
const compressjs = require("compressjs");
const stream = require("stream");
const tar = require("tar");
const commentSender = require("./commentSender.js");
var features = {};
const leftPad = function(raw, length, padPhrase) {
  var workingString = "" + raw;
  while (workingString.length < length) {
    workingString = padPhrase + workingString;
  }
  return workingString;
};
const dateToString = function(input){
  return ((((input.getFullYear() + "-") + (leftPad(input.getMonth() + 1, 2, "0") + "-" )) + ((leftPad(input.getDate(), 2, "0") + "T" ) + (leftPad(input.getHours(), 2, "0") + ":" ))) + ((leftPad(input.getMinutes(), 2, "0") + ":") + leftPad(input.getSeconds(), 2, "0")));
};
var rescan = function(resource, key){
  var dateString = null;
  var period = null;
  var repeatCount = null;
  var changesOnly = 0;
  var notifyURL = null;
  this.setDate = function(year, month, day, hour, minute, second){
    year = leftPad("" + year, 4, "20");
    month = leftPad("" + month, 2, "0");
    day = leftPad("" + day, 2, "0");
    hour = leftPad("" + hour, 2, "0");
    minute = leftPad("" + minute, 2, "0");
    second = leftPad("" + second, 2, "0");
    dateString = (year + month) + (day + hour) + (minute + second);
    return this;
  };
  this.setPeriod = function(input){
    period = input;
    return this;
  };
  this.setRepeatCount = function(input) {
    repeatCount = input;
    return this;
  };
  this.setNotifyURL = function(replacement){
    notifyURL = replacement;
    return this;
  };
  this.setNotifyChangesOnly = function(input) {
    switch(input) {
      case null:
        changesOnly = 0;
        return this;
      case 1:
      case true:
        changesOnly = 1;
        return this;
      case 0:
      case false:
      default:
        changesOnly = 0;
        return this;
    }
    return this;
  };
  this.sendRequest = function(responseProc, errProc){
    var formattedRequest = ("https://www.virustotal.com/vtapi/v2/file/rescan?apikey=" + key) + ("&resource=" + resource);
    if (dateString != null) {
      formattedRequest = formattedRequest + ("&date=" + dateString);
    }
    if (period != null) {
      formattedRequest = formattedRequest + ("&period=" + period);
    }
    if (repeatCount != null) {
      formattedRequest = formattedRequest + ("&repeat=" + repeatCount);
    }
    if (notifyURL != null) {
      formattedRequest = formattedRequest + (("&notify_url=" + notifyURL) + ("&notify_changes_only" + changesOnly));
    }
    request({url: formattedRequest, method: "POST", gzip: true, headers: { "User-Agent": "gzip"}}, function(error, response, body){
      if (error) {
        errProc(error);
        return;
      }
      if (response.statusCode > 399) {
        errProc(body);
        return;
      }
      try {
        var data = JSON.parse(body);
        switch (data.response_code) {
          case 1:
            responseProc(data);
            return;
          case 0:
          case -1:
          case -2:
          default:
            errProc(data);
            return;
        }
      } catch (e) {
        errProc(e);
        return;
      }
    });
    return this;
  };
  this.cancel = function(responseProc, errProc) {
    var cancelUrl = ("https://www.virustotal.com/vtapi/v2/file/rescan/delete?apikey=" + key) + ("&resource=" + resource);
    request({url: cancelUrl, method: "POST", gzip: true, headers: { "User-Agent": "gzip"}}, function(error, response, body){
      if (error) {
        errProc(error);
        return;
      }
      if (response.statusCode > 399) {
        errProc(body);
        return;
      }
      try {
        data = JSON.parse(body);
        switch (data.response_code) {
          case 1:
            responseProc(data);
            return;
          case 0:
          case -1:
          case -2:
          default:
            errProc(data);
            return;
        }
      } catch (e) {
        errProc(e);
        return;
      }
    });
    return this;
  };
  return;
};
var privateAPI = function(){
  var key = "";
  this.setKey = function(replacement){
    key = replacement;
    return this;
  };
  this.getKey = function(){
    return key;
  }
  var getComments = function(resource, responseProc, errProc) {
    var queryURL = "https://www.virustotal.com/vtapi/v2/comments/get?resource=" + resource + "&apikey=" + key;
    request(queryURL, function(error, response, body){
      if (error) {
        errProc(error);
        return;
      }
      if (response.statusCode > 399) {
        errProc(body);
        return;
      }
      try {
        var data = JSON.parse(body);
        switch (data.response_code) {
          case 1:
          case 0:
            responseProc(data);
            return;
          case -1:
          case -2:
          default:
            errProc(data);
            return;
        }
      } catch (e) {
        errProc(e);
        return;
      }
    });
  };
	var publishUrlComment = function(resource, comment, resultProc, errProc){
		if (errProc==null) {
			errProc = function(e) {
				publishUrlComment(resource, comment, resultProc, null);
				return;
			}
		}
		var workingSender = new commentSender(resource, comment, key, resultProc, errProc);
		workingSender.attempt();
		return;
	};
  var getReport = function(queryURL, responseProc, errProc) {
    request(queryURL, function(error, response, body){
      if (error) {
        errProc(error);
        return;
      }
      if (response.statusCode > 399) {
        errProc(body);
        return;
      }
      try {
        var data = JSON.parse(body);
        switch (data.response_code) {
          case 1:
          case 0:
            responseProc(data);
            return;
          case -1:
          case -2:
          default:
            errProc(data);
            return;
        }
      } catch (e) {
        errProc(e);
        return;
      }
    });
    return;
  };

  var upperLimit = 32*1024*1024;
  var sendFileToURL = function(filename, filetype, content, URL, callback){
    var sendOptions = {
      url: URL,
      formData: {file: { value: filecontent, options: { filename: filename, filetype: filetype}}}
		};
    request.post(sendOptions, callback);
  };
  var sendFilePreLogic = function(filename, filetype, content, resultProc, errProc){
    var callbackProc = function(error, response, body){
      if (error) {
        errProc(error);
        return;
      }
      if (response.statusCode > 399) {
        errProc(body);
        return;
      }
      try {
        var data = JSON.parse(body);
        switch (data.response_code) {
          case 1:
            resultProc(data);
            return;
          case 0:
          case -1:
          case -2:
          default:
            errProc(data);
            return;
        }
      } catch (e) {
        errProc(e);
        return;
      }
    };
    if (content.length < upperLimit ) {
      sendFileToURL(filename, filetype, content, "https://www.virustotal.com/vtapi/v2/file/scan?apikey=" + key, callbackProc);
      return;
    }
    request.get("https://www.virustotal.com/vtapi/v2/file/scan/upload_url?apikey=" + key, function(error, response, body){
      if (error) {
        errProc(error);
        return;
      }
      if (response.statusCode > 399) {
        errProc(body);
        return;
      }
      try {
        var data = JSON.parse(body);
        sendFileToURL(filename, filetype, content, data.upload_url, callbackProc);
        return;
      } catch (e) {
        errProc(e);
        return;
      }
    });
    return;
  };
  var submitUrlForScanning = function(URL, resultProc, errProc){
    var fullURL = "https://www.virustotal.com/vtapi/v2/url/scan?url=" + encodeURIComponent(URL) + "&apikey=" + key;
    request({url: URL, method:"POST"}, function(error, response, body){
      if (error) {
        errProc(error);
        return;
      }
      if (response.statusCode > 399) {
        errProc(body);
        return;
      }
      try{
        var data = JSON.parse(body);
        switch(data.response_code) {
          case 1:
            resultProc(data);
            return;
          case 0:
          case -1:
          case -2:
          default:
            errProc(data);
            return;
        }
      } catch (e) {
        errProc(e);
        return;
      }
    });
  };
  var retrieveUrlAnalysis = function(URL, responseProc, errProc, rescan, extendedData, continueProc) {
    var query = "https://www.virustotal.com/vtapi/v2/url/report?apikey=" + key + "&url=" + encodeURIComponent(URL);
    if (rescan==true) {
      query = query + "&rescan=1";
    }
    if (extendedData==true) {
      query = query + "&allinfo=1";
    }
    request.get(query, function(error, response, body){
      if (error) {
        errProc(error);
        return;
      }
      if (response.statusCode > 399) {
        errProc(body);
        return;
      }
      try {
        var data = JSON.parse(body);
        switch (data.response_code) {
          case -2:
            if (continueProc==null) {
              var next = function(){
                retrieveUrlAnalysis(URL, responseProc, errProc, false, extendedData, null);
              };
              setTimeout(next, 300000);
              return;
            }
            continueProc(data);
            return;
          case 1:
          case 0:
            responseProc(data);
            return;
          case -1:
          default:
            errProc(data);
            return;
        }
      } catch (e) {
        errProc(e);
        return;
      }
    });
    return;
  };
  var getFileReport = function(scanID, responseProc, errProc, extendedData, continueProc){
    var fileResourceURL = "https://www.virustotal.com/vtapi/v2/file/report?apikey=" + key + "&resource=" + scanID;
    if (extendedData==true) {
      fileResourceURL = fileResourceURL + "&allinfo=1";
    }
    request(fileResourceURL, function(error, response, body){
      if (error) {
        errProc(error);
        return;
      }
      if (response.statusCode > 399) {
        errProc(body);
        return;
      }
      try {
        var data = JSON.parse(body);
        switch (data.response_code) {
          case -2:
            if (continueProc==null) {
              var next = function(){
                getFileReport(scanID, responseProc, errProc, extendedData, null);
              };
              setTimeout(next, 300000);
              return;
            }
            continueProc(data);
            return;
          case 1:
          case 0:
            responseProc(data);
            return;
          case -1:
          default:
            errProc(data);
            return;
        }
      } catch (e) {
        errProc(e);
        return;
      }
    });
  };
  var getFile = function(hashCode, responseProc, errProc){
    var requestURL = "https://www.virustotal.com/vtapi/v2/file/download?apikey=" + key + "&hash=" + hashCode;
    var getFileProc = function(){
      request(requestURL, function(error, response, body){
        if (error) {
          errProc(error);
          return;
        }
        if (response.statusCode == 404) {
          errProc(response);
          return;
        }
        if (response.statusCode > 399) {
          getFileProc();
          return;
        }
        responseProc(body);
        return;
      });
    };
    return;
  };
  var makeRescan = function(resource) {
    return new rescan(resource, key);
  };
  var getFileBehavior = function(resource, responseProc, errProc) {
    request("https://www.virustotal.com/vtapi/v2/file/behaviour?apikey=" + key + "&hash=" + resource, function(error, response, body){
      if (error) {
        errProc(error);
        return;
      }
      if (response.statusCode > 399) {
        errProc(body);
        return;
      }
      try {
        var data = JSON.parse(body);
        if (data.response_code) {
          errProc(data);
          return;
        }
        responseProc(data);
        return;
      } catch (e) {
        errProc(e);
        return;
      }
    });
    return;
  };
  var getFileNetworkActivity = function(resource, responseProc, errProc) {
    request("https://www.virustotal.com/vtapi/v2/file/network-traffic?apikey=" + key + "&hash=" + resource, function(error, response, body){
      if (error) {
        errProc(error);
        return;
      }
      if (response.statusCode > 399) {
        errProc(body);
        return;
      }
      try {
        var data = JSON.parse(body);
        if (data.response_code) {
          errProc(data);
          return;
        }
        responseProc(data);
        return;
      } catch (e) {
        errProc(e);
        return;
      }
    });
    return;
  };
  var getClusters = function(year, month, date, resultProc, errProc){
    var queryString = "https://www.virustotal.com/vtapi/v2/file/clusters?apikey=" + key + "&date=" + leftPad(year+"", 4, "20") + "-" + leftPad(month+"",2,"0") + "-" + leftPad(date+"",2,"0");
    request(queryString, function(error, response, body){
      if (error) {
        errProc(error);
        return;
      }
      if (response.statusCode > 399) {
        errProc(body);
        return;
      }
      try {
        var data = JSON.parse(body);
        switch(data.response_code) {
          case 1:
          case 0:
            resultProc(data);
            return;
          case -1:
          case -2:
          default:
            errProc(data);
            return;
        }
      } catch (e) {
        errProc(e);
        return;
      }
    });
    return;
  };
  var makeFeedFunction = function(location) {
    return function(year, month, day, hour, minute, resultProc, errProc){
      var queryString = location + key + "&package=" + leftPad(year, 4, "20") + leftPad(month, 2, "0") + leftPad(day, 2, "0") + "T" + leftPad(hour, 2, "0") + leftPad(minute, 2, "0");
      request(queryString, function(error, response, body){
        if (error) {
          errProc(error);
          return;
        }
        if (response.statusCode > 399) {
          errProc(body);
          return;
        }
        var bufferString = "";
        var tarBall = compressjs.bzip2.decompressFile(new Buffer(body, "utf8"));
        var streamFromString = stream.PassThrough();
        streamFromString.write(tarBall);
        streamFromString.end();
        streamFromString.pipe(tar.Parse()).on("entry", function(entry) {
          bufferString = bufferString + entry;
          return;
        }).on("error", function(e){
          errProc(e);
          return;
        }).on("end", function(){
          var strings = String.split(bufferString, "\n");
          var result = [];
          try {
            for (var index = 0; index < strings.length; index++) {
              result[index] = JSON.parse(strings[index]);
            }
            resultProc(result);
            return;
          } catch (e) {
            errProc(e);
            return;
          }
        });
      });
      return;
    };
  };
  var getNextFalsePositive = function(resultProc, errProc){
    request({
	    url: "https://www.virustotal.com/vtapi/v2/file/false-positives?limit=1&apikey=" + key,
      gzip: true,
	    headers: {
		    "User-Agent": "gzip"
	    }
    }, function(err, response, body){
      if (err) {
        errProc(err);
        return;
      }
      if (response.statusCode > 399) {
        errProc(body);
        return;
      }
      try {
        var data = JSON.parse(body);
        if (data.length > 0) {
          resultProc(data[0]);
          return;
        }
        resultProc({});
        return;
      } catch (e) {
        errProc(e);
        return;
      }
    });
    return;
  };
  var search2 = function(queryString, offset, responseProc, errProc) {
    var queryURL = "https://www.virustotal.com/vtapi/v2/file/search?apikey=" + key + "&query=" + queryString;
    if ((offset != null)&&(offset!="")) {
      queryURL = queryURL + "&offset=" + queryObject.offset;
    }
    request(queryURL, function(error, response, body){
      if (error) {
        errProc(error);
        return;
      }
      if (response.statusCode > 399) {
        errProc(body);
        return;
      }
      try {
        var data = JSON.parse(body);
        switch (data.response_code) {
          case 0:
          case 1:
            if (data.offset==null) {
              data.offset = "";
            }
            if (data.hashes == null) {
              data.hashes = [];
            }
            responseProc(data);
            return;
          case -1:
          case -2:
          default:
            errProc(data);
            return;
        }
      } catch (e) {
        errProc(e);
        return;
      }
    });
  };
  /*Note: search has been depreciated*/
  var search = function(queryObject, offset, responseProc, errProc){
    var queryURL = "https://www.virustotal.com/vtapi/v2/file/search?apikey=" + key + "&query=";
    var queryComponents = [];
    if (queryObject.type != null) {
      queryComponents[queryComponents.length] = "type%3A" + queryObject.type;
    }
    if (queryObject.name != null) {
      queryComponents[queryComponents.length] = "name%3A\"" + queryObject.name + "\"";
    }
    if (queryObject.lowerSize != null) {
      queryComponents[queryComponents.length] = "size%3A" + queryObject.lowerSize + "%2B";
    }
    if (queryObject.upperSize != null) {
      queryComponents[queryComponents.length] = "size%3A" + queryObject.upperSize + "-";
    }
    if (queryObject.tag != null) {
      queryComponents[queryComponents.length] = "tag%3A" + queryObject.tag;
    }
    if (queryObject.firstSubmittedBefore) {
      queryComponents[queryComponents.length] = "fs%3A" + dateToString(queryObject.firstSubmittedBefore) + "-";
    }
    if (queryObject.firstSubmittedAfter) {
      queryComponents[queryComponents.length] = "fs%3A" + dateToString(queryObject.firstSubmittedAfter) + "%2B";
    }
    if (queryObject.lastSubmittedBefore) {
      queryComponents[queryComponents.length] = "ls%3A" + dateToString(queryObject.lastSubmittedBefore) + "-";
    }
    if (queryObject.lastSubmittedAfter) {
      queryComponents[queryComponents.length] = "ls%3A" + dateToString(queryObject.lastSubmittedAfter) + "%2B";
    }
    if (queryObject.AtLeastPositives != null) {
      queryComponents[queryComponents.length] = "positives%3A" + queryObject.AtLeastPositives + "%2B";
    }
    if (queryObject.AtMostPositives != null) {
      queryComponents[queryComponents.length] = "positives%3A" + queryObject.AtMostPositives + "-";
    }
    if (queryObject.AtLeastChildPositives != null) {
      queryComponents[queryComponents.length] = "children_positives%3A" + queryObject.AtLeastChildPositives + "%2B";
    }
    if (queryObject.AtMostChildPositives != null) {
      queryComponents[queryComponents.length] = "children_positives%3A" + queryObject.AtMostChildPositives + "-";
    }
    if (queryObject.AtLeastSubmissions != null) {
      queryComponents[queryComponents.length] = "submissions%3A" + queryObject.AtLeastSubmissions + "%2B";
    }
    if (queryObject.AtMostSubmissions != null) {
      queryComponents[queryComponents.length] = "submissions%3A" + queryObject.AtMostSubmissions + "-";
    }
    if (queryObject.AtLeastSources != null) {
      queryComponents[queryComponents.length] = "sources%3A" + queryObject.AtLeastSources + "%2B";
    }
    if (queryObject.AtMostSources != null) {
      queryComponents[queryComponents.length] = "sources%3A" + queryObject.AtMostSources + "-";
    }
    if (queryObject.RegionOfFirstSubmitter != null) {
      queryComponents[queryComponents.length] = "submitter%3A" + queryObject.RegionOfFirstSubmitter;
    }
    if (queryObject.itw != null) {
      queryComponents[queryComponents.length] = "itw%3A\"" + encodeURIComponent(queryObject.itw) + "\"";
    }
    if (queryObject.metadataString != null) {
      queryComponents[queryComponents.length] = "metadata%3A\"" + encodeURIComponent(queryObject.metadataString) + "\"";
    }
    if (queryObject.metadataLiteral != null) {
      queryComponents[queryComponents.length] = "metadata%3A" + queryObject.metadataLiteral;
    }
    if (queryObject.containsAndroguardResult != null) {
      queryComponents[queryComponents.length] = "androguard%3A\"" + encodeURIComponent(queryObject.containsAndroguardResult) + "\"";
    }
    if (queryObject.containsLanguage != null) {
      queryComponents[queryComponents.length] = "lang%3A\"" + encodeURIComponent(queryObject.containsAndroguardResult) + "\"";
    }
    if (queryObject.containsSignatureString != null) {
      queryComponents[queryComponents.length] = "signature%3A\"" + encodeURIComponent(queryObject.containsSignatureString) + "\"";
    }
    if (queryObject.compilationDatetimeMin != null) {
      queryComponents[queryComponents.length] = "signature%3A" + dateToString(queryObject.compilationDatetimeMin) + "-";
    }
    if (queryObject.compilationDatetimeMax != null) {
      queryComponents[queryComponents.length] = "signature%3A" + dateToString(queryObject.compilationDatetimeMax) + "%2B";
    }
    if (queryObject.compilationSubmissionDifferenceMin != null) {
      queryComponents[queryComponents.length] = "subspan%3A" + queryObject.compilationSubmissionDifferenceMin + "-";
    }
    if (queryObject.compilationSubmissionDifferenceMax != null) {
      queryComponents[queryComponents.length] = "subspan%3A" + queryObject.compilationSubmissionDifferenceMax + "%2B";
    }
    if (queryObject.containsSectionLabel != null) {
      queryComponents[queryComponents.length] = "section%3A\"" + encodeURIComponent(queryObject.containsSectionLabel) + "\"";
    }
    if (queryObject.containsMD5SectionLabel != null) {
      queryComponents[queryComponents.length] = "section%3A" + queryObject.containsMD5SectionLabel;
    }
    if (queryObject.containsSegmentLabel != null) {
      queryComponents[queryComponents.length] = "segment%3A\"" + encodeURIComponent(queryObject.containsSegmentLabel) + "\"";
    }
    if (queryObject.importsLibrary != null) {
      queryComponents[queryComponents.length] = "imports%3A\"" + encodeURIComponent(queryObject.importsLibrary) + "\"";
    }
    if (queryObject.exportsFunction != null) {
      queryComponents[queryComponents.length] = "exports%3A\"" + encodeURIComponent(queryObject.exportsFunction) + "\"";
    }
    if (queryObject.containsPhraseInBehaviorReport != null) {
      queryComponents[queryComponents.length] = "behavior%3A\"" + encodeURIComponent(queryObject.containsPhraseInBehaviorReport) + "\"";
    }
    if (queryObject.containsResourceType != null) {
      queryComponents[queryComponents.length] = "resource%3A\"" + encodeURIComponent(queryObject.containsResourceType) + "\"";
    }
    if (queryObject.containsHashedResource != null) {
      queryComponents[queryComponents.length] = "resource%3A\"" + queryObject.containsHashedResource + "\"";
    }
    if (queryObject.generatesSnortAlertString != null) {
      queryComponents[queryComponents.length] = "snort%3A\"" + encodeURIComponent(queryObject.generatesSnortAlertString) + "\"";
    }
    if (queryObject.generatesSnortAlertID != null) {
      queryComponents[queryComponents.length] = "snort%3A" + queryObject.generatesSnortAlertID;
    }
    if (queryObject.generatesSuricataAlertString != null) {
      queryComponents[queryComponents.length] = "suricata%3A\"" + encodeURIComponent(queryObject.generatesSuricataAlertString) + "\"";
    }
    if (queryObject.generatesSuricataAlertID != null) {
      queryComponents[queryComponents.length] = "suricata%3A" + queryObject.generatesSuricataAlertID;
    }
    if (queryObject.hasTrafficWith != null) {
      queryComponents[queryComponents.length] = "traffic%3A\"" + encodeURIComponent(queryObject.hasTrafficWith) + "\"";
    }
    if (queryObject.structurallySimilarTo != null) {
      queryComponents[queryComponents.length] = "similar-to%3A" + queryObject.structurallySimilarTo;
    }
    if (queryObject.similarTo != null) {
      if ((queryObject.similarTo.score != null) && (queryObject.similarTo.hash != null)) {
        queryComponents[queryComponents.length] = "ssdeep%3A" + queryObject.similarTo.hash + "-" + queryObject.similarTo.score;
      }
    }
    if (queryObject.importHash != null) {
      queryComponents[queryComponents.length] = "imphash%3A" + queryObject.importHash;
    }
    if (queryObject.containsString) {
      queryComponents[queryComponents.length] = "content%3A\"" + encodeURIComponent(queryObject.containsString) + "\"";
    }
    if (queryObject.containsHexSequence) {
      queryComponents[queryComponents.length] = "content%3A" + queryObject.containsHexSequence;
    }
    queryURL = queryURL + queryComponents.join(" ");
    if ((queryObject.offset != null)&&(queryObject.offset!="")) {
      queryURL = queryURL + "&offset=" + queryObject.offset;
    }
    request(queryURL, function(error, response, body){
      if (error) {
        errProc(error);
        return;
      }
      if (response.statusCode > 399) {
        errProc(body);
        return;
      }
      try {
        var data = JSON.parse(body);
        switch (data.response_code) {
          case 0:
          case 1:
            if (data.offset==null) {
              data.offset = "";
            }
            if (data.hashes == null) {
              data.hashes = [];
            }
            responseProc(data);
            return;
          case -1:
          case -2:
          default:
            errProc(data);
            return;
        }
      } catch (e) {
        errProc(e);
        return;
      }
    });
  };
  this.search2 = search2;
  this.search = search;
  this.getNextFalsePositive = getNextFalsePositive;
  this.getUrlFeed = makeFeedFunction("https://www.virustotal.com/vtapi/v2/url/feed?key=");
  this.getFileFeed = makeFeedFunction("https://www.virustotal.com/vtapi/v2/file/feed?key=");
  this.getClusters = getClusters;
  this.getFileNetworkActivity = getFileNetworkActivity;
  this.getFileBehavior = getFileBehavior;
  this.makeRescan = makeRescan;
  this.getFile = getFile;
  this.getFileReport = getFileReport;
  this.retrieveUrlAnalysis = retrieveUrlAnalysis;
  this.submitFileForAnalysis = sendFilePreLogic;
  this.getDomainReport = function(domain, responseProc, errProc){
    getReport("https://www.virustotal.com/vtapi/v2/domain/report?domain=" + domain + "&apikey=" + key, responseProc, errProc);
    return;
  };
  this.getIP4Report = function(ip, responseProc, errProc){
    getReport("https://www.virustotal.com/vtapi/v2/ip-address/report?ip=" + ip + "&apikey=" + key, responseProc, errProc);
    return;
  };
  this.submitUrlForScanning = submitUrlForScanning;
	this.publishFileComment = publishUrlComment;
	this.publishUrlComment = publishUrlComment;
  this.getFileComments = getComments;
  this.getUrlComments = getComments;
  return;
};
features.makePrivateAPI = function(){
  return new privateAPI();
};
module.exports = exports = features;
