# Class: Watch

Defined in: [src/watch.ts:6](https://github.com/davidgamero/javascript/blob/019ff89c9f584a4d3b0d6eda91fb6ec8395636c9/src/watch.ts#L6)

## Constructors

### Constructor

> **new Watch**(`config`): `Watch`

Defined in: [src/watch.ts:11](https://github.com/davidgamero/javascript/blob/019ff89c9f584a4d3b0d6eda91fb6ec8395636c9/src/watch.ts#L11)

#### Parameters

##### config

[`KubeConfig`](../../config/classes/KubeConfig.md)

#### Returns

`Watch`

## Properties

### config

> **config**: [`KubeConfig`](../../config/classes/KubeConfig.md)

Defined in: [src/watch.ts:8](https://github.com/davidgamero/javascript/blob/019ff89c9f584a4d3b0d6eda91fb6ec8395636c9/src/watch.ts#L8)

***

### SERVER\_SIDE\_CLOSE

> `static` **SERVER\_SIDE\_CLOSE**: `object`

Defined in: [src/watch.ts:7](https://github.com/davidgamero/javascript/blob/019ff89c9f584a4d3b0d6eda91fb6ec8395636c9/src/watch.ts#L7)

## Methods

### watch()

> **watch**(`path`, `queryParams`, `callback`, `done`): `Promise`\<`AbortController`\>

Defined in: [src/watch.ts:21](https://github.com/davidgamero/javascript/blob/019ff89c9f584a4d3b0d6eda91fb6ec8395636c9/src/watch.ts#L21)

#### Parameters

##### path

`string`

##### queryParams

`Record`\<`string`, `string` \| `number` \| `boolean` \| `undefined`\>

##### callback

(`phase`, `apiObj`, `watchObj?`) => `void`

##### done

(`err`) => `void`

#### Returns

`Promise`\<`AbortController`\>
