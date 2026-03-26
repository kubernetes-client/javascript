# Class: Metrics

Defined in: [src/metrics.ts:57](https://github.com/davidgamero/javascript/blob/019ff89c9f584a4d3b0d6eda91fb6ec8395636c9/src/metrics.ts#L57)

## Constructors

### Constructor

> **new Metrics**(`config`): `Metrics`

Defined in: [src/metrics.ts:60](https://github.com/davidgamero/javascript/blob/019ff89c9f584a4d3b0d6eda91fb6ec8395636c9/src/metrics.ts#L60)

#### Parameters

##### config

[`KubeConfig`](../../config/classes/KubeConfig.md)

#### Returns

`Metrics`

## Methods

### getNodeMetrics()

> **getNodeMetrics**(): `Promise`\<[`NodeMetricsList`](../interfaces/NodeMetricsList.md)\>

Defined in: [src/metrics.ts:64](https://github.com/davidgamero/javascript/blob/019ff89c9f584a4d3b0d6eda91fb6ec8395636c9/src/metrics.ts#L64)

#### Returns

`Promise`\<[`NodeMetricsList`](../interfaces/NodeMetricsList.md)\>

***

### getPodMetrics()

> **getPodMetrics**(`namespace?`): `Promise`\<[`PodMetricsList`](../interfaces/PodMetricsList.md)\>

Defined in: [src/metrics.ts:68](https://github.com/davidgamero/javascript/blob/019ff89c9f584a4d3b0d6eda91fb6ec8395636c9/src/metrics.ts#L68)

#### Parameters

##### namespace?

`string`

#### Returns

`Promise`\<[`PodMetricsList`](../interfaces/PodMetricsList.md)\>
