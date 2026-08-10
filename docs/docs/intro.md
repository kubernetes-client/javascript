---
slug: /
sidebar_position: 1
---

# Introduction

The Kubernetes JavaScript Client is the official Node.js client for interacting with Kubernetes clusters. It's written in TypeScript and provides a powerful, type-safe way to manage Kubernetes resources from your Node.js applications.

## Installation

Install the client using npm:

```bash
npm install @kubernetes/client-node
```

## Quick Start

The following example shows how to load your default KubeConfig and list all pods in the `default` namespace.

```typescript
import * as k8s from '@kubernetes/client-node';

const kc = new k8s.KubeConfig();
kc.loadFromDefault();

const k8sApi = kc.makeApiClient(k8s.CoreV1Api);

async function listPods() {
    try {
        const res = await k8sApi.listNamespacedPod({ namespace: 'default' });
        console.log(
            'Pods:',
            res.items.map((pod) => pod.metadata?.name),
        );
    } catch (err) {
        console.error('Error:', err);
    }
}

listPods();
```

## KubeConfig Methods

The `KubeConfig` class provides several ways to load your configuration:

- `loadFromDefault()`: Loads from the default location (`~/.kube/config` or service account)
- `loadFromFile(path)`: Loads from a specific file
- `loadFromString(content)`: Loads from a YAML string
- `loadFromOptions(options)`: Loads from a programmatic object
- `loadFromCluster()`: Specifically for running inside a cluster (Service Account)

## Compatibility

Starting with release `0.13.0`, the minor version of this library tracks the minor Kubernetes API version it was generated from.

| client version | older versions | 1.28 | 1.29 | 1.30 | 1.31 | 1.32 | 1.33 | 1.34 |
| -------------- | -------------- | ---- | ---- | ---- | ---- | ---- | ---- | ---- |
| 0.19.x         | -              | ✓    | x    | x    | x    | x    | x    | x    |
| 0.20.x         | -              | +    | ✓    | x    | x    | x    | x    | x    |
| 0.21.x         | -              | +    | +    | ✓    | x    | x    | x    | x    |
| 0.22.x         | -              | +    | +    | +    | ✓    | x    | x    | x    |
| 1.0.x          | -              | +    | +    | +    | +    | ✓    | x    | x    |
| 1.1.x          | -              | +    | +    | +    | +    | ✓    | x    | x    |
| 1.2.x          | -              | +    | +    | +    | +    | +    | ✓    | x    |
| 1.3.x          | -              | +    | +    | +    | +    | +    | ✓    | x    |
| 1.4.x          | -              | +    | +    | +    | +    | +    | +    | ✓    |

**Key:**

- `✓` Exactly the same features / API objects.
- `+` Client has more features than the cluster, common features work.
- `-` Cluster has features client can't use yet.
- `x` No guarantee of support (outside the n-2 version support window).

## Links

- [SDK Reference](/sdk)
- [Kubernetes API Reference](https://kubernetes.io/docs/reference/)
- [GitHub Repository](https://github.com/kubernetes-client/javascript)
