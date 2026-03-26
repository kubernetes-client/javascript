# Function: deleteItems()

> **deleteItems**\<`T`\>(`oldObjects`, `newObjects`, `deleteCallback?`): [`CacheMap`](../type-aliases/CacheMap.md)\<`T`\>

Defined in: [src/cache.ts:264](https://github.com/davidgamero/javascript/blob/e0fd9c7e722ede8cfc1a9d68a223a359233058ff/src/cache.ts#L264)

## Type Parameters

### T

`T` *extends* [`KubernetesObject`](../../types/interfaces/KubernetesObject.md)

## Parameters

### oldObjects

[`CacheMap`](../type-aliases/CacheMap.md)\<`T`\>

### newObjects

`T`[]

### deleteCallback?

[`ObjectCallback`](../../informer/type-aliases/ObjectCallback.md)\<`T`\>[]

## Returns

[`CacheMap`](../type-aliases/CacheMap.md)\<`T`\>
