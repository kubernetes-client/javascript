# Contributing

Thanks for taking the time to join our community and start contributing!

Please remember to read and observe the [Code of Conduct](https://github.com/cncf/foundation/blob/master/code-of-conduct.md).

## Getting Started

### Prerequisites

All dependencies of this project are expressed in its [`package.json` file](package.json). Before you start developing, ensure that you have [NPM](https://www.npmjs.com/) installed, then run:

```console
npm install
```

### Development Workflow

1. Fork this repo
2. Create a feature branch
3. Make your changes (see sections below for development guidelines)
4. Test your changes (`npm test`)
5. Ensure code is formatted (`npm run format`) and passes linting (`npm run lint`)
6. Submit a pull request

## Sign the Contributor License Agreement

We'd love to accept your patches! Before we can accept them you need to sign the Cloud Native Computing Foundation (CNCF) [CLA](https://github.com/kubernetes/community/blob/master/CLA.md).

## Reporting Issues

If you have any problem with the package or any suggestions, please file an [issue](https://github.com/kubernetes-client/javascript/issues).

## Submitting a Pull Request

1. Submit an issue describing your proposed change to the repo
2. Fork this repo, develop and test your code changes
3. Submit a pull request
4. The bot will automatically assign someone to review your PR. Check the full list of bot commands [here](https://prow.k8s.io/command-help)

For more detailed guidance, see the [Kubernetes contributor guide](https://github.com/kubernetes/community/blob/master/contributors/guide/README.md).

## Architecture and Code Generation

### Project Structure

This repo has a 2-tiered structure:

```
/+
 + src/
    + gen/ <<< Automatically generated with OpenAPIGenerator, don't edit manually in Pull Requests
```

The `/src/gen` folder contains code that is generated using the [OpenAPI Generator](https://github.com/OpenAPITools/openapi-generator). This code should **not be modified manually** as changes will be overwritten by the generator.

### Generated Code

- **Generator**: Uses [OpenAPI Generator](https://openapi-generator.tech/docs/generators/typescript) with TypeScript configuration
- **Spec Source**: Pulls from the [Kubernetes OpenAPI Spec](https://github.com/kubernetes/kubernetes/tree/master/api/openapi-spec)
- **Configuration**: Shared config at [kubernetes-client/gen](https://github.com/kubernetes-client/gen/blob/master/openapi/typescript.xml)
- **Settings**: Generation inputs are configured in the `/settings` file

### Client Layer

Around the core generated code in `src/gen`, the client layer adds Kubernetes-specific features:

- Kubeconfig authentication
- Watch functionality
- Serialization
- Higher-level ergonomics requiring multiple REST calls

These functionalities provide parity with kubectl and expose convenient abstractions. For example, `kubectl port-forward deploy/my-deployment` doesn't POST to a `.../deployments/...` route. Instead, a pod is selected via listing and filtering, then a POST to `.../pods/.../portforward` is sent.

### Making Changes to Generated Code

If improvements require changes to the generated code:

1. Raise the issue upstream in the [OpenAPIGenerator repo](https://github.com/OpenAPITools/openapi-generator?tab=contributing-ov-file)
2. After they merge, update the sha in `/settings`
3. Regenerate the project using `npm run generate`

Many changes can be made using middleware to access or conditionally mutate requests without modifying the generator.

## Development Tasks

### Regenerating Code

```console
npm run generate
```

### Building Documentation

Documentation is generated via typedoc:

```console
npm run docs
```

To view the generated documentation, open `docs/index.html`

### Formatting

Run `npm run format` or install an editor plugin like:

- [Prettier for VS Code](https://github.com/prettier/prettier-vscode)
- [EditorConfig](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)

### Linting

Run `npm run lint` or install an editor plugin.

## Testing

Tests are written using the [`node:test`](https://nodejs.org/api/test.html) test runner and [`node:assert`](https://nodejs.org/api/assert.html) assertion library. See [`config_test.ts`](./src/config_test.ts) for an example.

To run tests:

```console
npm test
```

## Contact

You can reach the maintainers of this project at:

- [SIG API Machinery](https://github.com/kubernetes/community/tree/master/sig-api-machinery)
- [#kubernetes-client](https://kubernetes.slack.com/messages/kubernetes-client) channel on Kubernetes Slack
