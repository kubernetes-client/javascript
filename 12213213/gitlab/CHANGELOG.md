## [14.2.2](https://github.com/jdalrymple/node-gitlab/compare/14.2.1...14.2.2) (2020-01-30)


### Bug Fixes

* Incorrect request method in MergeRequests.approvalState() method ([#586](https://github.com/jdalrymple/node-gitlab/issues/586)) ([cb5f822](https://github.com/jdalrymple/node-gitlab/commit/cb5f8228ca1f64cc55b79e1ef475c3d49568267a))

## [14.2.1](https://github.com/jdalrymple/node-gitlab/compare/14.2.0...14.2.1) (2020-01-20)


### Bug Fixes

* added file extension for dummy file name in project import ([#561](https://github.com/jdalrymple/node-gitlab/issues/561)) ([f45cb68](https://github.com/jdalrymple/node-gitlab/commit/f45cb68498b54a2ad1ab1371589d0152d76adf11)), closes [/gitlab.com/gitlab-org/gitlab-foss/issues/50944#note_101737263](https://github.com//gitlab.com/gitlab-org/gitlab-foss/issues/50944/issues/note_101737263)

# [14.2.0](https://github.com/jdalrymple/node-gitlab/compare/14.1.1...14.2.0) (2020-01-17)


### Features

* Adding support for merge_requests in the Deployments API ([911078b](https://github.com/jdalrymple/node-gitlab/commit/911078bba30145a98ba051e672963dbbe8816a6a)), closes [#554](https://github.com/jdalrymple/node-gitlab/issues/554)

## [14.1.1](https://github.com/jdalrymple/node-gitlab/compare/14.1.0...14.1.1) (2020-01-03)


### Bug Fixes

* resourceDiscussions.editNote add content params, and allowed discussionId to accept a string type ([#524](https://github.com/jdalrymple/node-gitlab/issues/524)) ([22d916a](https://github.com/jdalrymple/node-gitlab/commit/22d916a05fdf2f4361fa2e9d17fdd8784ed6bfb3))

# [14.1.0](https://github.com/jdalrymple/node-gitlab/compare/14.0.1...14.1.0) (2019-12-30)


### Bug Fixes

* make ResourceMembers.all/show delivery correct options params ([#521](https://github.com/jdalrymple/node-gitlab/issues/521)) ([505b407](https://github.com/jdalrymple/node-gitlab/commit/505b4072f3441440fd4903089d83d000e701e84c)), closes [#518](https://github.com/jdalrymple/node-gitlab/issues/518)


### Features

* Added support for the Vulnerability Findings API ([#517](https://github.com/jdalrymple/node-gitlab/issues/517)) ([497bf94](https://github.com/jdalrymple/node-gitlab/commit/497bf948d97d58dbe0bc2f57c47c92d646a29790))

## [14.0.1](https://github.com/jdalrymple/node-gitlab/compare/14.0.0...14.0.1) (2019-12-23)


### Bug Fixes

* Adding back functionality for rejectUnauthorized http option ([#502](https://github.com/jdalrymple/node-gitlab/issues/502)) ([0f17bed](https://github.com/jdalrymple/node-gitlab/commit/0f17bedc0b6ec82793d5f7e6f9c3f53b030a642e))

# [14.0.0](https://github.com/jdalrymple/node-gitlab/compare/13.0.0...14.0.0) (2019-12-21)


### Bug Fixes

* Typing on GPGKey method arguments was missing ([#514](https://github.com/jdalrymple/node-gitlab/issues/514)) ([234c9a7](https://github.com/jdalrymple/node-gitlab/commit/234c9a75db9be752e6d4febee171e3b44be6a30a))
* Typing on Group and Project variable keys was incorrect [#512](https://github.com/jdalrymple/node-gitlab/issues/512) ([#515](https://github.com/jdalrymple/node-gitlab/issues/515)) ([c7afca5](https://github.com/jdalrymple/node-gitlab/commit/c7afca523160ac19707d0207b9892a81b799e645))


### BREAKING CHANGES

* The title property is not required for the add method.

# [13.0.0](https://github.com/jdalrymple/node-gitlab/compare/12.1.0...13.0.0) (2019-12-09)


### Features

* Adding ability to get a singular member of a project or group, including inheritedMemebrs ([#508](https://github.com/jdalrymple/node-gitlab/issues/508)) ([807171c](https://github.com/jdalrymple/node-gitlab/commit/807171c3ff29977e8f6f5faa9603c550334c2192)), closes [#507](https://github.com/jdalrymple/node-gitlab/issues/507)


### BREAKING CHANGES

* Updated the Members.all function to have the inheritedMembers option to be in the optional object.

# [12.1.0](https://github.com/jdalrymple/node-gitlab/compare/12.0.1...12.1.0) (2019-12-05)


### Bug Fixes

* Removing required options object in a few of the API methods ([#505](https://github.com/jdalrymple/node-gitlab/issues/505)) ([b709ef6](https://github.com/jdalrymple/node-gitlab/commit/b709ef6716d15368c8775d77e5eb0cf22d6369a7))


### Features

* Add Group/File schemas ([#506](https://github.com/jdalrymple/node-gitlab/issues/506)) ([f467816](https://github.com/jdalrymple/node-gitlab/commit/f467816070bffcd3776e5dc3e6074c92bf6d644e))

## [12.0.1](https://github.com/jdalrymple/node-gitlab/compare/12.0.0...12.0.1) (2019-11-27)

### Bug Fixes

- Encode slug value for Wikis API ([#501](https://github.com/jdalrymple/node-gitlab/issues/501)) ([9c56d48](https://github.com/jdalrymple/node-gitlab/commit/9c56d4819ba120a1ea338fceb950733f0f59f886)), closes [#490](https://github.com/jdalrymple/node-gitlab/issues/490)

# [12.0.0](https://github.com/jdalrymple/node-gitlab/compare/11.6.0...12.0.0) (2019-11-21)

- Switching version option type ([6558f09](https://github.com/jdalrymple/node-gitlab/commit/6558f09522ccb27d4314d99394086301fe5ae85e))

### Bug Fixes

- Fixing the inability to use environment variables in the cli export ([#463](https://github.com/jdalrymple/node-gitlab/issues/463)) ([79d8c71](https://github.com/jdalrymple/node-gitlab/commit/79d8c718b03946e4fc02d57032f37747b1a783f7)), closes [#458](https://github.com/jdalrymple/node-gitlab/issues/458)

### BREAKING CHANGES

- Switch the version option to be a number and not a string. For example 4 instead of 'v4'.

# [11.6.0](https://github.com/jdalrymple/node-gitlab/compare/11.5.1...11.6.0) (2019-11-20)

### Features

- Add Group.projects ([#494](https://github.com/jdalrymple/node-gitlab/issues/494)) ([9def4e7](https://github.com/jdalrymple/node-gitlab/commit/9def4e7f8e7956413b40f159fddefb989fd34628)), closes [#384](https://github.com/jdalrymple/node-gitlab/issues/384)

## [11.5.1](https://github.com/jdalrymple/node-gitlab/compare/11.5.0...11.5.1) (2019-11-14)

### Bug Fixes

- Fixing the map.json file location ([ced9415](https://github.com/jdalrymple/node-gitlab/commit/ced94153d2437c28f4e171ece7573eaf50f7848c)), closes [#491](https://github.com/jdalrymple/node-gitlab/issues/491)

# [11.5.0](https://github.com/jdalrymple/node-gitlab/compare/11.4.2...11.5.0) (2019-11-13)

### Features

- Add downloadSingleArtifactFileFromRef method ([#493](https://github.com/jdalrymple/node-gitlab/issues/493)) ([1967984](https://github.com/jdalrymple/node-gitlab/commit/196798472ae79018132f02ab3cfa3bbb60535148))

## [11.4.2](https://github.com/jdalrymple/node-gitlab/compare/11.4.1...11.4.2) (2019-10-28)

### Bug Fixes

- Non standard mimetype was not handled ([01d17e8](https://github.com/jdalrymple/node-gitlab/commit/01d17e827004dcef0beb11b7520e02b54d89d898)), closes [#424](https://github.com/jdalrymple/node-gitlab/issues/424)

## [11.4.1](https://github.com/jdalrymple/node-gitlab/compare/11.4.0...11.4.1) (2019-10-28)

### Bug Fixes

- Fixing some minor bugs ([#486](https://github.com/jdalrymple/node-gitlab/issues/486)) ([15c841c](https://github.com/jdalrymple/node-gitlab/commit/15c841c15b11c56a735a6ff41db7aa15fe259125)), closes [#485](https://github.com/jdalrymple/node-gitlab/issues/485) [#475](https://github.com/jdalrymple/node-gitlab/issues/475)

# [11.4.0](https://github.com/jdalrymple/node-gitlab/compare/11.3.2...11.4.0) (2019-10-25)

### Features

- Add support for Issue Statistics ([#481](https://github.com/jdalrymple/node-gitlab/issues/481)) ([fdf2575](https://github.com/jdalrymple/node-gitlab/commit/fdf2575047ef533cccceda2ae8ea717afe8274e5))

## [11.3.2](https://github.com/jdalrymple/node-gitlab/compare/11.3.1...11.3.2) (2019-10-24)

### Bug Fixes

- include all modules for the browser bundle - closes [#475](https://github.com/jdalrymple/node-gitlab/issues/475) ([#476](https://github.com/jdalrymple/node-gitlab/issues/476)) ([cb582b8](https://github.com/jdalrymple/node-gitlab/commit/cb582b80c743f00af81ddd4b03e8f0e20515f894))
- resolve import issues ([#477](https://github.com/jdalrymple/node-gitlab/issues/477)) ([dcfe466](https://github.com/jdalrymple/node-gitlab/commit/dcfe466a18aa3c043459df1514492e04e28ed10d))

## [11.3.1](https://github.com/jdalrymple/node-gitlab/compare/11.3.0...11.3.1) (2019-10-18)

### Bug Fixes

- Fixing missing form variables when triggering pipelines ([#465](https://github.com/jdalrymple/node-gitlab/issues/465)) ([3ac6978](https://github.com/jdalrymple/node-gitlab/commit/3ac6978))

# [11.3.0](https://github.com/jdalrymple/node-gitlab/compare/11.2.3...11.3.0) (2019-10-12)

### Features

- Adding support for profile tokens ([#462](https://github.com/jdalrymple/node-gitlab/issues/462)) ([30f246e](https://github.com/jdalrymple/node-gitlab/commit/30f246e))

## [11.2.3](https://github.com/jdalrymple/node-gitlab/compare/11.2.2...11.2.3) (2019-10-09)

### Bug Fixes

- Epic issues HTTP methods are incorrect ([c63c691](https://github.com/jdalrymple/node-gitlab/commit/c63c691))

## [11.2.2](https://github.com/jdalrymple/node-gitlab/compare/11.2.1...11.2.2) (2019-10-06)

### Features

- **Group Labels:** Add group label support ([39a23a1](https://github.com/jdalrymple/node-gitlab/commit/39a23a1))

### Bug Fixes

- Missing gzip content type from body processing logic ([a684a1e](https://github.com/jdalrymple/node-gitlab/commit/a684a1e)), closes [#447](https://github.com/jdalrymple/node-gitlab/issues/447)

## [11.2.1](https://github.com/jdalrymple/node-gitlab/compare/11.2.0...11.2.1) (2019-10-03)

### Bug Fixes

- **package:** update ky to version 0.15.0 ([203e7a9](https://github.com/jdalrymple/node-gitlab/commit/203e7a9))

# [11.2.0](https://github.com/jdalrymple/node-gitlab/compare/11.1.2...11.2.0) (2019-10-01)

### Features

- **Merge Request:** Add Approval State endpoint ([41c4653](https://github.com/jdalrymple/node-gitlab/commit/41c4653))

## [11.1.2](https://github.com/jdalrymple/node-gitlab/compare/11.1.1...11.1.2) (2019-09-10)

### Bug Fixes

- Forgot to await for the response [#426](https://github.com/jdalrymple/node-gitlab/issues/426) ([8c673c3](https://github.com/jdalrymple/node-gitlab/commit/8c673c3))

## [11.1.1](https://github.com/jdalrymple/node-gitlab/compare/11.1.0...11.1.1) (2019-09-09)

### Bug Fixes

- **package:** update ky to version 0.14.0 ([b907f54](https://github.com/jdalrymple/node-gitlab/commit/b907f54))

# [11.1.0](https://github.com/jdalrymple/node-gitlab/compare/11.0.2...11.1.0) (2019-09-09)

### Features

- Adding support for CLI ([6f90f4c](https://github.com/jdalrymple/node-gitlab/commit/6f90f4c)), closes [#146](https://github.com/jdalrymple/node-gitlab/issues/146)

## [11.0.2](https://github.com/jdalrymple/node-gitlab/compare/11.0.1...11.0.2) (2019-08-30)

### Bug Fixes

- Switching type import to hopefully fix [#417](https://github.com/jdalrymple/node-gitlab/issues/417) ([91cfbf2](https://github.com/jdalrymple/node-gitlab/commit/91cfbf2))

## [11.0.1](https://github.com/jdalrymple/node-gitlab/compare/11.0.0...11.0.1) (2019-08-29)

### Bug Fixes

- Handling empty text responses ([c8deaa2](https://github.com/jdalrymple/node-gitlab/commit/c8deaa2))

# [11.0.0](https://github.com/jdalrymple/node-gitlab/compare/10.2.1...11.0.0) (2019-08-28)

### Bug Fixes

- Adding path argument to the Project Imports API ([97a7c59](https://github.com/jdalrymple/node-gitlab/commit/97a7c59))

### Features

- Add support for the Packages API [#430](https://github.com/jdalrymple/node-gitlab/issues/430) ([47e1ff4](https://github.com/jdalrymple/node-gitlab/commit/47e1ff4))

### BREAKING CHANGES

- Added the path argument to the function header.

## [10.2.1](https://github.com/jdalrymple/node-gitlab/compare/10.2.0...10.2.1) (2019-08-28)

### Bug Fixes

- Adding proper support for the buffer responses ([8bbab73](https://github.com/jdalrymple/node-gitlab/commit/8bbab73))

# [10.2.0](https://github.com/jdalrymple/node-gitlab/compare/10.1.2...10.2.0) (2019-08-22)

### Bug Fixes

- incorrect url path for mr unapprove ([85c3329](https://github.com/jdalrymple/node-gitlab/commit/85c3329))

### Features

- Add Gitlab Blame endpoint to the RespositoryFiles API ([ac670cc](https://github.com/jdalrymple/node-gitlab/commit/ac670cc)), closes [#409](https://github.com/jdalrymple/node-gitlab/issues/409)
- Adding fork relationship support ([76cb783](https://github.com/jdalrymple/node-gitlab/commit/76cb783)), closes [#410](https://github.com/jdalrymple/node-gitlab/issues/410)

## [10.1.2](https://github.com/jdalrymple/node-gitlab/compare/10.1.1...10.1.2) (2019-08-13)

### Bug Fixes

- **package:** update ky to version 0.12.0 ([55fdb7a](https://github.com/jdalrymple/node-gitlab/commit/55fdb7a))
- **package:** update ky-universal to version 0.3.0 ([3767c66](https://github.com/jdalrymple/node-gitlab/commit/3767c66))

## [10.1.1](https://github.com/jdalrymple/node-gitlab/compare/10.1.0...10.1.1) (2019-08-09)

### Bug Fixes

- Removing randomstring dependency to improve support for Angular 8 ([c47564b](https://github.com/jdalrymple/node-gitlab/commit/c47564b)), closes [#407](https://github.com/jdalrymple/node-gitlab/issues/407)

# [10.1.0](https://github.com/jdalrymple/node-gitlab/compare/10.0.3...10.1.0) (2019-08-06)

### Features

- Adding Merge Base endpoint for the Repositories API ([040fc78](https://github.com/jdalrymple/node-gitlab/commit/040fc78)), closes [#400](https://github.com/jdalrymple/node-gitlab/issues/400)

## [10.0.3](https://github.com/jdalrymple/node-gitlab/compare/10.0.2...10.0.3) (2019-08-06)

### Bug Fixes

- Removing deprecated Session endpoint (since GitLab 10.2.0) ([fe720d8](https://github.com/jdalrymple/node-gitlab/commit/fe720d8)), closes [#404](https://github.com/jdalrymple/node-gitlab/issues/404)

## [10.0.2](https://github.com/jdalrymple/node-gitlab/compare/10.0.1...10.0.2) (2019-08-06)

### Bug Fixes

- Adding missing TS type import 'FormData' ([a907c7c](https://github.com/jdalrymple/node-gitlab/commit/a907c7c)), closes [#401](https://github.com/jdalrymple/node-gitlab/issues/401)

## [10.0.1](https://github.com/jdalrymple/node-gitlab/compare/10.0.0...10.0.1) (2019-07-30)

### Bug Fixes

- Update to Ky 0.11.2 ([74e2b62](https://github.com/jdalrymple/node-gitlab/commit/74e2b62))

# [10.0.0](https://github.com/jdalrymple/node-gitlab/compare/9.1.0...10.0.0) (2019-07-15)

### Code Refactoring

- Adding required labelName and colour option to the create method ([199e32d](https://github.com/jdalrymple/node-gitlab/commit/199e32d))

### BREAKING CHANGES

- Labels require a colour and a name to be created. Now the create method takes a second and third argument: 'labelName' and 'color'

# [9.1.0](https://github.com/jdalrymple/node-gitlab/compare/9.0.1...9.1.0) (2019-07-12)

### Features

- Adding support for branchName key seen in the Gitlab API v3 ([356466f](https://github.com/jdalrymple/node-gitlab/commit/356466f))

## [9.0.1](https://github.com/jdalrymple/node-gitlab/compare/9.0.0...9.0.1) (2019-07-11)

### Bug Fixes

- Accept any variables that begin with uppercase letters and include an underscore [#254](https://github.com/jdalrymple/node-gitlab/issues/254) ([fe39590](https://github.com/jdalrymple/node-gitlab/commit/fe39590))

# [9.0.0](https://github.com/jdalrymple/node-gitlab/compare/8.0.0...9.0.0) (2019-07-04)

### Bug Fixes

- Fixing project upload [#355](https://github.com/jdalrymple/node-gitlab/issues/355) ([184253e](https://github.com/jdalrymple/node-gitlab/commit/184253e))

### Code Refactoring

- Standardizing the upload argument header ([aa33061](https://github.com/jdalrymple/node-gitlab/commit/aa33061))

### BREAKING CHANGES

- path argument is no longer required/available. Now, it follows a similar function header to Project.upload with an optional metadata argument
  Missing dependency
  dede

# [8.0.0](https://github.com/jdalrymple/node-gitlab/compare/7.0.1...8.0.0) (2019-07-03)

### Bug Fixes

- PushRules were missing from the ProjectBundle export and the README. [#373](https://github.com/jdalrymple/node-gitlab/issues/373) ([f7425a7](https://github.com/jdalrymple/node-gitlab/commit/f7425a7))

### BREAKING CHANGES

- PushRule export was renamed to PushRules to match the plurality of the export names

## [7.0.1](https://github.com/jdalrymple/node-gitlab/compare/7.0.0...7.0.1) (2019-07-01)

### Bug Fixes

- Revert support for the rejectUnauthorized option until issues in [#377](https://github.com/jdalrymple/node-gitlab/issues/377) are sorted. ([f9a47c7](https://github.com/jdalrymple/node-gitlab/commit/f9a47c7))

# [7.0.0](https://github.com/jdalrymple/node-gitlab/compare/6.4.0...7.0.0) (2019-06-28)

### Features

- Adding missing endpoints for deploy keys [#373](https://github.com/jdalrymple/node-gitlab/issues/373) ([b23dd29](https://github.com/jdalrymple/node-gitlab/commit/b23dd29))

### BREAKING CHANGES

- all method now takes an optional object since projectId is no longer required. If no projectId is passed, the all method returns all deploy keys across all projects of the GitLab instance

# [6.4.0](https://github.com/jdalrymple/node-gitlab/compare/6.3.7...6.4.0) (2019-06-28)

### Bug Fixes

- Handle body types properly if not JSON ie formData ([a135841](https://github.com/jdalrymple/node-gitlab/commit/a135841)), closes [#355](https://github.com/jdalrymple/node-gitlab/issues/355)
- Missing headers when posting json data ([861f89e](https://github.com/jdalrymple/node-gitlab/commit/861f89e))
- Use the correct agent configuration for the rejectUnauthorized option ([775d755](https://github.com/jdalrymple/node-gitlab/commit/775d755)), closes [#357](https://github.com/jdalrymple/node-gitlab/issues/357)

### Features

- Adding support for Group Issues ([00068c9](https://github.com/jdalrymple/node-gitlab/commit/00068c9)), closes [#306](https://github.com/jdalrymple/node-gitlab/issues/306)

## [6.3.7](https://github.com/jdalrymple/node-gitlab/compare/6.3.6...6.3.7) (2019-06-12)

### Bug Fixes

- string regex :sob: ([7e94e0b](https://github.com/jdalrymple/node-gitlab/commit/7e94e0b))

## [6.3.6](https://github.com/jdalrymple/node-gitlab/compare/6.3.5...6.3.6) (2019-06-12)

### Bug Fixes

- Use improved pagination regex to remove service url + leaf ([2b290b5](https://github.com/jdalrymple/node-gitlab/commit/2b290b5)), closes [#352](https://github.com/jdalrymple/node-gitlab/issues/352)

## [6.3.5](https://github.com/jdalrymple/node-gitlab/compare/6.3.4...6.3.5) (2019-06-12)

### Bug Fixes

- Fix error due to Typescript 3.5.1 ([bd4e141](https://github.com/jdalrymple/node-gitlab/commit/bd4e141))
- Fix error due to Typescript 3.5.1 ([5474f06](https://github.com/jdalrymple/node-gitlab/commit/5474f06))
- Make package Typescript-conformant ([da1a8f6](https://github.com/jdalrymple/node-gitlab/commit/da1a8f6))
- Update Typescript to 3.5.1 ([8f5fec5](https://github.com/jdalrymple/node-gitlab/commit/8f5fec5))

## [6.3.4](https://github.com/jdalrymple/node-gitlab/compare/6.3.3...6.3.4) (2019-06-11)

### Bug Fixes

- Wrong endpoint being passed during pagination ([a2a6126](https://github.com/jdalrymple/node-gitlab/commit/a2a6126)), closes [#344](https://github.com/jdalrymple/node-gitlab/issues/344)

## [6.3.3](https://github.com/jdalrymple/node-gitlab/compare/6.3.2...6.3.3) (2019-06-10)

### Bug Fixes

- Handle edge cases where content-type headers are missing or the content text is null ([dabcb3d](https://github.com/jdalrymple/node-gitlab/commit/dabcb3d)), closes [#343](https://github.com/jdalrymple/node-gitlab/issues/343)

## [6.3.2](https://github.com/jdalrymple/node-gitlab/compare/6.3.1...6.3.2) (2019-06-10)

### Bug Fixes

- Moving the error wrapper for the Ky Requester to be only around the Ky function request. Also checking to see if the error contains a response before looking for an error message. ([a54a6ae](https://github.com/jdalrymple/node-gitlab/commit/a54a6ae)), closes [#343](https://github.com/jdalrymple/node-gitlab/issues/343)

## [6.3.1](https://github.com/jdalrymple/node-gitlab/compare/6.3.0...6.3.1) (2019-06-10)

### Bug Fixes

- Resource Discussion API was using the incorrect url to add a note ([#345](https://github.com/jdalrymple/node-gitlab/issues/345)) ([c6ff86d](https://github.com/jdalrymple/node-gitlab/commit/c6ff86d)), closes [#342](https://github.com/jdalrymple/node-gitlab/issues/342)

# [6.3.0](https://github.com/jdalrymple/node-gitlab/compare/6.2.0...6.3.0) (2019-06-08)

### Features

- Add configurable request timeout ([#341](https://github.com/jdalrymple/node-gitlab/issues/341)) ([4d99902](https://github.com/jdalrymple/node-gitlab/commit/4d99902))

# [6.2.0](https://github.com/jdalrymple/node-gitlab/compare/6.1.0...6.2.0) (2019-06-07)

### Features

- Adding support for Container Registry API [#274](https://github.com/jdalrymple/node-gitlab/issues/274) ([59f9286](https://github.com/jdalrymple/node-gitlab/commit/59f9286))

# [6.1.0](https://github.com/jdalrymple/node-gitlab/compare/6.0.0...6.1.0) (2019-06-06)

### Bug Fixes

- Make the options argument optional [#336](https://github.com/jdalrymple/node-gitlab/issues/336) ([cf3c17e](https://github.com/jdalrymple/node-gitlab/commit/cf3c17e))

### Features

- Adding support for ReleaseLinks API ([d6a2248](https://github.com/jdalrymple/node-gitlab/commit/d6a2248))
- Adding support for Releases API [#295](https://github.com/jdalrymple/node-gitlab/issues/295) ([7191e81](https://github.com/jdalrymple/node-gitlab/commit/7191e81))

# [6.0.0](https://github.com/jdalrymple/node-gitlab/compare/5.0.2...6.0.0) (2019-06-02)

### Code Refactoring

- **RepositoryFiles:** Missing a required argument from the function headers ([e13c593](https://github.com/jdalrymple/node-gitlab/commit/e13c593))

### BREAKING CHANGES

- **RepositoryFiles:** create, edit and remove functions now require the commitMessage function argument

## [5.0.2](https://github.com/jdalrymple/node-gitlab/compare/5.0.1...5.0.2) (2019-05-31)

### Bug Fixes

- Properly handling the response bodies returned from gitlab ([881b87b](https://github.com/jdalrymple/node-gitlab/commit/881b87b)), closes [#320](https://github.com/jdalrymple/node-gitlab/issues/320)

## [5.0.1](https://github.com/jdalrymple/node-gitlab/compare/5.0.0...5.0.1) (2019-05-26)

### Bug Fixes

- **package:** Making lint-staged a dev dependency ([5c949b2](https://github.com/jdalrymple/node-gitlab/commit/5c949b2))
- **package:** Missing dependency ([40f5d21](https://github.com/jdalrymple/node-gitlab/commit/40f5d21))

# [5.0.0](https://github.com/jdalrymple/node-gitlab/compare/4.5.1...5.0.0) (2019-05-25)

### Bug Fixes

- [#227](https://github.com/jdalrymple/node-gitlab/issues/227) Fixing array syntax thanks to Lukas Eipert (https://github.com/leipert) ([aa6acb1](https://github.com/jdalrymple/node-gitlab/commit/aa6acb1))
- Fixing Todos support. If todoId was not passed, an undefined value would be introduced into the url ([cea5a2b](https://github.com/jdalrymple/node-gitlab/commit/cea5a2b))
- Fixing typing structure and configuration ([a79dabe](https://github.com/jdalrymple/node-gitlab/commit/a79dabe))
- Merge Request Approvals API did not match official API ([e4ba731](https://github.com/jdalrymple/node-gitlab/commit/e4ba731))
- Removed xhr library in favour of ky, and switched request for got for a smaller package size and retry functionality ([ee4730f](https://github.com/jdalrymple/node-gitlab/commit/ee4730f))
- ResourceAwardEmojis API wasn't properly filtering based on awardId ([a7b29c1](https://github.com/jdalrymple/node-gitlab/commit/a7b29c1))

### Code Refactoring

- Expose optional parameters for the NotiicationSettings API ([1ba9126](https://github.com/jdalrymple/node-gitlab/commit/1ba9126))
- Removed Fs dependency for better browser support ([037f4ed](https://github.com/jdalrymple/node-gitlab/commit/037f4ed))
- Removed inconsistent export strategies ([03e85ef](https://github.com/jdalrymple/node-gitlab/commit/03e85ef))
- Removed the confusing url parameter from BaseService ([26e2e52](https://github.com/jdalrymple/node-gitlab/commit/26e2e52))
- Requiring content for the Note related APIs ([7453779](https://github.com/jdalrymple/node-gitlab/commit/7453779))
- Similar to the RepositoryFiles API changes ([97dd060](https://github.com/jdalrymple/node-gitlab/commit/97dd060))
- SystemHooks API function header updates ([6ea90d3](https://github.com/jdalrymple/node-gitlab/commit/6ea90d3))
- Triggers API required arguments exposed as optional ([62e032b](https://github.com/jdalrymple/node-gitlab/commit/62e032b))
- Updating the MergeRequest API's pipeline function header ([46a541b](https://github.com/jdalrymple/node-gitlab/commit/46a541b))

### Features

- Added LDAP support to the Groups API ([3f6d409](https://github.com/jdalrymple/node-gitlab/commit/3f6d409))
- Added the ability to add sudo to specific requests ([18effa2](https://github.com/jdalrymple/node-gitlab/commit/18effa2))
- Added the missing edit function to the Groups API ([ee6d490](https://github.com/jdalrymple/node-gitlab/commit/ee6d490))
- Adding the option to conditionally camelize response body ([5f97193](https://github.com/jdalrymple/node-gitlab/commit/5f97193))

### BREAKING CHANGES

- Triggers API pipeline function requires the ref and token
- Notes now require a body argument
- NotificationSettings API edit function now takes one parameter, `options`
- MergeRequest Pipelines require the mergeRequestId
- Updated Approvals API support to match https://docs.gitlab.com/ee/api/merge_request_approvals.html
- Removed dependency on FS. Now the Projects API takes in two arguments `projectId` and `content` as well as an option fileName argument
- Removed projectId from System Hooks API since it wasn't required
- Added content as a required parameter for RepositoryFiles
- Changing everything to named exports for simplicity
- Switching required initialization argument from 'url' to 'host'

## [4.5.1](https://github.com/jdalrymple/node-gitlab/compare/4.5.0...4.5.1) (2019-03-22)

### Bug Fixes

- Updating packages ([2c47d24](https://github.com/jdalrymple/node-gitlab/commit/2c47d24))

# [4.5.0](https://github.com/jdalrymple/node-gitlab/compare/4.4.1...4.5.0) (2019-03-19)

### Features

- Updated MergeRequests API options ([a306799](https://github.com/jdalrymple/node-gitlab/commit/a306799))

# [4.4.1](https://github.com/jdalrymple/node-gitlab/compare/4.3.0...4.4.1) (2019-03-06)

### Features

- **Projects:**

  - Add support for DELETE /projects/:id/fork ([ef53a2](https://github.com/jdalrymple/node-gitlab/commit/ef53a2))

- **MergeRequests:**

  - Add MergeRequest.participants request ([b11a4f](https://github.com/jdalrymple/node-gitlab/commit/b11a4f))

- **Triggers:**
  - Add missing method for triggering pipelines ([5858fc](https://github.com/jdalrymple/node-gitlab/commit/5858fc))

### Bug Fixes

- Add missing / from unshare in Projects ([6fb7f5](https://github.com/jdalrymple/node-gitlab/commit/6fb7f5))
- Change lint api url. ([1d6e6e](https://github.com/jdalrymple/node-gitlab/commit/1d6e6e))
- Implement jobToken property to allow authentication via CI job token ([8f551f](https://github.com/jdalrymple/node-gitlab/commit/8f551f))

### Docs

- Update README.md with `rejectUnauthorized`
- Fixing typo in the host url

# [4.3.0](https://github.com/jdalrymple/node-gitlab/compare/4.2.7...4.3.0) (2018-12-12)

### Breaking

- Added content as a required parameter for RepositoryFiles
- Removed projectId from System Hooks API since it wasn't required
- Removed dependency on FS. Now the Projects API takes in two arguments `projectId` and `content` as well as an option fileName argument
- Changing everything to named exports for simplicity
- Switching required initialization argument from 'url' to 'host'
- Updated Approvals API support to match https://docs.gitlab.com/ee/api/merge_request_approvals.html
- MergeRequest Pipelines require the mergeRequestId
- NotificationSettings API edit function now takes one parameter, `options`
- Changing the access level enum property from master to maintainer as per https://gitlab.com/gitlab-org/gitlab-ce/issues/42751
- Notes now require a body argument instead of checking the options argument for a body parameter
- Bumped min node version to > v10 LTS

### Bug Fixes

- #227 (https://github.com/jdalrymple/node-gitlab/issues/227) Fixing array syntax thanks to Lukas Eipert (https://github.com/leipert) (f9bc34d (https://github.com/jdalrymple/node-gitlab/commit/f9bc34d))
- Fixing Todos support. If todoId was not passed, an undefined value would be introduced into the url (cbeef18 (https://github.com/jdalrymple/node-gitlab/commit/cbeef18))
- ResourceAwardEmojis API wasn't properly filtering based on awardId (70f4315 (https://github.com/jdalrymple/node-gitlab/commit/70f4315))
- Removed xhr library in favour of ky, and switched request for got for a smaller package size and retry functionality
- Fixing ci lint url (#278)
- Fixing form data (#272)
- Fixing randomstring usage (#271)
- Incorrect http method used to update MR approvers #262

### Features

- Added the ability to add sudo to specific requests (780244f (https://github.com/jdalrymple/node-gitlab/commit/780244f))
- Added the missing edit function to the Groups API
- Added LDAP support to the Groups API
- Added missing method for triggering pipelines (#275)
- Implement jobToken property to allow authentication via CI job token (#269)

### Documentation

- Removing xml request docs
- Updating imports to be named imports

### Tests

- Fixing integration test for ApplicationSettings (#273)

## [4.5.1](https://github.com/jdalrymple/node-gitlab/compare/4.5.0...4.5.1) (2019-03-22)

### Bug Fixes

- Updating packages ([2c47d24](https://github.com/jdalrymple/node-gitlab/commit/2c47d24))

# [4.5.0](https://github.com/jdalrymple/node-gitlab/compare/4.4.1...4.5.0) (2019-03-19)

### Features

- Updated MergeRequests API options ([a306799](https://github.com/jdalrymple/node-gitlab/commit/a306799))

# [4.4.1](https://github.com/jdalrymple/node-gitlab/compare/4.3.0...4.4.1) (2019-03-06)

### Features

- **Projects:**

  - Add support for DELETE /projects/:id/fork ([ef53a2](https://github.com/jdalrymple/node-gitlab/commit/ef53a2))

- **MergeRequests:**

  - Add MergeRequest.participants request ([b11a4f](https://github.com/jdalrymple/node-gitlab/commit/b11a4f))

- **Triggers:**
  - Add missing method for triggering pipelines ([5858fc](https://github.com/jdalrymple/node-gitlab/commit/5858fc))

### Bug Fixes

- Add missing / from unshare in Projects ([6fb7f5](https://github.com/jdalrymple/node-gitlab/commit/6fb7f5))
- Change lint api url. ([1d6e6e](https://github.com/jdalrymple/node-gitlab/commit/1d6e6e))
- Implement jobToken property to allow authentication via CI job token ([8f551f](https://github.com/jdalrymple/node-gitlab/commit/8f551f))

### Docs

- Update README.md with `rejectUnauthorized`
- Fixing typo in the host url

# [4.3.0](https://github.com/jdalrymple/node-gitlab/compare/4.2.7...4.3.0) (2018-12-12)

### Features

- **services:** Add protected tags ([8203830](https://github.com/jdalrymple/node-gitlab/commit/8203830))

## [4.2.7](https://github.com/jdalrymple/node-gitlab/compare/4.2.6...4.2.7) (2018-11-26)

### Bug Fixes

- Handing the function arguments in the incorrect order ([26235ff](https://github.com/jdalrymple/node-gitlab/commit/26235ff))

## [4.2.6](https://github.com/jdalrymple/node-gitlab/compare/4.2.5...4.2.6) (2018-11-26)

### Bug Fixes

- Update pagination docs and conditions [#238](https://github.com/jdalrymple/node-gitlab/issues/238) ([266de00](https://github.com/jdalrymple/node-gitlab/commit/266de00))

## [4.2.5](https://github.com/jdalrymple/node-gitlab/compare/4.2.4...4.2.5) (2018-11-26)

### Bug Fixes

- Project variables urls were being generated incorrectly ([28b28cf](https://github.com/jdalrymple/node-gitlab/commit/28b28cf))

## [4.2.4](https://github.com/jdalrymple/node-gitlab/compare/4.2.3...4.2.4) (2018-11-26)

### Bug Fixes

- Event properties using the incorrect boolean operator ([5f21a46](https://github.com/jdalrymple/node-gitlab/commit/5f21a46))

## [4.2.3](https://github.com/jdalrymple/node-gitlab/compare/4.2.2...4.2.3) (2018-11-26)

### Bug Fixes

- Filtering all events shouldnt require an action or a target [#61](https://github.com/jdalrymple/node-gitlab/issues/61) ([cda23b8](https://github.com/jdalrymple/node-gitlab/commit/cda23b8))

## [4.2.1](https://github.com/jdalrymple/node-gitlab/compare/4.2.0...4.2.1) (2018-10-29)

### Bug Fixes

- Updating application settings test to match updated API ([dececa6](https://github.com/jdalrymple/node-gitlab/commit/dececa6))

# [4.2.0](https://github.com/jdalrymple/node-gitlab/compare/4.1.1...4.2.0) (2018-10-10)

### Bug Fixes

- jest.config file to properly run tests again. Follow up issue to fix these exceptions ([dcee7ac](https://github.com/jdalrymple/node-gitlab/commit/dcee7ac))

### Features

- Add sudo abilities [#203](https://github.com/jdalrymple/node-gitlab/issues/203) ([4bf574c](https://github.com/jdalrymple/node-gitlab/commit/4bf574c))

## [4.1.1](https://github.com/jdalrymple/node-gitlab/compare/4.1.0...4.1.1) (2018-09-25)

### Bug Fixes

- Updating ApplicationSettings test ([0d345b7](https://github.com/jdalrymple/node-gitlab/commit/0d345b7))

# [4.1.0](https://github.com/jdalrymple/node-gitlab/compare/4.0.1...4.1.0) (2018-09-19)

### Features

- Added user edit support [#186](https://github.com/jdalrymple/node-gitlab/issues/186) ([95e8999](https://github.com/jdalrymple/node-gitlab/commit/95e8999))
- Adding markdown support [#182](https://github.com/jdalrymple/node-gitlab/issues/182) ([#193](https://github.com/jdalrymple/node-gitlab/issues/193)) ([2113e8e](https://github.com/jdalrymple/node-gitlab/commit/2113e8e))
- Re-add list all project members endpoint ([#190](https://github.com/jdalrymple/node-gitlab/issues/190)) ([5b07b6a](https://github.com/jdalrymple/node-gitlab/commit/5b07b6a)), closes [/github.com/jdalrymple/node-gitlab/commit/e081a1629f33e3af172101b94977f281879539c9#diff-379104d7d595f3793c2d7380496cc3c3](https://github.com//github.com/jdalrymple/node-gitlab/commit/e081a1629f33e3af172101b94977f281879539c9/issues/diff-379104d7d595f3793c2d7380496cc3c3) [#141](https://github.com/jdalrymple/node-gitlab/issues/141)

## [4.0.1](https://github.com/jdalrymple/node-gitlab/compare/4.0.0...4.0.1) (2018-09-06)

### Bug Fixes

- Updating the package.lock ([9b4b6f9](https://github.com/jdalrymple/node-gitlab/commit/9b4b6f9))

# [4.0.0-beta](https://github.com/jdalrymple/node-gitlab/compare/3.11.0...4.0.0-beta) (2018-08-22)

### Major Update

- Migration to Typescript

## [3.11.3](https://github.com/jdalrymple/node-gitlab/compare/3.11.2...3.11.3) (2018-08-31)

### Bug Fixes

- Camelcasing broke the body params ([e50f588](https://github.com/jdalrymple/node-gitlab/commit/e50f588))

## [3.11.2](https://github.com/jdalrymple/node-gitlab/compare/3.11.1...3.11.2) (2018-08-28)

### Bug Fixes

- obey rate limits for all request types correctly ([#170](https://github.com/jdalrymple/node-gitlab/issues/170)) ([4bc7c69](https://github.com/jdalrymple/node-gitlab/commit/4bc7c69)), closes [#165](https://github.com/jdalrymple/node-gitlab/issues/165)
- Testing negated npmignore ([86960c4](https://github.com/jdalrymple/node-gitlab/commit/86960c4))

## [3.11.1](https://github.com/jdalrymple/node-gitlab/compare/3.11.0...3.11.1) (2018-08-28)

### Bug Fixes

- **applications-settings:** Edit of application settings not working ([#169](https://github.com/jdalrymple/node-gitlab/issues/169)) ([f0213ca](https://github.com/jdalrymple/node-gitlab/commit/f0213ca))
- **test:** Application settings api updated ([#177](https://github.com/jdalrymple/node-gitlab/issues/177)) ([0723a7a](https://github.com/jdalrymple/node-gitlab/commit/0723a7a))

# [3.11.0](https://github.com/jdalrymple/node-gitlab/compare/3.10.1...3.11.0) (2018-08-20)

### Bug Fixes

- Revert "fix(api): Updating project members all function to include the inherited members. [#141](https://github.com/jdalrymple/node-gitlab/issues/141)" until properly implemented by GitLab (https://gitlab.com/gitlab-org/gitlab-ee/merge_requests/6669) ([24d9bcd](https://github.com/jdalrymple/node-gitlab/commit/24d9bcd))

### Features

- **projects:** add archive/unarchive functionality ([#168](https://github.com/jdalrymple/node-gitlab/issues/168)) ([5e7b1bd](https://github.com/jdalrymple/node-gitlab/commit/5e7b1bd)), closes [#166](https://github.com/jdalrymple/node-gitlab/issues/166)

## [3.10.1](https://github.com/jdalrymple/node-gitlab/compare/3.10.0...3.10.1) (2018-08-16)

### Bug Fixes

- Typo in PagesDomains all() method ([#162](https://github.com/jdalrymple/node-gitlab/issues/162)) ([128f150](https://github.com/jdalrymple/node-gitlab/commit/128f150))

# [3.10.0](https://github.com/jdalrymple/node-gitlab/compare/3.9.0...3.10.0) (2018-08-15)

### Features

- Expose reject unauthorized in request helper ([#160](https://github.com/jdalrymple/node-gitlab/issues/160)) ([01a2ce2](https://github.com/jdalrymple/node-gitlab/commit/01a2ce2)), closes [#142](https://github.com/jdalrymple/node-gitlab/issues/142)

# [3.9.0](https://github.com/jdalrymple/node-gitlab/compare/3.8.0...3.9.0) (2018-08-15)

### Bug Fixes

- Fix error while throwing an error in RequestHelper ([#156](https://github.com/jdalrymple/node-gitlab/issues/156)) ([177d7fd](https://github.com/jdalrymple/node-gitlab/commit/177d7fd))
- Handling errors before retrying request ([#142](https://github.com/jdalrymple/node-gitlab/issues/142)) [skip-ci](<[bc3b366](https://github.com/jdalrymple/node-gitlab/commit/bc3b366)>)
- Linting Master ([#157](https://github.com/jdalrymple/node-gitlab/issues/157)) ([ab14ed7](https://github.com/jdalrymple/node-gitlab/commit/ab14ed7))

### Features

- Add deploy keys enable functionality ([#155](https://github.com/jdalrymple/node-gitlab/issues/155)) thanks to [Michael Matzka](https://github.com/mimaidms) ([66547ad](https://github.com/jdalrymple/node-gitlab/commit/66547ad))

# [3.8.0](https://github.com/jdalrymple/node-gitlab/compare/3.7.0...3.8.0) (2018-08-14)

### Bug Fixes

- **api:** Updating project members all function to include the inherited members. [#141](https://github.com/jdalrymple/node-gitlab/issues/141) ([e081a16](https://github.com/jdalrymple/node-gitlab/commit/e081a16))
- **package:** update [@semantic-release](https://github.com/semantic-release)/npm to version 5.0.0 ([dc9748d](https://github.com/jdalrymple/node-gitlab/commit/dc9748d))
- **package:** update [@semantic-release](https://github.com/semantic-release)/npm to version 5.0.1 ([12b6ca1](https://github.com/jdalrymple/node-gitlab/commit/12b6ca1)), closes [#139](https://github.com/jdalrymple/node-gitlab/issues/139)
- **package:** Updating packages and fixing [#140](https://github.com/jdalrymple/node-gitlab/issues/140) due to a babel update ([04d1769](https://github.com/jdalrymple/node-gitlab/commit/04d1769))

### Features

- Add push rule service ([#143](https://github.com/jdalrymple/node-gitlab/issues/143)) ([395f83c](https://github.com/jdalrymple/node-gitlab/commit/395f83c))
- Add transfer a project to a new namespace ([#145](https://github.com/jdalrymple/node-gitlab/issues/145)) ([87e9f55](https://github.com/jdalrymple/node-gitlab/commit/87e9f55))

# [3.7.0](https://github.com/jdalrymple/node-gitlab/compare/3.6.0...3.7.0) (2018-08-02)

### Features

- Adding update push rules to Projects, and updating the Protected Branches service to match the updated API thanks to [jennparise](https://github.com/jennparise)([#134](https://github.com/jdalrymple/node-gitlab/issues/134)) ([9f3de02](https://github.com/jdalrymple/node-gitlab/commit/9f3de02))
- Updating Project Snippets API [#138](https://github.com/jdalrymple/node-gitlab/issues/138) ([a7858bd](https://github.com/jdalrymple/node-gitlab/commit/a7858bd))

# [3.6.0](https://github.com/jdalrymple/node-gitlab/compare/3.5.1...3.6.0) (2018-07-24)

### Bug Fixes

- **package:** update [@semantic-release](https://github.com/semantic-release)/npm to version 4.0.0 ([#122](https://github.com/jdalrymple/node-gitlab/issues/122)) ([5351dcc](https://github.com/jdalrymple/node-gitlab/commit/5351dcc))

### Features

- Add mirror pull trigger ([#130](https://github.com/jdalrymple/node-gitlab/issues/130)) ([b6ccb80](https://github.com/jdalrymple/node-gitlab/commit/b6ccb80)) thanks to [Joseph Petersen](https://github.com/casz)
- Making API version modifyable ([a2732b9](https://github.com/jdalrymple/node-gitlab/commit/a2732b9))
- Updating Jobs API ([03a2f2d](https://github.com/jdalrymple/node-gitlab/commit/03a2f2d))
- Updating participants function for issues ([f60e7ed](https://github.com/jdalrymple/node-gitlab/commit/f60e7ed)) thanks to [Fabian Aussems](https://github.com/mozinator)
- Added pipelines to MergeRequests in [#128](https://github.com/jdalrymple/node-gitlab/pull/128) thanks to [jnovick](https://github.com/jnovick)

# [3.5.1](https://github.com/jdalrymple/node-gitlab/tags/3.4.5) (2018-7-08)

- Fixed migrating-from-node-gitlab link in Table of Contents #118 thanks to [Quentin Dreyer](https://github.com/qkdreyer)
- Fix methods for editing MR approval/approver settings #119 thanks to [Norm MacLennan](https://github.com/maclennann)
- Removed codcov patch coverage until a larger portion of the codebase is covered

# [3.5.0](https://github.com/jdalrymple/node-gitlab/tags/3.4.5) (2018-7-04)

- Obey the rate limit (9b46250), closes #73 thanks to [Max Wittig](https://github.com/max-wittig)

# [3.4.6](https://github.com/jdalrymple/node-gitlab/tags/3.4.5) (2018-7-02)

- Title parameter in the Project Milestones API was not being passed in the request (f1c3e1a), closes #116

# [3.4.5](https://github.com/jdalrymple/node-gitlab/tags/3.4.5) (2018-7-02)

- Updating badges [PR #115](https://github.com/jdalrymple/node-gitlab/pull/115) thanks to [Munif Tanjim](https://github.com/MunifTanjim)
- Fixed ProjectIssueBoards url [PR #114](https://github.com/jdalrymple/node-gitlab/pull/114) thanks to [Artem](https://github.com/arthot)

# [3.4.4](https://github.com/jdalrymple/node-gitlab/tags/3.4.4) (2018-6-26)

- Updating babel configuration thanks to a prompt from [bodtx](https://github.com/bodtx) and suggestions from [Logan Smyth](loganfsmyth)

# [3.4.3](https://github.com/jdalrymple/node-gitlab/tags/3.4.3) (2018-6-25)

- Updating packages
- Adding support for the retrieval of projects by user id [#105](https://github.com/jdalrymple/node-gitlab/pull/105) thanks to [Michael Townsend](https://github.com/Continuities)

# [3.4.2](https://github.com/jdalrymple/node-gitlab/tags/3.4.2) (2018-6-06)

- Fixing previous release errors [#100](https://github.com/jdalrymple/node-gitlab/issues/100)
- Adding options to the show function of Projects, Groups and Users [#101](https://github.com/jdalrymple/node-gitlab/issues/101) thanks to [Giuseppe Angri](https://github.com/giuseppeangri)
- Adding project languages function [#102](https://github.com/jdalrymple/node-gitlab/issues/102) thanks to [Giuseppe Angri](https://github.com/giuseppeangri)

# [3.4.1](https://github.com/jdalrymple/node-gitlab/tags/3.4.1) (2018-6-01)

- Seperated out changelog
- Adding ability to view pagination information, [#94](https://github.com/jdalrymple/node-gitlab/issues/94), via the showPagination option
- Adding CommitDiscussions and MergeRequestDiscussions support

# [3.4.0](https://github.com/jdalrymple/node-gitlab/tags/3.4.0) (2018-5-24)

- Added the first stage of testing in [#71](https://github.com/jdalrymple/node-gitlab/pull/71) with [Adam Dehnel](https://github.com/arsdehnel)'s guidance
- Added jobs.show() that was missing from the Jobs service

# [3.3.6](https://github.com/jdalrymple/node-gitlab/tags/3.3.6) (2018-5-22)

- Typo fix and branch id encoding thanks to [Igor Katsuba](https://github.com/Defenderbass)
  in [#92](https://github.com/jdalrymple/node-gitlab/pull/92) and [#91](https://github.com/jdalrymple/node-gitlab/pull/91)
- Removal of non standard babel plugins in prep for move to Typescript thanks to [Pavel Birukov](https://github.com/r00ger) in [#90](https://github.com/jdalrymple/node-gitlab/pull/90)
- Docs update pointing to the wrong npm package thanks to [Joseph Petersen](https://github.com/casz) in [#88](https://github.com/jdalrymple/node-gitlab/pull/88)
- Licence update (to match the year) thanks to [Sharma-Rajat](https://github.com/Sharma-Rajat) in [#87](https://github.com/jdalrymple/node-gitlab/pull/87)

# [3.3.5](https://github.com/jdalrymple/node-gitlab/tags/3.3.5) (2018-5-15)

- Fixing missing exports thanks to [Pavel Birukov](https://github.com/r00ger) in [#86](https://github.com/jdalrymple/node-gitlab/pull/86)

# [3.3.4](https://github.com/jdalrymple/node-gitlab/tags/3.3.4) (2018-5-14)

- Fixing [#85](https://github.com/jdalrymple/node-gitlab/pull/85)

# [3.3.3](https://github.com/jdalrymple/node-gitlab/tags/3.3.3) (2018-5-13)

- Fixing [#84](https://github.com/jdalrymple/node-gitlab/pull/84)

# [3.3.2](https://github.com/jdalrymple/node-gitlab/tags/3.3.2) (2018-5-9)

- Fixing [#82](https://github.com/jdalrymple/node-gitlab/pull/82)
- Fixing [#83](https://github.com/jdalrymple/node-gitlab/pull/83)
- Updating repo name for clarity

# [3.3.0](https://github.com/jdalrymple/node-gitlab/tags/3.3.0) (2018-5-7)

- Added extended support for the Jobs and Pipelines API thanks to [Isaac Ouellet Therrien](https://github.com/yonguelink) in PR [#77](https://github.com/jdalrymple/node-gitlab/pull/77)
- Updated packages

# [3.2.2](https://github.com/jdalrymple/node-gitlab/tags/3.2.2) (2018-5-2)

- Fixed missing Version API

# [3.2.1](https://github.com/jdalrymple/node-gitlab/tags/3.2.1) (2018-4-23)

- Fixed incorrectly named bundles

# [3.2.0](https://github.com/jdalrymple/node-gitlab/tags/3.2.0) (2018-4-21)

- Completed ProjectPipeline Support in PR [#72](https://github.com/jdalrymple/node-gitlab/pull/72) thanks to [Frédéric Boutin](https://github.com/fboutin-pmc)

# [3.1.1](https://github.com/jdalrymple/node-gitlab/tags/3.1.1) (2018-4-17)

- Fixed missing UserCustomAttributes export

# [3.1.0](https://github.com/jdalrymple/node-gitlab/tags/3.1.0) (2018-4-16)

- Added addTimeEstimate, addTimeSpent, timeStats, resetTimeSpent and resetTimeEstimate to the Issues API. Requested in Issue [#68](https://github.com/jdalrymple/node-gitlab/issues/68)
- Added XMLHttpRequest Support PR [#59](https://github.com/jdalrymple/node-gitlab/pull/59)

**Breaking Change**

- Renamed timeEstimate to addTimeEstimate, and timeSpend to addTimeSpent, in the MergeRequests API

# [3.0.4](https://github.com/jdalrymple/node-gitlab/tags/3.0.4) (2018-4-13)

- Fixed endpoint for MergeRequestNotes thanks to [Ev Haus](https://github.com/EvHaus) in PR [#63](https://github.com/jdalrymple/node-gitlab/pull/63)
- Fixed Commits.editStatus method thanks to [zhao0](https://github.com/zhao0) in PR [#65](https://github.com/jdalrymple/node-gitlab/pull/65)

# [3.0.3](https://github.com/jdalrymple/node-gitlab/tags/3.0.3) (2018-4-5)

- Fixed the problem with the validation of Event resource options

# [3.0.0](https://github.com/jdalrymple/node-gitlab/tags/3.0.0) (2018-4-2)

- Exporting all services separately ie. const { Projects } from 'gitlab'; as well as the usual default export: const Gitlab from 'gitlab'
- Exporting bundles which are groups of related API's. These include: ProjectsBundle, UsersBundle and GroupsBundle
- Added events support to the Projects, and Users
- Added full support for ProjectVariables and GroupVariables
- Added support for Events. This is also exposed in Projects and Users under the events function
- Fixed the missing options parameter for the ProjectMembers and GroupMemebers APIs in PR [#45](https://github.com/jdalrymple/node-gitlab/pull/45) thanks to [Stefan Hall](https://github.com/Marethyu1)
- Supporting both camelCase and snake_case option properties: `projects.all({perPage:5}) === projects.all({per_page: 5})`
- Fixed problem with .all() functions where only the some of the results were being returned
- Completed support for all Gitlab APIs, [#49](https://github.com/jdalrymple/node-gitlab/pull/49), [#53](https://github.com/jdalrymple/node-gitlab/pull/53)

### Breaking Changes between 2.2.6 and 3.0.0

- Instantiation of the API must use the new operator consistently. See usage above.
- All services being exported are not capitalized for clarity that they are themselves api's and not properties. ie. Gitlab.Projects vs Gitlab.projects
- All subservices (services exposed as properties of other services) have been moved out into their own service

```
ProjectRepository -> Repositories, Tags, Commits, Branches and RepositoryFiles
Users -> Users, UserKeys, UserGPGKeys, UserCustomAttributes, UserVariables

```

- Moved createTodo function from MergeRequests API to Todos API
- Many services have been renamed:

```
ProjectProtectedBranches -> ProtectedBranches
ProjectDeployKeys -> DeployKeys
ProjectEnvironments -> Environments
ProjectJobs -> Jobs
ProjectLabels -> Labels
ProjectPipelines -> Pipelines
ProjectRepository -> Repositories
ProjectServices -> Services
ProjectTriggers -> Triggers
```

- Some services were merged:

```
Issues = ProjectIssues + Issues.  ProjectId is optional for all()
MergeRequests = ProjectMergeRequests + MergeRequests + MergeRequestsChanges + MergeRequestsCommits + MergeRequestVersions. ProjectId is optional for all()
Runners = ProjectRunners + Runners. ProjectId is optional for all()

```

# [2.2.8](https://github.com/jdalrymple/node-gitlab/tags/2.2.7) (2018-4-1)

- Updating babel

# [2.2.7](https://github.com/jdalrymple/node-gitlab/tags/2.2.7) (2018-3-15)

- Fixing babel runtime

# [2.2.6](https://github.com/jdalrymple/node-gitlab/tags/2.2.6) (2018-3-15)

- Fixed more issues within the url concatenation

# [2.2.5](https://github.com/jdalrymple/node-gitlab/tags/2.2.5) (2018-3-15)

- Fixed #48 - Problem with trailing `\` in url

# [2.2.4](https://github.com/jdalrymple/node-gitlab/ce7f17693168b5dec3b36eb1d5ab796c9374613f) (2018-2-3)

- Fixed #33 - Bug within the es5 transpilling configuration
- Fixed the missing options for tags.all [#40](https://github.com/jdalrymple/node-gitlab/pull/40)
- Added delete key method to UserKeys.js [#41](https://github.com/jdalrymple/node-gitlab/pull/41) thanks to [Claude Abounegm](https://github.com/claude-abounegm)

# [2.2.3](https://github.com/jdalrymple/node-gitlab/ce7f17693168b5dec3b36eb1d5ab796c9374613f) (2018-2-3)

- Fixed #37 - Bug within the customAttributes logic

# [2.2.2](https://github.com/jdalrymple/node-gitlab/ca1906879d869bf5b9aca0b2f64e46c89f3b5f4f) (2018-1-24)

- Fixing bug with the version support

# [2.2.1](https://github.com/jdalrymple/node-gitlab/e864064c98feda59d594d77b67f7d0657db78700) (2018-1-23)

- Added support for the Version API through version.show()

# [2.2.0](https://github.com/jdalrymple/node-gitlab/96e414a75ad97e88ecaaff15a6c1409a9e27b963) (2018-1-18)

- Fixed the missing options parameter for the ProjectRepositoryCommitComment's model thanks to [Martin Benninger](https://github.com/MartinBenninger) in PR [#21](https://github.com/jdalrymple/node-gitlab/pull/21)
- Removal of the left over debug console.logs's within project issues again by [Martin Benninger](https://github.com/MartinBenninger) in PR [#21](https://github.com/jdalrymple/node-gitlab/pull/22)
- Added proper docs for ProjectRepositoryFiles, enabled default urlEncoding for the passed in file paths and also documented
  how to run locally via npm linking for Development testing thanks to [Adam Dehnel](https://github.com/arsdehnel) in [PR #23](https://github.com/jdalrymple/node-gitlab/pull/23)
- Exposed the Merge Requests resource which was missing from the exports list thanks to [fewieden](https://github.com/fewieden) in [PR #26](https://github.com/jdalrymple/node-gitlab/pull/26)
- Added support for the Project Environments API and the Project Jobs API thanks to [Jeff Pelton](https://github.com/comster) in [PR #28](https://github.com/jdalrymple/node-gitlab/pull/28)
- Fixing parse function to handle encoded urls that don't include '/' such as in groups #24

### Breaking Changes between 2.1.0 and 2.2.0

- Fixed a problem with the get responses where the response contained the full request response and not just the body

# [2.1.0](https://github.com/jdalrymple/node-gitlab/0ea73235e0b465a0d4717a7e1f33251b58777b60) (2017-12-15)

- Added es5 support and clarified the default supported versions of node (>=8.0.0 for default)
- Updating project docs for consistency
- Adding project unsharing to API. It was in the docs, but missing from the API
- Updating deprecated protected branches endpoint. Previously this was `projects.branches.protect` now its `projects.protectedBranches.protect`
- Added Owned Runners and Runner Jobs API

### Breaking Changes between 1.3.3 and 2.1.0

- The `list` functions are no longer supported and have all been renamed to `all`
- The `update` functions are no longer supported and have all been renamed to `edit`
- The `addKey` function has been renamed to `add` in UserKeys class
- The deploy_keys and merge_requests properties have been renamed to deployKeys and mergeRequests
- Removed old group member functions from the groups class as they have been moved to the GroupMembers class. This includes the addMember, listMembers, editMember, and removeMember. These functions can now be access via group.members.add, group.members.all, group.members.edit and group.members.remove respectively.
- Removed the old group project functions from the Group class. These are now located in the GroupProject class. The functions that have been removed are listProjects, addProjects. These functions can be access by group.projects.all, and group.projects.add respectively.
- Updated the structure of the ProjectRepository class such that its commits, branches, tags and files are properties and can be accessed like `repository.commits.all()` etc.
- Removed unused labels endpoint since it already exists under projects.labels

# [2.0.1-rc.1](https://github.com/jdalrymple/node-gitlab/62a4d360f0ca2cd584caf852d96ced3761992072) (2017-11-29)

- Updating pagination changes into v2.0.1
- Removed unused labels endpoint since it already exists under projects.labels
- Added a mergeRequests class for the merge_requests endpoints
- Extended the ProjectMergeRequests class for additional functionality that was missing for project merge requests such as
  accepting merge requests, canceling merges when the pipeline succeeds, listing issues that will close on merge, subscribing/unsubscribing to merges, creating todos, time spent and time estimates as well as time stats.
- Fixed the notes endpoints for ProjectMergeRequests. This can now be access via projects.mergeRequests.notes.[command here]
- Added comments endpoints to the ProjectRepositoryCommits class
- Added the ability to post a status to a specific commit to the Project class

# [1.3.3](https://github.com/jdalrymple/node-gitlab/b8a3db4a4aaf9482fb3905883d92d940babfb461) (2017-11-29)

- Adding pagination to project pipelines thanks to [Tamás Török-Vistai](https://github.com/tvtamas)

# [2.0.0-rc.2](https://github.com/jdalrymple/node-gitlab/62a4d360f0ca2cd584caf852d96ced3761992072) (2017-11-28)

- Updating all recent core changes into v2.0.0

# [1.3.2](https://github.com/jdalrymple/node-gitlab/87e3d4b0a9616c19d69e3d6213c196948240d93e) (2017-11-28)

- Adding default values for the BaseModel options parameter.

# [1.3.1](https://github.com/jdalrymple/node-gitlab/ba80ac10e1e08176da7a3a9848758a989a7199dd) (2017-11-27)

- Fixed broken argument reference in the showFile and showFileRaw functions.

# [2.0.0-rc.1](https://github.com/jdalrymple/node-gitlab/7246896c7bad7b238179109d1d6a391b0c2ef302) (2017-11-25)

- Updated project docs for clarity
- Cleaned up many linting problems within the class models
- Removed mutator operations on the options arguments
- Renamed ProjectKeys to ProjectDeployKeys
- Renamed `list` functions to `all` for consistency
- Renamed `update` functions to `edit` for consistency
- Renaming addKey just to add in UserKeys class
- Renaming deploy_keys and merge_requests to deployKeys and mergeRequests for consistency
- Adding Project Access Requests
- Removing old group member functions from the groups class as they have been moved to the GroupMembers class. This includes the addMember, listMembers, editMember, and removeMember. These functions can now be access via group.members.add, group.members.all, group.members.edit and group.members.remove respectively.
- Removed the old group project functions from the Group class. These are now located in the GroupProject class. The functions that have been removed are listProjects, addProjects. These functions can be access by group.projects.all, and group.projects.add respectively.
- Methods in the ProjectDeployKeys class updated for consistency
- Methods in the ProjectHooks updated for consistency
- Updated the structure of the ProjectRepository class with commits, branches, tags and files properties.
- Added contributors, showBlob and showBlobRaw functions to the ProjectRepository class

# [1.3.0](https://github.com/jdalrymple/node-gitlab/3048a3989fabe3992044baccdab1e53257f0f379) (2017-11-25)

- Extending the Groups API, see docs for a full overview.

# [1.2.0](https://github.com/jdalrymple/node-gitlab/b08779a321fb25668df1e0f7e001394679cc47ba) (2017-11-25)

- Adding fix to the API constructor to include the [missing oauthToken](https://github.com/jdalrymple/node-gitlab/pulls?q=is%3Apr+is%3Aclosed) thanks to [Salim Benabbou](https://github.com/Salimlou).
- Updated some of the outdated Gitlab repository file endpoints outlined in [Issue #11](https://github.com/jdalrymple/node-gitlab/issues/11): [showFile](https://docs.gitlab.com/ee/api/repository_files.html#get-file-from-repository), [updateFile](https://docs.gitlab.com/ee/api/repository_files.html#update-existing-file-in-repository), and [createFile](https://docs.gitlab.com/ee/api/repository_files.html#create-new-file-in-repository). Also added [deleteFile](https://docs.gitlab.com/ee/api/repository_files.html#delete-existing-file-in-repository) and [showRawFile](https://docs.gitlab.com/ee/api/repository_files.html#get-raw-file-from-repository).
- Fixing bug where many pages where attempted to be loaded on every GET request.

# [1.1.4](https://github.com/jdalrymple/node-gitlab/328bc29fe48d1bf18c83779a214cce34e80dda09) (2017-11-17)

- Library maintenance, cleaning up spelling errors, updating dependencies, adding to contributors lists etc.

# [1.1.3](https://github.com/jdalrymple/node-gitlab/6f28ce1726ce371d4b0272d5f8305080d51e3e25) (2017-11-17)

- Fixing typos in the project sharing (group_access) thanks to [Christoph Lehmann](https://github.com/christophlehmann)
- Updated the ReadMe to be more clear based on suggestions from [Frank V](https://github.com/FrankV01)

# [1.1.2](https://github.com/jdalrymple/node-gitlab/36570c32be7cd564bda9c7c7dc07059987969bd4) (2017-10-29)

- Updated the protected branch functionality by adding an options parameter originally proposed by [Martin Bour](https://github.com/shadygrove)
- Removed old paging logic from groups
- Updating library dependencies

# [1.1.1](https://github.com/jdalrymple/node-gitlab/67df1c8772614b3856f2995eaa7d260d0f697e49) (2017-09-24)

- Patch, fixed a broken pagination property
- Adding in missing options parameter in the groups API thanks to a pull request from [Cory Zibell](https://github.com/coryzibell)

# [1.1.0](https://github.com/jdalrymple/node-gitlab/385ef9f351981f26180e1381525ade458bcde1cd) (2017-09-24)

- Adding proper pagination support thanks to a problem noticed by [Mike Wyatt](https://github.com/mikew)

# [1.0.14](https://github.com/jdalrymple/node-gitlab/b8fb74828503f0a6432376ad156b7f9e33f6228e) (2017-08-1)

- Adding default file name for file uploads. If none is supplied, the file name is
  inferred from the file path

# [1.0.13](https://github.com/jdalrymple/node-gitlab/3eb244a5b487f487859f750e46c8fa287b4455c4) (2017-07-31)

- Fixed another bug in the project file upload functionality

# [1.0.12](https://github.com/jdalrymple/node-gitlab/commit/6f77ee0a462a19ae65bd6206eb94c72e271ba673) (2017-07-30)

- Added issue links (for related issues)
- Fixed project file upload

# [1.0.11](https://github.com/jdalrymple/node-gitlab/commit/af4eb6955f583b5be4a4032d2d532d81bb2cf54d) (2017-07-20)

- Fixing the problem where Id was used instead of IId's for Project issues
- Fixing the naming convention for Project Issues
- Standardized the use of parseInt in the code base
- Removed instances of duplicate code found by code climate

# [1.0.10](https://github.com/jdalrymple/node-gitlab/commit/c4a55aba89d83fda1552b3d5688b090b0c2b60aa) (2017-07-13)

- Fixing Issues [#1](https://github.com/jdalrymple/node-gitlab/pull/1), [#2](https://github.com/jdalrymple/node-gitlab/pull/3), and [#3](https://github.com/jdalrymple/node-gitlab/pull/3)

# [1.0.9](https://github.com/jdalrymple/node-gitlab/commit/7a90dbb6354fe956fff37c56f938a833e3fc5ea1) (2017-07-06)

- Fixing broken Notes API reference
- Added Project triggers, members and hooks docs
- Moved Project Runners into its own scope and separated out general Runners API logic

# [1.0.8](https://github.com/jdalrymple/node-gitlab/commit/491a707624ba9f58818014eacfeb7182b8ecf800) (2017-06-30)

- Adding more to the Project Issue Notes API
- Updating Readme to show examples of connecting with OAuth tokens
- Begun adding documentation for projects

# [1.0.7](https://github.com/jdalrymple/node-gitlab/commit/50642ad764ecd20d2a9e279cf2a47e7b5efe8f07) (2017-06-23)

- Fixing bug within the Issues API; reference to an old function.

# [1.0.6](https://github.com/jdalrymple/node-gitlab/commit/2b02d1e354c1c267683d10b893ad055fe856a214) (2017-06-23)

- Fixing bug within the Labels API; Missing required argument.

# [1.0.5](https://github.com/jdalrymple/node-gitlab/commit/03a22b46a62d7b68937575b0b74b6fd3496f7cbf) (2017-06-23)

- Fixing bug within the delete API calls. It was missing query parameters

# [1.0.4](https://github.com/jdalrymple/node-gitlab/commit/9d9ef2615c6dd778a3fb1c6140d5ce009c421bb1) (2017-06-23)

- Adding more to the Labels API
- Cleaned up the Issues class

# [1.0.3](https://github.com/jdalrymple/node-gitlab/commit/fe5a5fbb8d01fb670b7c7b14ce2c5b7f30d71fe5) (2017-06-23)

- Updating problems within the Milestone API
- Removed the old 'list' calls for projects and issues which displayed a deprecated message. Only all is available now.

# [1.0.2](https://github.com/jdalrymple/node-gitlab/commit/a295d5a613efa13be79fec5fa2835076047cdcc5) (2017-06-22)

- Updating examples in ReadMe
- Adding dependency badges
- Removing unused test files

# [1.0.1](https://github.com/jdalrymple/node-gitlab/commit/64a8f8c7720f5df9a67d3f26cc8712fc21eb3ac0) (2017-06-21)

- Initial release
- TODO: Tests, Examples
