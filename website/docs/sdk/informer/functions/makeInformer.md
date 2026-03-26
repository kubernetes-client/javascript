# Function: makeInformer()

> **makeInformer**\<`T`\>(`kubeconfig`, `path`, `listPromiseFn`, `labelSelector?`): [`Informer`](../interfaces/Informer.md)\<`T`\> & [`ObjectCache`](../../cache/interfaces/ObjectCache.md)\<`T`\>

Defined in: [src/informer.ts:37](https://github.com/davidgamero/javascript/blob/e0fd9c7e722ede8cfc1a9d68a223a359233058ff/src/informer.ts#L37)

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
