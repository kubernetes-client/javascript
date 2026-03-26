# Interface: LogOptions

Defined in: [src/log.ts:8](https://github.com/davidgamero/javascript/blob/e0fd9c7e722ede8cfc1a9d68a223a359233058ff/src/log.ts#L8)

## Properties

### follow?

> `optional` **follow?**: `boolean`

Defined in: [src/log.ts:12](https://github.com/davidgamero/javascript/blob/e0fd9c7e722ede8cfc1a9d68a223a359233058ff/src/log.ts#L12)

Follow the log stream of the pod. Defaults to false.

***

### limitBytes?

> `optional` **limitBytes?**: `number`

Defined in: [src/log.ts:18](https://github.com/davidgamero/javascript/blob/e0fd9c7e722ede8cfc1a9d68a223a359233058ff/src/log.ts#L18)

If set, the number of bytes to read from the server before terminating the log output. This may not display a
complete final line of logging, and may return slightly more or slightly less than the specified limit.

***

### pretty?

> `optional` **pretty?**: `boolean`

Defined in: [src/log.ts:23](https://github.com/davidgamero/javascript/blob/e0fd9c7e722ede8cfc1a9d68a223a359233058ff/src/log.ts#L23)

If true, then the output is pretty printed.

***

### previous?

> `optional` **previous?**: `boolean`

Defined in: [src/log.ts:28](https://github.com/davidgamero/javascript/blob/e0fd9c7e722ede8cfc1a9d68a223a359233058ff/src/log.ts#L28)

Return previous terminated container logs. Defaults to false.

***

### sinceSeconds?

> `optional` **sinceSeconds?**: `number`

Defined in: [src/log.ts:35](https://github.com/davidgamero/javascript/blob/e0fd9c7e722ede8cfc1a9d68a223a359233058ff/src/log.ts#L35)

A relative time in seconds before the current time from which to show logs. If this value precedes the time a
pod was started, only logs since the pod start will be returned. If this value is in the future, no logs will
be returned. Only one of sinceSeconds or sinceTime may be specified.

***

### sinceTime?

> `optional` **sinceTime?**: `string`

Defined in: [src/log.ts:41](https://github.com/davidgamero/javascript/blob/e0fd9c7e722ede8cfc1a9d68a223a359233058ff/src/log.ts#L41)

Only return logs after a specific date (RFC3339). Defaults to all logs.
Only one of sinceSeconds or sinceTime may be specified.

***

### tailLines?

> `optional` **tailLines?**: `number`

Defined in: [src/log.ts:47](https://github.com/davidgamero/javascript/blob/e0fd9c7e722ede8cfc1a9d68a223a359233058ff/src/log.ts#L47)

If set, the number of lines from the end of the logs to show. If not specified, logs are shown from the creation
of the container or sinceSeconds or sinceTime

***

### timestamps?

> `optional` **timestamps?**: `boolean`

Defined in: [src/log.ts:52](https://github.com/davidgamero/javascript/blob/e0fd9c7e722ede8cfc1a9d68a223a359233058ff/src/log.ts#L52)

If true, add an RFC3339 or RFC3339Nano timestamp at the beginning of every line of log output. Defaults to false.
