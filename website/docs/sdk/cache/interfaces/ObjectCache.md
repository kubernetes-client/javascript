# Interface: ObjectCache\<T\>

Defined in: [src/cache.ts:17](https://github.com/davidgamero/javascript/blob/e0fd9c7e722ede8cfc1a9d68a223a359233058ff/src/cache.ts#L17)

## Type Parameters

### T

`T`

## Methods

### get()

> **get**(`name`, `namespace?`): `T` \| `undefined`

Defined in: [src/cache.ts:18](https://github.com/davidgamero/javascript/blob/e0fd9c7e722ede8cfc1a9d68a223a359233058ff/src/cache.ts#L18)

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

Defined in: [src/cache.ts:20](https://github.com/davidgamero/javascript/blob/e0fd9c7e722ede8cfc1a9d68a223a359233058ff/src/cache.ts#L20)

#### Parameters

##### namespace?

`string`

#### Returns

readonly `T`[]
