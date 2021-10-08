"use strict";
const speedconcat = require("speedconcat");
const request = require("request");
const emailAPI = require("./emailAPI.js");
const privateAPI = require("./privateAPI.js");
const formatConverter = require("./formatConverter.js");
const intelAPI = require("./intelligenceAPI.js");
const QB = require("./queryBuilder.js");
const commentSender = require("./commentSender.js");
var apiKey = "e2513a75f92a4169e8a47b4ab1df757f83ae45008b4a8a49903450c8402add4d";
const PublicConnection = function(){
	var key = apiKey;
	var jobDelay = 15000;
	const internalPrivateAPI = privateAPI.makePrivateAPI();
	internalPrivateAPI.setKey(key);
	this.setKey = function(replacement){
		key = replacement;
		internalPrivateAPI.setKey(key);
		return;
	};
	this.getKey = function() {
		return key;
	};
	this.setDelay = function(replacement){
		jobDelay = replacement;
		return;
	};
	this.getDelay = function() {
		return jobDelay;
	};
	var jobQueue = null;
	var tail = null;
	const performNextJob = function(){
		if (jobQueue != null) {
			const workingJob = jobQueue;
			jobQueue = jobQueue.next;
			if (jobQueue == null) {
				tail = null;
			} else {
				setTimeout(performNextJob, jobDelay);
			}
			workingJob.proc();
		}
		return;
	};
	var fireNow = true;
	const addJob = function(proc) {
		if ((fireNow == true)&&(jobQueue == null)) {
			fireNow = false;
			setTimeout(function(){
				fireNow = true;
			}, jobDelay);
			proc();
			return;
		}
		if (jobQueue == null) {
			jobQueue = {
				proc: proc,
				next: null
			};
			tail = jobQueue;
			setTimeout(performNextJob, jobDelay);
		} else {
			tail.next = {
				proc: proc,
				next: null
			};
			tail = tail.next;
		}
		return;
	};
	const makeGet = function (URL) {
		return function(addr, responseProc, errProc){
			const checkURL = (URL + addr) + ("&apikey=" + key);
			const checkProc = function(){
				request({
					url:checkURL,
					gzip: true,
					headers: {
						"User-Agent": "gzip"
					}}, function(error, response, body) {
						if (error) {
							errProc(error);
							return;
						}
						if(response.statusCode > 399) {
							errProc(response.statusCode + "");
							return;
						}
						try {
							const data = JSON.parse(body);
							switch (data.response_code) {
								case -2:
									addJob(checkProc);
									return;
								case 0:
								case 1:
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
			addJob(checkProc);
		};
	};
	const PostWithoutBody = function(rawURL, mode) {
		return function(resource, responseProc, errProc){
			const fullURL = (rawURL+encodeURIComponent(resource)) + ("&apikey="+key);
			const jobProc = function(){
				request({
					method: "POST",
					url: fullURL,
		      gzip: true,
			    headers: {
				    "User-Agent": "gzip"
			    }
				},function(error, response, body){
					if (error) {
						errProc(error);
						return;
					}
					try{
						const result = JSON.parse(body);
						switch (result.response_code) {
							case -2:
								if (-2==mode) {
									addJob(jobProc);
									return;
								}
								if (-1==mode) {
									errProc(result);
									return;
								}
								if (0==mode) {
									responseProc(result);
									return;
								}
								return;
							case 1:
							case 0:
								responseProc(result);
								return;
							case -1:
							default:
								errProc(result);
								return;
						}
					} catch (e) {
						errProc(e);
						return;
					}
				});
			};
			addJob(jobProc);
		};
	};
	const publishUrlComment = function(resource, comment, resultProc, errProc){
		if (errProc==null) {
			errProc = function(e) {
				publishUrlComment(resource, comment, resultProc, null);
				return;
			}
		}
		const workingSender = new commentSender(resource, comment, key, resultProc, errProc);
		addJob(workingSender.attempt);
		return;
	};
	const sendFile = function(filename, filetype, filecontent, responseProc, errProc){
		const sendOptions = {
			url: "https://www.virustotal.com/vtapi/v2/file/scan?apikey=" + key,
			formData: {
				file: {
					value: filecontent,
					options: {
						filename: filename,
						filetype: filetype
					}
				}
			},
      gzip: true,
	    headers: {
		    "User-Agent": "gzip"
	    }
		};
		const sendFileProc = function(){
			request.post(sendOptions, function(error, response, body){
				if (error) {
					errProc(error);
					return;
				}
				try{
					const data = JSON.parse(body);
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
		};
		addJob(sendFileProc);
	};
	const rescanFile = function(resourceID, responseProc, errProc) {
		const rescanObject = internalPrivateAPI.makeRescan(resourceID);
		const pending = function(){
			rescanObject.sendRequest(responseProc, errProc);
			return;
		};
		addJob(pending);
		return;
	};
	const getFileReport = function(scanID, responseProc, errProc) {
		const fileResourceURL = ("https://www.virustotal.com/vtapi/v2/file/report?apikey=" + key) + ("&resource=" + scanID);
		const retrieveProc = function(){
			request({url: fileResourceURL, method: "POST",
      gzip: true,
	    headers: {
		    "User-Agent": "gzip"
	    }}, function(error, response, body){
				if (error) {
					errProc(error);
					return;
				}
				try {
					const data = JSON.parse(body);
					switch (data.response_code){
						case 1:
							responseProc(data);
							return;
						case -2:
							addJob(retrieveProc);
							return;
						case 0:
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
		addJob(retrieveProc)
	};
	this.getFileReport = getFileReport;
	this.rescanFile = rescanFile;
	this.submitFileForAnalysis = sendFile;
	this.publishFileComment = publishUrlComment;
	this.publishUrlComment = publishUrlComment;
	this.retrieveUrlAnalysis = PostWithoutBody("https://www.virustotal.com/vtapi/v2/url/report?resource=", -2);
	this.retrieveUrlAnalysisWithRescan = PostWithoutBody("https://www.virustotal.com/vtapi/v2/url/report?scan=1&resource=", -2);
	this.submitUrlForScanning = PostWithoutBody("https://www.virustotal.com/vtapi/v2/url/scan?url=", 0);
	this.checkIPv4 = makeGet("https://www.virustotal.com/vtapi/v2/ip-address/report?ip=");
	this.getDomainReport = makeGet("https://www.virustotal.com/vtapi/v2/domain/report?domain=");

	const self = this;
	const UrlEvaluation = function(target, resultProc, errProc){
		self.submitUrlForScanning(target, function(data){
			self.retrieveUrlAnalysis(target, resultProc, errProc);
		}, errProc);
	};
	this.UrlEvaluation = UrlEvaluation;
	const FileEvaluation = function(filename, filetype, filecontent, responseProc, errProc){
		self.submitFileForAnalysis(filename, filetype, filecontent, function(responseData){
			self.getFileReport(responseData.scan_id, responseProc, errProc);
		}, errProc);
	};
	this.FileEvaluation = FileEvaluation;
	return;
};
var features = {};
features.MakePublicConnection = function(){
	return new PublicConnection();
};
features.MakeHoneypot2Connection = function(){
	const workingConnection = new PublicConnection();
	workingConnection.setDelay(1000);
	return workingConnection;
};
features.makeIapiConnection = intelAPI.makeIapiConnection;
features.queryBuilder = QB;
features.makePrivateConnection = privateAPI.makePrivateAPI;
features.makeEmailConnection = emailAPI.makeEmailConnection;
features.formatConverter = formatConverter;

module.exports = exports = features;
/*Still need to add a feature to make Yara files, and upload them.*/
