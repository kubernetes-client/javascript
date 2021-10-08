# JavaScript JIRA API for node.js #

A node.js module, which provides an object oriented wrapper for the Jira Rest API.

[![Documentation](https://img.shields.io/badge/Documentation--green.svg)](https://jira-node.github.io/)
[![Jira Rest API](https://img.shields.io/badge/Jira%20Rest%20API--green.svg)](http://docs.atlassian.com/jira/REST/latest/)
[![Run tests](https://github.com/jira-node/node-jira-client/workflows/Run%20tests/badge.svg)](https://github.com/jira-node/node-jira-client/actions)
[![npm](https://img.shields.io/npm/v/jira-client.svg)](https://www.npmjs.com/package/jira-client)
[![Downloads](https://img.shields.io/npm/dm/jira-client.svg)](https://npmjs.com/jira-client)
[![Install Size](https://packagephobia.now.sh/badge?p=jira-client)](https://packagephobia.now.sh/result?p=jira-client)
[![dependency Status](https://david-dm.org/jira-node/node-jira-client/status.svg)](https://david-dm.org/jira-node/node-jira-client)
[![devDependency Status](https://david-dm.org/jira-node/node-jira-client/dev-status.svg)](https://david-dm.org/jira-node/node-jira-client?type=dev)

## Installation ##

Install with the node package manager [npm](http://npmjs.org):

```shell
$ npm install jira-client
```

## Examples ##

### Create the JIRA client ###

```javascript
// With ES5
var JiraApi = require('jira-client');

// With ES6
import JiraApi from 'jira-client';

// Initialize
var jira = new JiraApi({
  protocol: 'https',
  host: 'jira.somehost.com',
  username: 'username',
  password: 'password',
  apiVersion: '2',
  strictSSL: true
});
```

### Find the status of an issue ###

```javascript
// ES5
// We are using an ES5 Polyfill for Promise support. Please note that if you don't explicitly
// apply a catch exceptions will get swallowed. Read up on ES6 Promises for further details.
jira.findIssue(issueNumber)
  .then(function(issue) {
    console.log('Status: ' + issue.fields.status.name);
  })
  .catch(function(err) {
    console.error(err);
  });

// ES6
jira.findIssue(issueNumber)
  .then(issue => {
    console.log(`Status: ${issue.fields.status.name}`);
  })
  .catch(err => {
    console.error(err);
  });

// ES7
async function logIssueName() {
  try {
    const issue = await jira.findIssue(issueNumber);
    console.log(`Status: ${issue.fields.status.name}`);
  } catch (err) {
    console.error(err);
  }
}

```

## Documentation ##
Can't find what you need in the readme?  Check out our documentation here: https://jira-node.github.io/
