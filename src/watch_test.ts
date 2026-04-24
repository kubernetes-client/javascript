import { afterEach, beforeEach, describe, it } from 'node:test';
import { deepStrictEqual, rejects, strictEqual } from 'node:assert';
import { MockAgent, setGlobalDispatcher, getGlobalDispatcher, type Dispatcher } from 'undici';
import { KubeConfig } from './config.js';
import { Cluster, Context, User } from './config_types.js';
import { Watch } from './watch.js';
import { IncomingMessage, ServerResponse, createServer } from 'node:http';
import { AddressInfo } from 'node:net';

const server = 'https://foo.company.com';

const fakeConfig: {
    clusters: Cluster[];
    contexts: Context[];
    users: User[];
} = {
    clusters: [
        {
            name: 'cluster',
            server,
        } as Cluster,
    ],
    contexts: [
        {
            cluster: 'cluster',
            user: 'user',
        } as Context,
    ],
    users: [
        {
            name: 'user',
        } as User,
    ],
};

describe('Watch', () => {
    let mockAgent: MockAgent;
    let originalDispatcher: Dispatcher;

    beforeEach(() => {
        originalDispatcher = getGlobalDispatcher();
        mockAgent = new MockAgent();
        setGlobalDispatcher(mockAgent);
        mockAgent.disableNetConnect();
    });

    afterEach(async () => {
        await mockAgent.close();
        setGlobalDispatcher(originalDispatcher);
    });

    it('should construct correctly', () => {
        const kc = new KubeConfig();
        new Watch(kc);
    });

    it('should handle error from request stream', async () => {
        const kc = new KubeConfig();
        const path = '/some/path/to/object?watch=true';
        const pool = mockAgent.get(fakeConfig.clusters[0].server);
        pool.intercept({ path, method: 'GET' }).reply(500, 'Error: some error');

        Object.assign(kc, fakeConfig);
        const watch = new Watch(kc);

        let doneCalled = false;
        let doneErr: any;

        await watch.watch(
            path,
            {},
            (_phase: string, _obj: string) => {},
            (err: any) => {
                doneCalled = true;
                doneErr = err;
            },
        );
        strictEqual(doneCalled, true);
        strictEqual(doneErr.toString(), 'Error: Internal Server Error');
        mockAgent.assertNoPendingInterceptors();
    });

    it('should not call watch done callback more than once', async (t) => {
        const obj1 = {
            type: 'ADDED',
            object: {
                foo: 'bar',
            },
        };

        const obj2 = {
            type: 'MODIFIED',
            object: {
                baz: 'blah',
            },
        };

        const path = '/some/path/to/object';

        let response: ServerResponse | undefined;
        const kc = await setupMockSystem(t, (_req, res) => {
            response = res;
            res.write(JSON.stringify(obj1) + '\n');
            res.write(JSON.stringify(obj2) + '\n');
        });
        const watch = new Watch(kc);

        const receivedTypes: string[] = [];
        const receivedObjects: string[] = [];
        let doneCalled = 0;
        let doneErr: any;

        let handledAllObjectsResolve: any;
        const handledAllObjectsPromise = new Promise((resolve) => {
            handledAllObjectsResolve = resolve;
        });

        let doneResolve: any;
        const donePromise = new Promise((resolve) => {
            doneResolve = resolve;
        });

        await watch.watch(
            path,
            {
                a: 'b',
            },
            (phase: string, obj: string) => {
                receivedTypes.push(phase);
                receivedObjects.push(obj);
                if (receivedObjects.length === 2) {
                    handledAllObjectsResolve();
                }
            },
            (err: any) => {
                doneCalled += 1;
                doneErr = err;
                doneResolve();
            },
        );

        await handledAllObjectsPromise;

        deepStrictEqual(receivedTypes, [obj1.type, obj2.type]);
        deepStrictEqual(receivedObjects, [obj1.object, obj2.object]);

        strictEqual(doneCalled, 0);
        response!.destroy();
        await donePromise;
        strictEqual(doneCalled, 1);
        strictEqual(doneErr?.name, 'TypeError');
        strictEqual(doneErr?.message, 'terminated');
    });

    it('should not call the done callback more than once on unexpected connection loss', async (t) => {
        // Create a server that accepts the connection and flushes headers, then
        // immediately destroys the connection (causing a "Premature close"
        // error).
        //
        // This reproduces a bug where AbortController.abort() inside
        // doneCallOnce could cause done() to be invoked twice.
        const kc = await setupMockSystem(t, (_req, res) => {
            res.writeHead(200, {
                'Content-Type': 'application/json',
                'Transfer-Encoding': 'chunked',
            });
            res.flushHeaders();
            res.destroy(); // Prematurely close the connection
        });
        const watch = new Watch(kc);

        let doneCalled = 0;
        let doneResolve: () => void;

        const donePromise = new Promise<void>((resolve) => {
            doneResolve = resolve;
        });

        await watch.watch(
            '/some/path/to/object',
            {},
            () => {},
            () => {
                doneCalled += 1;
                doneResolve();
            },
        );

        await donePromise;
        strictEqual(doneCalled, 1);
    });

    it('should handle server errors correctly', async (t) => {
        const obj1 = {
            type: 'ADDED',
            object: {
                foo: 'bar',
            },
        };
        const path = '/some/path/to/object?watch=true';
        let response: ServerResponse | undefined;
        const kc = await setupMockSystem(t, (_req, res) => {
            response = res;
            res.write(JSON.stringify(obj1) + '\n');
        });
        const watch = new Watch(kc);

        const receivedTypes: string[] = [];
        const receivedObjects: string[] = [];
        const doneErr: any[] = [];

        let handledAllObjectsResolve: any;
        const handledAllObjectsPromise = new Promise((resolve) => {
            handledAllObjectsResolve = resolve;
        });

        let doneResolve: any;
        const donePromise = new Promise((resolve) => {
            doneResolve = resolve;
        });

        await watch.watch(
            path,
            {},
            (phase: string, obj: string) => {
                receivedTypes.push(phase);
                receivedObjects.push(obj);
                if (receivedObjects.length === 1) {
                    handledAllObjectsResolve();
                }
            },
            (err: any) => {
                doneErr.push(err);
                doneResolve();
            },
        );

        await handledAllObjectsPromise;

        deepStrictEqual(receivedTypes, [obj1.type]);
        deepStrictEqual(receivedObjects, [obj1.object]);

        strictEqual(doneErr.length, 0);

        const errIn = new Error('err');
        response!.destroy(errIn);

        await donePromise;

        strictEqual(doneErr.length, 1);
        strictEqual(doneErr[0]?.name, 'TypeError');
        strictEqual(doneErr[0]?.message, 'terminated');
    });

    it('should handle server side close correctly', async (t) => {
        const obj1 = {
            type: 'ADDED',
            object: {
                foo: 'bar',
            },
        };

        const kc = await setupMockSystem(t, (_req, res) => {
            res.write(JSON.stringify(obj1) + '\n');
            res.end();
        });
        const watch = new Watch(kc);

        const path = '/some/path/to/object?watch=true';

        const receivedTypes: string[] = [];
        const receivedObjects: string[] = [];
        const doneErr: any[] = [];

        let handledAllObjectsResolve: any;
        const handledAllObjectsPromise = new Promise((resolve) => {
            handledAllObjectsResolve = resolve;
        });

        let doneResolve: any;
        const donePromise = new Promise((resolve) => {
            doneResolve = resolve;
        });

        await watch.watch(
            path,
            {},
            (phase: string, obj: string) => {
                receivedTypes.push(phase);
                receivedObjects.push(obj);
                if (receivedObjects.length === 1) {
                    handledAllObjectsResolve();
                }
            },
            (err: any) => {
                doneErr.push(err);
                doneResolve();
            },
        );

        await handledAllObjectsPromise;

        deepStrictEqual(receivedTypes, [obj1.type]);
        deepStrictEqual(receivedObjects, [obj1.object]);
        strictEqual(doneErr.length, 0);

        await donePromise;

        strictEqual(doneErr.length, 1);
        strictEqual(doneErr[0], null);
    });

    it('should ignore JSON parse errors', async (t) => {
        const obj = {
            type: 'MODIFIED',
            object: {
                baz: 'blah',
            },
        };

        const kc = await setupMockSystem(t, (_req, res) => {
            res.write(JSON.stringify(obj) + '\n');
            res.write('{"truncated json\n');
            res.end();
        });
        const watch = new Watch(kc);

        const path = '/some/path/to/object?watch=true';

        const receivedTypes: string[] = [];
        const receivedObjects: string[] = [];

        let doneResolve: any;
        const donePromise = new Promise((resolve) => {
            doneResolve = resolve;
        });

        await watch.watch(
            path,
            {},
            (recievedType: string, recievedObject: string) => {
                receivedTypes.push(recievedType);
                receivedObjects.push(recievedObject);
            },
            () => {
                doneResolve();
            },
        );

        await donePromise;

        deepStrictEqual(receivedTypes, [obj.type]);
        deepStrictEqual(receivedObjects, [obj.object]);
    });

    it('should timeout when server takes too long to respond', async (t) => {
        const kc = await setupMockSystem(t, (_req: any, _res: any) => {
            // Don't respond - simulate a hanging server
        });
        const watch = new Watch(kc);

        // NOTE: Hack around the type system to make the timeout shorter
        (watch as any).requestTimeoutMs = 10;

        let doneErr: any;

        let doneResolve: () => void;
        const donePromise = new Promise<void>((resolve) => {
            doneResolve = resolve;
        });

        await watch.watch(
            '/some/path/to/object',
            {},
            () => {
                throw new Error('Unexpected data received - timeout should have occurred before any data');
            },
            (err: any) => {
                doneErr = err;
                doneResolve();
            },
        );

        await donePromise;

        strictEqual(doneErr.name, 'TimeoutError');
    });

    it('should throw on empty config', async () => {
        const kc = new KubeConfig();
        const watch = new Watch(kc);

        const promise = watch.watch(
            '/some/path',
            {},
            () => {},
            () => {},
        );
        await rejects(promise);
    });
});

type TestContextWithAfter = {
    after: (fn: () => void) => void;
};

async function setupMockSystem(
    ctx: TestContextWithAfter | undefined,
    handler: (req: IncomingMessage, res: ServerResponse) => void,
) {
    const server = createServer(handler);
    if (ctx?.after) {
        ctx.after(() => {
            try {
                server.close();
            } catch {
                // Ignore errors during server close.
            }
        });
    }
    const port = await new Promise<number>((resolve) => {
        server.listen(0, () => {
            resolve((server.address() as AddressInfo).port);
        });
    });
    const kc = new KubeConfig();
    kc.loadFromClusterAndUser(
        {
            name: 'cluster',
            server: `http://localhost:${port}`,
            skipTLSVerify: true,
        },
        {
            name: 'user',
        },
    );
    return kc;
}
