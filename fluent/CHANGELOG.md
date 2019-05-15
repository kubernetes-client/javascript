# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [7.0.1](https://github.com/godaddy/kubernetes-client/compare/7.0.0...7.0.1) (2019-05-07)



# [7.0.0](https://github.com/godaddy/kubernetes-client/compare/6.12.1...7.0.0) (2019-04-23)


### Features

* **typings:** upgrade declaration file to 1.13 ([#447](https://github.com/godaddy/kubernetes-client/issues/447)) ([095008e](https://github.com/godaddy/kubernetes-client/commit/095008e))


### BREAKING CHANGES

* **typings:** this removes support for 1.10.



## [6.12.1](https://github.com/godaddy/kubernetes-client/compare/6.12.0...6.12.1) (2019-04-02)



# [6.12.0](https://github.com/godaddy/kubernetes-client/compare/6.11.1...6.12.0) (2019-04-01)


### Features

* **config:** expose the current namespace on the config object ([#436](https://github.com/godaddy/kubernetes-client/issues/436)) ([d7e0688](https://github.com/godaddy/kubernetes-client/commit/d7e0688))



<a name="6.10.0"></a>
# [6.10.0](https://github.com/godaddy/kubernetes-client/compare/6.8.3...6.10.0) (2019-03-04)


### Features

* **swagger:** add files for latest releases ([#415](https://github.com/godaddy/kubernetes-client/issues/415)) ([bfc28bc](https://github.com/godaddy/kubernetes-client/commit/bfc28bc))
* ability for a user to specify their own getNames function ([#424](https://github.com/godaddy/kubernetes-client/issues/424)) ([27ec13f](https://github.com/godaddy/kubernetes-client/commit/27ec13f)), closes [#418](https://github.com/godaddy/kubernetes-client/issues/418)



<a name="6.9.0"></a>
# [6.9.0](https://github.com/godaddy/kubernetes-client/compare/6.8.3...6.9.0) (2019-02-21)


### Features

* **swagger:** add files for latest releases ([#415](https://github.com/godaddy/kubernetes-client/issues/415)) ([bfc28bc](https://github.com/godaddy/kubernetes-client/commit/bfc28bc))



<a name="6.8.3"></a>
## [6.8.3](https://github.com/godaddy/kubernetes-client/compare/6.8.2...6.8.3) (2019-01-28)


### Bug Fixes

* **exec:** correctly join URL components ([#402](https://github.com/godaddy/kubernetes-client/issues/402)) ([a557d97](https://github.com/godaddy/kubernetes-client/commit/a557d97))



<a name="6.8.2"></a>
## [6.8.2](https://github.com/godaddy/kubernetes-client/compare/6.8.1...6.8.2) (2019-01-28)


### Bug Fixes

* **typings:** remove `.loadSpec()` from declarations ([#406](https://github.com/godaddy/kubernetes-client/issues/406)) ([b17a0a9](https://github.com/godaddy/kubernetes-client/commit/b17a0a9))



<a name="6.8.1"></a>
## [6.8.1](https://github.com/godaddy/kubernetes-client/compare/6.7.1...6.8.1) (2019-01-12)


### Bug Fixes

* **loadSpec:** remove noAuth ([#396](https://github.com/godaddy/kubernetes-client/issues/396)) ([4944fba](https://github.com/godaddy/kubernetes-client/commit/4944fba))
* **require:** update auth-provider path ([#397](https://github.com/godaddy/kubernetes-client/issues/397)) ([67d114a](https://github.com/godaddy/kubernetes-client/commit/67d114a))



<a name="6.8.0"></a>
# [6.8.0](https://github.com/godaddy/kubernetes-client/compare/6.5.1...6.8.0) (2019-01-11)


### Bug Fixes

* **aliasing:** don't alias apis (to api) ([#393](https://github.com/godaddy/kubernetes-client/issues/393)) ([515a6e3](https://github.com/godaddy/kubernetes-client/commit/515a6e3))
* **auth:** remove authentication from /openapi/v2 call ([#372](https://github.com/godaddy/kubernetes-client/issues/372)) ([ef1467a](https://github.com/godaddy/kubernetes-client/commit/ef1467a))
* **request:** handle 200 responses with an empty body ([#381](https://github.com/godaddy/kubernetes-client/issues/381)) ([5672a3c](https://github.com/godaddy/kubernetes-client/commit/5672a3c))
* **require:** update auth-provider path ([#397](https://github.com/godaddy/kubernetes-client/issues/397)) ([67d114a](https://github.com/godaddy/kubernetes-client/commit/67d114a))


### Features

* **inCluster:** set serviceaccount root for `inCluster` ([#383](https://github.com/godaddy/kubernetes-client/issues/383)) ([623453d](https://github.com/godaddy/kubernetes-client/commit/623453d))



<a name="6.7.1"></a>
## [6.7.1](https://github.com/godaddy/kubernetes-client/compare/6.7.0...6.7.1) (2019-01-04)


### Bug Fixes

* **aliasing:** don't alias apis (to api) ([#393](https://github.com/godaddy/kubernetes-client/issues/393)) ([515a6e3](https://github.com/godaddy/kubernetes-client/commit/515a6e3))



<a name="6.7.0"></a>
# [6.7.0](https://github.com/godaddy/kubernetes-client/compare/6.6.2...6.7.0) (2018-12-29)


### Features

* **inCluster:** set serviceaccount root for `inCluster` ([#383](https://github.com/godaddy/kubernetes-client/issues/383)) ([623453d](https://github.com/godaddy/kubernetes-client/commit/623453d))



<a name="6.6.2"></a>
## [6.6.2](https://github.com/godaddy/kubernetes-client/compare/6.6.1...6.6.2) (2018-12-29)



<a name="6.6.1"></a>
## [6.6.1](https://github.com/godaddy/kubernetes-client/compare/6.6.0...6.6.1) (2018-12-24)


### Bug Fixes

* **request:** handle 200 responses with an empty body ([#381](https://github.com/godaddy/kubernetes-client/issues/381)) ([5672a3c](https://github.com/godaddy/kubernetes-client/commit/5672a3c))



<a name="6.6.0"></a>
# [6.6.0](https://github.com/godaddy/kubernetes-client/compare/6.3.2...6.6.0) (2018-12-24)


### Bug Fixes

* **auth:** remove authentication from /openapi/v2 call ([#372](https://github.com/godaddy/kubernetes-client/issues/372)) ([ef1467a](https://github.com/godaddy/kubernetes-client/commit/ef1467a))
* **node6:** remove spread for node6+ support ([#368](https://github.com/godaddy/kubernetes-client/issues/368)) ([2e161aa](https://github.com/godaddy/kubernetes-client/commit/2e161aa))
* **swagger:** Fallback to old swagger.json endpoint ([#364](https://github.com/godaddy/kubernetes-client/issues/364)) ([42f3e5d](https://github.com/godaddy/kubernetes-client/commit/42f3e5d))


### Features

* **CRDs:** cluster-level GET for Namespaced CRDs ([#366](https://github.com/godaddy/kubernetes-client/issues/366)) ([9adcc04](https://github.com/godaddy/kubernetes-client/commit/9adcc04))
* **loadSpec:** change the endpoint called by loadSpec ([#356](https://github.com/godaddy/kubernetes-client/issues/356)) ([8a5f5cb](https://github.com/godaddy/kubernetes-client/commit/8a5f5cb))



<a name="6.5.1"></a>
## [6.5.1](https://github.com/godaddy/kubernetes-client/compare/6.5.0...6.5.1) (2018-12-11)


### Bug Fixes

* **node6:** remove spread for node6+ support ([#368](https://github.com/godaddy/kubernetes-client/issues/368)) ([2e161aa](https://github.com/godaddy/kubernetes-client/commit/2e161aa))



<a name="6.5.0"></a>
# [6.5.0](https://github.com/godaddy/kubernetes-client/compare/6.4.1...6.5.0) (2018-12-05)


### Features

* **CRDs:** cluster-level GET for Namespaced CRDs ([#366](https://github.com/godaddy/kubernetes-client/issues/366)) ([9adcc04](https://github.com/godaddy/kubernetes-client/commit/9adcc04))



<a name="6.4.1"></a>
## [6.4.1](https://github.com/godaddy/kubernetes-client/compare/6.4.0...6.4.1) (2018-11-27)


### Bug Fixes

* **swagger:** Fallback to old swagger.json endpoint ([#364](https://github.com/godaddy/kubernetes-client/issues/364)) ([42f3e5d](https://github.com/godaddy/kubernetes-client/commit/42f3e5d))



<a name="6.4.0"></a>
# [6.4.0](https://github.com/godaddy/kubernetes-client/compare/6.3.0...6.4.0) (2018-11-12)


### Bug Fixes

* **kubeconfig:** handle optional kubeconfig user exec properties ([#351](https://github.com/godaddy/kubernetes-client/issues/351)) ([a854fef](https://github.com/godaddy/kubernetes-client/commit/a854fef))
* **querystring:**  indices must be disabled ([#344](https://github.com/godaddy/kubernetes-client/issues/344)) ([c6bb0a1](https://github.com/godaddy/kubernetes-client/commit/c6bb0a1))


### Features

* **loadSpec:** change the endpoint called by loadSpec ([#356](https://github.com/godaddy/kubernetes-client/issues/356)) ([8a5f5cb](https://github.com/godaddy/kubernetes-client/commit/8a5f5cb))



<a name="6.3.2"></a>
## [6.3.2](https://github.com/godaddy/kubernetes-client/compare/6.3.1...6.3.2) (2018-10-31)



<a name="6.3.1"></a>
## [6.3.1](https://github.com/godaddy/kubernetes-client/compare/6.3.0...6.3.1) (2018-10-31)


### Bug Fixes

* **kubeconfig:** handle optional kubeconfig user exec properties ([#351](https://github.com/godaddy/kubernetes-client/issues/351)) ([a854fef](https://github.com/godaddy/kubernetes-client/commit/a854fef))
* **querystring:**  indices must be disabled ([#344](https://github.com/godaddy/kubernetes-client/issues/344)) ([c6bb0a1](https://github.com/godaddy/kubernetes-client/commit/c6bb0a1))



<a name="6.3.0"></a>
# [6.3.0](https://github.com/godaddy/kubernetes-client/compare/6.2.0...6.3.0) (2018-10-19)


### Bug Fixes

* **auth:** update auth settings after refreshing ([#338](https://github.com/godaddy/kubernetes-client/issues/338)) ([e8d914b](https://github.com/godaddy/kubernetes-client/commit/e8d914b))


### Features

* **timeout:** plumb a timeout option for HTTP requests ([#339](https://github.com/godaddy/kubernetes-client/issues/339)) ([6a9f06d](https://github.com/godaddy/kubernetes-client/commit/6a9f06d))



<a name="6.2.0"></a>
# [6.2.0](https://github.com/godaddy/kubernetes-client/compare/6.1.0...6.2.0) (2018-10-19)


### Features

* **addCustomResourceDefinition:** add support for /status and /scale CRD endpoints ([#335](https://github.com/godaddy/kubernetes-client/issues/335)) ([0511bb4](https://github.com/godaddy/kubernetes-client/commit/0511bb4))
* **auth:** support auth through iam-authenticator, add example ([#332](https://github.com/godaddy/kubernetes-client/issues/332)) ([c06e7cf](https://github.com/godaddy/kubernetes-client/commit/c06e7cf)), closes [#306](https://github.com/godaddy/kubernetes-client/issues/306)
* **config:** read exec arguments from kubeconfig ([#333](https://github.com/godaddy/kubernetes-client/issues/333)) ([58541c7](https://github.com/godaddy/kubernetes-client/commit/58541c7))
* **config:** support multiple config files in KUBECONFIG ([#326](https://github.com/godaddy/kubernetes-client/issues/326)) ([d76a84f](https://github.com/godaddy/kubernetes-client/commit/d76a84f))
* **pod-exec:** add initial support for command execution ([#329](https://github.com/godaddy/kubernetes-client/issues/329)) ([ed47d43](https://github.com/godaddy/kubernetes-client/commit/ed47d43))



<a name="6.1.0"></a>
# [6.1.0](https://github.com/godaddy/kubernetes-client/compare/6.0.1...6.1.0) (2018-09-06)


### Bug Fixes

* **auth:** unhandled promise rejection caused by failed auth refresh ([#325](https://github.com/godaddy/kubernetes-client/issues/325)) ([2e3ae71](https://github.com/godaddy/kubernetes-client/commit/2e3ae71))


### Features

* **kube-config:** add support for KUBECONFIG env var ([#322](https://github.com/godaddy/kubernetes-client/issues/322)) ([c6810de](https://github.com/godaddy/kubernetes-client/commit/c6810de))



<a name="6.0.1"></a>
## [6.0.1](https://github.com/godaddy/kubernetes-client/compare/6.0.0...6.0.1) (2018-09-04)



<a name="6.0.0"></a>
# [6.0.0](https://github.com/godaddy/kubernetes-client/compare/5.4.0...6.0.0) (2018-08-28)


### Bug Fixes

* **aliases:** reduce the number of nonsense aliases ([#312](https://github.com/godaddy/kubernetes-client/issues/312)) ([f0cd4c7](https://github.com/godaddy/kubernetes-client/commit/f0cd4c7))
* **package:** update fluent-openapi to version 0.1.1 ([#311](https://github.com/godaddy/kubernetes-client/issues/311)) ([50ac41f](https://github.com/godaddy/kubernetes-client/commit/50ac41f))


### Chores

* **4.X:** remove old API code ([#317](https://github.com/godaddy/kubernetes-client/issues/317)) ([6a3aa8b](https://github.com/godaddy/kubernetes-client/commit/6a3aa8b))


### Features

* **Client1_10:** add Client class for a specific API version ([#315](https://github.com/godaddy/kubernetes-client/issues/315)) ([3a2886c](https://github.com/godaddy/kubernetes-client/commit/3a2886c))
* **typings:** script to generate declaration file for current API ([#313](https://github.com/godaddy/kubernetes-client/issues/313)) ([a8e399c](https://github.com/godaddy/kubernetes-client/commit/a8e399c))
* **typings:** Update TypeScript declaration file for new API ([#316](https://github.com/godaddy/kubernetes-client/issues/316)) ([fe3a131](https://github.com/godaddy/kubernetes-client/commit/fe3a131))


### BREAKING CHANGES

* **4.X:** This removes the kubernetes-client 4.X API.
* **typings:** This replaces the 4.X declaration file.

Fixes https://github.com/godaddy/kubernetes-client/issues/249



<a name="5.4.0"></a>
# [5.4.0](https://github.com/godaddy/kubernetes-client/compare/5.3.1...5.4.0) (2018-08-07)


### Features

* **CRDs:** add Cluster scope support ([#307](https://github.com/godaddy/kubernetes-client/issues/307)) ([cb9f7e4](https://github.com/godaddy/kubernetes-client/commit/cb9f7e4))



<a name="5.3.1"></a>
## [5.3.1](https://github.com/godaddy/kubernetes-client/compare/5.3.0...5.3.1) (2018-06-27)


### Bug Fixes

* **delete:** `delete` a resource without passing an options object ([#275](https://github.com/godaddy/kubernetes-client/issues/275)) ([36ca19f](https://github.com/godaddy/kubernetes-client/commit/36ca19f))



<a name="5.3.0"></a>
# [5.3.0](https://github.com/godaddy/kubernetes-client/compare/5.2.0...5.3.0) (2018-05-16)


### Bug Fixes

* **package:** update openid-client to version 2.0.0 ([#252](https://github.com/godaddy/kubernetes-client/issues/252)) ([877af3d](https://github.com/godaddy/kubernetes-client/commit/877af3d))
* **typings:** address issue with typings support for promises ([#253](https://github.com/godaddy/kubernetes-client/issues/253)) ([4fc1eb0](https://github.com/godaddy/kubernetes-client/commit/4fc1eb0))


### Features

* **fromKubeconfig:** automatically call `loadKubeconfig` when `kubeconfig` a string ([#251](https://github.com/godaddy/kubernetes-client/issues/251)) ([2898b86](https://github.com/godaddy/kubernetes-client/commit/2898b86))



<a name="5.2.0"></a>
# [5.2.0](https://github.com/godaddy/kubernetes-client/compare/5.1.0...5.2.0) (2018-04-05)


### Features

* **authentication:** Support OpenID and generic command-based authentication ([#247](https://github.com/godaddy/kubernetes-client/issues/247)) ([98fe599](https://github.com/godaddy/kubernetes-client/commit/98fe599))



<a name="5.1.0"></a>
# [5.1.0](https://github.com/godaddy/kubernetes-client/compare/5.0.1...5.1.0) (2018-03-16)


### Bug Fixes

* **lint:** autofix missing ; ([#235](https://github.com/godaddy/kubernetes-client/issues/235)) ([22dd942](https://github.com/godaddy/kubernetes-client/commit/22dd942))


### Features

* **CustomResourceDefinitions:** add support for watch paths ([#233](https://github.com/godaddy/kubernetes-client/issues/233)) ([e09b4ee](https://github.com/godaddy/kubernetes-client/commit/e09b4ee))



<a name="5.0.1"></a>
## [5.0.1](https://github.com/godaddy/kubernetes-client/compare/5.0.0...5.0.1) (2018-03-15)


### Bug Fixes

* **error handling:** replicate pre-5.0.0 error handling ([#232](https://github.com/godaddy/kubernetes-client/issues/232)) ([b5eb7e0](https://github.com/godaddy/kubernetes-client/commit/b5eb7e0))



<a name="5.0.0"></a>
# [5.0.0](https://github.com/godaddy/kubernetes-client/compare/4.0.1...5.0.0) (2018-03-15)


### Bug Fixes

* **examples/:** fix a bug in an example ([#221](https://github.com/godaddy/kubernetes-client/issues/221)) ([dc51f6d](https://github.com/godaddy/kubernetes-client/commit/dc51f6d))


### Chores

* **Node.js support:** Drop support for Node.js 4 and 5 ([#208](https://github.com/godaddy/kubernetes-client/issues/208)) ([e70f9cb](https://github.com/godaddy/kubernetes-client/commit/e70f9cb))


### Documentation

* **README.md:** Re-write README.md for the Swagger-based client ([#222](https://github.com/godaddy/kubernetes-client/issues/222)) ([42d5bc7](https://github.com/godaddy/kubernetes-client/commit/42d5bc7))


### Features

* **aliases:** add the nice-to-have aliases to the dynamic client code ([#209](https://github.com/godaddy/kubernetes-client/issues/209)) ([b1b355f](https://github.com/godaddy/kubernetes-client/commit/b1b355f))
* **CRDs:** add basic CRD support to the dynamic client ([#214](https://github.com/godaddy/kubernetes-client/issues/214)) ([c2aec51](https://github.com/godaddy/kubernetes-client/commit/c2aec51))
* **dynamic clients:** introduce more user-friendly Client classes ([#207](https://github.com/godaddy/kubernetes-client/issues/207)) ([162b33e](https://github.com/godaddy/kubernetes-client/commit/162b33e))
* **getStream:** add support for getStream to swagger-based client code ([#206](https://github.com/godaddy/kubernetes-client/issues/206)) ([ccb2be0](https://github.com/godaddy/kubernetes-client/commit/ccb2be0))


### BREAKING CHANGES

* **README.md:** This commit effectively pivots the Swagger-based client to be
the default, which isn't 100% compatible with the original kubernetes-client
implementation.
* **Node.js support:** EOL for 4 is end of April (https://github.com/nodejs/Release).
We're dropping support a little early in order to leverage some 6+ features for
upcoming improvements (e.g., https://github.com/godaddy/kubernetes-client/pull/207)



<a name="4.0.1"></a>
## [4.0.1](https://github.com/godaddy/kubernetes-client/compare/4.0.0...4.0.1) (2018-03-07)



<a name="4.0.0"></a>
# [4.0.0](https://github.com/godaddy/kubernetes-client/compare/3.18.1...4.0.0) (2018-02-13)


### Bug Fixes

* **greenkeeper:** updating package-lock.json requires npm@5 or later ([#191](https://github.com/godaddy/kubernetes-client/issues/191)) ([ae998bd](https://github.com/godaddy/kubernetes-client/commit/ae998bd))
* **namespaces:** api.namespaces('foo') usage ([#190](https://github.com/godaddy/kubernetes-client/issues/190)) ([816b957](https://github.com/godaddy/kubernetes-client/commit/816b957)), closes [#187](https://github.com/godaddy/kubernetes-client/issues/187) [#169](https://github.com/godaddy/kubernetes-client/issues/169)


### Chores

* **pods.log:** remove the deprarecated `pods.log` function. ([#196](https://github.com/godaddy/kubernetes-client/issues/196)) ([29a7935](https://github.com/godaddy/kubernetes-client/commit/29a7935))
* **ReplicationController:** remove replicationcontrollers.pods feature ([#192](https://github.com/godaddy/kubernetes-client/issues/192)) ([d728814](https://github.com/godaddy/kubernetes-client/commit/d728814))


### Features

* **promises:** if caller doesn't specify a callback, return a promise ([#193](https://github.com/godaddy/kubernetes-client/issues/193)) ([4a84e7f](https://github.com/godaddy/kubernetes-client/commit/4a84e7f)), closes [#189](https://github.com/godaddy/kubernetes-client/issues/189)
* **Swagger:** experimental support for Swagger. ([#162](https://github.com/godaddy/kubernetes-client/issues/162)) ([f8f1d35](https://github.com/godaddy/kubernetes-client/commit/f8f1d35))


### BREAKING CHANGES

* **pods.log:** `pods.log` doesn't follow the kubernetes-client API
conventions. Replace uses of `pods.log('foo')` with `pods('foo').log.get()`.
* **namespaces:** Removes default namespace feature. With a default namespace,
`api.namespaces.get` is potentially ambiguous: get the default namespaces or
get all namespaces. Remove the default namespace to be consistent with other
code.
* **promises:** This removes the (deprecated) `request`-like behavior of
returning a stream when the caller omits a callback. Use `.getStream` (instead
of `.get` without a callback) to get a stream.
* **ReplicationController:** The convenience function for selecting replicationcontroller
pods doesn't follow the kubernetes-client API contract. We're removing it
because it's cumbersome to support with recent changes (*e.g.*, support for
promises and the swagger gen code).



<a name="3.18.1"></a>
## [3.18.1](https://github.com/godaddy/kubernetes-client/compare/3.18.0...3.18.1) (2018-01-26)


### Bug Fixes

* **typings:** Include typings with npm package. ([#179](https://github.com/godaddy/kubernetes-client/issues/179)) ([42f4735](https://github.com/godaddy/kubernetes-client/commit/42f4735))



<a name="3.18.0"></a>
# [3.18.0](https://github.com/godaddy/kubernetes-client/compare/3.17.2...3.18.0) (2018-01-18)


### Bug Fixes

* **docs:** typos in docs ([#171](https://github.com/godaddy/kubernetes-client/issues/171)) ([ef65951](https://github.com/godaddy/kubernetes-client/commit/ef65951))


### Features

* **TypeScript:** Initial cut at TypeScript support. ([#174](https://github.com/godaddy/kubernetes-client/issues/174)) ([d3ea455](https://github.com/godaddy/kubernetes-client/commit/d3ea455))



<a name="3.17.2"></a>
## [3.17.2](https://github.com/godaddy/kubernetes-client/compare/3.17.1...3.17.2) (2018-01-05)



<a name="3.17.1"></a>
## [3.17.1](https://github.com/godaddy/kubernetes-client/compare/3.17.0...v3.17.1) (2017-11-14)


### Bug Fixes

* **CRDs:** Fix a filename typo (#159) ([6f880fc](https://github.com/godaddy/kubernetes-client/commit/6f880fc)), closes [#159](https://github.com/godaddy/kubernetes-client/issues/159)



<a name="3.17.0"></a>
# [3.17.0](https://github.com/godaddy/kubernetes-client/compare/3.16.1...v3.17.0) (2017-11-14)


### Features

* **CustomResourceDefinition:** Add support for CRDs (#149) ([4261c2e](https://github.com/godaddy/kubernetes-client/commit/4261c2e))



<a name="3.16.1"></a>
## [3.16.1](https://github.com/godaddy/kubernetes-client/compare/3.16.0...v3.16.1) (2017-11-08)


### Bug Fixes

* **kubeconfig:** accept relative and absolute paths (#155) ([3cbf9cf](https://github.com/godaddy/kubernetes-client/commit/3cbf9cf))



<a name="3.16.0"></a>
# [3.16.0](https://github.com/godaddy/kubernetes-client/compare/3.14.0...v3.16.0) (2017-09-28)


### Features

* **Promise API:** Experimental support for a promise-based API (#133) ([b5f5e10](https://github.com/godaddy/kubernetes-client/commit/b5f5e10))
* **Send body in DELETE requests:** (#142) ([10e4018](https://github.com/godaddy/kubernetes-client/commit/10e4018))



<a name="3.15.0"></a>
# [3.15.0](https://github.com/godaddy/kubernetes-client/compare/3.14.0...v3.15.0) (2017-08-29)


### Features

* **Send body in DELETE requests:** (#142) ([10e4018](https://github.com/godaddy/kubernetes-client/commit/10e4018))



<a name="3.14.0"></a>
# [3.14.0](https://github.com/godaddy/kubernetes-client/compare/3.12.0...v3.14.0) (2017-08-01)


### Bug Fixes

* **undefined `options` passed to `.get`:** set default `options` value to `{}` (#115) ([b2df448](https://github.com/godaddy/kubernetes-client/commit/b2df448))
* **Update broken unit test:** remove incorrect usage of nock.matchHeader (#114) ([5469623](https://github.com/godaddy/kubernetes-client/commit/5469623))


### Features

* **Add `getStream`:** Addition to resource API (#119) ([6268dde](https://github.com/godaddy/kubernetes-client/commit/6268dde))
* **Deployment:** Support for deployment under apps (#122) (#122) ([3688d1e](https://github.com/godaddy/kubernetes-client/commit/3688d1e))



<a name="3.13.0"></a>
# [3.13.0](https://github.com/godaddy/kubernetes-client/compare/3.12.0...3.13.0) (2017-07-29)


### Bug Fixes

* **undefined `options` passed to `.get`:** set default `options` value to `{}` ([#115](https://github.com/godaddy/kubernetes-client/issues/115)) ([b2df448](https://github.com/godaddy/kubernetes-client/commit/b2df448))
* **Update broken unit test:** remove incorrect usage of nock.matchHeader ([#114](https://github.com/godaddy/kubernetes-client/issues/114)) ([5469623](https://github.com/godaddy/kubernetes-client/commit/5469623))


### Features

* **Add `getStream`:** Addition to resource API ([#119](https://github.com/godaddy/kubernetes-client/issues/119)) ([6268dde](https://github.com/godaddy/kubernetes-client/commit/6268dde))



<a name="3.12.0"></a>
# [3.12.0](https://github.com/godaddy/kubernetes-client/compare/3.11.0...v3.12.0) (2017-06-15)


### Features

* **auth-provider:** support for auth-provider access-token in fromKubeconfig() (#112) ([9b02bc2](https://github.com/godaddy/kubernetes-client/commit/9b02bc2))



<a name="3.11.0"></a>
# [3.11.0](https://github.com/godaddy/kubernetes-client/compare/3.10.1...v3.11.0) (2017-05-31)


### Bug Fixes

* **README:** modified group example to be correct (#94) ([73e4f05](https://github.com/godaddy/kubernetes-client/commit/73e4f05))


### Features

* **Deployment:** Support for additional Deployment operations (#103) ([d802180](https://github.com/godaddy/kubernetes-client/commit/d802180))



<a name="3.10.1"></a>
## [3.10.1](https://github.com/godaddy/kubernetes-client/compare/3.10.0...v3.10.1) (2017-03-09)


### Bug Fixes

* **matchLabels:** call BaseObject constructor with correct arguments (#91) ([9e1f2d6](https://github.com/godaddy/kubernetes-client/commit/9e1f2d6))



<a name="3.10.0"></a>
# [3.10.0](https://github.com/godaddy/kubernetes-client/compare/3.8.0...v3.10.0) (2017-03-03)


### Bug Fixes

* **response `content-type` checking:** more robust JSON response handling (#89) ([ace816e](https://github.com/godaddy/kubernetes-client/commit/ace816e))


### Features

* **Support for more APIs:** Apps, Batch, and RBAC (#78) ([3734e12](https://github.com/godaddy/kubernetes-client/commit/3734e12))



<a name="3.9.0"></a>
# [3.9.0](https://github.com/godaddy/kubernetes-client/compare/3.8.0...v3.9.0) (2017-02-27)


### Features

* **Support for more APIs:** Apps, Batch, and RBAC (#78) ([3734e12](https://github.com/godaddy/kubernetes-client/commit/3734e12))



<a name="3.8.0"></a>
# [3.8.0](https://github.com/godaddy/kubernetes-client/compare/3.5.1...v3.8.0) (2017-02-25)


### Bug Fixes

* **config:** switched token from base64 to string (#83) ([95b75a2](https://github.com/godaddy/kubernetes-client/commit/95b75a2))
* **getInCluster:** Use ca.crt correctly (#87) ([3c18ebf](https://github.com/godaddy/kubernetes-client/commit/3c18ebf))


### Features

* **config:** Now accept a manually specified context in fromKubeConfig (#82) ([12738ef](https://github.com/godaddy/kubernetes-client/commit/12738ef))



<a name="3.7.0"></a>
# [3.7.0](https://github.com/godaddy/kubernetes-client/compare/3.4.0...v3.7.0) (2017-02-25)


### Bug Fixes

* **config:** switched token from base64 to string (#83) ([95b75a2](https://github.com/godaddy/kubernetes-client/commit/95b75a2))


### Features

* **config:** Now accept a manually specified context in fromKubeConfig (#82) ([12738ef](https://github.com/godaddy/kubernetes-client/commit/12738ef))



<a name="3.6.0"></a>
# [3.6.0](https://github.com/godaddy/kubernetes-client/compare/3.5.1...v3.6.0) (2017-02-24)


### Features

* **config:** Now accept a manually specified context in fromKubeConfig (#82) ([12738ef](https://github.com/godaddy/kubernetes-client/commit/12738ef))



<a name="3.5.1"></a>
## [3.5.1](https://github.com/godaddy/kubernetes-client/compare/3.5.0...v3.5.1) (2017-02-23)



<a name="3.5.0"></a>
# [3.5.0](https://github.com/godaddy/kubernetes-client/compare/3.3.0...v3.5.0) (2017-02-14)


### Features

* **config.loadKubeconfig:** helper for loading an API config from ~/.kube/config (#73) ([3a9b609](https://github.com/godaddy/kubernetes-client/commit/3a9b609))



<a name="3.4.0"></a>
# [3.4.0](https://github.com/godaddy/kubernetes-client/compare/3.3.0...v3.4.0) (2017-02-13)


### Features

* **config.loadKubeconfig:** helper for loading an API config from ~/.kube/config (#73) ([3a9b609](https://github.com/godaddy/kubernetes-client/commit/3a9b609))



<a name="3.3.0"></a>
# [3.3.0](https://github.com/godaddy/kubernetes-client/compare/3.1.0...v3.3.0) (2017-02-09)


### Bug Fixes

* **error handling:** handle API errors that aren't JSON (#60) ([f8ae84c](https://github.com/godaddy/kubernetes-client/commit/f8ae84c))


### Features

* **extensions/thirdpartyresources:** Add `thirdpartyresources` to `Extensions` (#69) ([e720491](https://github.com/godaddy/kubernetes-client/commit/e720491))
* **insecureSkipTlsVerify:** plumb an option to skip verifying server certs (#61) ([901773e](https://github.com/godaddy/kubernetes-client/commit/901773e))
* **ThirdPartyResource:** Add `resources` option to constructor (#71) ([f457b56](https://github.com/godaddy/kubernetes-client/commit/f457b56))
* **ThirdPartyResources:** add support for Third Party Resources (#70) ([58614c5](https://github.com/godaddy/kubernetes-client/commit/58614c5)), closes [#43](https://github.com/godaddy/kubernetes-client/issues/43)



<a name="3.2.0"></a>
# [3.2.0](https://github.com/godaddy/kubernetes-client/compare/3.1.0...v3.2.0) (2017-01-20)


### Bug Fixes

* **error handling:** handle API errors that aren't JSON (#60) ([f8ae84c](https://github.com/godaddy/kubernetes-client/commit/f8ae84c))


### Features

* **insecureSkipTlsVerify:** plumb an option to skip verifying server certs (#61) ([901773e](https://github.com/godaddy/kubernetes-client/commit/901773e))



<a name="3.1.0"></a>
# [3.1.0](https://github.com/godaddy/kubernetes-client/compare/3.0.0...3.1.0) (2016-12-24)


### Bug Fixes

* **aliases:** Add missing object aliases (#54) ([3cf1e3a](https://github.com/godaddy/kubernetes-client/commit/3cf1e3a))


### Features

* **core:** add in-cluster config helper (#49) ([85915d5](https://github.com/godaddy/kubernetes-client/commit/85915d5))
