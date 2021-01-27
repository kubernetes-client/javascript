import { expect } from 'chai';
import request = require('request');
import { Duplex } from 'stream';
import { anything, capture, instance, mock, spy, verify, when } from 'ts-mockito';
import { EventEmitter } from 'ws';

import { KubeConfig } from './config';
import { Cluster, Context, User } from './config_types';
import { DefaultRequest, RequestResult, Watch } from './watch';

const server = 'foo.company.com';

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

// Object replacing real Request object in the test
class FakeRequest extends EventEmitter implements RequestResult {
    pipe(stream: Duplex): void {}
    abort() {}
}

describe('Watch', () => {
    describe('DefaultRequest', () => {
        it('should resume stream upon http status 200', (done) => {
            const defaultRequest = new DefaultRequest((opts) => {
                const req = request(opts);
                // to prevent request from firing we must replace start() method
                // before "nextTick" happens
                (<any>req).start = () => {};
                (<any>req).resume = () => done();
                return req;
            });
            const req = defaultRequest.webRequest({
                uri: `http://${server}/testURI`,
            });
            req.on('error', done);
            (<any>req).emit('response', {
                statusCode: 200,
            });
        });

        it('should handle non-200 error codes', (done) => {
            const defaultRequest = new DefaultRequest((opts) => {
                const req = request(opts);
                (<any>req).start = () => {};
                return req;
            });
            const req = defaultRequest.webRequest({
                uri: `http://${server}/testURI`,
            });
            req.on('error', (err) => {
                expect(err.toString()).to.equal('Error: Conflict');
                done();
            });
            (<any>req).emit('response', {
                statusCode: 409,
                statusMessage: 'Conflict',
            });
        });
    });

    it('should construct correctly', () => {
        const kc = new KubeConfig();
        const watch = new Watch(kc);
    });

    it('should handle error from request stream', async () => {
        const kc = new KubeConfig();
        const fakeRequest = new FakeRequest();
        const spiedRequest = spy(fakeRequest);
        let aborted = false;

        when(spiedRequest.pipe(anything())).thenCall(() => {
            fakeRequest.emit('error', new Error('some error'));
        });
        when(spiedRequest.abort()).thenCall(() => {
            aborted = true;
        });

        Object.assign(kc, fakeConfig);
        const watch = new Watch(kc, {
            webRequest: (opts: request.OptionsWithUri) => {
                expect(opts.uri).to.equal(`${server}${path}`);
                expect(opts.method).to.equal('GET');
                expect(opts.json).to.equal(true);
                return fakeRequest;
            },
        });

        const path = '/some/path/to/object';

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
        expect(doneErr.toString()).to.equal('Error: some error');
        expect(aborted).to.equal(true);
    });

    it('should not call watch done callback more than once', async () => {
        const kc = new KubeConfig();
        Object.assign(kc, fakeConfig);
        const fakeRequestor = mock(DefaultRequest);
        const watch = new Watch(kc, instance(fakeRequestor));

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

        var stream;
        const fakeRequest = new FakeRequest();
        fakeRequest.pipe = function(arg) {
            stream = arg;
            stream.write(JSON.stringify(obj1) + '\n');
            stream.write(JSON.stringify(obj2) + '\n');
        };

        when(fakeRequestor.webRequest(anything())).thenReturn(fakeRequest);

        const path = '/some/path/to/object';

        const receivedTypes: string[] = [];
        const receivedObjects: string[] = [];
        let doneCalled = 0;
        let doneErr: any;

        await watch.watch(
            path,
            {},
            (phase: string, obj: string) => {
                receivedTypes.push(phase);
                receivedObjects.push(obj);
            },
            (err: any) => {
                doneCalled += 1;
                doneErr = err;
            },
        );

        verify(fakeRequestor.webRequest(anything()));

        const [opts] = capture(fakeRequestor.webRequest).last();
        const reqOpts: request.OptionsWithUri = opts as request.OptionsWithUri;

        expect(reqOpts.uri).to.equal(`${server}${path}`);
        expect(reqOpts.method).to.equal('GET');
        expect(reqOpts.json).to.equal(true);

        expect(receivedTypes).to.deep.equal([obj1.type, obj2.type]);
        expect(receivedObjects).to.deep.equal([obj1.object, obj2.object]);

        expect(doneCalled).to.equal(0);

        const errIn = { error: 'err' };
        stream.emit('error', errIn);
        expect(doneErr).to.deep.equal(errIn);
        expect(doneCalled).to.equal(1);

        stream.end();
        expect(doneCalled).to.equal(1);
    });

    it('should handle errors correctly', async () => {
        const kc = new KubeConfig();
        Object.assign(kc, fakeConfig);
        const fakeRequestor = mock(DefaultRequest);
        const watch = new Watch(kc, instance(fakeRequestor));

        const obj1 = {
            type: 'ADDED',
            object: {
                foo: 'bar',
            },
        };

        const errIn = { error: 'err' };
        const fakeRequest = new FakeRequest();
        fakeRequest.pipe = function(stream) {
            stream.write(JSON.stringify(obj1) + '\n');
            stream.emit('error', errIn);
            stream.emit('close');
        };

        when(fakeRequestor.webRequest(anything())).thenReturn(fakeRequest);

        const path = '/some/path/to/object';

        const receivedTypes: string[] = [];
        const receivedObjects: string[] = [];
        let doneCalled = false;
        let doneErr: any[] = [];

        await watch.watch(
            path,
            {},
            (phase: string, obj: string) => {
                receivedTypes.push(phase);
                receivedObjects.push(obj);
            },
            (err: any) => {
                doneCalled = true;
                doneErr.push(err);
            },
        );

        verify(fakeRequestor.webRequest(anything()));

        const [opts] = capture(fakeRequestor.webRequest).last();
        const reqOpts: request.OptionsWithUri = opts as request.OptionsWithUri;

        expect(reqOpts.uri).to.equal(`${server}${path}`);
        expect(reqOpts.method).to.equal('GET');
        expect(reqOpts.json).to.equal(true);

        expect(receivedTypes).to.deep.equal([obj1.type]);
        expect(receivedObjects).to.deep.equal([obj1.object]);

        expect(doneCalled).to.equal(true);
        expect(doneErr.length).to.equal(1);
        expect(doneErr[0]).to.deep.equal(errIn);
    });

    it('should handle server side close correctly', async () => {
        const kc = new KubeConfig();
        Object.assign(kc, fakeConfig);
        const fakeRequestor = mock(DefaultRequest);
        const watch = new Watch(kc, instance(fakeRequestor));

        const obj1 = {
            type: 'ADDED',
            object: {
                foo: 'bar',
            },
        };

        const fakeRequest = new FakeRequest();
        fakeRequest.pipe = function(stream) {
            stream.write(JSON.stringify(obj1) + '\n');
            stream.emit('close');
        };

        when(fakeRequestor.webRequest(anything())).thenReturn(fakeRequest);

        const path = '/some/path/to/object';

        const receivedTypes: string[] = [];
        const receivedObjects: string[] = [];
        let doneCalled = false;
        let doneErr: any;

        await watch.watch(
            path,
            {},
            (phase: string, obj: string) => {
                receivedTypes.push(phase);
                receivedObjects.push(obj);
            },
            (err: any) => {
                doneCalled = true;
                doneErr = err;
            },
        );

        verify(fakeRequestor.webRequest(anything()));

        const [opts] = capture(fakeRequestor.webRequest).last();
        const reqOpts: request.OptionsWithUri = opts as request.OptionsWithUri;

        expect(reqOpts.uri).to.equal(`${server}${path}`);
        expect(reqOpts.method).to.equal('GET');
        expect(reqOpts.json).to.equal(true);

        expect(receivedTypes).to.deep.equal([obj1.type]);
        expect(receivedObjects).to.deep.equal([obj1.object]);

        expect(doneCalled).to.equal(true);
        expect(doneErr).to.be.null;
    });

    it('should ignore JSON parse errors', async () => {
        const kc = new KubeConfig();
        Object.assign(kc, fakeConfig);
        const fakeRequestor = mock(DefaultRequest);
        const watch = new Watch(kc, instance(fakeRequestor));

        const obj = {
            type: 'MODIFIED',
            object: {
                baz: 'blah',
            },
        };

        const fakeRequest = new FakeRequest();
        fakeRequest.pipe = function(stream) {
            stream.write(JSON.stringify(obj) + '\n');
            stream.write('{"truncated json\n');
        };

        when(fakeRequestor.webRequest(anything())).thenReturn(fakeRequest);

        const path = '/some/path/to/object';

        const receivedTypes: string[] = [];
        const receivedObjects: string[] = [];

        await watch.watch(
            path,
            {},
            (recievedType: string, recievedObject: string) => {
                receivedTypes.push(recievedType);
                receivedObjects.push(recievedObject);
            },
            () => {
                // ignore
            },
        );

        verify(fakeRequestor.webRequest(anything()));

        const [opts, doneCallback] = capture(fakeRequestor.webRequest).last();
        const reqOpts: request.OptionsWithUri = opts as request.OptionsWithUri;

        expect(receivedTypes).to.deep.equal([obj.type]);
        expect(receivedObjects).to.deep.equal([obj.object]);
    });

    it('should throw on empty config', () => {
        const kc = new KubeConfig();
        const watch = new Watch(kc);

        const promise = watch.watch('/some/path', {}, () => {}, () => {});
        expect(promise).to.be.rejected;
    });
});
