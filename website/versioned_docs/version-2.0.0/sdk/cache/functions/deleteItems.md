# Function: deleteItems()

> **deleteItems**\<`T`\>(`oldObjects`, `newObjects`, `deleteCallback?`): [`CacheMap`](../type-aliases/CacheMap.md)\<`T`\>

Defined in: [src/cache.ts:264](https://github.com/davidgamero/javascript/blob/019ff89c9f584a4d3b0d6eda91fb6ec8395636c9/src/cache.ts#L264)

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
