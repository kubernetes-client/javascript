# Docker-Hub-API
[![Build Status](https://img.shields.io/travis/RyanTheAllmighty/Docker-Hub-API.svg?style=flat-square)](https://travis-ci.org/RyanTheAllmighty/Docker-Hub-API)
[![NPM Downloads](https://img.shields.io/npm/dt/docker-hub-api.svg?style=flat-square)](https://www.npmjs.com/package/docker-hub-api)
[![NPM Version](https://img.shields.io/npm/v/docker-hub-api.svg?style=flat-square)](https://www.npmjs.com/package/docker-hub-api)
[![Issues](https://img.shields.io/github/issues/RyanTheAllmighty/Docker-Hub-API.svg?style=flat-square)](https://github.com/RyanTheAllmighty/Docker-Hub-API/issues)
[![License](https://img.shields.io/badge/license-GPLv3-blue.svg?style=flat-square)](https://raw.githubusercontent.com/RyanTheAllmighty/Docker-Hub-API/master/LICENSE)

Docker Hub API is an API library written for NodeJS to access the official Docker Hub/Registry.

## Install
To install this package into your project simply run the following:

```sh
npm install --save docker-hub-api
```

Once installed you can start to use this package by requiring the module:

```js
let dockerHubAPI = require('docker-hub-api');
```

## Caching
This package will be default cache all calls to the same resource for 5 minutes so that calls to the same resource returning the same data will not re query the Docker Hub API.

This can be turned off or the expire time adjusted by adding the following code:

```js
let dockerHubAPI = require('docker-hub-api');
dockerHubAPI.setCacheOptions({enabled: true, time: 60}); // This will enable the cache and cache things for 60 seconds
```

## Logging In
In order to access authenticated routes of the API you must login.

There are 2 methods available to do that.

### login(username, password)
This method logs in via the API and gets a login token for your account.

For security purposes you should make sure to never commit any code with login details. Using environment variables is one way to get around that:

```js
let dockerHubAPI = require('docker-hub-api');
dockerHubAPI.login(process.env.DOCKER_HUB_USERNAME, process.env.DOCKER_HUB_PASSWORD);
```

The login method also returns the response from Docker Hub which includes the login token if you wish to get that token:

```js
let dockerHubAPI = require('docker-hub-api');
dockerHubAPI.login(process.env.DOCKER_HUB_USERNAME, process.env.DOCKER_HUB_PASSWORD).then(function(info) {
    console.log(`My Docker Hub login token is '${info.token}'!`);
});
```

### logout()
This logs you out of Docker Hub.

No response is sent back, but any issues will throw.

### setLoginToken(token)
This works similar to above, but uses an existing login token so that you don't need to make a login request.

Again like above, you should move this off to an environment variable and never expose it:

```js
let dockerHubAPI = require('docker-hub-api');
dockerHubAPI.setLoginToken(process.env.DOCKER_HUB_LOGIN_TOKEN);
```

## Usage
This is a complete list of methods available from this package. All methods return ES6 promises.

There are 2 types of requests. Authenticated requests and non authenticated requests. As the names suggest, authenticated requests require you to have authenticated/logged in with Docker Hub.

Since all the methods return Promises, you can use async/await.

### Non Authenticated Requests
These requests require no authentication and can be made right away with no issues.

#### comments(username, repository, options)
This gets the comments for a given repository/user combination. As per the [repository](#repositoryusername-repository) method above, if the username is left out, it will query the official repository.

You can also pass in options to limit the number of results per page and the page to go to like so:

```js
{
    perPage: 10,
    page: 4
}
```

Below is an example of what's returned:

```json
[
    {
        "id": 1035,
        "user": "kyma",
        "comment": "What OS is this built on?",
        "created_on": "2014-06-09T16:27:15Z",
        "updated_on": "2014-06-09T16:27:16Z"
    },
    {
        "id": 1042,
        "user": "hacfi",
        "comment": "@kyma debian:jessie ... see\r\nhttps://github.com/docker-library/nginx/blob/docker-v1.7.1/Dockerfile#L1",
        "created_on": "2014-06-09T20:27:55Z",
        "updated_on": "2014-06-09T20:27:56Z"
    }
]
```

#### repository(username, name)
This gets information about a repository with a given name. If the username is left out or '_' is provided, then it will get the base library repositories (official repositories).

Below is a sample of what's returned:

```json
{
    "user": "ryantheallmighty",
    "name": "nginx",
    "namespace": "ryantheallmighty",
    "status": 1,
    "description": "A short description",
    "is_private": false,
    "is_automated": false,
    "can_edit": false,
    "star_count": 0,
    "pull_count": 55,
    "last_updated": "2015-12-10T08:48:49.665081Z",
    "has_starred": false,
    "full_description": "A full description"
}
```

#### repositories(username)
This gets information about a user's repositories.

Below is an example of what's returned:

```json
[
    {
        "namespace": "ryantheallmighty",
        "name": "composer"
    },
    {
        "namespace": "ryantheallmighty",
        "name": "hhvm"
    }
]
```

#### repositoriesStarred(username, options)
This gets information about a user's starred repositories.

You can also pass in options to limit the number of results per page and the page to go to like so:

```js
{
    perPage: 10,
    page: 4
}
```

Below is an example of what's returned:

```json
[
    {
        "user": "ryantheallmighty",
        "name": "nginx",
        "namespace": "ryantheallmighty",
        "status": 1,
        "description": "Short description",
        "is_private": false,
        "is_automated": false,
        "can_edit": false,
        "star_count": 1,
        "pull_count": 57,
        "last_updated": "2015-12-10T08:48:49.665081Z"
    }
]
```

#### tags(username, repository, options)
This gets the tags for a given repository/user combination. As per the [repository](#repositoryusername-repository) method above, if the username is left out, it will query the official repository.

You can also pass in options to limit the number of results per page and the page to go to like so:

```js
{
    perPage: 10,
    page: 4
}
```

Below is an example of what's returned:

```json
[
    {
        "name": "latest",
        "full_size": 61215330,
        "id": 1493440,
        "repository": 433668,
        "creator": 534804,
        "last_updater": 534804,
        "last_updated": "2015-12-10T08:48:48.697697Z",
        "image_id": null,
        "v2": true
    }
]
```

#### user(username)
This gets information about a user with the given username.

Below is an example of what's returned:

```json
{
    "id": "73cdba6ec4154672a2ef01c292f38567",
    "username": "ryantheallmighty",
    "full_name": "Ryan Dowling",
    "location": "Victoria, Australia",
    "company": "ATLauncher",
    "profile_url": "",
    "date_joined": "2015-12-01T10:42:00.663328Z",
    "gravatar_url": "https://secure.gravatar.com/avatar/af74a121defc2d50f39c7ee3641131cc.jpg?s=80&r=g&d=mm"
}
```

### Authenticated Requests
These requests require you to [login](#logging-in) to Docker Hub to access.

#### loggedInUser()
This returns information about the current logged in user. It's good to make sure that the login is working.

Below is an example of what's returned:

```json
{
    "id": "73cdba6ec4154672a2ef01c292f38567",
    "username": "ryantheallmighty",
    "full_name": "Ryan Dowling",
    "location": "Victoria, Australia",
    "company": "ATLauncher",
    "gravatar_email": "",
    "is_staff": false,
    "is_admin": false,
    "profile_url": "",
    "date_joined": "2015-12-01T10:42:00.663328Z",
    "gravatar_url": "https://secure.gravatar.com/avatar/af74a121defc2d50f39c7ee3641131cc.jpg?s=80&r=g&d=mm"
}
```

#### addCollaborator(username, repository, collaborator)
This adds the given collaborator to a given repository/user combination.

Below is an example of what's returned:

```json
{
   "user": "username"
}
```

#### buildDetails(username, repository, code)
This gets the details for a given build code for a given repository/user combination.

Below is an example of what's returned:

```json
{
    "id": 3333355,
    "status": -1,
    "created_date": "2016-01-28T09:39:11.261907Z",
    "last_updated": "2016-01-28T09:43:27.832295Z",
    "build_code": "bxfqrgppbdi3dhiumvp7k3",
    "dockertag_name": "latest",
    "cause": null,
    "build_results": {
        "build_code": "bxfqrgppbdi3dhiumvp7k3",
        "build_path": "/",
        "buildmetrics": {
            "uploaded": null,
            "built": null,
            "created": "2016-01-28T09:38:01.272772Z",
            "started": "2016-01-28T09:41:14.249883Z",
            "cloned": "2016-01-28T09:42:15.427018Z",
            "readme": "2016-01-28T09:41:16.314344Z",
            "finished": null,
            "error": "2016-01-28T09:41:18.388163Z",
            "claimed": "2016-01-28T09:37:02.230838Z",
            "bundled": null,
            "dockerfile": "2016-01-28T09:41:17.398032Z",
            "failure": null
        },
        "created_at": "2016-01-28T09:39:11.261Z",
        "docker_repo": "ryantheallmighty/maven-custom",
        "docker_tag": "latest",
        "docker_user": "ryantheallmighty",
        "dockerfile_contents": "FROM 3-jdk-8\n\nRUN apt-get update && apt-get install -y sudo && echo \"ALL ALL=(ALL) NOPASSWD: ALL\" >> /etc/sudoers && rm -rf /var/lib/apt/lists/*\n",
        "error": "Build process failed: Error: image library/3-jdk-8:latest not found",
        "failure": "Build failed: Error: image library/3-jdk-8:latest not found",
        "last_updated": "2016-01-28T09:43:27.832Z",
        "logs": "Cloning into 'bxfqrgppbdi3dhiumvp7k3'...\nKernelVersion: 3.13.0-40-generic\nOs: linux\nBuildTime: Mon Oct 12 05:37:18 UTC 2015\nApiVersion: 1.20\nVersion: 1.8.3\nGitCommit: f4bf5c7\nArch: amd64\nGoVersion: go1.4.2\nStep 0 : FROM 3-jdk-8\nError: image library/3-jdk-8:latest not found",
        "readme_contents": "# docker-maven-custom\nThis is a custom Docker image with Maven with sudo installed to allow non root users to run commands\n",
        "source_branch": "master",
        "source_type": "git",
        "source_url": "https://github.com/RyanTheAllmighty/docker-maven-custom.git"
    }
}
```

#### buildHistory(username, repository, options)
This gets the build history for a given repository/user combination.

You can also pass in options to limit the number of results per page and the page to go to like so:

```js
{
    perPage: 10,
    page: 4
}
```

Below is an example of what's returned:

```json
[
    {
        "id": 3333420,
        "status": 10,
        "created_date": "2016-01-28T09:44:47.667135Z",
        "last_updated": "2016-01-28T09:55:56.381992Z",
        "build_code": "bhgpwqvc69xxhqnqnxukurq",
        "dockertag_name": "latest",
        "cause": null
    },
    {
        "id": 3333355,
        "status": -1,
        "created_date": "2016-01-28T09:39:11.261907Z",
        "last_updated": "2016-01-28T09:43:27.832295Z",
        "build_code": "bxfqrgppbdi3dhiumvp7k3",
        "dockertag_name": "latest",
        "cause": null
    }
]
```

The status refers to the outcome of the build where:

- -1 means it failed
- 10 means it succeeded

There may be other status codes but those are the ones I'm aware of.

I'm unaware of any cases where cause doesn't equal null.

#### buildLinks(username, repository)
This gets the build links for a given repository/user combination.

Below is an example of what's returned:

```json
[
    {
        "id": 12959,
        "from_repo": "ryantheallmighty/maven-custom",
        "to_repo": "maven"
    }
]
```

#### buildSettings(username, repository)
This gets the build settings for a given repository/user combination. This doesn't include links or build triggers.

Below is an example of what's returned:

```json
{
    "repository": 501609,
    "build_name": "RyanTheAllmighty/docker-maven-custom",
    "provider": "github",
    "source_url": "https://github.com/RyanTheAllmighty/docker-maven-custom.git",
    "docker_url": "ryantheallmighty/maven-custom",
    "repo_web_url": "https://github.com/RyanTheAllmighty/docker-maven-custom",
    "repo_type": "git",
    "active": true,
    "repo_id": "50572157",
    "build_tags": [
        {
            "id": 213846,
            "name": "{sourceref}",
            "dockerfile_location": "/",
            "source_name": "/^([^m]|.[^a]|..[^s]|...[^t]|....[^e]|.....[^r]|.{0,5}$|.{7,})/",
            "source_type": "Branch"
        },
        {
            "id": 213845,
            "name": "latest",
            "dockerfile_location": "/",
            "source_name": "master",
            "source_type": "Branch"
        }
    ],
    "deploykey": null,
    "hook_id": null,
    "webhook_id": "7097505"
}
```

#### buildTrigger(username, repository)
This gets the build trigger for a given repository/user combination.

Below is an example of what's returned:

```json
{
    "token": "UUID-HERE",
    "active": true,
    "trigger_url": "https://registry.hub.docker.com/u/ryantheallmighty/maven-custom/trigger/UUID-HERE/"
}
```

#### buildTriggerHistory(username, repository)
This gets the build triggers for a given repository/user combination.

Below is an example of what's returned:

```json
[
    {
        "ip_address": "203.219.62.185                         ",
        "result": "triggered",
        "result_desc": "Build Triggered",
        "user_agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.109 Safari/537.36",
        "request_body": null,
        "created": "2016-02-17T01:49:36.614030Z",
        "build_code": "bqxx7gwbqgbn9pvs72vthnz"
    }
]
```

In my testing the ip_address filed contained a large amount of whitespace after the actual IP address. I've left this in as Docker Hub returns it, so you may wish to do your own trimming.

#### collaborators(username, repository)
This gets the collaborators for a given repository/user combination.

Below is an example of what's returned:

```json
[
    {
        "user": "ryantheallmighty"
    }
]
```

#### createBuildLink(username, repository, to_repo)
This creates a build link to a given repository to the given to_repo which should be in format 'username/repository' or just 'repository' for official repositories.

Below is an example of what's returned:

```json
{
    "id": 13924,
    "from_repo": "ryantheallmighty/maven-custom",
    "to_repo": "debian"
}
```

#### createBuildTag(username, repository, details)
This creates a build tag to a given repository.

Passing in an object with the details:

```js
{
    dockerfile_location: '/'
    name: 'tag-name'
    source_name: 'master'
    source_type: 'Branch'
}
```

You may leave out the dockerfile_location and it will default to '/' and the same for name which will default to 'latest'.

source_type is either Branch or Tag and source_name should be the name of the tag or branch to build from. source_type will default to 'Branch' if left out.

Below is an example of what's returned:

```json
{
    "id": 228073,
    "name": "tag-name",
    "dockerfile_location": "/",
    "source_name": "master",
    "source_type": "Branch"
}
```

#### createRepository(username, name, details)
This creates a new repository under the username and name provided with the details provided.

Passing in an object with the details:

```js
{
    description: 'Test',
    full_description: 'Test',
    is_private: false
}
```

Below is an example of what's returned:

```json
{
    "user": "ryantheallmighty",
    "name": "test",
    "namespace": "ryantheallmighty",
    "status": 0,
    "description": "Test",
    "is_private": false,
    "is_automated": false,
    "can_edit": true,
    "star_count": 0,
    "pull_count": 0,
    "last_updated": null,
    "full_description": "Test"
}
```

#### createAutomatedBuild(username, name, details)
This creates a new automated build under the username and name provided with the details provided.

An example of what the Docker Hub web frontend does:

```json
{
    "name": "dotfiles",
    "namespace": "ryantheallmighty",
    "description": "asdasdasd",
    "vcs_repo_name": "ryantheallmighty/dotfiles",
    "provider": "github",
    "dockerhub_repo_name": "ryantheallmighty/dotfiles",
    "is_private":false,
    "active":true,
    "build_tags":[
        {
            "name": "latest",
            "source_type": "Branch",
            "source_name": "master",
            "dockerfile_location": "/"
        },
        {
            "name": "{sourceref}",
            "source_type": "Branch",
            "source_name": "/^([^m]|.[^a]|..[^s]|...[^t]|....[^e]|.....[^r]|.{0,5}$|.{7,})/",
            "dockerfile_location": "/"
        }
    ]
}
```

If no build_tags are provided then it will create the default build tag of tag name 'latest' on branch 'master' with a dockerfile location of '/'.

Below is an example of what's returned:

```json
{
    "repository": 532085,
    "build_name": "RyanTheAllmighty/AllmightyBot-Node-Server",
    "provider": "github",
    "source_url": "https://github.com/RyanTheAllmighty/AllmightyBot-Node-Server.git",
    "docker_url": "ryantheallmighty/allmightybot-node-server",
    "repo_web_url": "https://github.com/RyanTheAllmighty/AllmightyBot-Node-Server",
    "repo_type": "git",
    "active": true,
    "repo_id": 30229068,
    "build_tags": [
        {
            "id": 228108,
            "name": "test",
            "dockerfile_location": "/",
            "source_name": "test",
            "source_type": "Branch"
        },
        {
            "id": 228107,
            "name": "latest",
            "dockerfile_location": "/",
            "source_name": "master",
            "source_type": "Branch"
        }
    ],
    "deploykey": null,
    "hook_id": null,
    "webhook_id": 7336911
}
```

Please note that the only 2 providers at the time of writing this are 'github' and 'bitbucket' and other source source url's and providers will most likely not work.

#### createWebhook(username, name, webhookName)
This creates a new webhook for a repository you own.

Below is an example of what's returned:

```json
{
    "id": 8551,
    "name": "Test",
    "active": true,
    "expect_final_callback": true,
    "creator": "ryantheallmighty",
    "last_updated": "2015-12-12T11:25:48.808294Z",
    "last_updater": "ryantheallmighty",
    "hooks": []
}
```

Once a webhook has been created you can then add hook urls to it with [createWebhookHook](#createWebhookHook) below.

#### createWebhookHook(username, name, webhookID, url)
This creates a new webhook hook for an existing webhook.

Below is an example of what's returned:

```json
{
    "id": 10020,
    "creator": "ryantheallmighty",
    "last_updater": "ryantheallmighty",
    "hook_url": "https://www.example.com",
    "date_added": "2015-12-12T11:53:24.743298Z",
    "last_updated": "2015-12-12T11:53:24.746349Z",
    "active": true
}
```

#### deleteBuildLink(username, name, id)
This deletes a build link given by the id for the given repository.

This method returns nothing on success, but an error in the .catch() block of the promise indicates an error there.

#### deleteBuildTag(username, name, id)
This deletes a build tag given by the id for the given repository.

This method returns nothing on success, but an error in the .catch() block of the promise indicates an error there.

#### deleteCollaborator(username, name, collaborator)
This deletes a collaborator given by their username for the given repository.

This method returns nothing on success, but an error in the .catch() block of the promise indicates an error there.

#### deleteRepository(username, name)
This deletes a repository you own.

**WARNING**: There is no going back once this method is called! So be absolutely sure this is what you want.

This method returns nothing on success, but an error in the .catch() block of the promise indicates an error there.

#### deleteWebhook(username, name, webhookID)
This deletes a webhook for a repository you own.

This method returns nothing on success, but an error in the .catch() block of the promise indicates an error there.

#### registrySettings()
This gets the registry settings for the current logged in user containing information about the number of private repositories used/available.

Below is an example of what's returned:

```json
{
    "private_repo_used": 0,
    "num_free_private_repos": 0,
    "private_repo_limit": 1,
    "private_repo_available": 1,
    "private_repo_percent_used": 0.0,
    "default_repo_visibility": "public"
}
```

#### saveBuildTag(username, repository, id, details)
This saves the details of a given build tag id in the given repository.

Passing in an object with the details:

```js
{
    name: 'tag-name'
    dockerfile_location: '/'
    source_name: 'master'
    source_type: 'Branch'
}
```

You may leave out the dockerfile_location and it will default to '/'.

source_type is either Branch or Tag and source_name should be the name of the tag or branch to build from. source_name will default to 'master' and source_type will default to 'Branch' if left out.

Below is an example of what's returned:

```json
{
    "id": 213845,
    "name": "latest",
    "dockerfile_location": "/",
    "source_name": "master",
    "source_type": "Branch"
}
```

Please note that trying to trigger a build with details which don't match any of the repositories build tags will have no effect and will return an empty array.

#### setRepositoryDescription(username, name, descriptions)
This sets one or both of the descriptions for a repository you own.

Passing in an object with the short, full, or both descriptions:

```js
{
    short: "A short description",
    full: "A full description"
}
```

This returns the same information as [repository(username, name)](#repositoryusername-name).

#### setRepositoryPrivacy(username, name, private)
This sets the privacy (public or private) for a given repository.

Pass in `true` for the `privacy` field to make the repository private, and `false` for public.

This method returns nothing on success, but an error in the .catch() block of the promise indicates an error there.

#### starRepository(username, name)
This stars a given repository.

This method returns nothing on success, but an error in the .catch() block of the promise indicates an error there.

#### triggerBuild(username, repository, details)
This triggers a build of the repository.

Passing in an object with the details:

```js
{
    dockerfile_location: '/'
    source_name: 'master'
    source_type: 'Branch'
}
```

You may leave out the dockerfile_location and it will default to '/'.

source_type is either Branch or Tag and source_name should be the name of the tag or branch to build from. source_name will default to 'master' and source_type will default to 'Branch' if left out.

Below is an example of what's returned:

```json
[
    {
        "source_type": "Branch",
        "source_name": "test",
        "evaluated_tag_name": "latest",
        "build_code": "bpzaqzu4nxpypzjren5vapt",
        "msg": "Build submitted",
        "queued_for_retry": false
    }
]
```

Please note that trying to trigger a build with details which don't match any of the repositories build tags will have no effect and will return an empty array.

#### unstarRepository(username, name)
This unstars a given repository.

This method returns nothing on success, but an error in the .catch() block of the promise indicates an error there.

#### webhooks(username, name, options)
This gets the webhooks for a repository you own.

You can also pass in options to limit the number of results per page and the page to go to like so:

```js
{
    perPage: 10,
    page: 4
}
```

Below is an example of what's returned:

```json
[
    {
        "id": 8550,
        "name": "Test",
        "active": true,
        "expect_final_callback": true,
        "creator": "ryantheallmighty",
        "last_updated": "2015-12-12T11:19:08.163295Z",
        "last_updater": "ryantheallmighty",
        "hooks": [
            {
                "id": 10014,
                "creator": "ryantheallmighty",
                "last_updater": "ryantheallmighty",
                "hook_url": "https://www.example.com",
                "date_added": "2015-12-12T11:19:08.474922Z",
                "last_updated": "2015-12-12T11:19:08.477809Z",
                "active": true
            }
        ]
    }
]
```

## Support
If you're having issues please feel free to [open an issue](https://github.com/RyanTheAllmighty/Docker-Hub-API/issues/new).

## Testing & Linting
To run this applications tests and linter, simply install Gulp globally with the below command:

```
npm install -g gulp
```

Then run the following command in the directory this repository was cloned into:

```
gulp
```

The gulpfile gives access to a few methods shown below:

- jscs: Runs the JSCS tool to check JS code.
- jshint: Runs the JSHint tool to check JS code.
- test: Runs the mocha tests.
- style: Runs the jscs and jshint tasks to check JS code.
- watch: Runs all 3 main tasks and then watches for file changes to rerun those tasks constantly as files are changed.

By default Gulp is set to run the jscs, jshint and test tasks when no arguments are provided to it.

### Note about authentication
The tests will test authenticated routes which require access to three environment variables to work correctly:

- DOCKER_HUB_USERNAME
- DOCKER_HUB_PASSWORD
- DOCKER_HUB_LOGIN_TOKEN

The values for these should be pretty straight forward besides the DOCKER_HUB_LOGIN_TOKEN which is a JWT token sent by Docker HUB after a login.

The best way to retrieve it is to check your browsers cookies for 'https://hub.docker.com' and copy the contents of the cookie named 'jwt'.

## Coding standards & styling guidelines
Please see the [STYLE.md](https://github.com/RyanTheAllmighty/Docker-Hub-API/blob/master/STYLE.md) file for coding standards and style guidelines.

## License
This work is licensed under the GNU General Public License v3.0. To view a copy of this license, visit http://www.gnu.org/licenses/gpl-3.0.txt.
