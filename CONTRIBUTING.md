# Contributing

Thanks for taking the time to join our community and start contributing!

Please remember to read and observe the [Code of Conduct](https://github.com/cncf/foundation/blob/master/code-of-conduct.md).

This project accepts contribution via github [pull requests](https://help.github.com/articles/about-pull-requests/). This document outlines the process to help get your contribution accepted. Please also read the [Kubernetes contributor guide](https://github.com/kubernetes/community/blob/master/contributors/guide/README.md) which provides detailed instructions on how to get your ideas and bug fixes seen and accepted.

## Sign the Contributor License Agreement

We'd love to accept your patches! Before we can accept them you need to sign Cloud Native Computing Foundation (CNCF) [CLA](https://github.com/kubernetes/community/blob/master/CLA.md).

## Reporting an issue

If you have any problem with the package or any suggestions, please file an [issue](https://github.com/kubernetes-client/javascript/issues).

## Contributing a Patch

1. Submit an issue describing your proposed change to the repo.
2. Fork this repo, develop and test your code changes.
3. Submit a pull request.
4. The bot will automatically assigns someone to review your PR. Check the full list of bot commands [here](https://prow.k8s.io/command-help).

### Contact

You can reach the maintainers of this project at [SIG API Machinery](https://github.com/kubernetes/community/tree/master/sig-api-machinery) or on the [#kubernetes-client](https://kubernetes.slack.com/messages/kubernetes-client) channel on the Kubernetes slack.

## How it works

### Generated Files

```
/+
 + src/
    + gen/ <<< Automatically generated with OpenAPIGenerator, don't edit manually in Pull Requests
```

This repo has a 2 tiered structure. The `/src/gen` repo contains code that is generated using the OpenAPI Generator [GitHub Repo](https://github.com/OpenAPITools/openapi-generator?tab=contributing-ov-file) [Docs](https://openapi-generator.tech/docs/generators/typescript). This code should not be modified manually as the changes will be overwritten by the generator.

Improvements requiring changes to the generated code should be raised upstream in the OpenAPIGenerator repo. After they merge, update the sha in `/settings` and regenerate the project. Many changes can be made leveraging middleware to access or conditionally mutate requests without requiring changes to the generator itself.

The generation uses inputs from the `/settings` file to configure refs used for generating the API, and pulls the spec from the [Kubernetes OpenAPI Spec](https://github.com/kubernetes/kubernetes/tree/master/api/openapi-spec)

The OpenAPIGenerator config is in a shared repo for all kubernetes generated client configs at (kubernetes-client/gen](https://github.com/kubernetes-client/gen/blob/master/openapi/typescript.xml)

Around this core of generated code in the `src/gen` folder, is the client layer that adds Kubernetes-specific features like kubeconfig auth, watches, serialization etc. Many of these functionalities attempt to bring parity with what kubectl offers, and expose higher-level ergonomics that require multiple REST calls to the kube-apiserver to create more convenient abstractions.

For example: the `kubectl port-forward deploy/my-deployment` command does send a POST request to a .../deployments/... route, instead a pod is selected via listing and filtering, and then a POST to .../pods/.../portforward is sent.
