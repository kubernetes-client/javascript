import { describe, it } from 'node:test';
import { deepStrictEqual, rejects, strictEqual } from 'node:assert';
import nock from 'nock';
import { PassThrough } from 'node:stream';
import { KubeConfig } from './config.js';
import { Cluster, Context, User } from './config_types.js';
import { Watch } from './watch.js';
import { ServerResponse, createServer } from 'node:http';
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

const systemUnderTest = (): [nock.Scope] => {
    const scope = nock(fakeConfig.clusters[0].server);
    return [scope];
};

describe('Watch', () => {
    it('should construct correctly', () => {
        const kc = new KubeConfig();
        new Watch(kc);
    });

    it('should handle error from request stream', async () => {
        const kc = new KubeConfig();
        const path = '/some/path/to/object?watch=true';

        const [scope] = systemUnderTest();
        const s = scope.get(path).reply(500, 'Error: some error');

        Object.assign(kc, fakeConfig);
        const watch = new Watch(kc);

        let doneCalled = false;
        let doneErr: any;

        await watch.watch(
            path,
            {},
            (phase: string, obj: string) => {},
            (err: any) => {
                doneCalled = true;
                doneErr = err;
            },
        );
        strictEqual(doneCalled, true);
        strictEqual(doneErr.toString(), 'Error: Internal Server Error');
        s.done();
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
        const kc = await setupMockSystem(t, (req, res) => {
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
        strictEqual(doneErr.code, 'ERR_STREAM_PREMATURE_CLOSE');
    });

    it('should not call the done callback more than once on unexpected connection loss', async (t) => {
        // Create a server that accepts the connection and flushes headers, then
        // immediately destroys the connection (causing a "Premature close"
        // error).
        //
        // This reproduces a bug where AbortController.abort() inside
        // doneCallOnce could cause done() to be invoked twice.
        const kc = await setupMockSystem(t, (req, res) => {
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

    it('should call setKeepAlive on the socket to extend the default of 5 mins', async (t) => {
        let response: ServerResponse | undefined;
        const kc = await setupMockSystem(t, (req, res) => {
            response = res;
            res.write(JSON.stringify(obj1) + '\n');
        });
        const mockSocket = {
            setKeepAlive: function (enable: boolean, timeout: number) {
                this.keepAliveEnabled = enable;
                this.keepAliveTimeout = timeout;
            },
            keepAliveEnabled: false,
            keepAliveTimeout: 0,
        };

        (kc as any).applyToFetchOptions = async () => {
            return {
                agent: {
                    sockets: {
                        'mock-url': [mockSocket],
                    },
                },
            };
        };
        const watch = new Watch(kc);

        const obj1 = {
            type: 'ADDED',
            object: {
                foo: 'bar',
            },
        };

        const path = '/some/path/to/object';
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
                if (receivedObjects.length) {
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

        deepStrictEqual(receivedTypes, [obj1.type]);
        deepStrictEqual(receivedObjects, [obj1.object]);

        strictEqual(doneCalled, 0);
        strictEqual(mockSocket.keepAliveEnabled, true);
        strictEqual(mockSocket.keepAliveTimeout, 30000);

        response!.destroy();

        await donePromise;

        strictEqual(doneCalled, 1);
        strictEqual(doneErr.code, 'ERR_STREAM_PREMATURE_CLOSE');
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
        const kc = await setupMockSystem(t, (req, res) => {
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
        strictEqual(doneErr[0].code, 'ERR_STREAM_PREMATURE_CLOSE');
    });

    it('should handle server side close correctly', async () => {
        const kc = new KubeConfig();
        Object.assign(kc, fakeConfig);
        const watch = new Watch(kc);

        const obj1 = {
            type: 'ADDED',
            object: {
                foo: 'bar',
            },
        };

        const stream = new PassThrough();

        const [scope] = systemUnderTest();

        const path = '/some/path/to/object?watch=true';

        const s = scope.get(path).reply(200, function (): PassThrough {
            stream.push(JSON.stringify(obj1) + '\n');
            return stream;
        });

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

        stream.end();

        await donePromise;

        strictEqual(doneErr.length, 1);
        strictEqual(doneErr[0], null);

        s.done();

        stream.destroy();
    });

    it('should ignore JSON parse errors', async () => {
        const kc = new KubeConfig();
        Object.assign(kc, fakeConfig);
        const watch = new Watch(kc);

        const obj = {
            type: 'MODIFIED',
            object: {
                baz: 'blah',
            },
        };

        const stream = new PassThrough();

        const [scope] = systemUnderTest();

        const path = '/some/path/to/object?watch=true';

        const s = scope.get(path).reply(200, () => {
            stream.push(JSON.stringify(obj) + '\n');
            stream.write('{"truncated json\n');
            return stream;
        });

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

        stream.end();

        await donePromise;

        deepStrictEqual(receivedTypes, [obj.type]);
        deepStrictEqual(receivedObjects, [obj.object]);

        s.done();
    });

    it('should timeout when server takes too long to respond', async (t) => {
        const kc = await setupMockSystem(t, (_req: any, _res: any) => {
            // Don't respond - simulate a hanging server
        });
        const watch = new Watch(kc);
        // Hack around type system to make the default timeout shorter.
        (watch as any).timeoutMs = 100;

        let doneCalled = false;
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
                doneCalled = true;
                doneErr = err;
                doneResolve();
            },
        );

        await donePromise;

        strictEqual(doneCalled, true);
        strictEqual(doneErr.name, 'AbortError');
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

async function setupMockSystem(ctx, handler) {
    const server = createServer(handler);
    ctx.after(() => {
        try {
            server.close();
        } catch {
            // Ignore errors during server close.
        }
    });
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
