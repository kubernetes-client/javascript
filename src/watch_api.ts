import { createInterface } from 'node:readline';
import { KubernetesObject } from './types.js';
import { ApiException, Configuration, HttpMethod } from './gen/index.js';

/**
 * Represents the type of watch event received from the Kubernetes API.
 *
 * - `ADDED`: A new object was added.
 * - `MODIFIED`: An existing object was modified.
 * - `DELETED`: An object was deleted.
 * - `BOOKMARK`: A bookmark event for efficient reconnection (contains only resourceVersion).
 * - `ERROR`: An error occurred during the watch.
 */
export type WatchEventType = 'ADDED' | 'MODIFIED' | 'DELETED' | 'BOOKMARK' | 'ERROR';

/**
 * Represents a single watch event from the Kubernetes API.
 *
 * @typeParam T - The Kubernetes object type (e.g., V1Pod, V1Deployment).
 *
 * @example
 * ```typescript
 * import { WatchEvent, V1Pod } from '@kubernetes/client-node';
 *
 * const event: WatchEvent<V1Pod> = {
 *   type: 'ADDED',
 *   object: { apiVersion: 'v1', kind: 'Pod', metadata: { name: 'my-pod' } }
 * };
 * ```
 */
export interface WatchEvent<T extends KubernetesObject> {
    /**
     * The type of event that occurred.
     */
    type: WatchEventType;

    /**
     * The Kubernetes object associated with this event.
     * For ERROR events, this may contain error details rather than a standard K8s object.
     */
    object: T;
}

/**
 * A watch API implementation that uses async iterators and follows the generated
 * Kubernetes API client pattern. This allows users to use it with `makeApiClient`
 * and override the HTTP library via `wrapHttpLibrary` and `createConfiguration`.
 *
 * The class uses the configuration's `httpApi` to send requests, enabling custom
 * HTTP implementations. For optimal streaming support, custom HTTP libraries should
 * return a response body with a `stream()` method that returns a Readable stream.
 *
 * @example Using with makeApiClient:
 * ```typescript
 * import { KubeConfig, WatchApi, V1Pod } from '@kubernetes/client-node';
 *
 * const kubeConfig = new KubeConfig();
 * kubeConfig.loadFromDefault();
 *
 * const watchApi = kubeConfig.makeApiClient(WatchApi);
 *
 * for await (const event of watchApi.watch<V1Pod>('/api/v1/namespaces/default/pods')) {
 *   console.log(`${event.type}: ${event.object.metadata?.name}`);
 * }
 * ```
 *
 * @example With custom HTTP library:
 * ```typescript
 * import { KubeConfig, WatchApi, V1Pod, wrapHttpLibrary, createConfiguration, ServerConfiguration, ResponseContext } from '@kubernetes/client-node';
 * import { Readable } from 'node:stream';
 * import ky from 'ky';
 *
 * const httpApi = wrapHttpLibrary({
 *   async send(request) {
 *     const response = await ky(request.getUrl(), {
 *       method: request.getHttpMethod(),
 *       headers: request.getHeaders(),
 *       body: request.getBody(),
 *     });
 *
 *     return new ResponseContext(
 *       response.status,
 *       Object.fromEntries(response.headers.entries()),
 *       {
 *         text: () => response.text(),
 *         binary: async () => Buffer.from(await response.arrayBuffer()),
 *         stream: () => Readable.fromWeb(response.body),  // Enable streaming for watch
 *       },
 *     );
 *   },
 * });
 *
 * const kubeConfig = new KubeConfig();
 * kubeConfig.loadFromDefault();
 *
 * const configuration = createConfiguration({
 *   baseServer: new ServerConfiguration(kubeConfig.getCurrentCluster()!.server, {}),
 *   authMethods: { default: kubeConfig },
 *   httpApi,
 * });
 *
 * const watchApi = new WatchApi(configuration);
 *
 * for await (const event of watchApi.watch<V1Pod>('/api/v1/namespaces/default/pods')) {
 *   console.log(`${event.type}: ${event.object.metadata?.name}`);
 * }
 * ```
 *
 * @example With query parameters:
 * ```typescript
 * for await (const event of watchApi.watch<V1Pod>('/api/v1/namespaces/default/pods', {
 *   labelSelector: 'app=nginx',
 *   resourceVersion: '12345',
 *   allowWatchBookmarks: true,
 * })) {
 *   switch (event.type) {
 *     case 'ADDED':
 *       console.log('Pod added:', event.object.metadata?.name);
 *       break;
 *     case 'MODIFIED':
 *       console.log('Pod modified:', event.object.metadata?.name);
 *       break;
 *     case 'DELETED':
 *       console.log('Pod deleted:', event.object.metadata?.name);
 *       break;
 *   }
 * }
 * ```
 */
