# Class: Exec

Defined in: [src/exec.ts:10](https://github.com/davidgamero/javascript/blob/e0fd9c7e722ede8cfc1a9d68a223a359233058ff/src/exec.ts#L10)

## Constructors

### Constructor

> **new Exec**(`config`, `wsInterface?`): `Exec`

Defined in: [src/exec.ts:15](https://github.com/davidgamero/javascript/blob/e0fd9c7e722ede8cfc1a9d68a223a359233058ff/src/exec.ts#L15)

#### Parameters

##### config

[`KubeConfig`](../../config/classes/KubeConfig.md)

##### wsInterface?

`WebSocketInterface`

#### Returns

`Exec`

## Properties

### handler

> **handler**: `WebSocketInterface`

Defined in: [src/exec.ts:11](https://github.com/davidgamero/javascript/blob/e0fd9c7e722ede8cfc1a9d68a223a359233058ff/src/exec.ts#L11)

## Methods

### exec()

> **exec**(`namespace`, `podName`, `containerName`, `command`, `stdout`, `stderr`, `stdin`, `tty`, `statusCallback?`): `Promise`\<`WebSocket`\>

Defined in: [src/exec.ts:32](https://github.com/davidgamero/javascript/blob/e0fd9c7e722ede8cfc1a9d68a223a359233058ff/src/exec.ts#L32)

#### Parameters

##### namespace

`string`

The namespace of the pod to exec the command inside.

##### podName

`string`

The name of the pod to exec the command inside.

##### containerName

`string`

The name of the container in the pod to exec the command inside.

##### command

`string` \| `string`[]

The command or command and arguments to execute.

##### stdout

`Writable` \| `null`

The stream to write stdout data from the command.

##### stderr

`Writable` \| `null`

The stream to write stderr data from the command.

##### stdin

`Readable` \| `null`

The stream to write stdin data into the command.

##### tty

`boolean`

Should the command execute in a TTY enabled session.

##### statusCallback?

(`status`) => `void`

A callback to received the status (e.g. exit code) from the command, optional.

#### Returns

`Promise`\<`WebSocket`\>

A promise that will return the web socket created for this command.
