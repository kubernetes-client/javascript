# Function: makeInformer()

> **makeInformer**\<`T`\>(`kubeconfig`, `path`, `listPromiseFn`, `labelSelector?`): [`Informer`](../interfaces/Informer.md)\<`T`\> & [`ObjectCache`](../../cache/interfaces/ObjectCache.md)\<`T`\>

Defined in: [src/informer.ts:37](https://github.com/davidgamero/javascript/blob/019ff89c9f584a4d3b0d6eda91fb6ec8395636c9/src/informer.ts#L37)

## Type Parameters

### T

`T` *extends* [`KubernetesObject`](../../types/interfaces/KubernetesObject.md)

## Parameters

### kubeconfig

[`KubeConfig`](../../config/classes/KubeConfig.md)

### path

`string`

### listPromiseFn

[`ListPromise`](../type-aliases/ListPromise.md)\<`T`\>

### labelSelector?

`string`

## Returns

[`Informer`](../interfaces/Informer.md)\<`T`\> & [`ObjectCache`](../../cache/interfaces/ObjectCache.md)\<`T`\>
