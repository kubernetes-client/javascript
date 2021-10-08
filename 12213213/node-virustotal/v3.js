"use strict";
const output = {};
output.legacyEdition = function(){
	return require('code.js');
};
output.sha256 = (function(){
	const sha256String = 'sha256';
	const crypto = require('crypto');
	const hexString = 'hex';
	return function(input){
		const hash = crypto.createHash(sha256String);
		hash.update(input);
		return (hash.digest(hexString));
	};
})();
output.confirmed = 'confirmed';
output.None = 'None';
output.malicious = "malicious";
output.harmless = "harmless";
const unknownName = 'unknown';
const defaultType = 'application/octet-stream';
const makeZipFileLink = 'https://www.virustotal.com/api/v3/intelligence/zip_files';
const graphSearchLink = 'https://www.virustotal.com/api/v3/graphs';
const individualGraphLink = graphSearchLink + '/';
const invalidVoteString = "Invalid vote string";
const filesLink = "https://www.virustotal.com/api/v3/files";
const bigFileLink = "https://www.virustotal.com/api/v3/files/upload_url";
const partnerCommentsLink = "https://www.virustotal.com/api/v3/monitor_partner/comments/"
const monitorPartnerHashesString = "https://www.virustotal.com/api/v3/monitor_partner/hashes/";
const defaultKey = "e2513a75f92a4169e8a47b4ab1df757f83ae45008b4a8a49903450c8402add4d";
const monitor_hash_comment = 'monitor_hash_comment'
const getString = "GET";
const postString = "POST";
const deleteString = 'DELETE';
const patchString = 'PATCH';
const request = require('request');
const millisecondsPerMinute = 60000;
const thirtyTwoMegabytes = 34359738368;
const defaultDelay = millisecondsPerMinute/4;
const commentString = "comment";
const voteString = "vote";
const decompress = (function(){
	const compressjs = require('compressjs');
	const algorithm = compressjs.Bzip2;
	const utf8 = 'utf8';
	return function(input){
		const stage1 = algorithm.decompressFile(compressed);
		return new Buffer(stage1).toString(utf8);
	};
})();
const processDate = (function(){
	const dateFormat = require('dateformat');
	const dateFormatString = 'yyyymmddHHMM';
	return function(input){
		return dateFormat(input, dateFormatString);
	};
})();
const processFeedOutput = function(input){
	return decompress(input).split('\r').join('').split('\n').map(JSON.parse);
};
const ensureBuffer = function(input){
	if (typeof input=="string"){
		return Buffer.from(input, 'utf8');
	}
	if (Buffer.isBuffer(input)){
		return input;
	}
	return ensureBuffer(JSON.stringify(input));
};
const maliciousObject = {
	"data": {
		"type": voteString, 
		"attributes": {
			"verdict": output.malicious
		}
	}
};
const harmlessObject = {
	"data": {
		"type": voteString, 
		"attributes": {
			"verdict": output.harmless
		}
	}
};
const commentToObject = function(input){
	return {
		"data": {
			"type": commentString,
			"attributes": {
				"text": input
			}
		}
	};
};
const makeURLForm = function(input){
	return {url: input};
};
const makeFileForm = function(input, fileName, fileType){
	return {file: {value: input, options: {filename: fileName, filetype: fileType}}};
};
const makeVoteObject = function(input){
	switch (input) {
		case output.malicious:
			return maliciousObject;
		case output.harmless:
			return harmlessObject;
		default:
	};
	throw new Error(invalidVoteString);
};
const standardCallback = function(input){
	const callback = input;
	return function(err, res, body){
		if (err) {
			callback(err);
			return;
		}
		if (res.statusCode > 399) {
			callback(body);
			return;
		}
		if (body.error) {
			callback(body);
			return;
		}
		callback(null, body);
	};
};
const makePostTransform = function(initialFunction, bodyModification){
	return function(id, content, callback){
		const modded = bodyModification(content);
		return initialFunction(id, modded, callback);
	};
};
const makePlainZipFileObject = function(input){
	return {data:{
		hashes: input
	}};
};
const makePasswordZipFileObject = function(password, files){
	return {data:{
		password: password, 
		hashes: files
	}};
};
output.graphSortKeys = {
	name: 'name',
	owner: 'owner',
	creation_date: 'creation_date',
	last_modified_date: 'last_modified_date',
	views_count: 'views_count',
	comments_count: 'comments_count'
};
output.relationships = {
	comments: 'comments',
	communicating_files: 'communicating_files',
	downloaded_files: 'downloaded_files',
	graphs: 'graphs',
	items: 'items',
	viewers: 'viewers',
	editors: 'editors',
	owner: 'owner',
	group: 'group',
	historical_whois: 'historical_whois',
	referrer_files: 'referrer_files',
	resolutions: 'resolutions',
	urls: 'urls',
	siblings: 'siblings',
	referrer_files: 'referrer_files',
	historical_whois: 'historical_whois',
	analyses: 'analyses',
	last_serving_ip_address: 'last_serving_ip_address',
	redirecting_urls: 'redirecting_urls',
	submissions: 'submissions',
	analyses: 'analyses',
	behaviours: 'behaviours',
	bundled_files: 'bundled_files',
	carbonblack_children: 'carbonblack_children',
	carbonblack_parents: 'carbonblack_parents',
	comments: 'comments',
	compressed_parents: 'compressed_parents',
	contacted_domains: 'contacted_domains',
	contacted_ips: 'contacted_ips',
	contacted_urls: 'contacted_urls',
	email_parents: 'email_parents',
	embedded_domains: 'embedded_domains',
	embedded_ips: 'embedded_ips',
	execution_parents: 'execution_parents',
	itw_urls: 'itw_urls',
	overlay_parents: 'overlay_parents',
	pcap_parents: 'pcap_parents',
	pe_resource_parents: 'pe_resource_parents',
	similar_files: 'similar_files',
	submissions: 'submissions',
	screenshots: 'screenshots',
	votes: 'votes'
};
const v3 = function(delay){
	if (delay==null) {
		delay=defaultDelay;
	}
	this.time = delay; 
	this.key = defaultKey;
	const self = this;
	const standardHeader = {'x-apikey': defaultKey};
	this.getKey = function(){
		return standardHeader['x-apikey'];
	};
	this.setKey = function(k){
		standardHeader['x-apikey'] = k;
		return self;
	};
	this.getDelay = function(){
		return time;
	};
	this.setDelay = function(t){
		self.time = t;
		return self;
	};
	
	let taskHead = null;
	let lastTask = null;
	const addTask = function(task){
		if (taskHead==null){
			taskHead = {val: task, next: null};
			lastTask = taskHead;
			return;
		}
		lastTask.next = {val: task, next: null};
		lastTask = lastTask.next;
	};
	const popTask = function(){
		if (taskHead==null) {
			return null;
		}
		const task = taskHead.val;
		taskHead = taskHead.next;
		if (taskHead==null){
			lastTask = null;
		}
		return task;
	};
	const performNext = function(){
		const timeout = setTimeout(function(){
			const f = popTask();
			if (f==null){
				return;
			}
			performNext();
			f();
		}, self.time);
	};
	const putInLine = function(input){
		const wasNull = (taskHead==null);
		addTask(input);
		if (wasNull){
			performNext();
		}
		return self;
	};
	
	this.queueTest = function(input){
		const f = function(){
			console.log(input);
		};
		return putInLine(f);
	};

	const makeGetOrDeleteFunction = function(beforePath, afterPath, type){
		return function(contentID, cb){
			const id = contentID;
			const callback = cb;
			return putInLine(function(){
				request({
					url: beforePath + id + afterPath,
					method: type,
					headers: standardHeader
				}, standardCallback(callback));
			});
		};
	
	};
	const makeGetFunction = function(beforePath, afterPath){
		return makeGetOrDeleteFunction(beforePath, afterPath, getString);
	};
	const makeDeleteFunction = function(beforePath, afterPath){
		return makeGetOrDeleteFunction(beforePath, afterPath, deleteString);
	};
	const make3partGetFunction = function(beforePath, middlePath, afterPath){
		return function(contentID, secondID, cb){
			const id = contentID;
			const sid = secondID;
			const callback = cb;
			return putInLine(function(){
				request({
					url: beforePath + id + middlePath + sid + afterPath,
					method: getString,
					headers: standardHeader
				}, standardCallback(callback));
			});
		};
	};
	const makePostFunction = function(beforePath, afterPath){
		return function(contentID, contents, cb){
			const body = contents;
			const id = contentID;
			const callback = cb;
			return putInLine(function(){
				request({
					url: beforePath + id + afterPath,
					method: postString,
					headers: standardHeader,
					body: JSON.stringify(body)
				}, standardCallback(callback));
			});
		};
	};
	const makeNoContentPostFunction = function(beforePath, afterPath){
		return function(contentID, cb){
			const id = contentID;
			const callback = cb;
			return putInLine(function(){
				request({
					url: beforePath + id + afterPath,
					method: postString,
					headers: standardHeader
				}, standardCallback(callback));
			});
		};
	};
	const makeRawPostFunction = function(beforePath, afterPath){
		return function(contentID, contents, cb){
			const body = contents;
			const id = contentID;
			const callback = cb;
			return putInLine(function(){
				request({
					url: beforePath + id + afterPath,
					method: postString,
					headers: standardHeader,
					body: body
				}, standardCallback(callback));
			});
		};
	};
	const makeRawPostFormFunction = function(beforePath, modifier){
		return function(input, cb){
			const form = input;
			const callback = cb;
			return putInLine(function(){
				request({
					url: beforePath,
					method: postString,
					headers: standardHeader,
					form: modifier(form)
				}, standardCallback(callback));
			});
		};
	};

	const uploadFileToURL = function(content, location, name, type, callback){
		request({
			url: location,
			method: postString,
			headers: standardHeader,
			formData: makeFileForm(content, name, type)
		}, standardCallback(callback));
	};

	this.uploadFile = function(input, filename, filetype, callback){
		if (filetype==undefined){
			return self.uploadFile(input, unknownName, filename);
		}
		if (callback==undefined){
			return self.uploadFile(input, filename, defaultType, filetype);
		}
		const asBuffer = ensureBuffer(input);
		return putInLine(function(){
			if (asBuffer.length < thirtyTwoMegabytes) {
				uploadFileToURL(asBuffer, filesLink, filename, filetype, callback);
				return;
			}
			request({
				url: bigFileLink,
				method: getString,
				headers: standardHeader
			}, standardCallback(function(err, res){
				if (err){
					callback(err);
					return;
				}
				putInLine(function(){
					uploadFileToURL(asBuffer, res.data, callback);
				});
			}));
		});
	};
	const makeDownloadCallback = function(callback){
		return function(error, response, body){
			if (err) {
				callback(err);
				return;
			}
			if (res.statusCode > 399) {
				callback(body);
				return;
			}
			callback(null, body);
		};
	};
	this.downloadMaliciousFile = function(contentID, cb){
		const target = contentID;
		const callback = cb;
		request({
			url: target,
			method: getString
		}, makeDownloadCallback(callback));
		return self;
	};
	this.getFileDownloadLink = makeGetFunction("https://www.virustotal.com/api/v3/files/","/download_url");
	this.fileBehaviours = makeGetFunction("https://www.virustotal.com/api/v3/file_behaviours/","/pcap");
	this.reAnalyseFile = makeNoContentPostFunction("https://www.virustotal.com/api/v3/files/","/analyse");
	this.fileVotesLookup = makeGetFunction("https://www.virustotal.com/api/v3/files/","/votes");
	this.postFileComment = makePostTransform(makePostFunction("https://www.virustotal.com/api/v3/urls/","/comments"), commentToObject);
	this.sendFileVote = makePostTransform(makePostFunction("https://www.virustotal.com/api/v3/files/","/votes"), makeVoteObject);
	this.fileCommentLookup = makeGetFunction("https://www.virustotal.com/api/v3/files/","/comments");
	this.fileLookup = makeGetFunction("https://www.virustotal.com/api/v3/files/","");
	this.getFileRelationships = make3partGetFunction("https://www.virustotal.com/api/v3/urls/","/","");
	this.ipLookup = makeGetFunction("https://www.virustotal.com/api/v3/ip_addresses/","");
	this.domainLookup = makeGetFunction("https://www.virustotal.com/api/v3/domains/","");
	this.ipCommentLookup = makeGetFunction("https://www.virustotal.com/api/v3/ip_addresses/","/comments");
	this.domainCommentLookup = makeGetFunction("https://www.virustotal.com/api/v3/domains/","/comments");
	this.ipVotesLookup = makeGetFunction("https://www.virustotal.com/api/v3/ip_addresses/","/votes");
	this.domainVotesLookup = makeGetFunction("https://www.virustotal.com/api/v3/domains/","/votes");
	this.postIPcomment = makePostTransform(makePostFunction("https://www.virustotal.com/api/v3/ip_addresses/","/comments"), commentToObject);
	this.postDomainComment = makePostTransform(makePostFunction("https://www.virustotal.com/api/v3/domains/","/comments"), commentToObject);
	this.sendIPvote = makePostTransform(makePostFunction("https://www.virustotal.com/api/v3/ip_addresses/","/votes"), makeVoteObject);
	this.sendDomainVote = makePostTransform(makePostFunction("https://www.virustotal.com/api/v3/domains/","/votes"), makeVoteObject);
	this.getIPrelationships = make3partGetFunction("https://www.virustotal.com/api/v3/ip_addresses/","/","");
	this.getDomainRelationships = make3partGetFunction("https://www.virustotal.com/api/v3/domains/","/","");
	this.initialScanURL = makeRawPostFormFunction("https://www.virustotal.com/api/v3/urls",makeURLForm);
	this.urlLookup = makeGetFunction("https://www.virustotal.com/api/v3/urls/","");
	this.urlCommentLookup = makeGetFunction("https://www.virustotal.com/api/v3/urls/","/comments");
	this.urlNetworkLocations = makeGetFunction("https://www.virustotal.com/api/v3/urls/","/network_location");
	this.urlVotesLookup = makeGetFunction("https://www.virustotal.com/api/v3/urls/","/votes");
	this.postURLComment = makePostTransform(makePostFunction("https://www.virustotal.com/api/v3/urls/","/comments"), commentToObject);
	this.sendURLVote = makePostTransform(makePostFunction("https://www.virustotal.com/api/v3/urls/","/votes"), makeVoteObject);
	this.getURLRelationships = make3partGetFunction("https://www.virustotal.com/api/v3/urls/","/","");
	this.reAnalyseURL = makeNoContentPostFunction("https://www.virustotal.com/api/v3/urls/","/analyse");
	this.getAnalysisInfo = makeGetFunction("https://www.virustotal.com/api/v3/analyses/","");
	this.getUserInfo = makeGetFunction("https://www.virustotal.com/api/v3/users/","");
	this.getUserUsageInfo = makeGetFunction("https://www.virustotal.com/api/v3/users/","/api_usage");
	this.getGroupInfo = makeGetFunction("https://www.virustotal.com/api/v3/groups/","");
	this.getGroupRelationships = make3partGetFunction("https://www.virustotal.com/api/v3/groups/","/relationships/","");
	this.getGroupAdministrators = makeGetFunction("https://www.virustotal.com/api/v3/groups/","/administrators");
	this.getZipFileInfo = makeGetFunction("https://www.virustotal.com/api/v3/intelligence/zip_files/","");
	this.getZipFileDownloadLink = makeGetFunction("https://www.virustotal.com/api/v3/intelligence/zip_files/","/download_url");
	this.downloadZipFile = this.downloadMaliciousFile;
	this.makePlainTextZipFile = makeRawPostFormFunction(makeZipFileLink, makePlainZipFileObject);
	this.makePasswordZipFile = function(password, files, callback){
		const body = JSON.stringify(makePasswordZipFileObject(password, files));
		return putInLine(function(){
			request({
				url: makeZipFileLink,
				method: postString,
				headers: standardHeader,
				body: body
			}, standardCallback(callback));
		});
	};
	
	const makeFeedFunction = function(input){
		const target = input;
		return function(timeStamp, callback){
			const url = target + processDate(timeStamp);
			return putInLine(function(){
				request({
					url: url,
					method: getString,
					headers: standardHeader
				}, function(err, res, body){
					if (err) {
						callback(err);
						return;
					}
					if (res.statusCode > 399) {
						callback(body);
						return;
					}
					callback(null, decompress(body));
				});
			});
		};
	};
	this.getFilesForTime = makeFeedFunction('https://www.virustotal.com/api/v3/feeds/files/');
	this.getURLsForTime = makeFeedFunction('https://www.virustotal.com/api/v3/feeds/urls/');
	this.getFileBehaviorsForTime = makeFeedFunction('https://www.virustotal.com/api/v3/feeds/file-behaviors/');
	
	//Graphs
	/*this.searchGraphs = function(filter, limit, cursor, order, attributes, callback){
		if (arguments.length < 6) {
			const expanded = Array.from(arguments);
			expanded.splice(0,0,null);
			return self.searchGraphs(...expanded);
		}
		const qs = {};
		if (filter) {//TODO: Make an interface to make filters the way the old version did.
			qs.filter = filter;
		}
		if (limit) {
			qs.limit = limit;
		}
		if (cursor) {
			qs.cursor = cursor;
		}
		if (order) {
			qs.order = order;
		}
		if (attributes) {//TODO: Need an object of valid attributes values
			qs.attributes = attributes.join(',');
		}
		return putInLine(function(){
			request({
				url: graphSearchLink,
				method: getString,
				headers: standardHeader,
				qs: qs
			},standardCallback(callback));
		});
	};
	this.publishGraph = makePostFunction(graphSearchLink,'');
	this.getGraph = makeGetFunction(individualGraphLink,'');*/

	//Retrohunt
	//Software Publishers
	//Antivirus Partners
	
	this.getHashAnalysis = makeGetFunction(monitorPartnerHashesString,"/analyses");
	this.getHashItems = makeGetFunction(monitorPartnerHashesString,"/items");
	const sendPartnerComment = function(hash, text, detectionStatus, engineID, url, method, callback){
		const target = url;
		const body = JSON.stringify({
			data: [{attributes:{
				comment: text,
				detectionStatus: detectionStatus,
				engine: engineID,
				sha256: hash,
				type:  monitor_hash_comment
			}}]
		});
		return putInLine(function(){
			request({
				url: target,
				method: method,
				headers: standardHeader,
				body: body
			}, standardCallback(callback));
		});
	};
	this.makePartnerComment = function(hash, text, detectionStatus, engineID, callback){
		return sendPartnerComment(hash, text, detectionStatus, engineID, monitorPartnerHashesString + hash + '/comments', postString, callback);
	};
	this.getPartnerComments = makeGetFunction(partnerCommentsLink,"");
	this.updatePartnerComment = function(id, hash, text, detectionStatus, engineID, callback){
		return sendPartnerComment(hash, text, detectionStatus, engineID, partnerCommentsLink + id, patchString, callback);
	};
	this.deletePartnerComment = makeDeleteFunction(partnerCommentsLink,'');
	this.getPartnerDownload = function(hash, callback){
		return putInLine(function(){
			self.downloadMaliciousFile('https://www.virustotal.com/api/v3/monitor_partner/files/' + hash + '/download_url', callback);
		});
	}; 
	this.getPartnerDownloadURL = makeGetFunction('https://www.virustotal.com/api/v3/monitor_partner/files/','/download_url');
	this.getEngineStatistics = makeGetFunction('https://www.virustotal.com/api/v3/monitor_partner/statistics?filter=engine:','');
	this.makeDetectionBundleControlObject = function(){
		return {
			engine: null,
			date: null,
			cursor: 0,
			limit: 40
		};
	};
	this.getDetectionsBundle = function(input, callback){
	  let engineString = '';
		let dateString = '';
		if (input.engine) {
			engineString = '/' + input.engine;
		}
		if (input.date) {
			dateString = "/{date('" + input.date.getFullYear() + "-" + (input.date.getMonth()+1) + "-" + input.date.getDate() + "')}";
		}
		return putInLine(function(){
			request({
				url: "https://www.virustotal.com/api/v3/monitor_partner/detections_bundle" + engineString + dateString + "/download?cursor=" + input.cursor + '&limit=' + input.limit,
				method: getString,
				headers: standardHeader
			}, standardCallback(callback));
		});
	};
};
output.makeAPI = function(delay){
	return new v3(delay);
};
module.exports = exports = output;
