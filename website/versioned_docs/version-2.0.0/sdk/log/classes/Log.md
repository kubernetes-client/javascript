# Class: Log

Defined in: [src/log.ts:84](https://github.com/davidgamero/javascript/blob/019ff89c9f584a4d3b0d6eda91fb6ec8395636c9/src/log.ts#L84)

## Constructors

### Constructor

> **new Log**(`config`): `Log`

Defined in: [src/log.ts:87](https://github.com/davidgamero/javascript/blob/019ff89c9f584a4d3b0d6eda91fb6ec8395636c9/src/log.ts#L87)

#### Parameters

##### config

[`KubeConfig`](../../config/classes/KubeConfig.md)

#### Returns

`Log`

## Properties

### config

> **config**: [`KubeConfig`](../../config/classes/KubeConfig.md)

Defined in: [src/log.ts:85](https://github.com/davidgamero/javascript/blob/019ff89c9f584a4d3b0d6eda91fb6ec8395636c9/src/log.ts#L85)

## Methods

### log()

#### Call Signature

> **log**(`namespace`, `podName`, `containerName`, `stream`, `options?`): `Promise`\<`AbortController`\>

Defined in: [src/log.ts:91](https://github.com/davidgamero/javascript/blob/019ff89c9f584a4d3b0d6eda91fb6ec8395636c9/src/log.ts#L91)

##### Parameters

###### namespace

`string`

###### podName

`string`

###### containerName

`string`

###### stream

`Writable`

###### options?

[`LogOptions`](../interfaces/LogOptions.md)

##### Returns

`Promise`\<`AbortController`\>

#### Call Signature

> **log**(`namespace`, `podName`, `containerName`, `stream`, `done`, `options?`): `Promise`\<`AbortController`\>

Defined in: [src/log.ts:99](https://github.com/davidgamero/javascript/blob/019ff89c9f584a4d3b0d6eda91fb6ec8395636c9/src/log.ts#L99)

##### Parameters

###### namespace

`string`

###### podName

`string`

###### containerName

`string`

###### stream

`Writable`

###### done

(`err`) => `void`

###### options?

[`LogOptions`](../interfaces/LogOptions.md)

##### Returns

`Promise`\<`AbortController`\>

##### Deprecated

done callback is deprecated
