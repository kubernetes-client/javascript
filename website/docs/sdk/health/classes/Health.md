# Class: Health

Defined in: [src/health.ts:5](https://github.com/davidgamero/javascript/blob/e0fd9c7e722ede8cfc1a9d68a223a359233058ff/src/health.ts#L5)

## Constructors

### Constructor

> **new Health**(`config`): `Health`

Defined in: [src/health.ts:8](https://github.com/davidgamero/javascript/blob/e0fd9c7e722ede8cfc1a9d68a223a359233058ff/src/health.ts#L8)

#### Parameters

##### config

[`KubeConfig`](../../config/classes/KubeConfig.md)

#### Returns

`Health`

## Properties

### config

> **config**: [`KubeConfig`](../../config/classes/KubeConfig.md)

Defined in: [src/health.ts:6](https://github.com/davidgamero/javascript/blob/e0fd9c7e722ede8cfc1a9d68a223a359233058ff/src/health.ts#L6)

## Methods

### livez()

> **livez**(`opts`): `Promise`\<`boolean`\>

Defined in: [src/health.ts:16](https://github.com/davidgamero/javascript/blob/e0fd9c7e722ede8cfc1a9d68a223a359233058ff/src/health.ts#L16)

#### Parameters

##### opts

`RequestOptions`

#### Returns

`Promise`\<`boolean`\>

***

### readyz()

> **readyz**(`opts`): `Promise`\<`boolean`\>

Defined in: [src/health.ts:12](https://github.com/davidgamero/javascript/blob/e0fd9c7e722ede8cfc1a9d68a223a359233058ff/src/health.ts#L12)

#### Parameters

##### opts

`RequestOptions`

#### Returns

`Promise`\<`boolean`\>
