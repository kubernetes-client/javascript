# Contributing to kubernetes-client

Thanks for taking the time to contribute!

## Submitting an Issue

We will try to respond to every issue. The issues that get the
quickest response are the ones that are easiest to respond to. The
issues that are easiest to respond to usually include the
following:

* A small self sufficient code example to reproduce the issue.
* For requests for help, a small self sufficient code example that
  illustrates what you're currently attempting to implement.
* For API feature requests, links to supporting API documentation or
  examples from Kubernetes clients in other languages (*e.g.*,
  <https://github.com/kubernetes/client-go>).

## Submitting a Pull Request

The most useful PRs ensure the following:

1. Include tests with your PR. Check out [`test/`](test) for adding
unit tests. See the testing section in
[README.md](https://github.com/godaddy/kubernetes-client#testing) for
tips on running tests.
1. Run `npm test` locally. Fix any issues before submitting your PR.
1. After submitting a PR, Travis CI tests will run. Fix any issues
Travis CI reports.

## Adding Swagger specificatins

It's useful to package Swagger specifications with
kubernetes-client. To add newly released specifications:

* Visit <https://github.com/kubernetes/kubernetes/blob/release-1.13/api/openapi-spec/swagger.json>
and select the release branch.
* Download the swagger.json file.
* Gzip it and add it to [lib/specs](lib/specs).
* Update documentation by running `npm run docs`, adding the generated
files and changes, and updating the
[`Documentation`](./README.md#documentation) section of the README.md.
* Create a PR.

## Publishing a new release

If you're a maintainer use `npm run release` to start the release
process and follow the instructions printed to the console.
