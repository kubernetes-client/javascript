# Class: KubeConfig

Defined in: [src/config.ts:68](https://github.com/davidgamero/javascript/blob/e0fd9c7e722ede8cfc1a9d68a223a359233058ff/src/config.ts#L68)

## Implements

- `SecurityAuthentication`

## Constructors

### Constructor

> **new KubeConfig**(): `KubeConfig`

Defined in: [src/config.ts:106](https://github.com/davidgamero/javascript/blob/e0fd9c7e722ede8cfc1a9d68a223a359233058ff/src/config.ts#L106)

#### Returns

`KubeConfig`

## Properties

### clusters

> **clusters**: [`Cluster`](../../config_types/interfaces/Cluster.md)[]

Defined in: [src/config.ts:89](https://github.com/davidgamero/javascript/blob/e0fd9c7e722ede8cfc1a9d68a223a359233058ff/src/config.ts#L89)

The list of all known clusters

***

### contexts

> **contexts**: [`Context`](../../config_types/interfaces/Context.md)[]

Defined in: [src/config.ts:99](https://github.com/davidgamero/javascript/blob/e0fd9c7e722ede8cfc1a9d68a223a359233058ff/src/config.ts#L99)

The list of all known contexts

***

### currentContext

> **currentContext**: `string`

Defined in: [src/config.ts:104](https://github.com/davidgamero/javascript/blob/e0fd9c7e722ede8cfc1a9d68a223a359233058ff/src/config.ts#L104)

The name of the current context

***

### users

> **users**: [`User`](../../config_types/interfaces/User.md)[]

Defined in: [src/config.ts:94](https://github.com/davidgamero/javascript/blob/e0fd9c7e722ede8cfc1a9d68a223a359233058ff/src/config.ts#L94)

The list of all known users

## Methods

### addAuthenticator()

> **addAuthenticator**(`authenticator`): `void`

Defined in: [src/config.ts:82](https://github.com/davidgamero/javascript/blob/e0fd9c7e722ede8cfc1a9d68a223a359233058ff/src/config.ts#L82)

#### Parameters

##### authenticator

`Authenticator`

#### Returns

`void`

***

### addCluster()

> **addCluster**(`cluster`): `void`

Defined in: [src/config.ts:385](https://github.com/davidgamero/javascript/blob/e0fd9c7e722ede8cfc1a9d68a223a359233058ff/src/config.ts#L385)

#### Parameters

##### cluster

[`Cluster`](../../config_types/interfaces/Cluster.md)

#### Returns

`void`

***

### addContext()

> **addContext**(`ctx`): `void`

Defined in: [src/config.ts:409](https://github.com/davidgamero/javascript/blob/e0fd9c7e722ede8cfc1a9d68a223a359233058ff/src/config.ts#L409)

#### Parameters

##### ctx

[`Context`](../../config_types/interfaces/Context.md)

#### Returns

`void`

***

### addUser()

> **addUser**(`user`): `void`

Defined in: [src/config.ts:397](https://github.com/davidgamero/javascript/blob/e0fd9c7e722ede8cfc1a9d68a223a359233058ff/src/config.ts#L397)

#### Parameters

##### user

[`User`](../../config_types/interfaces/User.md)

#### Returns

`void`

***

### applySecurityAuthentication()

> **applySecurityAuthentication**(`context`): `Promise`\<`void`\>

Defined in: [src/config.ts:239](https://github.com/davidgamero/javascript/blob/e0fd9c7e722ede8cfc1a9d68a223a359233058ff/src/config.ts#L239)

Applies SecurityAuthentication to RequestContext of an API Call from API Client

#### Parameters

##### context

`RequestContext`

#### Returns

`Promise`\<`void`\>

#### Implementation of

`SecurityAuthentication.applySecurityAuthentication`

***

### applyToFetchOptions()

> **applyToFetchOptions**(`opts`): `Promise`\<`RequestInit`\>

Defined in: [src/config.ts:169](https://github.com/davidgamero/javascript/blob/e0fd9c7e722ede8cfc1a9d68a223a359233058ff/src/config.ts#L169)

#### Parameters

##### opts

`RequestOptions`

#### Returns

`Promise`\<`RequestInit`\>

***

### applyToHTTPSOptions()

> **applyToHTTPSOptions**(`opts`): `Promise`\<`void`\>

Defined in: [src/config.ts:192](https://github.com/davidgamero/javascript/blob/e0fd9c7e722ede8cfc1a9d68a223a359233058ff/src/config.ts#L192)

#### Parameters

##### opts

`any`

#### Returns

`Promise`\<`void`\>

***

### exportConfig()

> **exportConfig**(): `string`

Defined in: [src/config.ts:526](https://github.com/davidgamero/javascript/blob/e0fd9c7e722ede8cfc1a9d68a223a359233058ff/src/config.ts#L526)

#### Returns

`string`

***

### getCluster()

> **getCluster**(`name`): [`Cluster`](../../config_types/interfaces/Cluster.md) \| `null`

Defined in: [src/config.ts:147](https://github.com/davidgamero/javascript/blob/e0fd9c7e722ede8cfc1a9d68a223a359233058ff/src/config.ts#L147)

#### Parameters

##### name

`string`

#### Returns

[`Cluster`](../../config_types/interfaces/Cluster.md) \| `null`

***

### getClusters()

> **getClusters**(): [`Cluster`](../../config_types/interfaces/Cluster.md)[]

Defined in: [src/config.ts:116](https://github.com/davidgamero/javascript/blob/e0fd9c7e722ede8cfc1a9d68a223a359233058ff/src/config.ts#L116)

#### Returns

[`Cluster`](../../config_types/interfaces/Cluster.md)[]

***

### getContextObject()

> **getContextObject**(`name`): [`Context`](../../config_types/interfaces/Context.md) \| `null`

Defined in: [src/config.ts:132](https://github.com/davidgamero/javascript/blob/e0fd9c7e722ede8cfc1a9d68a223a359233058ff/src/config.ts#L132)

#### Parameters

##### name

`string`

#### Returns

[`Context`](../../config_types/interfaces/Context.md) \| `null`

***

### getContexts()

> **getContexts**(): [`Context`](../../config_types/interfaces/Context.md)[]

Defined in: [src/config.ts:112](https://github.com/davidgamero/javascript/blob/e0fd9c7e722ede8cfc1a9d68a223a359233058ff/src/config.ts#L112)

#### Returns

[`Context`](../../config_types/interfaces/Context.md)[]

***

### getCurrentCluster()

> **getCurrentCluster**(): [`Cluster`](../../config_types/interfaces/Cluster.md) \| `null`

Defined in: [src/config.ts:139](https://github.com/davidgamero/javascript/blob/e0fd9c7e722ede8cfc1a9d68a223a359233058ff/src/config.ts#L139)

#### Returns

[`Cluster`](../../config_types/interfaces/Cluster.md) \| `null`

***

### getCurrentContext()

> **getCurrentContext**(): `string`

Defined in: [src/config.ts:124](https://github.com/davidgamero/javascript/blob/e0fd9c7e722ede8cfc1a9d68a223a359233058ff/src/config.ts#L124)

#### Returns

`string`

***

### getCurrentUser()

> **getCurrentUser**(): [`User`](../../config_types/interfaces/User.md) \| `null`

Defined in: [src/config.ts:151](https://github.com/davidgamero/javascript/blob/e0fd9c7e722ede8cfc1a9d68a223a359233058ff/src/config.ts#L151)

#### Returns

[`User`](../../config_types/interfaces/User.md) \| `null`

***

### getName()

> **getName**(): `string`

Defined in: [src/config.ts:285](https://github.com/davidgamero/javascript/blob/e0fd9c7e722ede8cfc1a9d68a223a359233058ff/src/config.ts#L285)

Returns name of this security authentication method

#### Returns

`string`

string

#### Implementation of

`SecurityAuthentication.getName`

***

### getUser()

> **getUser**(`name`): [`User`](../../config_types/interfaces/User.md) \| `null`

Defined in: [src/config.ts:159](https://github.com/davidgamero/javascript/blob/e0fd9c7e722ede8cfc1a9d68a223a359233058ff/src/config.ts#L159)

#### Parameters

##### name

`string`

#### Returns

[`User`](../../config_types/interfaces/User.md) \| `null`

***

### getUsers()

> **getUsers**(): [`User`](../../config_types/interfaces/User.md)[]

Defined in: [src/config.ts:120](https://github.com/davidgamero/javascript/blob/e0fd9c7e722ede8cfc1a9d68a223a359233058ff/src/config.ts#L120)

#### Returns

[`User`](../../config_types/interfaces/User.md)[]

***

### loadFromCluster()

> **loadFromCluster**(`pathPrefix?`): `void`

Defined in: [src/config.ts:317](https://github.com/davidgamero/javascript/blob/e0fd9c7e722ede8cfc1a9d68a223a359233058ff/src/config.ts#L317)

#### Parameters

##### pathPrefix?

`string` = `''`

#### Returns

`void`

***

### loadFromClusterAndUser()

> **loadFromClusterAndUser**(`cluster`, `user`): `void`

Defined in: [src/config.ts:304](https://github.com/davidgamero/javascript/blob/e0fd9c7e722ede8cfc1a9d68a223a359233058ff/src/config.ts#L304)

#### Parameters

##### cluster

[`Cluster`](../../config_types/interfaces/Cluster.md)

##### user

[`User`](../../config_types/interfaces/User.md)

#### Returns

`void`

***

### loadFromDefault()

> **loadFromDefault**(`opts?`, `contextFromStartingConfig?`, `platform?`): `void`

Defined in: [src/config.ts:421](https://github.com/davidgamero/javascript/blob/e0fd9c7e722ede8cfc1a9d68a223a359233058ff/src/config.ts#L421)

#### Parameters

##### opts?

`Partial`\<[`ConfigOptions`](../../config_types/interfaces/ConfigOptions.md)\>

##### contextFromStartingConfig?

`boolean` = `false`

##### platform?

`string` = `process.platform`

#### Returns

`void`

***

### loadFromFile()

> **loadFromFile**(`file`, `opts?`): `void`

Defined in: [src/config.ts:163](https://github.com/davidgamero/javascript/blob/e0fd9c7e722ede8cfc1a9d68a223a359233058ff/src/config.ts#L163)

#### Parameters

##### file

`string`

##### opts?

`Partial`\<[`ConfigOptions`](../../config_types/interfaces/ConfigOptions.md)\>

#### Returns

`void`

***

### loadFromOptions()

> **loadFromOptions**(`options`): `void`

Defined in: [src/config.ts:297](https://github.com/davidgamero/javascript/blob/e0fd9c7e722ede8cfc1a9d68a223a359233058ff/src/config.ts#L297)

#### Parameters

##### options

`any`

#### Returns

`void`

***

### loadFromString()

> **loadFromString**(`config`, `opts?`): `void`

Defined in: [src/config.ts:289](https://github.com/davidgamero/javascript/blob/e0fd9c7e722ede8cfc1a9d68a223a359233058ff/src/config.ts#L289)

#### Parameters

##### config

`string`

##### opts?

`Partial`\<[`ConfigOptions`](../../config_types/interfaces/ConfigOptions.md)\>

#### Returns

`void`

***

### makeApiClient()

> **makeApiClient**\<`T`\>(`apiClientType`): `T`

Defined in: [src/config.ts:490](https://github.com/davidgamero/javascript/blob/e0fd9c7e722ede8cfc1a9d68a223a359233058ff/src/config.ts#L490)

#### Type Parameters

##### T

`T` *extends* [`ApiType`](../interfaces/ApiType.md)

#### Parameters

##### apiClientType

[`ApiConstructor`](../type-aliases/ApiConstructor.md)\<`T`\>

#### Returns

`T`

***

### makePathsAbsolute()

> **makePathsAbsolute**(`rootDirectory`): `void`

Defined in: [src/config.ts:510](https://github.com/davidgamero/javascript/blob/e0fd9c7e722ede8cfc1a9d68a223a359233058ff/src/config.ts#L510)

#### Parameters

##### rootDirectory

`string`

#### Returns

`void`

***

### mergeConfig()

> **mergeConfig**(`config`, `preserveContext?`): `void`

Defined in: [src/config.ts:370](https://github.com/davidgamero/javascript/blob/e0fd9c7e722ede8cfc1a9d68a223a359233058ff/src/config.ts#L370)

#### Parameters

##### config

`KubeConfig`

##### preserveContext?

`boolean` = `false`

#### Returns

`void`

***

### setCurrentContext()

> **setCurrentContext**(`context`): `void`

Defined in: [src/config.ts:128](https://github.com/davidgamero/javascript/blob/e0fd9c7e722ede8cfc1a9d68a223a359233058ff/src/config.ts#L128)

#### Parameters

##### context

`string`

#### Returns

`void`
