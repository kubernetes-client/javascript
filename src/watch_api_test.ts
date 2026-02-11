import { describe, it } from 'node:test';
import { Readable } from 'node:stream';
import { deepStrictEqual, strictEqual, rejects } from 'node:assert';
import { WatchApi, WatchEvent } from './watch_api.js';
import {
    ApiException,
    createConfiguration,
    wrapHttpLibrary,
    ServerConfiguration,
    ResponseContext,
    RequestContext,
} from './gen/index.js';

const server = 'https://foo.company.com';

/**
 * Creates a mock configuration with a custom HTTP library for testing.
 */
function createMockConfiguration(
    baseUrl: string,
    responseBody: string,
    statusCode: number = 200,
    useStreaming: boolean = false,
) {
    const httpApi = wrapHttpLibrary({
        async send(_request: RequestContext): Promise<ResponseContext> {
            const body = useStreaming
                ? {
                      text: () => Promise.resolve(responseBody),
                      binary: () => Promise.resolve(Buffer.from(responseBody)),
                      stream: () => Readable.from(responseBody),
                  }
                : {
                      text: () => Promise.resolve(responseBody),
                      binary: () => Promise.resolve(Buffer.from(responseBody)),
                  };

            return new ResponseContext(statusCode, {}, body);
        },
    });

    // Create a mock auth method that does nothing
    const mockAuth = {
        getName: () => 'mock',
        applySecurityAuthentication: async (_context: RequestContext): Promise<void> => {},
    };

    return createConfiguration({
        baseServer: new ServerConfiguration(baseUrl, {}),
        authMethods: { default: mockAuth },
        httpApi,
    });
}

