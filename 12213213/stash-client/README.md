# Stash Client

> A Node.js client for Atlassian's Bitbucket Server (formerly Stash).

*Note*: Requires Node.js 4+.

## API Coverage

The current implementation was built and tested against Stash [3.11.3](https://developer.atlassian.com/static/rest/stash/3.11.3/stash-rest.html) and provides API coverage for all available routes. Support for newer/older implementations of the API require access to those specific versions.

### Known Issues

The following routes return a `404 Not Found` status:

* `POST /rest/api/1.0/projects/{projectKey}/repos/{repositorySlug}/pull-requests/{pullRequestId}/comments`
* `POST /rest/api/1.0/projects/{projectKey}/repos/{repositorySlug}/pull-requests/{pullRequestId}/participants`
* `POST /rest/api/1.0/tasks`

## Getting Started

### Installation

```bash
$ npm install --save stash-client
```

### Examples

For example usage, review the manual test provided in the [test](./test) directory. The client can be used from a broad or narrow level. The value returned in each request `Promise` is an object with values for the `body`, `headers`, etc. All methods are curried.

```
{
  "body": ...,
  "headers": ...,
  "statusCode": ...,
  "statusMessage": ...,
  "url": ...,

  // additional values
}
```

#### Broad Example

If various parts of the API are needed for a workflow, the client provides a means to broadly access the API.

```javascript
const stash = require("stash-client");
const config = {
  password: "UltraMegaSuperSeriousSecretPassphrase(0)",
  url: "https://stash.myhost.com",
  username: "user.name"
};
const projectKey = "TEST";
const repositorySlug = "test-repo";
const testRepos = stash(config).api().projects().repos(projectKey);

testRepos.pullRequests(repositorySlug).list(); // Promise
testRepos.list(); // Promise
```

#### Narrow Example

If only a single part of the API is required for access, the client provides a means to access a specific category.

```javascript
const pullRequests = require("stash-client/api/projects/repos/pullRequests");
const config = {
  password: "UltraMegaSuperSeriousSecretPassphrase(0)",
  url: "https://stash.myhost.com",
  username: "user.name"
};
const projectKey = "TEST";
const repositorySlug = "test-repo";

pullRequests(config, projectKey, repositorySlug).list(); // Promise
```
