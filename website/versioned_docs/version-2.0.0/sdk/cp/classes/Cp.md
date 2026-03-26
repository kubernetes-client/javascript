# Class: Cp

Defined in: [src/cp.ts:7](https://github.com/davidgamero/javascript/blob/019ff89c9f584a4d3b0d6eda91fb6ec8395636c9/src/cp.ts#L7)

## Constructors

### Constructor

> **new Cp**(`config`, `execInstance?`): `Cp`

Defined in: [src/cp.ts:9](https://github.com/davidgamero/javascript/blob/019ff89c9f584a4d3b0d6eda91fb6ec8395636c9/src/cp.ts#L9)

#### Parameters

##### config

[`KubeConfig`](../../config/classes/KubeConfig.md)

##### execInstance?

[`Exec`](../../exec/classes/Exec.md)

#### Returns

`Cp`

## Properties

### execInstance

> **execInstance**: [`Exec`](../../exec/classes/Exec.md)

Defined in: [src/cp.ts:8](https://github.com/davidgamero/javascript/blob/019ff89c9f584a4d3b0d6eda91fb6ec8395636c9/src/cp.ts#L8)

## Methods

### cpFromPod()

> **cpFromPod**(`namespace`, `podName`, `containerName`, `srcPath`, `tgtPath`, `cwd?`): `Promise`\<`void`\>

Defined in: [src/cp.ts:21](https://github.com/davidgamero/javascript/blob/019ff89c9f584a4d3b0d6eda91fb6ec8395636c9/src/cp.ts#L21)

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

##### srcPath

`string`

The source path in the pod

##### tgtPath

`string`

The target path in local

##### cwd?

`string`

The directory that is used as the parent in the pod when downloading

#### Returns

`Promise`\<`void`\>

***

### cpToPod()

> **cpToPod**(`namespace`, `podName`, `containerName`, `srcPath`, `tgtPath`): `Promise`\<`void`\>

Defined in: [src/cp.ts:60](https://github.com/davidgamero/javascript/blob/019ff89c9f584a4d3b0d6eda91fb6ec8395636c9/src/cp.ts#L60)

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

##### srcPath

`string`

The source path in local

##### tgtPath

`string`

The target path in the pod

#### Returns

`Promise`\<`void`\>