export class WatchApi {
    private configuration: Configuration;
    private requestTimeoutMs: number = 30000;

    /**
     * Creates a new WatchApi instance.
     *
     * @param configuration - The API configuration object from `createConfiguration()` or via `makeApiClient`.
     */
    constructor(configuration: Configuration) {
        this.configuration = configuration;
    }

    /**
     * Sets the request timeout in milliseconds.
     *
     * @param timeout - Timeout in milliseconds.
     */
    public setRequestTimeout(timeout: number): void {
        this.requestTimeoutMs = timeout;
    }

    /**
     * Watches for changes to Kubernetes resources at the specified path.
     * Returns an async iterator that yields watch events.
     *
     * @typeParam T - The Kubernetes object type to expect (e.g., V1Pod, V1Deployment).
     *
     * @param path - The API path to watch (e.g., '/api/v1/namespaces/default/pods').
     * @param queryParams - Optional query parameters for the watch request.
     *                      Supports any query parameter accepted by the Kubernetes API.
     *
     * @yields {WatchEvent<T>} Events as they are received from the API server.
     *
     * @throws {ApiException} When the watch request fails or the server returns an error status.
     *
     * @example
     * ```typescript
     * for await (const event of watchApi.watch<V1Pod>('/api/v1/namespaces/default/pods', {
     *   labelSelector: 'app=nginx',
     *   resourceVersion: '12345',
     * })) {
     *   console.log(`${event.type}: ${event.object.metadata?.name}`);
     * }
     * ```
     */
    async *watch<T extends KubernetesObject>(
        path: string,
        queryParams: Record<string, string | number | boolean | undefined> = {},
    ): AsyncGenerator<WatchEvent<T>, void, undefined> {
        const requestContext = this.configuration.baseServer.makeRequestContext(path, HttpMethod.GET);

        requestContext.setQueryParam('watch', 'true');

        for (const [key, val] of Object.entries(queryParams)) {
            if (val !== undefined) {
                requestContext.setQueryParam(key, val.toString());
            }
        }

        const authMethod = this.configuration.authMethods.default;

        if (authMethod?.applySecurityAuthentication) {
            await authMethod.applySecurityAuthentication(requestContext);
        }

        const controller = new AbortController();

        const timeoutSignal = AbortSignal.timeout(this.requestTimeoutMs);

        requestContext.setSignal(AbortSignal.any([controller.signal, timeoutSignal]));

        try {
            const response = await this.configuration.httpApi.send(requestContext).toPromise();

            if (response.httpStatusCode !== 200) {
                const body = await response.body.text();

                throw new ApiException(
                    response.httpStatusCode,
                    'Watch request failed',
                    body,
                    response.headers,
                );
            }

            if (response.body.stream) {
                // Use streaming if available, otherwise fall back to text parsing
                const stream = response.body.stream();

                const lines = createInterface(stream);

                for await (const line of lines) {
                    const data = JSON.parse(line.toString()) as { type: WatchEventType; object: T };

                    yield {
                        type: data.type,
                        object: data.object,
                    };
                }
            } else {
                // Fallback: parse full text response line by line
                const text = await response.body.text();

                const lines = text.split('\n').filter((line) => line.trim() !== '');

                for (const line of lines) {
                    const data = JSON.parse(line) as { type: WatchEventType; object: T };

                    yield {
                        type: data.type,
                        object: data.object,
                    };
                }
            }
        } finally {
            controller.abort();
        }
    }
}
