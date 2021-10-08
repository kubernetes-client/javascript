[![npm @latest](https://img.shields.io/npm/v/gitlab.svg)](https://www.npmjs.com/package/gitlab)
[![npm downloads](https://img.shields.io/npm/dt/gitlab.svg)](https://www.npmjs.com/package/gitlab)
[![dependencies Status](https://david-dm.org/jdalrymple/node-gitlab/status.svg)](https://david-dm.org/jdalrymple/node-gitlab)
[![devDependencies Status](https://david-dm.org/jdalrymple/node-gitlab/dev-status.svg)](https://david-dm.org/jdalrymple/node-gitlab?type=dev)
[![Greenkeeper badge](https://badges.greenkeeper.io/jdalrymple/node-gitlab.svg)](https://greenkeeper.io/)
[![Code Climate](https://codeclimate.com/github/jdalrymple/node-gitlab/badges/gpa.svg)](https://codeclimate.com/github/jdalrymple/node-gitlab)
[![Build Status](https://img.shields.io/travis/jdalrymple/node-gitlab/master.svg)](https://travis-ci.org/jdalrymple/node-gitlab)
[![Coverage](https://img.shields.io/codecov/c/github/jdalrymple/node-gitlab/master.svg)](https://codecov.io/gh/jdalrymple/node-gitlab)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![Code Style: Prettier](https://img.shields.io/badge/code%20style-prettier-ff69b4.svg)](https://img.shields.io/badge/code%20style-prettier-ff69b4.svg)
[![Install Size](https://packagephobia.now.sh/badge?p=gitlab)](https://packagephobia.now.sh/result?p=gitlab)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/jdalrymple/node-gitlab/blob/master/LICENSE.md)

# node-gitlab

🤖 [GitLab](https://gitlab.com/gitlab-org/gitlab/) API NodeJS library with full support of all the [Gitlab API](https://gitlab.com/gitlab-org/gitlab/tree/master/doc/api) services.

## Table of Contents

- [Install](#install)
- [Getting Started](#getting-started)
  - [CLI Support](#cli-support)
  - [Browser Support](#browser-support)
- [Docs](#docs)
  - [Supported APIs](#supported-apis)
  - [Bundle Imports](#bundle-imports)
  - [Examples](#examples)
  - [Pagination](#pagination)
  - [Sudo](#sudo)
  - [Custom Request Libraries](#custom-request-libraries)
  - [Misc](#misc)
- [Development](#development)
- [Testing](#testing)
- [Contributors](#contributors)
- [License](#licence)
- [Changelog](#changelog)

## Install

```bash
# Install from npm
npm install gitlab
```

## Getting Started

Instantiate the library using a basic token created in your [Gitlab Profile](https://docs.gitlab.com/ce/user/profile/personal_access_tokens.html)

```javascript
// ES6 (>=node 10.16.0 LTS)
import { Gitlab } from 'gitlab'; // All Resources
import { Projects } from 'gitlab'; // Just the Project Resource
//...etc

// ES5, assuming native or polyfilled Promise is available
const { Gitlab } = require('gitlab');
```

```javascript
const api = new Gitlab({
  token: 'personaltoken',
});
```

Available instantiating options:

| Name                 | Optional | Default                                               | Description                                                                                                        |
| -------------------- | -------- | ----------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `host`               | Yes      | `https://gitlab.com`                                  | Gitlab Instance Host URL                                                                                           |
| `token`              | No\*     | N/A                                                   | Personal Token. Required (one of the three tokens are required)                                                    |
| `oauthToken`         | No\*     | N/A                                                   | OAuth Token. Required (one of the three tokens are required)                                                       |
| `jobToken`           | No\*     | N/A                                                   | CI Job Token. Required (one of the three tokens are required)                                                      |
| `rejectUnauthorized` | Yes      | `true`                                               | Http Certificate setting, Only applies to HTTPS hosts urls                                                                                           |
| `sudo`               | Yes      | `false`                                               | [Sudo](https://docs.gitlab.com/ee/api/#sudo) query parameter                                                       |
| `version`            | Yes      | `4`                                                   | API Version ID                                                                                                     |
| `camelize`           | Yes      | `false`                                               | Camelizes all response body keys                                                                                   |
| `requester`          | Yes      | [KyRequester.ts](./src/infrastructure/KyRequester.ts) | Request Library Wrapper. Currently wraps Ky.                                                                       |
| `requestTimeout`     | Yes      | `300000`                                              | Request Library Timeout in ms                                                                                      |
| `profileToken`       | Yes      | N/A                                                   | [Requests Profiles Token](https://docs.gitlab.com/ee/administration/monitoring/performance/request_profiling.html) |
| `profileMode`        | Yes      | `execution`                                           | [Requests Profiles Token](https://docs.gitlab.com/ee/administration/monitoring/performance/request_profiling.html) |

### CLI Support

The CLI export functions in a similar manner, following the pattern:

```bash
gitlab [service name] [method name] --arg1 --arg2 --arg3
```

Where `service name` is any of the supported API names, `method name` is any of the supported commands on that API service (See source for exceptions, but generally all, show, remove, update) and `--arg1...--arg3` are any of the arguments you would normally supply to the function. The names of the args should match the names in the method headers **EXCEPT** all the optional arguments whose names should match what the GitLab API docs request.

There is one small exception with the instantiating arguments, however, which must be supplied using a `gl` prefix. ie.

```bash
# To get all the projects
gitlab projects all --gl-token="personaltoken"

# To get a project with id = 2
gitlab projects show --gl-token="personaltoken" --projectId=2
```

To reduce the annoyance of having to pass those configuration properties each time, it is also possible to pass the token and host information through environment variables in the form of `GITLAB_[option name]` ie:

```bash
GITLAB_HOST=http://example.com
GITLAB_TOKEN=personaltoken
```

This could be set globally or using a [.env](https://github.com/motdotla/dotenv#readme) file in the project folder.

### Browser Support

The library is exported as `gitlab` and can be used by simply adding this script to your html file:

```html
<script src="node_modules/gitlab/dist/index.browser.js" />
<script>
  const { Gitlab } = gitlab;

  const api = new Gitlab({
    token: 'personaltoken',
  });

  //etc
</script>
```

## Docs

Although there are the [official docs](https://gitlab.com/gitlab-org/gitlab/tree/master/doc/api) for the API, there are some extra goodies offered by this package! After the 3.0.0 release, the next large project will be putting together proper documentation for these goodies [#39]! Stay tuned!!

### Supported APIs

The API's that are currently supported are:

```
// General
ApplicationSettings
BroadcastMessages
Events
FeatureFlags
GeoNodes
GitignoreTemplates
GitLabCIYMLTemplates
Keys
License
LicenceTemplates
Lint
Markdown
Namespaces
NotificationSettings
PagesDomains
Search
SidekiqMetrics
Snippets
SystemHooks
Version
Wikis

// Groups
Groups
GroupAccessRequests
GroupBadges
GroupCustomAttributes
GroupIssueBoards
GroupMembers
GroupMilestones
GroupProjects
GroupVariables
GroupLabels
Epics
EpicIssues
EpicNotes
EpicDiscussions

// Projects
Branches
Commits
CommitDiscussions
ContainerRegistry
DeployKeys
Deployments
Environments
Issues
IssueAwardEmojis
IssueNotes
IssueDiscussions
IssuesStatistics
Jobs
Labels
MergeRequests
MergeRequestAwardEmojis
MergeRequestDiscussions
MergeRequestNotes
Packages
Pipelines
PipelineSchedules
PipelineScheduleVariables
Projects
ProjectAccessRequests
ProjectBadges
ProjectCustomAttributes
ProjectImportExport
ProjectIssueBoards
ProjectHooks
ProjectMembers
ProjectMilestones
ProjectSnippets
ProjectSnippetNotes
ProjectSnippetDiscussions
ProjectSnippetAwardEmojis
ProtectedBranches
ProtectedTags
ProjectVariables
PushRules
Releases
ReleaseLinks
Repositories
RepositoryFiles
Runners
Services
Tags
Triggers
VulnerabilityFindings

// Users
Users
UserEmails
UserImpersonationTokens
UserKeys
UserGPGKeys

```

### Bundle Imports

It can be annoying to have to import all the API's pertaining to a specific resource. For example, the Projects resource is composed of many API's, Projects, Issues, Labels, MergeRequests, etc. For convenience, there is a Bundle export for importing and instantiating all these related API's at once.

```javascript
import { ProjectsBundle } from 'gitlab';

const services = new ProjectsBundle({
  host:   'http://example.com',
  token: 'personaltoken'
})

services.Projects.all()
services.MergeRequests.all()
etc..

```

Currently there are three Bundles:

1. ProjectsBundle which includes:

```
Branches
Commits
CommitDiscussions
Deployments
DeployKeys
Environments
Issues
IssueNotes
IssueDiscussions
IssueAwardEmojis
IssuesStatistics
Jobs
Labels
MergeRequests
MergeRequestAwardEmojis
MergeRequestDiscussions
MergeRequestNotes
Packages
Pipelines
PipelineSchedules
PipelineScheduleVariables
Projects
ProjectAccessRequests
ProjectBadges
ProjectCustomAttributes
ProjectImportExport
ProjectIssueBoards
ProjectHooks
ProjectMembers
ProjectMilestones
ProjectSnippets
ProjectSnippetNotes
ProjectSnippetDiscussions
ProjectSnippetAwardEmojis
ProtectedBranches
ProtectedTags
ProjectVariables
PushRules
Repositories
RepositoryFiles
Runners
Services
Tags
Todos
Triggers
VulnerabilityFindings
```

2. UsersBundle which includes:

```
Users,
UserCustomAttributes,
UserEmails,
UserImpersonationTokens,
UserKeys,
UserGPGKeys
```

3. GroupsBundle which includes:

```
Groups
GroupAccessRequests
GroupBadges
GroupCustomAttributes
GroupIssueBoards
GroupMembers
GroupMilestones
GroupProjects
GroupVariables
GroupLabels
Epics
EpicIssues
EpicNotes
EpicDiscussions
```

### Examples

Once you have your library instantiated, you can utilize many of the API's functionality:

Using the await/async method

```javascript
import { Gitlab } from 'gitlab';

const api = new Gitlab({
  host: 'http://example.com',
  token: 'personaltoken',
});

// Listing users
let users = await api.Users.all();

// Or using Promise-Then notation
api.Projects.all().then(projects => {
  console.log(projects);
});
```

A general rule about all the function parameters:

- If it's a required parameter, it is a named argument in the functions
- If it's an optional parameter, it is defined in a options object following the named arguments

ie.

```javascript
import { Gitlab } from 'gitlab';

const api = new Gitlab({
  host: 'http://example.com',
  token: 'personaltoken',
});

api.Projects.create({
  //options defined in the Gitlab API documentation
});
```

### Pagination

For any .all() function on a resource, it will return all the items from Gitlab. This can be troublesome if there are many items, as the request itself can take a while to be fulfilled. As such, a maxPages option can be passed to limit the scope of the all function.

```javascript
import { Gitlab } from 'gitlab';

const api = new Gitlab({
  host: 'http://example.com',
  token: 'personaltoken',
});

let projects = await api.Projects.all({ maxPages: 2 });
```

You can also use this in conjunction with the perPage argument which would override the default of 30 per page set by Gitlab:

```javascript
import { Gitlab } from 'gitlab';

const api = new Gitlab({
  host: 'http://example.com',
  token: 'personaltoken',
});

let projects = await api.Projects.all({ maxPages: 2, perPage: 40 });
```

Additionally, if you would like to get back the pagination information, to know how many total pages there are for example, pass the pagination option `showPagination` in addition to either the
`maxPages` or `page` properties.

```javascript
...
const { data, pagination } = await api.Projects.all({
  perPage:40,
  maxPages:2,
  showPagination: true
});
...
```

This will result in a response in this format:

```javascript
data: [
...
],
pagination: {
  total: 20,
  next: 4,
  current: 2,
  previous: 1,
  perPage: 3,
  totalPages: 3,
}
```

> Note: supplying any pagination restrictions is call intensive. Some resources will require many requests which can put a significant load on the Gitlab Server. The general best practice would be setting the page request option to only return the first page if all results are not required.

### Sudo

For private gitlab instances, administrators can impersonate users through the API. To do so, you have to set the 'Sudo' header on the services you want to impersonate the user for.

For example, if you want to disable notifications for a specific user:

```javascript
import { NotificationSettings } from 'gitlab';

const service = new NotificationSettings({
  host:   'http://example.com',
  token: 'personaltoken'
  sudo: 8 // Can be the user ID or a username
});

await service.edit({
  level: NotificationSettings.LEVELS.DISABLED
})
```

### Custom Request Libraries

There is another constructor parameter that allows the user to specify their custom request library
as long as it has a similar API to ky. To specify the library, simply set the `requester` property when
instatiating a service:

An example can be seen in the [KyRequester.ts](./src/infrastructure/KyRequester.ts) file

```javascript
import { Gitlab } from 'gitlab';
import YourCustomRequester from 'custom-requester';

const api = new Gitlab({
  host: 'http://example.com',
  token: 'personaltoken',
  requester: YourCustomRequester,
});
```

### Misc

#### Handling HTTPS certificates

If your Gitlab server is running via HTTPS, the proper way to pass in your certificates is via a `NODE_EXTRA_CA_CERTS` environment key, like this:

```js
"scripts": {
    "start": "NODE_EXTRA_CA_CERTS=./secrets/3ShapeCA.pem node bot.js"
},
```

> **NOTE**: _Using `process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'` will not work with the `gitlab` library. The `rejectUnauthorized` key is the only way to allow insecure certificates to be bypassed._

#### Non JSON/Text Responses

For responses such as file data that may be returned from the API, the data is exposed as a buffer. For example, when trying to write a file, this can be done like:

```javascript
let bufferedData = await api.Jobs.downloadLatestArtifactFile(project.id, "test", "job_test");

fs.writeFileSync("test.zip", bufferedData);

```

## Development

To get this running locally rather than from your `node_modules` folder:

```bash
$ git clone https://github.com/jdalrymple/node-gitlab.git
$ cd node-gitlab
$ npm install
$ npm run-script build
```

And then inside whatever project you are using `node-gitlab` in you change your references to use that repo. In your package.json of that upstream project change:

```json
"dependencies": {
  "gitlab": "5.0.0"
}
```

to this

```json
"dependencies": {
  "gitlab": "<path-to-your-clone>"
}
```

## Testing

Testing is a work-in-progress right now but here is the start.

1. First, run Gitlab in a docker container:

```bash
docker-compose -f docker-compose.test.yml up
```

1. Once GitLab is up on localhost:8080, get the two environment variables from the docker image could
   either export them into environment variables locally:

```bash
export PERSONAL_ACCESS_TOKEN=$(docker exec -it gitlab bash -lc 'printf "%q" "${PERSONAL_ACCESS_TOKEN}"')
export GITLAB_URL=$(docker exec -it gitlab bash -lc 'printf "%q" "${GITLAB_URL}"')
```

1. Now run the tests

```bash
npm run test

# or, alternatively
npm run test-with-token # sets PERSONAL_ACCESS_TOKEN and GITLAB_URL from above, before running tests
```

You can also define them in front of the npm script

```
PERSONAL_ACCESS_TOKEN='abcdefg' GITLAB_URL='http://localhost:8080' npm run test
```

> Note it may take about 3 minutes to get the variables while Gitlab is starting up in the container

## Contributors

This started as a fork from [node-gitlab](https://github.com/node-gitlab/node-gitlab) but I ended up rewriting much of the code. Here are the original work's [contributors](https://github.com/node-gitlab/node-gitlab#contributors).

- [Dylan DesRosier](https://github.com/ddesrosier)
- [Mike Wyatt](https://github.com/mikew)
- [Cory Zibeill](https://github.com/coryzibell)
- [Martin Bour](https://github.com/shadygrove)
- [Christoph Lehmann](https://github.com/christophlehmann)
- [Frank V](https://github.com/FrankV01)
- [Salim Benabbou](https://github.com/Salimlou)
- [Tamás Török-Vistai](https://github.com/tvtamas)
- [Martin Benninger](https://github.com/MartinBenninger)
- [Adam Dehnel](https://github.com/arsdehnel)
- [fewieden](https://github.com/fewieden)
- [Jeff Pelton](https://github.com/comster)
- [Claude Abounegm](https://github.com/claude-abounegm)
- [Stefan Hall](https://github.com/Marethyu1)
- [Jordan Wallet](https://github.com/Mr-Wallet)
- [Ev Haus](https://github.com/EvHaus)
- [zhao0](https://github.com/zhao0)
- [Joshua Grosso](https://github.com/jgrosso)
- [Frédéric Boutin](https://github.com/fboutin-pmc)
- [Isaac Ouellet Therrien](https://github.com/yonguelink)
- [Pavel Birukov](https://github.com/pablobirukov)
- [Sharma-Rajat](https://github.com/Sharma-Rajat)
- [Joseph Petersen](https://github.com/casz)
- [Igor Katsuba](https://github.com/IKatsuba)
- [Giuseppe Angri](https://github.com/giuseppeangri)
- [Michael Townsend](https://github.com/Continuities)
- [bodtx](https://github.com/bodtx)
- [Artem](https://github.com/arthot)
- [Munif Tanjim](https://github.com/MunifTanjim)
- [Max Wittig](https://github.com/max-wittig)
- [Quentin Dreyer](https://github.com/qkdreyer)
- [Norm MacLennan](https://github.com/maclennann)
- [jnovick](https://github.com/jnovick)
- [Fabian Aussems](https://github.com/mozinator)
- [jennparise](https://github.com/jennparise)
- [Michael Matzka](https://github.com/mimaidms)
- [CraigAllardyce](https://github.com/CraigAllardyce)
- [Bruno Guimarães](https://github.com/brunobastosg)
- [Louis Cherel](https://github.com/Musinux)
- [Lukas Eipert](https://github.com/leipert)
- [Maximilian Krauß](https://github.com/maximilian-krauss)
- [Evolution Gaming](https://github.com/evolution-gaming)
- [WEBER Logan](https://github.com/Neonox31)
- [Anton Zhukov](https://github.com/MrCheater)
- [Nic Loomans](https://github.com/beaverusiv)
- [Jennifer Everhart]()
- [Carl Kittelberger](https://github.com/icedream)
- [Patrik Votoček](https://github.com/Vrtak-CZ)
- [Kyrylo Fedorov](https://github.com/Kyr)
- [Claudio Vellage](https://github.com/jdalrymple/LRH539)
- [Seb0uil](https://github.com/seb0uil)

## License

[MIT](https://github.com/jdalrymple/node-gitlab/blob/master/LICENSE.md)

## Changelog

[Here](https://github.com/jdalrymple/node-gitlab/blob/master/CHANGELOG.md)