describe('WatchApi', () => {
    it('should construct correctly', () => {
        const config = createMockConfiguration(server, '');
        const watchApi = new WatchApi(config);
        strictEqual(watchApi instanceof WatchApi, true);
    });

    it('should iterate over watch events using text fallback', async () => {
        const events = [
            { type: 'ADDED', object: { apiVersion: 'v1', kind: 'Pod', metadata: { name: 'pod1' } } },
            { type: 'MODIFIED', object: { apiVersion: 'v1', kind: 'Pod', metadata: { name: 'pod1' } } },
            { type: 'DELETED', object: { apiVersion: 'v1', kind: 'Pod', metadata: { name: 'pod1' } } },
        ];

        const responseBody = events.map((e) => JSON.stringify(e)).join('\n');
        const config = createMockConfiguration(server, responseBody);
        const watchApi = new WatchApi(config);

        const receivedEvents: WatchEvent<any>[] = [];
        for await (const event of watchApi.watch('/api/v1/namespaces/default/pods')) {
            receivedEvents.push(event);
        }

        strictEqual(receivedEvents.length, 3);
        deepStrictEqual(receivedEvents[0].type, 'ADDED');
        deepStrictEqual(receivedEvents[1].type, 'MODIFIED');
        deepStrictEqual(receivedEvents[2].type, 'DELETED');
        deepStrictEqual(receivedEvents[0].object.metadata?.name, 'pod1');
    });

    it('should iterate over watch events using streaming', async () => {
        const events = [
            { type: 'ADDED', object: { apiVersion: 'v1', kind: 'Pod', metadata: { name: 'pod1' } } },
            { type: 'MODIFIED', object: { apiVersion: 'v1', kind: 'Pod', metadata: { name: 'pod1' } } },
            { type: 'DELETED', object: { apiVersion: 'v1', kind: 'Pod', metadata: { name: 'pod1' } } },
        ];

        const responseBody = events.map((e) => JSON.stringify(e)).join('\n');
        const config = createMockConfiguration(server, responseBody, 200, true);
        const watchApi = new WatchApi(config);

        const receivedEvents: WatchEvent<any>[] = [];
        for await (const event of watchApi.watch('/api/v1/namespaces/default/pods')) {
            receivedEvents.push(event);
        }

        strictEqual(receivedEvents.length, 3);
        deepStrictEqual(receivedEvents[0].type, 'ADDED');
        deepStrictEqual(receivedEvents[1].type, 'MODIFIED');
        deepStrictEqual(receivedEvents[2].type, 'DELETED');
        deepStrictEqual(receivedEvents[0].object.metadata?.name, 'pod1');
    });

    it('should handle BOOKMARK events', async () => {
        const events = [
            { type: 'ADDED', object: { apiVersion: 'v1', kind: 'Pod', metadata: { name: 'pod1' } } },
            {
                type: 'BOOKMARK',
                object: { apiVersion: 'v1', kind: 'Pod', metadata: { resourceVersion: '12345' } },
            },
        ];

        const responseBody = events.map((e) => JSON.stringify(e)).join('\n');
        const config = createMockConfiguration(server, responseBody);
        const watchApi = new WatchApi(config);

        const receivedEvents: WatchEvent<any>[] = [];
        for await (const event of watchApi.watch('/api/v1/namespaces/default/pods')) {
            receivedEvents.push(event);
        }

        strictEqual(receivedEvents.length, 2);
        deepStrictEqual(receivedEvents[1].type, 'BOOKMARK');
    });

    it('should handle ERROR events in the watch stream', async () => {
        const events = [
            { type: 'ADDED', object: { apiVersion: 'v1', kind: 'Pod', metadata: { name: 'pod1' } } },
            { type: 'ERROR', object: { code: 410, message: 'Gone', reason: 'Expired' } },
        ];

        const responseBody = events.map((e) => JSON.stringify(e)).join('\n');
        const config = createMockConfiguration(server, responseBody);
        const watchApi = new WatchApi(config);

        const receivedEvents: WatchEvent<any>[] = [];
        for await (const event of watchApi.watch('/api/v1/namespaces/default/pods')) {
            receivedEvents.push(event);
        }

        strictEqual(receivedEvents.length, 2);
        deepStrictEqual(receivedEvents[1].type, 'ERROR');
        deepStrictEqual(receivedEvents[1].object.code, 410);
    });

    it('should throw ApiException on non-200 status', async () => {
        const config = createMockConfiguration(server, 'Internal Server Error', 500);
        const watchApi = new WatchApi(config);

        await rejects(
            async () => {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                for await (const event of watchApi.watch('/api/v1/namespaces/default/pods')) {
                    // Should not reach here
                }
            },
            (err: Error) => {
                strictEqual(err instanceof ApiException, true);
                strictEqual((err as ApiException<unknown>).code, 500);
                return true;
            },
        );
    });

    it('should throw on invalid JSON lines', async () => {
        const validEvent = {
            type: 'ADDED',
            object: { apiVersion: 'v1', kind: 'Pod', metadata: { name: 'pod1' } },
        };
        const responseBody = `${JSON.stringify(validEvent)}\n{"invalid json\n${JSON.stringify(validEvent)}`;
        const config = createMockConfiguration(server, responseBody);
        const watchApi = new WatchApi(config);

        const iterator = watchApi.watch<any>('/api/v1/namespaces/default/pods')[Symbol.asyncIterator]();

        // First event is valid
        const first = await iterator.next();
        strictEqual(first.done, false);
        strictEqual(first.value.type, 'ADDED');

        // Second line is invalid, so next() should throw
        await rejects(async () => {
            await iterator.next();
        }, SyntaxError);
    });

    it('should pass query parameters correctly', async () => {
        let capturedUrl: string = '';

        const httpApi = wrapHttpLibrary({
            async send(request: RequestContext): Promise<ResponseContext> {
                capturedUrl = request.getUrl();
                const event = {
                    type: 'ADDED',
                    object: { apiVersion: 'v1', kind: 'Pod', metadata: { name: 'pod1' } },
                };
                return new ResponseContext(
                    200,
                    {},
                    {
                        text: () => Promise.resolve(JSON.stringify(event)),
                        binary: () => Promise.resolve(Buffer.from(JSON.stringify(event))),
                    },
                );
            },
        });

        const mockAuth = {
            getName: () => 'mock',
            applySecurityAuthentication: async (_context: RequestContext): Promise<void> => {},
        };

        const config = createConfiguration({
            baseServer: new ServerConfiguration(server, {}),
            authMethods: { default: mockAuth },
            httpApi,
        });

        const watchApi = new WatchApi(config);

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        for await (const event of watchApi.watch('/api/v1/namespaces/default/pods', {
            resourceVersion: '12345',
            labelSelector: 'app=nginx',
            fieldSelector: 'metadata.name=my-pod',
            allowWatchBookmarks: true,
        })) {
            // Just consume the event
        }

        strictEqual(capturedUrl.includes('watch=true'), true);
        strictEqual(capturedUrl.includes('resourceVersion=12345'), true);
        strictEqual(capturedUrl.includes('labelSelector=app%3Dnginx'), true);
        strictEqual(capturedUrl.includes('fieldSelector=metadata.name%3Dmy-pod'), true);
        strictEqual(capturedUrl.includes('allowWatchBookmarks=true'), true);
    });

    it('should handle empty response', async () => {
        const config = createMockConfiguration(server, '');
        const watchApi = new WatchApi(config);

        const receivedEvents: WatchEvent<any>[] = [];
        for await (const event of watchApi.watch('/api/v1/namespaces/default/pods')) {
            receivedEvents.push(event);
        }

        strictEqual(receivedEvents.length, 0);
    });
});

