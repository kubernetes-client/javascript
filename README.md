# Javascript Kubernetes Client information

[![Build Status](https://github.com/kubernetes-client/javascript/workflows/Kubernetes%20Javascript%20Client%20-%20Validation/badge.svg)](https://github.com/kubernetes-client/javascript/actions)
[![Client Capabilities](https://img.shields.io/badge/Kubernetes%20client-Gold-blue.svg?style=flat&colorB=FFD700&colorA=306CE8)](http://bit.ly/kubernetes-client-capabilities-badge)
[![Client Support Level](https://img.shields.io/badge/kubernetes%20client-beta-green.svg?style=flat&colorA=306CE8)](http://bit.ly/kubernetes-client-support-badge)
[![Build and Deploy Docs](https://github.com/kubernetes-client/javascript/actions/workflows/deploy-docs.yml/badge.svg)](https://github.com/kubernetes-client/javascript/actions/workflows/deploy-docs.yml)

The Javascript clients for Kubernetes is implemented in
[typescript](https://typescriptlang.org), but can be called from either
Javascript or Typescript. The client is implemented for server-side use with Node.

# Installation

```console
npm install @kubernetes/client-node
```

# Example code

## List all pods

```javascript
const k8s = require('@kubernetes/client-node');

const kc = new k8s.KubeConfig();
kc.loadFromDefault();

const k8sApi = kc.makeApiClient(k8s.CoreV1Api);

k8sApi.listNamespacedPod({ namespace: 'default' }).then((res) => {
    console.log(res);
});
```

## Create a new namespace

```javascript
const k8s = require('@kubernetes/client-node');

const kc = new k8s.KubeConfig();
kc.loadFromDefault();

const k8sApi = kc.makeApiClient(k8s.CoreV1Api);

var namespace = {
    metadata: {
        name: 'test',
    },
};

k8sApi.createNamespace({ body: namespace }).then(
    (response) => {
        console.log('Created namespace');
        console.log(response);
        k8sApi.readNamespace({ name: namespace.metadata.name }).then((response) => {
            console.log(response);
            k8sApi.deleteNamespace({ name: namespace.metadata.name });
        });
    },
    (err) => {
        console.log('Error!: ' + err);
    },
);
```

## Create a cluster configuration programmatically

```javascript
const k8s = require('@kubernetes/client-node');

const cluster = {
    name: 'my-server',
    server: 'http://server.com',
};

const user = {
    name: 'my-user',
    password: 'some-password',
};

const context = {
    name: 'my-context',
    user: user.name,
    cluster: cluster.name,
};

const kc = new k8s.KubeConfig();
kc.loadFromOptions({
    clusters: [cluster],
    users: [user],
    contexts: [context],
    currentContext: context.name,
});
const k8sApi = kc.makeApiClient(k8s.CoreV1Api);
...
```

## Exec credential plugin policy

Kubeconfig `exec` credential plugins start local processes. By default all plugins are allowed,
so only load trusted kubeconfigs. Applications can restrict which plugins may run with the same
policy that kubectl reads from its [kuberc](https://kubernetes.io/docs/reference/kubectl/kuberc/#credential-plugin-policy)
file:

```javascript
const kc = new k8s.KubeConfig();
kc.loadFromDefault();

// Never run exec plugins
kc.setExecCredentialPluginPolicy({ credentialPluginPolicy: 'DenyAll' });

// Only run approved plugins, by basename or full path
kc.setExecCredentialPluginPolicy({
    credentialPluginPolicy: 'Allowlist',
    credentialPluginAllowlist: [{ command: 'kubelogin' }, { command: '/usr/local/bin/my-trusted-plugin' }],
});

// Or use the policy from the user's kuberc file ($KUBERC or ~/.kube/kuberc)
kc.loadExecCredentialPluginPolicyFromKuberc();
```

The policy semantics match kubectl:

- An unspecified or empty `credentialPluginPolicy` is the same as `AllowAll`.
- `credentialPluginAllowlist` is required (and must be non-empty) for `Allowlist`, and is an error for any other
  policy. Entries must specify a non-empty `command` (the deprecated `name` alias is accepted, but not both).
- A plugin is allowed if its command exactly matches an allowlist entry, or if both resolve to the same executable
  using `PATH`. Neither symlinks nor shell globs are resolved.
- In `Allowlist` mode the resolved full path of the plugin is executed, so the plugin `env` from the kubeconfig cannot
  change which executable is started. Plugin arguments and environment are not otherwise restricted.
- Denied plugins throw an `ExecCredentialPluginDeniedError` before any process is started; the policy is checked
  for the initial execution and every token refresh.
- `KUBERC=off` or `KUBECTL_KUBERC=false` disables loading the kuberc file.

This policy is a defense-in-depth measure, not a sandbox. Allowing an interpreter or other general purpose launcher
can permit arbitrary code execution.

# Documentation

📖 **[View Documentation](https://kubernetes-client.github.io/javascript/)**

Documentation is built with [Docusaurus](https://docusaurus.io/) and includes:

- SDK Reference (KubeConfig, Watch, Informer, Exec, etc.)
- Kubernetes API Reference (all API groups)
- Version selector for historical releases
- [Kubernetes API Reference](https://kubernetes.io/docs/reference/) — source-of-truth for all Kubernetes client libraries

## Preview docs locally

```bash
# From the repo root — install the client library (needed by typedoc)
npm install

# Install docs dependencies and start the dev server
cd docs
npm install
npm start          # opens http://localhost:3000 with hot-reload
```

`npm start` automatically runs the `prestart` hook which generates the API
reference, SDK docs, and model pages from source before launching the dev
server. Changes to hand-written docs (e.g. `docs/docs/examples/`) are
reflected instantly; changes to the generated sources require restarting the
server.

To do a full production build (which also validates all links):

```bash
cd docs
npm run build      # generates + builds static site into docs/build/
npm run serve      # preview the production build at http://localhost:3000
```

There are several more JS and TS examples in the [examples](https://github.com/kubernetes-client/javascript/tree/main/examples) directory.

# Compatibility

## Package versioning

Client releases follow [Semantic Versioning](https://semver.org/):

- **Major:** new Kubernetes API targets and incompatible client changes. Regeneration may remove
  exported clients or models and change existing TypeScript types.
- **Minor:** backward-compatible features.
- **Patch:** backward-compatible bug and security fixes.

We align major client releases with new Kubernetes API targets, as discussed in
[#2582](https://github.com/kubernetes-client/javascript/issues/2582#issuecomment-3145057737).
Client and Kubernetes version numbers do not match. Check the release notes when upgrading majors.

The [1.0.0 release](https://github.com/kubernetes-client/javascript/releases/tag/1.0.0) migrated from
`request` to `node-fetch` and became ESM-only. The
[2.0.0 release](https://github.com/kubernetes-client/javascript/releases/tag/2.0.0) migrated from
`node-fetch` to the npm `undici` package and changed supported Node.js versions.

## Generated Kubernetes API targets

This table lists the Kubernetes API specification used to generate each client version.

| Client version | Generated Kubernetes API target |
| -------------- | ------------------------------- |
| 0.19.0         | 1.27                            |
| 0.20.0         | 1.28                            |
| 0.21.0         | 1.29                            |
| 0.22.0         | 1.30                            |
| 1.0.0          | 1.32                            |
| 1.1.2          | 1.32                            |
| 1.2.0          | 1.33                            |
| 1.3.0          | 1.33                            |
| 1.4.0          | 1.34                            |
| 2.0.0–2.0.2    | 1.36                            |
| 3.0.0          | 1.37                            |

## Compatibility with clusters

Clients generally work with older or newer clusters when both support the APIs your application
uses. New APIs may be unavailable on older clusters, and deprecated APIs may be removed from newer
clusters or clients. The generation targets above do not guarantee compatibility with every cluster.

See the [Kubernetes API deprecation policy](https://kubernetes.io/docs/reference/using-api/deprecation-policy/)
and client release notes, and test against the cluster versions your application supports.

# Known Issues

- Multiple kubeconfigs are not completely supported.
  Credentials are cached based on the kubeconfig username and these can collide across configs.
  Here is the related [issue](https://github.com/kubernetes-client/javascript/issues/592).

- In scenarios where multiple headers with the same key are required in a request, such as `Impersonate-Group`, avoid using `fetch`. Fetch will merge the values into a single header key, with the values as a single string vs a list of strings, `Impersonate-Group: "group1,group2"`. The workaround is to use a low-level library such as `https` to make the request. Refer to issue [#2474](https://github.com/kubernetes-client/javascript/issues/2474) for more details.

# Contributing

Please see [CONTRIBUTING.md](CONTRIBUTING.md) for development setup, testing, and contribution guidelines.
