export function deferred<T = void>() {
    return Promise.withResolvers<T>();
}
