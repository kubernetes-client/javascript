# Changes
This file marks the changes in each version.

## 0.8
### 0.8.0
#### Additions
- Add `logout()` method

#### Fixes
- Fix the logic around error throwing in requests with `error: false` in the response

## 0.7
### 0.7.0
#### Additions
- Add in setRepositoryPrivacy option. Closes #20

## 0.6
### 0.6.0
#### Additions
- Add package-lock.json

#### Fixes
- Fix issues with createAutomatedBuild not working with users passed in parameters. Fixes #14
- Fix saveBuildTag not being defined as in the README. Fixes #12

## 0.5
### 0.5.1
#### Fixes
- Fix entrypoint in package.json.

### 0.5.0
#### Additions
- Add in methods for querying and interacting with automated builds.
- Add in methods for querying and interacting with collaborators for repositories.
- Add in `registrySettings` method to get registry settings (number of private repositories available/used) for the logged in user.

## 0.4
### 0.4.0
#### Additions
- Add in `deleteTag` thanks to [Borales](https://github.com/Borales).

## 0.3
### 0.3.1
#### Fixes
- Fix issue with creating non private repositories.

### 0.3.0
#### Additions
- Add in `starRepository` and `unstarRepository` methods to star/unstar a given repository.
- Add in `createRepository` and `deleteRepository` methods to create/delete a repository.

## 0.2
### 0.2.0
#### Additions
- Add in `comments` method to get the comments for a repository.
- Add in `setRepositoryDescription` method to set the short/full description for your own repositories.
- Add in `webhooks` method to get the webhooks for a repository you own.
- Add in `createWebhook` method to create a webhook for a repository you own.
- Add in `createWebhookHook` method to create a webhook hook for an existing webhook.
- Add in `deleteWebhook` method to delete a webhook for a repository you own.

## 0.1
### 0.1.0
#### Additions
- Add in logging in methods to access authenticated routes.

## 0.0
### 0.0.2
#### Additions
- Addition of a bunch of stuff (technical I know).

### 0.0.1
#### Additions
- Initial release
