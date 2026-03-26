# Function: addOrUpdateObject()

> **addOrUpdateObject**\<`T`\>(`objects`, `obj`, `addCallbacks?`, `updateCallbacks?`): `void`

Defined in: [src/cache.ts:296](https://github.com/davidgamero/javascript/blob/019ff89c9f584a4d3b0d6eda91fb6ec8395636c9/src/cache.ts#L296)

## Type Parameters

### T

`T` *extends* [`KubernetesObject`](../../types/interfaces/KubernetesObject.md)

## Parameters

### objects

[`CacheMap`](../type-aliases/CacheMap.md)\<`T`\>

### obj

`T`

### addCallbacks?

[`ObjectCallback`](../../informer/type-aliases/ObjectCallback.md)\<`T`\>[]

### updateCallbacks?

[`ObjectCallback`](../../informer/type-aliases/ObjectCallback.md)\<`T`\>[]

## Returns

`void`
