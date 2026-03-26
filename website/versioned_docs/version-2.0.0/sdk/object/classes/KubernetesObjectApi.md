# Class: KubernetesObjectApi

Defined in: [src/object.ts:37](https://github.com/davidgamero/javascript/blob/019ff89c9f584a4d3b0d6eda91fb6ec8395636c9/src/object.ts#L37)

Dynamically construct Kubernetes API request URIs so client does not have to know what type of object it is acting
on.

## Constructors

### Constructor

> **new KubernetesObjectApi**(`configuration`): `KubernetesObjectApi`

Defined in: [src/object.ts:59](https://github.com/davidgamero/javascript/blob/019ff89c9f584a4d3b0d6eda91fb6ec8395636c9/src/object.ts#L59)

#### Parameters

##### configuration

`Configuration`

#### Returns

`KubernetesObjectApi`

## Methods

### create()

> **create**\<`T`\>(`spec`, `pretty?`, `dryRun?`, `fieldManager?`, `options?`): `Promise`\<`T`\>

Defined in: [src/object.ts:76](https://github.com/davidgamero/javascript/blob/019ff89c9f584a4d3b0d6eda91fb6ec8395636c9/src/object.ts#L76)

Create any Kubernetes resource.

#### Type Parameters

##### T

`T` *extends* [`KubernetesObject`](../../types/interfaces/KubernetesObject.md)

#### Parameters

##### spec

`T`

Kubernetes resource spec.

##### pretty?

`string`

If \&#39;true\&#39;, then the output is pretty printed.

##### dryRun?

`string`

When present, indicates that modifications should not be persisted. An invalid or unrecognized
       dryRun directive will result in an error response and no further processing of the request. Valid values
       are: - All: all dry run stages will be processed

##### fieldManager?

`string`

fieldManager is a name associated with the actor or entity that is making these changes. The
       value must be less than or 128 characters long, and only contain printable characters, as defined by
       https://golang.org/pkg/unicode/#IsPrint.

##### options?

`Configuration`\<`Middleware`\>

Optional headers to use in the request.

#### Returns

`Promise`\<`T`\>

Promise containing the request response and [[KubernetesObject]].

***

### delete()

> **delete**(`spec`, `pretty?`, `dryRun?`, `gracePeriodSeconds?`, `orphanDependents?`, `propagationPolicy?`, `body?`, `options?`): `Promise`\<`V1Status`\>

Defined in: [src/object.ts:145](https://github.com/davidgamero/javascript/blob/019ff89c9f584a4d3b0d6eda91fb6ec8395636c9/src/object.ts#L145)

Delete any Kubernetes resource.

#### Parameters

##### spec

[`KubernetesObject`](../../types/interfaces/KubernetesObject.md)

Kubernetes resource spec

##### pretty?

`string`

If \&#39;true\&#39;, then the output is pretty printed.

##### dryRun?

`string`

When present, indicates that modifications should not be persisted. An invalid or unrecognized
       dryRun directive will result in an error response and no further processing of the request. Valid values
       are: - All: all dry run stages will be processed

##### gracePeriodSeconds?

`number`

The duration in seconds before the object should be deleted. Value must be non-negative
       integer. The value zero indicates delete immediately. If this value is nil, the default grace period for
       the specified type will be used. Defaults to a per object value if not specified. zero means delete
       immediately.

##### orphanDependents?

`boolean`

Deprecated: please use the PropagationPolicy, this field will be deprecated in
       1.7. Should the dependent objects be orphaned. If true/false, the \&quot;orphan\&quot; finalizer will be
       added to/removed from the object\&#39;s finalizers list. Either this field or PropagationPolicy may be
       set, but not both.

##### propagationPolicy?

`string`

Whether and how garbage collection will be performed. Either this field or
       OrphanDependents may be set, but not both. The default policy is decided by the existing finalizer set in
       the metadata.finalizers and the resource-specific default policy. Acceptable values are:
       \&#39;Orphan\&#39; - orphan the dependents; \&#39;Background\&#39; - allow the garbage collector to delete
       the dependents in the background; \&#39;Foreground\&#39; - a cascading policy that deletes all dependents
       in the foreground.

##### body?

`V1DeleteOptions`

See [[V1DeleteOptions]].

##### options?

`Configuration`\<`Middleware`\>

Optional headers to use in the request.

#### Returns

`Promise`\<`V1Status`\>

Promise containing the request response and a Kubernetes [[V1Status]].

***

### list()

> **list**\<`T`\>(`apiVersion`, `kind`, `namespace?`, `pretty?`, `exact?`, `exportt?`, `fieldSelector?`, `labelSelector?`, `limit?`, `continueToken?`, `options?`): `Promise`\<[`KubernetesListObject`](../../types/interfaces/KubernetesListObject.md)\<`T`\>\>

Defined in: [src/object.ts:349](https://github.com/davidgamero/javascript/blob/019ff89c9f584a4d3b0d6eda91fb6ec8395636c9/src/object.ts#L349)

List any Kubernetes resources.

#### Type Parameters

##### T

`T` *extends* [`KubernetesObject`](../../types/interfaces/KubernetesObject.md)

#### Parameters

##### apiVersion

`string`

api group and version of the form <apiGroup>/<version>

##### kind

`string`

Kubernetes resource kind

##### namespace?

`string`

list resources in this namespace

##### pretty?

`string`

If \&#39;true\&#39;, then the output is pretty printed.

##### exact?

`boolean`

Should the export be exact.  Exact export maintains cluster-specific fields like
       \&#39;Namespace\&#39;. Deprecated. Planned for removal in 1.18.

##### exportt?

`boolean`

Should this value be exported.  Export strips fields that a user can not
       specify. Deprecated. Planned for removal in 1.18.

##### fieldSelector?

`string`

A selector to restrict the list of returned objects by their fields. Defaults to everything.

##### labelSelector?

`string`

A selector to restrict the list of returned objects by their labels. Defaults to everything.

##### limit?

`number`

Number of returned resources.

##### continueToken?

`string`

##### options?

`Configuration`\<`Middleware`\>

Optional headers to use in the request.

#### Returns

`Promise`\<[`KubernetesListObject`](../../types/interfaces/KubernetesListObject.md)\<`T`\>\>

Promise containing the request response and [[KubernetesListObject<KubernetesObject>]].

***

### patch()

> **patch**\<`T`\>(`spec`, `pretty?`, `dryRun?`, `fieldManager?`, `force?`, `patchStrategy?`, `options?`): `Promise`\<`T`\>

Defined in: [src/object.ts:230](https://github.com/davidgamero/javascript/blob/019ff89c9f584a4d3b0d6eda91fb6ec8395636c9/src/object.ts#L230)

Patch any Kubernetes resource.

#### Type Parameters

##### T

`T` *extends* [`KubernetesObject`](../../types/interfaces/KubernetesObject.md)

#### Parameters

##### spec

`T`

Kubernetes resource spec

##### pretty?

`string`

If \&#39;true\&#39;, then the output is pretty printed.

##### dryRun?

`string`

When present, indicates that modifications should not be persisted. An invalid or unrecognized
       dryRun directive will result in an error response and no further processing of the request. Valid values
       are: - All: all dry run stages will be processed

##### fieldManager?

`string`

fieldManager is a name associated with the actor or entity that is making these changes.  The
       value must be less than or 128 characters long, and only contain printable characters, as defined by
       https://golang.org/pkg/unicode/#IsPrint. This field is required for apply requests
       (application/apply-patch) but optional for non-apply patch types (JsonPatch, MergePatch,
       StrategicMergePatch).

##### force?

`boolean`

Force is going to \&quot;force\&quot; Apply requests.  It means user will re-acquire conflicting
       fields owned by other people. Force flag must be unset for non-apply patch requests.

##### patchStrategy?

[`PatchStrategy`](../../patch/type-aliases/PatchStrategy.md) = `PatchStrategy.StrategicMergePatch`

Content-Type header used to control how the patch will be performed. See
       See https://kubernetes.io/docs/tasks/run-application/update-api-object-kubectl-patch/
       for details.

##### options?

`Configuration`\<`Middleware`\>

Optional headers to use in the request.

#### Returns

`Promise`\<`T`\>

Promise containing the request response and [[KubernetesObject]].

***

### read()

> **read**\<`T`\>(`spec`, `pretty?`, `exact?`, `exportt?`, `options?`): `Promise`\<`T`\>

Defined in: [src/object.ts:292](https://github.com/davidgamero/javascript/blob/019ff89c9f584a4d3b0d6eda91fb6ec8395636c9/src/object.ts#L292)

Read any Kubernetes resource.

#### Type Parameters

##### T

`T` *extends* [`KubernetesObject`](../../types/interfaces/KubernetesObject.md)

#### Parameters

##### spec

`KubernetesObjectHeader`\<`T`\>

Kubernetes resource spec

##### pretty?

`string`

If \&#39;true\&#39;, then the output is pretty printed.

##### exact?

`boolean`

Should the export be exact.  Exact export maintains cluster-specific fields like
       \&#39;Namespace\&#39;. Deprecated. Planned for removal in 1.18.

##### exportt?

`boolean`

Should this value be exported.  Export strips fields that a user can not
       specify. Deprecated. Planned for removal in 1.18.

##### options?

`Configuration`\<`Middleware`\>

Optional headers to use in the request.

#### Returns

`Promise`\<`T`\>

Promise containing the request response and [[KubernetesObject]].

***

### replace()

> **replace**\<`T`\>(`spec`, `pretty?`, `dryRun?`, `fieldManager?`, `options?`): `Promise`\<`T`\>

Defined in: [src/object.ts:436](https://github.com/davidgamero/javascript/blob/019ff89c9f584a4d3b0d6eda91fb6ec8395636c9/src/object.ts#L436)

Replace any Kubernetes resource.

#### Type Parameters

##### T

`T` *extends* [`KubernetesObject`](../../types/interfaces/KubernetesObject.md)

#### Parameters

##### spec

`T`

Kubernetes resource spec

##### pretty?

`string`

If \&#39;true\&#39;, then the output is pretty printed.

##### dryRun?

`string`

When present, indicates that modifications should not be persisted. An invalid or unrecognized
       dryRun directive will result in an error response and no further processing of the request. Valid values
       are: - All: all dry run stages will be processed

##### fieldManager?

`string`

fieldManager is a name associated with the actor or entity that is making these changes. The
       value must be less than or 128 characters long, and only contain printable characters, as defined by
       https://golang.org/pkg/unicode/#IsPrint.

##### options?

`Configuration`\<`Middleware`\>

Optional headers to use in the request.

#### Returns

`Promise`\<`T`\>

Promise containing the request response and [[KubernetesObject]].

***

### makeApiClient()

> `static` **makeApiClient**(`kc`): `KubernetesObjectApi`

Defined in: [src/object.ts:46](https://github.com/davidgamero/javascript/blob/019ff89c9f584a4d3b0d6eda91fb6ec8395636c9/src/object.ts#L46)

Create a KubernetesObjectApi object from the provided KubeConfig.  This method should be used rather than
[[KubeConfig.makeApiClient]] so we can properly determine the default namespace if one is provided by the current
context.

#### Parameters

##### kc

[`KubeConfig`](../../config/classes/KubeConfig.md)

Valid Kubernetes config

#### Returns

`KubernetesObjectApi`

Properly instantiated [[KubernetesObjectApi]] object
