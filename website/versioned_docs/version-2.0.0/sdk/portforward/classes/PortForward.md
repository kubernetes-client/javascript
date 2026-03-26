# Class: PortForward

Defined in: [src/portforward.ts:9](https://github.com/davidgamero/javascript/blob/019ff89c9f584a4d3b0d6eda91fb6ec8395636c9/src/portforward.ts#L9)

## Constructors

### Constructor

> **new PortForward**(`config`, `disconnectOnErr?`, `handler?`): `PortForward`

Defined in: [src/portforward.ts:15](https://github.com/davidgamero/javascript/blob/019ff89c9f584a4d3b0d6eda91fb6ec8395636c9/src/portforward.ts#L15)

#### Parameters

##### config

[`KubeConfig`](../../config/classes/KubeConfig.md)

##### disconnectOnErr?

`boolean`

##### handler?

`WebSocketInterface`

#### Returns

`PortForward`

## Methods

### portForward()

> **portForward**(`namespace`, `podName`, `targetPorts`, `output`, `err`, `input`, `retryCount?`): `Promise`\<`any`\>

Defined in: [src/portforward.ts:22](https://github.com/davidgamero/javascript/blob/019ff89c9f584a4d3b0d6eda91fb6ec8395636c9/src/portforward.ts#L22)

#### Parameters

##### namespace

`string`

##### podName

`string`

##### targetPorts

`number`[]

##### output

`Writable`

##### err

`Writable` \| `null`

##### input

`Readable`

##### retryCount?

`number` = `0`

#### Returns

`Promise`\<`any`\>

***

### portForwardDeployment()

> **portForwardDeployment**(`namespace`, `deploymentName`, `targetPorts`, `output`, `err`, `input`, `retryCount?`): `Promise`\<`any`\>

Defined in: [src/portforward.ts:123](https://github.com/davidgamero/javascript/blob/019ff89c9f584a4d3b0d6eda91fb6ec8395636c9/src/portforward.ts#L123)

Port forward to a deployment by resolving to the first ready pod selected by the deployment's selector.

#### Parameters

##### namespace

`string`

The namespace of the deployment

##### deploymentName

`string`

The name of the deployment

##### targetPorts

`number`[]

The target ports to forward to

##### output

`Writable`

The writable stream for output

##### err

`Writable` \| `null`

The writable stream for error output (can be null)

##### input

`Readable`

The readable stream for input

##### retryCount?

`number` = `0`

The number of times to retry the connection

#### Returns

`Promise`\<`any`\>

#### Throws

Will throw an error if the deployment is not found or has no ready pods

***

### portForwardService()

> **portForwardService**(`namespace`, `serviceName`, `targetPorts`, `output`, `err`, `input`, `retryCount?`): `Promise`\<`any`\>

Defined in: [src/portforward.ts:89](https://github.com/davidgamero/javascript/blob/019ff89c9f584a4d3b0d6eda91fb6ec8395636c9/src/portforward.ts#L89)

Port forward to a service by resolving to the first ready pod selected by the service's selector.

#### Parameters

##### namespace

`string`

The namespace of the service

##### serviceName

`string`

The name of the service

##### targetPorts

`number`[]

The target ports to forward to

##### output

`Writable`

The writable stream for output

##### err

`Writable` \| `null`

The writable stream for error output (can be null)

##### input

`Readable`

The readable stream for input

##### retryCount?

`number` = `0`

The number of times to retry the connection

#### Returns

`Promise`\<`any`\>

#### Throws

Will throw an error if the service is not found or has no ready pods
