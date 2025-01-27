# Fetch migration

Request is fully deprecated requiring us to switch libraries (see [#414](https://github.com/kubernetes-client/javascript/issues/414) for more information). There were a few [different options](https://github.com/kubernetes-client/javascript/issues/414#issuecomment-978031677) for how this swap should be implemented but moving to a new open-api generator option was chosen since this project will acquire the advantages of an up-to-date open-api generator version.

Fetch was selected as the new HTTP request library for this project due to its widespread adoption across the JavaScript ecosystem. Additonally, potential future updates to this project could allow this client to be available with browser JavaScript since fetch is native to the browser ([#165](https://github.com/kubernetes-client/javascript/issues/165)).

[Node-fetch](https://www.npmjs.com/package/node-fetch) is our specific fetch package since it is the largest Node.js compatable implementation. Fetch is not implemented by default in Node.

For more details see the initial discussion ([#754](https://github.com/kubernetes-client/javascript/issues/754)).

## Release cycle

The fetch generator will create breaking changes to this project's API. Consumers will have to make small modifications to their code to upgrade.

We will continue to support the request version of this project for three Kubernetes API versions (~9 months) to give users time to migrate.

Versioning will follow [npm semantic versioning](https://docs.npmjs.com/about-semantic-versioning).

### Old generator (request)

Code will be on the `release-0.x` branch.

-   `0.17.x` == old generator, Kubernetes 1.23 API
-   `0.18.x` == old generator, Kubernetes 1.24 API
-   `0.19.x` == old generator, Kubernetes 1.25 API

Support for old generator stops after 1.25

### New generator (fetch)

Code will be on the `master` branch.

-   `1.0.x` == new generator, Kubernetes 1.23 API
-   `1.1.x` == new generator, Kubernetes 1.24 API
-   `1.2.x` == new generator, Kubernetes 1.25 API
    Support for subsequent kubernetes versions continues with the new generator.

## Implementation steps

### Other repositories

-   [x] Update [kubernetes-client/gen](https://github.com/kubernetes-client/gen)'s typescript-fetch files to let us pass in the `typescriptThreePlus` config option <sup>[1](https://github.com/OpenAPITools/openapi-generator/issues/9973) [2](https://github.com/OpenAPITools/openapi-generator/issues/3869#issuecomment-584152932)</sub>
-   [x] Update [openapi-generator](https://github.com/OpenAPITools/openapi-generator)'s typescript-fetch flavor to mark parameters as optional if all parameters are optional <sup>[3](https://github.com/OpenAPITools/openapi-generator/issues/6440)</sup>

### Kubernetes-client repository

-   [x] Increment `OPENAPI_GENERATOR_COMMIT` to be [version 5.3.0](https://github.com/OpenAPITools/openapi-generator/releases/tag/v5.3.0) (with the optional parameters addition)
-   [x] `npm install node-fetch` to install node-fetch
-   [x] Switch generate-client script to use typescript-fetch
-   [x] Generate api with `npm run generate`
-   [x] Match src/gen/api.ts to new generated layout (it changes slightly)
-   [x] Fix errors in /src folder (due to new api)
    -   [x] migrate src/auth.ts, the dependent implementations (ex: azure_auth, gcp_auth etc) and tests to fetch api from request
    -   [x] migrate src/log.ts and its tests to fetch api from request
        -   [x] major remaining work is fixing up async signatures and return piping
    -   [x] migrate src/watch.ts and its tests to fetch api from request
        -   [x] remove decprecated requestImpl and RequestInterface
        -   [x] implement queryParams parameter in watch method by injecting them into the fetch call
        -   [x] update tests in src/watch_test.ts
-   [x] Fix errors in test (due to new api)
-   [ ] Test all features
-   [ ] Fix JavaScript examples and validate their param signatures (due to new api)

    -   [x] cache-example
    -   [x] example
    -   [x] follow-logs
    -   [ ] in-cluster-create-job-from-cronjob // done but unable to test with media type problems
    -   [x] in-cluster
    -   [x] ingress
    -   [x] namespace
    -   [ ] patch-example // throws an error `TypeError: Cannot read properties of undefined (reading 'makeRequestContext')`
    -   [x] raw-example (note: uses request lib directly, will require full fetch migration not just client param swap)
    -   [x] scale-deployment
    -   [x] top_pods
    -   [x] top
    -   [ ] yaml-example // create works but deletion throws an error `TypeError: Cannot read properties of undefined (reading 'makeRequestContext')`

-   [ ] Fix TypeScript examples and validate their param signatures (due to new api)

    -   [ ] apply-example // KubernetesObjectApi is missing
    -   [x] attach-example
    -   [x] cp-example
    -   [x] exec-example
    -   [x] informer-with-label-selector
    -   [x] informer
    -   [x] port-forward
    -   [x] example
    -   [x] watch-example

-   [ ] Update docs
    -   [ ] Update README examples
-   [ ] Document breaking changes for users
    -   [ ] Release initial version (1.0.0)
