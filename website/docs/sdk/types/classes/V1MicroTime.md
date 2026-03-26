# Class: V1MicroTime

Defined in: [src/types.ts:18](https://github.com/davidgamero/javascript/blob/e0fd9c7e722ede8cfc1a9d68a223a359233058ff/src/types.ts#L18)

## Extends

- `Date`

## Constructors

### Constructor

> **new V1MicroTime**(): `V1MicroTime`

Defined in: website/node\_modules/typescript/lib/lib.es5.d.ts:926

#### Returns

`V1MicroTime`

#### Inherited from

`Date.constructor`

### Constructor

> **new V1MicroTime**(`value`): `V1MicroTime`

Defined in: website/node\_modules/typescript/lib/lib.es5.d.ts:927

#### Parameters

##### value

`string` \| `number`

#### Returns

`V1MicroTime`

#### Inherited from

`Date.constructor`

### Constructor

> **new V1MicroTime**(`year`, `monthIndex`, `date?`, `hours?`, `minutes?`, `seconds?`, `ms?`): `V1MicroTime`

Defined in: website/node\_modules/typescript/lib/lib.es5.d.ts:938

Creates a new Date.

#### Parameters

##### year

`number`

The full year designation is required for cross-century date accuracy. If year is between 0 and 99 is used, then year is assumed to be 1900 + year.

##### monthIndex

`number`

The month as a number between 0 and 11 (January to December).

##### date?

`number`

The date as a number between 1 and 31.

##### hours?

`number`

Must be supplied if minutes is supplied. A number from 0 to 23 (midnight to 11pm) that specifies the hour.

##### minutes?

`number`

Must be supplied if seconds is supplied. A number from 0 to 59 that specifies the minutes.

##### seconds?

`number`

Must be supplied if milliseconds is supplied. A number from 0 to 59 that specifies the seconds.

##### ms?

`number`

A number from 0 to 999 that specifies the milliseconds.

#### Returns

`V1MicroTime`

#### Inherited from

`Date.constructor`

### Constructor

> **new V1MicroTime**(`value`): `V1MicroTime`

Defined in: website/node\_modules/typescript/lib/lib.es5.d.ts:926

#### Parameters

##### value

`string` \| `number` \| `Date`

#### Returns

`V1MicroTime`

#### Inherited from

`Date.constructor`

## Methods

### toISOString()

> **toISOString**(): `string`

Defined in: [src/types.ts:19](https://github.com/davidgamero/javascript/blob/e0fd9c7e722ede8cfc1a9d68a223a359233058ff/src/types.ts#L19)

Returns a date as a string value in ISO format.

#### Returns

`string`

#### Overrides

`Date.toISOString`
