# Variable: PatchStrategy

> `const` **PatchStrategy**: `object`

Defined in: [src/patch.ts:9](https://github.com/davidgamero/javascript/blob/e0fd9c7e722ede8cfc1a9d68a223a359233058ff/src/patch.ts#L9)

Valid Content-Type header values for patch operations.  See
https://kubernetes.io/docs/tasks/run-application/update-api-object-kubectl-patch/
for details.

Additionally for Server-Side Apply https://kubernetes.io/docs/reference/using-api/server-side-apply/
and https://kubernetes.io/docs/reference/using-api/server-side-apply/#api-implementation

## Type Declaration

### JsonPatch

> `readonly` **JsonPatch**: `"application/json-patch+json"` = `'application/json-patch+json'`

Diff-like JSON format.

### MergePatch

> `readonly` **MergePatch**: `"application/merge-patch+json"` = `'application/merge-patch+json'`

Simple merge.

### ServerSideApply

> `readonly` **ServerSideApply**: `"application/apply-patch+yaml"` = `'application/apply-patch+yaml'`

Server-Side Apply

### StrategicMergePatch

> `readonly` **StrategicMergePatch**: `"application/strategic-merge-patch+json"` = `'application/strategic-merge-patch+json'`

Merge with different strategies depending on field metadata.
