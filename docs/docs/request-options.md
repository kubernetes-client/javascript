---
sidebar_position: 2
title: Request Options
---

# Request Options

Generated API methods accept
[`ApiRequestOptions`](/sdk/middleware/type-aliases/ApiRequestOptions) as an optional
second argument. Request options can replace, append, or prepend middleware for one API call without
changing the client-wide configuration.

## Timeout

Use
[`setRequestTimeoutOptions()`](/sdk/middleware/functions/setRequestTimeoutOptions)
to apply an absolute deadline to one request:

```ts
const pods = await api.listNamespacedPod({ namespace: 'default' }, setRequestTimeoutOptions(5_000));
```

For client-wide configuration or custom composition, use
[`requestTimeoutMiddleware()`](/sdk/middleware/functions/requestTimeoutMiddleware)
directly. This timeout is an absolute request deadline, regardless of network activity; it is not an
inactivity timeout.

## Headers

Use [`setHeaderOptions()`](/sdk/middleware/functions/setHeaderOptions) to set a header for one request:

```ts
await api.patchNamespacedPod(
    { name, namespace, body: patch },
    setHeaderOptions('Content-Type', PatchStrategy.JsonPatch),
);
```

Options helpers can be composed by passing existing options to the next helper:

```ts
const options = setRequestTimeoutOptions(5_000, setHeaderOptions('Content-Type', PatchStrategy.JsonPatch));
```
