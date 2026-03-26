# Class: Attach

Defined in: [src/attach.ts:9](https://github.com/davidgamero/javascript/blob/019ff89c9f584a4d3b0d6eda91fb6ec8395636c9/src/attach.ts#L9)

## Constructors

### Constructor

> **new Attach**(`config`, `websocketInterface?`): `Attach`

Defined in: [src/attach.ts:14](https://github.com/davidgamero/javascript/blob/019ff89c9f584a4d3b0d6eda91fb6ec8395636c9/src/attach.ts#L14)

#### Parameters

##### config

[`KubeConfig`](../../config/classes/KubeConfig.md)

##### websocketInterface?

`WebSocketInterface`

#### Returns

`Attach`

## Properties

### handler

> **handler**: `WebSocketInterface`

Defined in: [src/attach.ts:10](https://github.com/davidgamero/javascript/blob/019ff89c9f584a4d3b0d6eda91fb6ec8395636c9/src/attach.ts#L10)

## Methods

### attach()

> **attach**(`namespace`, `podName`, `containerName`, `stdout`, `stderr`, `stdin`, `tty`): `Promise`\<`WebSocket`\>

Defined in: [src/attach.ts:18](https://github.com/davidgamero/javascript/blob/019ff89c9f584a4d3b0d6eda91fb6ec8395636c9/src/attach.ts#L18)

#### Parameters

##### namespace

`string`

##### podName

`string`

##### containerName

`string`

##### stdout

`any`

##### stderr

`any`

##### stdin

`any`

##### tty

`boolean`

#### Returns

`Promise`\<`WebSocket`\>