describe('WatchApi with custom HTTP library', () => {
    it('should work with custom HTTP implementation', async () => {
        const events = [
            { type: 'ADDED', object: { apiVersion: 'v1', kind: 'Pod', metadata: { name: 'custom-pod' } } },
        ];
        const responseBody = events.map((e) => JSON.stringify(e)).join('\n');

        // Custom HTTP implementation
        const customHttpApi = wrapHttpLibrary({
            async send(request: RequestContext): Promise<ResponseContext> {
                // Verify we receive the request correctly
                strictEqual(request.getHttpMethod(), 'GET');
                strictEqual(request.getUrl().includes('/api/v1/namespaces/default/pods'), true);

                return new ResponseContext(
                    200,
                    { 'content-type': 'application/json' },
                    {
                        text: () => Promise.resolve(responseBody),
                        binary: () => Promise.resolve(Buffer.from(responseBody)),
                        stream: () => Readable.from(responseBody),
                    },
                );
            },
        });

        const mockAuth = {
            getName: () => 'mock',
            applySecurityAuthentication: async (_context: RequestContext): Promise<void> => {},
        };

        const configuration = createConfiguration({
            baseServer: new ServerConfiguration(server, {}),
            authMethods: { default: mockAuth },
            httpApi: customHttpApi,
        });

        const watchApi = new WatchApi(configuration);

        const receivedEvents: WatchEvent<any>[] = [];
        for await (const event of watchApi.watch('/api/v1/namespaces/default/pods')) {
            receivedEvents.push(event);
        }

        strictEqual(receivedEvents.length, 1);
        deepStrictEqual(receivedEvents[0].object.metadata?.name, 'custom-pod');
    });
});

describe('WatchApi type safety', () => {
    it('should preserve generic type through iteration', async () => {
        interface CustomResource {
            apiVersion?: string;
            kind?: string;
            metadata?: { name: string; namespace: string };
            spec?: { replicas: number };
        }

        const events = [
            {
                type: 'ADDED',
                object: {
                    apiVersion: 'custom.io/v1',
                    kind: 'CustomResource',
                    metadata: { name: 'my-resource', namespace: 'default' },
                    spec: { replicas: 3 },
                },
            },
        ];

        const responseBody = events.map((e) => JSON.stringify(e)).join('\n');
        const config = createMockConfiguration(server, responseBody);
        const watchApi = new WatchApi(config);

        for await (const event of watchApi.watch<CustomResource>('/apis/custom.io/v1/customresources')) {
            // Type should be correctly inferred
            strictEqual(event.object.spec?.replicas, 3);
            strictEqual(event.object.metadata?.name, 'my-resource');
        }
    });
});
