# Interface: Informer\<T\>

Defined in: [src/informer.ts:28](https://github.com/davidgamero/javascript/blob/019ff89c9f584a4d3b0d6eda91fb6ec8395636c9/src/informer.ts#L28)

## Type Parameters

### T

`T` *extends* [`KubernetesObject`](../../types/interfaces/KubernetesObject.md)

## Methods

### off()

#### Call Signature

> **off**(`verb`, `cb`): `void`

Defined in: [src/informer.ts:31](https://github.com/davidgamero/javascript/blob/019ff89c9f584a4d3b0d6eda91fb6ec8395636c9/src/informer.ts#L31)

##### Parameters

###### verb

`"add"` \| `"update"` \| `"change"` \| `"delete"`

###### cb

[`ObjectCallback`](../type-aliases/ObjectCallback.md)\<`T`\>

##### Returns

`void`

#### Call Signature

> **off**(`verb`, `cb`): `void`

Defined in: [src/informer.ts:32](https://github.com/davidgamero/javascript/blob/019ff89c9f584a4d3b0d6eda91fb6ec8395636c9/src/informer.ts#L32)

##### Parameters

###### verb

`"connect"` \| `"error"`

###### cb

[`ErrorCallback`](../type-aliases/ErrorCallback.md)

##### Returns

`void`

***

### on()

#### Call Signature

> **on**(`verb`, `cb`): `void`

Defined in: [src/informer.ts:29](https://github.com/davidgamero/javascript/blob/019ff89c9f584a4d3b0d6eda91fb6ec8395636c9/src/informer.ts#L29)

##### Parameters

###### verb

`"add"` \| `"update"` \| `"change"` \| `"delete"`

###### cb

[`ObjectCallback`](../type-aliases/ObjectCallback.md)\<`T`\>

##### Returns

`void`

#### Call Signature

> **on**(`verb`, `cb`): `void`

Defined in: [src/informer.ts:30](https://github.com/davidgamero/javascript/blob/019ff89c9f584a4d3b0d6eda91fb6ec8395636c9/src/informer.ts#L30)

##### Parameters

###### verb

`"connect"` \| `"error"`

###### cb

[`ErrorCallback`](../type-aliases/ErrorCallback.md)

##### Returns

`void`

***

### start()

> **start**(): `Promise`\<`void`\>

Defined in: [src/informer.ts:33](https://github.com/davidgamero/javascript/blob/019ff89c9f584a4d3b0d6eda91fb6ec8395636c9/src/informer.ts#L33)

#### Returns

`Promise`\<`void`\>

***

### stop()

> **stop**(): `Promise`\<`void`\>

Defined in: [src/informer.ts:34](https://github.com/davidgamero/javascript/blob/019ff89c9f584a4d3b0d6eda91fb6ec8395636c9/src/informer.ts#L34)

#### Returns

`Promise`\<`void`\>
