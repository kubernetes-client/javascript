# Class: ListWatch\<T\>

Defined in: [src/cache.ts:26](https://github.com/davidgamero/javascript/blob/e0fd9c7e722ede8cfc1a9d68a223a359233058ff/src/cache.ts#L26)

## Type Parameters

### T

`T` *extends* [`KubernetesObject`](../../types/interfaces/KubernetesObject.md)

## Implements

- [`ObjectCache`](../interfaces/ObjectCache.md)\<`T`\>
- [`Informer`](../../informer/interfaces/Informer.md)\<`T`\>

## Constructors

### Constructor

> **new ListWatch**\<`T`\>(`path`, `watch`, `listFn`, `autoStart?`, `labelSelector?`, `fieldSelector?`): `ListWatch`\<`T`\>

Defined in: [src/cache.ts:39](https://github.com/davidgamero/javascript/blob/e0fd9c7e722ede8cfc1a9d68a223a359233058ff/src/cache.ts#L39)

#### Parameters

##### path

`string`

##### watch

[`Watch`](../../watch/classes/Watch.md)

##### listFn

[`ListPromise`](../../informer/type-aliases/ListPromise.md)\<`T`\>

##### autoStart?

`boolean` = `true`

##### labelSelector?

`string`

##### fieldSelector?

`string`

#### Returns

`ListWatch`\<`T`\>

## Methods

### get()

> **get**(`name`, `namespace?`): `T` \| `undefined`

Defined in: [src/cache.ts:113](https://github.com/davidgamero/javascript/blob/e0fd9c7e722ede8cfc1a9d68a223a359233058ff/src/cache.ts#L113)

#### Parameters

##### name

`string`

##### namespace?

`string`

#### Returns

`T` \| `undefined`

#### Implementation of

[`ObjectCache`](../interfaces/ObjectCache.md).[`get`](../interfaces/ObjectCache.md#get)

***

### latestResourceVersion()

> **latestResourceVersion**(): `string`

Defined in: [src/cache.ts:136](https://github.com/davidgamero/javascript/blob/e0fd9c7e722ede8cfc1a9d68a223a359233058ff/src/cache.ts#L136)

#### Returns

`string`

***

### list()

> **list**(`namespace?`): readonly `T`[]

Defined in: [src/cache.ts:121](https://github.com/davidgamero/javascript/blob/e0fd9c7e722ede8cfc1a9d68a223a359233058ff/src/cache.ts#L121)

#### Parameters

##### namespace?

`string`

#### Returns

readonly `T`[]

#### Implementation of

[`ObjectCache`](../interfaces/ObjectCache.md).[`list`](../interfaces/ObjectCache.md#list)

***

### off()

#### Call Signature

> **off**(`verb`, `cb`): `void`

Defined in: [src/cache.ts:92](https://github.com/davidgamero/javascript/blob/e0fd9c7e722ede8cfc1a9d68a223a359233058ff/src/cache.ts#L92)

##### Parameters

###### verb

`"add"` \| `"update"` \| `"change"` \| `"delete"`

###### cb

[`ObjectCallback`](../../informer/type-aliases/ObjectCallback.md)\<`T`\>

##### Returns

`void`

##### Implementation of

[`Informer`](../../informer/interfaces/Informer.md).[`off`](../../informer/interfaces/Informer.md#off)

#### Call Signature

> **off**(`verb`, `cb`): `void`

Defined in: [src/cache.ts:93](https://github.com/davidgamero/javascript/blob/e0fd9c7e722ede8cfc1a9d68a223a359233058ff/src/cache.ts#L93)

##### Parameters

###### verb

`"connect"` \| `"error"`

###### cb

[`ErrorCallback`](../../informer/type-aliases/ErrorCallback.md)

##### Returns

`void`

##### Implementation of

[`Informer`](../../informer/interfaces/Informer.md).[`off`](../../informer/interfaces/Informer.md#off)

***

### on()

#### Call Signature

> **on**(`verb`, `cb`): `void`

Defined in: [src/cache.ts:74](https://github.com/davidgamero/javascript/blob/e0fd9c7e722ede8cfc1a9d68a223a359233058ff/src/cache.ts#L74)

##### Parameters

###### verb

`"add"` \| `"update"` \| `"change"` \| `"delete"`

###### cb

[`ObjectCallback`](../../informer/type-aliases/ObjectCallback.md)\<`T`\>

##### Returns

`void`

##### Implementation of

[`Informer`](../../informer/interfaces/Informer.md).[`on`](../../informer/interfaces/Informer.md#on)

#### Call Signature

> **on**(`verb`, `cb`): `void`

Defined in: [src/cache.ts:75](https://github.com/davidgamero/javascript/blob/e0fd9c7e722ede8cfc1a9d68a223a359233058ff/src/cache.ts#L75)

##### Parameters

###### verb

`"connect"` \| `"error"`

###### cb

[`ErrorCallback`](../../informer/type-aliases/ErrorCallback.md)

##### Returns

`void`

##### Implementation of

[`Informer`](../../informer/interfaces/Informer.md).[`on`](../../informer/interfaces/Informer.md#on)

***

### start()

> **start**(): `Promise`\<`void`\>

Defined in: [src/cache.ts:64](https://github.com/davidgamero/javascript/blob/e0fd9c7e722ede8cfc1a9d68a223a359233058ff/src/cache.ts#L64)

#### Returns

`Promise`\<`void`\>

#### Implementation of

[`Informer`](../../informer/interfaces/Informer.md).[`start`](../../informer/interfaces/Informer.md#start)

***

### stop()

> **stop**(): `Promise`\<`void`\>

Defined in: [src/cache.ts:69](https://github.com/davidgamero/javascript/blob/e0fd9c7e722ede8cfc1a9d68a223a359233058ff/src/cache.ts#L69)

#### Returns

`Promise`\<`void`\>

#### Implementation of

[`Informer`](../../informer/interfaces/Informer.md).[`stop`](../../informer/interfaces/Informer.md#stop)
