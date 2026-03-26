# Function: addOrUpdateObject()

> **addOrUpdateObject**\<`T`\>(`objects`, `obj`, `addCallbacks?`, `updateCallbacks?`): `void`

Defined in: [src/cache.ts:296](https://github.com/davidgamero/javascript/blob/e0fd9c7e722ede8cfc1a9d68a223a359233058ff/src/cache.ts#L296)

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
