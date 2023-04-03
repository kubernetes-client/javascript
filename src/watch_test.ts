import { expect } from 'chai';
// import { anything, capture, instance, mock, spy, verify, when } from 'ts-mockito';

import nock = require('nock');
import { PassThrough } from 'stream';
import { KubeConfig } from './config';
import { Cluster, Context, User } from './config_types';
import { Watch } from './watch';

const server = 'http://foo.company.com';

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
        const watch = new Watch(kc);
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
        expect(doneCalled).to.equal(true);
        expect(doneErr.toString()).to.equal('Error: Internal Server Error');
        s.done();
    });

    it('should not call watch done callback more than once', async () => {
        const kc = new KubeConfig();
        Object.assign(kc, fakeConfig);
        const watch = new Watch(kc);

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

        const stream = new PassThrough();

        const [scope] = systemUnderTest();

        const s = scope
            .get(path)
            .query({
                watch: 'true',
                a: 'b',
            })
            .reply(200, () => {
                stream.push(JSON.stringify(obj1) + '\n');
                stream.push(JSON.stringify(obj2) + '\n');
                return stream;
            });

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

        expect(receivedTypes).to.deep.equal([obj1.type, obj2.type]);
        expect(receivedObjects).to.deep.equal([obj1.object, obj2.object]);

        expect(doneCalled).to.equal(0);

        // TODO check after node-fetch fix
        // https://github.com/node-fetch/node-fetch/issues/1231
        // https://github.com/node-fetch/node-fetch/issues/1721

        // const errIn = { error: 'err' };
        // stream.emit('error', errIn);
        // expect(doneErr).to.deep.equal(errIn);
        // await donePromise;
        // expect(doneCalled).to.equal(1);

        stream.end();

        await donePromise;

        expect(doneCalled).to.equal(1);
        s.done();
    });

    // https://github.com/node-fetch/node-fetch/issues/1231
    // https://github.com/node-fetch/node-fetch/issues/1721
    it.skip('should handle errors correctly', async () => {
        const kc = new KubeConfig();
        Object.assign(kc, fakeConfig);
        const watch = new Watch(kc);

        const obj1 = {
            type: 'ADDED',
            object: {
                foo: 'bar',
            },
        };

        const errIn = { error: 'err' };

        const stream = new PassThrough();

        const [scope] = systemUnderTest();

        const path = '/some/path/to/object?watch=true';

        const s = scope.get(path).reply(200, () => {
            stream.push(JSON.stringify(obj1) + '\n');
            return stream;
        });

        const receivedTypes: string[] = [];
        const receivedObjects: string[] = [];
        const doneErr: any[] = [];

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
            },
            (err: any) => {
                doneErr.push(err);
                doneResolve();
            },
        );

        stream.emit('error', errIn);

        await donePromise;

        expect(receivedTypes).to.deep.equal([obj1.type]);
        expect(receivedObjects).to.deep.equal([obj1.object]);

        expect(doneErr.length).to.equal(1);
        expect(doneErr[0]).to.deep.equal(errIn);

        s.done();
    });

    // https://github.com/node-fetch/node-fetch/issues/1231
    // https://github.com/node-fetch/node-fetch/issues/1721
    it.skip('should handle server side close correctly', async () => {
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

        const s = scope.get(path).reply(200, () => {
            stream.push(JSON.stringify(obj1) + '\n');
            return stream;
        });

        const receivedTypes: string[] = [];
        const receivedObjects: string[] = [];
        const doneErr: any[] = [];

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
            },
            (err: any) => {
                doneErr.push(err);
                doneResolve();
            },
        );

        stream.emit('close');

        await donePromise;

        expect(receivedTypes).to.deep.equal([obj1.type]);
        expect(receivedObjects).to.deep.equal([obj1.object]);

        expect(doneErr.length).to.equal(1);
        expect(doneErr[0]).to.be.null;

        s.done();
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

        expect(receivedTypes).to.deep.equal([obj.type]);
        expect(receivedObjects).to.deep.equal([obj.object]);

        s.done();
    });

    it('should throw on empty config', () => {
        const kc = new KubeConfig();
        const watch = new Watch(kc);

        const promise = watch.watch(
            '/some/path',
            {},
            () => {},
            () => {},
        );
        expect(promise).to.be.rejected;
    });
});
