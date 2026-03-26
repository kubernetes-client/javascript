# Class: PodStatus

Defined in: [src/top.ts:61](https://github.com/davidgamero/javascript/blob/e0fd9c7e722ede8cfc1a9d68a223a359233058ff/src/top.ts#L61)

## Constructors

### Constructor

> **new PodStatus**(`Pod`, `CPU`, `Memory`, `Containers`): `PodStatus`

Defined in: [src/top.ts:67](https://github.com/davidgamero/javascript/blob/e0fd9c7e722ede8cfc1a9d68a223a359233058ff/src/top.ts#L67)

#### Parameters

##### Pod

`V1Pod`

##### CPU

[`CurrentResourceUsage`](CurrentResourceUsage.md)

##### Memory

[`CurrentResourceUsage`](CurrentResourceUsage.md)

##### Containers

[`ContainerStatus`](ContainerStatus.md)[]

#### Returns

`PodStatus`

## Properties

### Containers

> `readonly` **Containers**: [`ContainerStatus`](ContainerStatus.md)[]

Defined in: [src/top.ts:65](https://github.com/davidgamero/javascript/blob/e0fd9c7e722ede8cfc1a9d68a223a359233058ff/src/top.ts#L65)

***

### CPU

> `readonly` **CPU**: [`CurrentResourceUsage`](CurrentResourceUsage.md)

Defined in: [src/top.ts:63](https://github.com/davidgamero/javascript/blob/e0fd9c7e722ede8cfc1a9d68a223a359233058ff/src/top.ts#L63)

***

### Memory

> `readonly` **Memory**: [`CurrentResourceUsage`](CurrentResourceUsage.md)

Defined in: [src/top.ts:64](https://github.com/davidgamero/javascript/blob/e0fd9c7e722ede8cfc1a9d68a223a359233058ff/src/top.ts#L64)

***

### Pod

> `readonly` **Pod**: `V1Pod`

Defined in: [src/top.ts:62](https://github.com/davidgamero/javascript/blob/e0fd9c7e722ede8cfc1a9d68a223a359233058ff/src/top.ts#L62)
