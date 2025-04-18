/**
 * Valid Content-Type header values for patch operations.  See
 * https://kubernetes.io/docs/tasks/run-application/update-api-object-kubectl-patch/
 * for details.
 *
 * Additionally for Server-Side Apply https://kubernetes.io/docs/reference/using-api/server-side-apply/
 * and https://kubernetes.io/docs/reference/using-api/server-side-apply/#api-implementation
 */
export const PatchStrategy = {
    /** Diff-like JSON format. */
    JsonPatch: 'application/json-patch+json',
    /** Simple merge. */
    MergePatch: 'application/merge-patch+json',
    /** Merge with different strategies depending on field metadata. */
    StrategicMergePatch: 'application/strategic-merge-patch+json',
    /** Server-Side Apply */
    ServerSideApply: 'application/apply-patch+yaml',
} as const;

export type PatchStrategy = (typeof PatchStrategy)[keyof typeof PatchStrategy];
