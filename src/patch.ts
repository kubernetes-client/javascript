/**
 * Valid Content-Type header values for patch operations.  See
 * https://kubernetes.io/docs/tasks/run-application/update-api-object-kubectl-patch/
 * for details.
 */
export enum PatchStrategy {
    /** Diff-like JSON format. */
    JsonPatch = 'application/json-patch+json',
    /** Simple merge. */
    MergePatch = 'application/merge-patch+json',
    /** Merge with different strategies depending on field metadata. */
    StrategicMergePatch = 'application/strategic-merge-patch+json',
}
