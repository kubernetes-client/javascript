# Fetch migration

Request is fully deprecated requiring us to switch libraries (see [#414](https://github.com/kubernetes-client/javascript/issues/414) for more information). There were a few [different options](https://github.com/kubernetes-client/javascript/issues/414#issuecomment-978031677) for how this swap should be implemented but moving to a new open-api generator option was chosen since this project will acquire the advantages of an up-to-date open-api generator version.

Fetch was selected as the new HTTP request library for this project due to its widespread adoption across the JavaScript ecosystem. Additionally, potential future updates to this project could allow this client to be available with browser JavaScript since fetch is native to the browser ([#165](https://github.com/kubernetes-client/javascript/issues/165)).

[Node-fetch](https://www.npmjs.com/package/node-fetch) is our specific fetch package since it is the largest Node.js compatible implementation. Fetch is not implemented by default in Node.

For more details see the initial discussion ([#754](https://github.com/kubernetes-client/javascript/issues/754)).

Edit 02/2022:

Since the OpenApiGenerator project is targeting a single `typescript` generator (instead of individual networking flavors eg: typescript-fetch, typescript-axios) that includes node-fetch support, the initial plans to import and inject node-fetch is no longer optimal.

The proposed changes have been implemented on the new `typescript` generator which includes changes to the authentication and authorization interface that now uses a `RequestContext` object instead of directly allowing access to the https request options. In order to bridge the existing javascript client auth methods, additional exposure via custom SecurityAuthentication support has [been merged](https://github.com/OpenAPITools/openapi-generator/pull/11321) into the typescript generator.


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
-   [ ] ~~Switch generate-client script to use typescript-fetch~~ (see edit 02/2022)
-   [ ] ~~Import and inject node-fetch in `src/api.ts`~~ (see edit 02/2022)

-   [x] Generate api with `npm run generate`
-   [x] Match src/gen/api.ts to new generated layout (it changes slightly)

-   [ ] Fix errors in /src folder (due to new generated api)
    - [ ] Migrate watch.ts to use node-fetch
    - [ ] Migrate log.ts to use node-fetch
    - [ ] Migrate metrics.ts to use node-fetch
    - [ ] Migrate HttpError Usage to HttpException (following new OpenApiGen convention)
-   [ ] Fix errors in test (due to new api)
-   [ ] Test all features
-   [ ] Fix examples (due to new api)
-   [ ] Update docs
-   [ ] Document breaking changes for users
-   [ ] Release initial version (1.0.0)
