# Interface: ObjectCache\<T\>

Defined in: [src/cache.ts:17](https://github.com/davidgamero/javascript/blob/019ff89c9f584a4d3b0d6eda91fb6ec8395636c9/src/cache.ts#L17)

## Type Parameters

### T

`T`

## Methods

### get()

> **get**(`name`, `namespace?`): `T` \| `undefined`

Defined in: [src/cache.ts:18](https://github.com/davidgamero/javascript/blob/019ff89c9f584a4d3b0d6eda91fb6ec8395636c9/src/cache.ts#L18)

#### Parameters

##### name

`string`

##### namespace?

`string`

#### Returns

`T` \| `undefined`

***

### list()

> **list**(`namespace?`): readonly `T`[]

Defined in: [src/cache.ts:20](https://github.com/davidgamero/javascript/blob/019ff89c9f584a4d3b0d6eda91fb6ec8395636c9/src/cache.ts#L20)

#### Parameters

##### namespace?

`string`

#### Returns

readonly `T`[]
