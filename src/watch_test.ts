import { expect } from 'chai';
import request = require('request');
import { anyFunction, anything, capture, instance, mock, reset, verify, when } from 'ts-mockito';

import { KubeConfig } from './config';
import { Cluster, Context, User } from './config_types';
import { DefaultRequest, Watch } from './watch';

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

describe('Watch', () => {
    it('should construct correctly', () => {
        const kc = new KubeConfig();
        const watch = new Watch(kc);
    });

    it('should handle non-200 error codes', async () => {
        const kc = new KubeConfig();
        Object.assign(kc, fakeConfig);
        const fakeRequestor = mock(DefaultRequest);
        const watch = new Watch(kc, instance(fakeRequestor));

        const fakeRequest = {
            pipe: (stream) => {},
        };

        when(fakeRequestor.webRequest(anything(), anyFunction())).thenReturn(fakeRequest);

        const path = '/some/path/to/object';

        let doneCalled = false;
        let doneErr: any;

        await watch.watch(
            path,
            {},
            (phase: string, obj: string) => {},
            () => {
                doneCalled = true;
            },
            (err: any) => {
                doneErr = err;
            },
        );

        verify(fakeRequestor.webRequest(anything(), anyFunction()));

        const [opts, doneCallback] = capture(fakeRequestor.webRequest).last();
        const reqOpts: request.OptionsWithUri = opts as request.OptionsWithUri;

        expect(reqOpts.uri).to.equal(`${server}${path}`);
        expect(reqOpts.method).to.equal('GET');
        expect(reqOpts.json).to.equal(true);

        expect(doneCalled).to.equal(false);

        const resp = {
            statusCode: 409,
            statusMessage: 'Conflict',
        };
        doneCallback(null, resp, {});

        expect(doneCalled).to.equal(true);
        expect(doneErr.toString()).to.equal('Error: Conflict');
    });

    it('should watch correctly', async () => {
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

        const fakeRequest = {
            pipe: (stream) => {
                stream.write(JSON.stringify(obj1) + '\n');
                stream.write(JSON.stringify(obj2) + '\n');
            },
        };

        when(fakeRequestor.webRequest(anything(), anyFunction())).thenReturn(fakeRequest);

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
            () => {
                doneCalled = true;
            },
            (err: any) => {
                doneErr = err;
            },
        );

        verify(fakeRequestor.webRequest(anything(), anyFunction()));

        const [opts, doneCallback] = capture(fakeRequestor.webRequest).last();
        const reqOpts: request.OptionsWithUri = opts as request.OptionsWithUri;

        expect(reqOpts.uri).to.equal(`${server}${path}`);
        expect(reqOpts.method).to.equal('GET');
        expect(reqOpts.json).to.equal(true);

        expect(receivedTypes).to.deep.equal([obj1.type, obj2.type]);
        expect(receivedObjects).to.deep.equal([obj1.object, obj2.object]);

        expect(doneCalled).to.equal(false);

        doneCallback(null, null, null);

        expect(doneCalled).to.equal(true);
        expect(doneErr).to.be.undefined;

        const errIn = { error: 'err' };
        doneCallback(errIn, null, null);
        expect(doneErr).to.deep.equal(errIn);
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
        const fakeRequest = {
            pipe: (stream) => {
                stream.write(JSON.stringify(obj1) + '\n');
                stream.emit('error', errIn);
                stream.emit('close');
            },
        };

        when(fakeRequestor.webRequest(anything(), anyFunction())).thenReturn(fakeRequest);

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
            () => (doneCalled = true),
            (err: any) => doneErr.push(err),
        );

        verify(fakeRequestor.webRequest(anything(), anyFunction()));

        const [opts, doneCallback] = capture(fakeRequestor.webRequest).last();
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

        const fakeRequest = {
            pipe: (stream) => {
                stream.write(JSON.stringify(obj1) + '\n');
                stream.emit('close');
            },
        };

        when(fakeRequestor.webRequest(anything(), anyFunction())).thenReturn(fakeRequest);

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
            () => (doneCalled = true),
            (err: any) => (doneErr = err),
        );

        verify(fakeRequestor.webRequest(anything(), anyFunction()));

        const [opts, doneCallback] = capture(fakeRequestor.webRequest).last();
        const reqOpts: request.OptionsWithUri = opts as request.OptionsWithUri;

        expect(reqOpts.uri).to.equal(`${server}${path}`);
        expect(reqOpts.method).to.equal('GET');
        expect(reqOpts.json).to.equal(true);

        expect(receivedTypes).to.deep.equal([obj1.type]);
        expect(receivedObjects).to.deep.equal([obj1.object]);

        expect(doneCalled).to.equal(true);
        expect(doneErr).to.be.undefined;
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

        const fakeRequest = {
            pipe: (stream) => {
                stream.write(JSON.stringify(obj) + '\n');
                stream.write('{"truncated json\n');
            },
        };

        when(fakeRequestor.webRequest(anything(), anyFunction())).thenReturn(fakeRequest);

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
                /* ignore */
            },
            () => {
                /* ignore */
            },
        );

        verify(fakeRequestor.webRequest(anything(), anyFunction()));

        const [opts, doneCallback] = capture(fakeRequestor.webRequest).last();
        const reqOpts: request.OptionsWithUri = opts as request.OptionsWithUri;

        expect(receivedTypes).to.deep.equal([obj.type]);
        expect(receivedObjects).to.deep.equal([obj.object]);
    });

    it('should throw on empty config', () => {
        const kc = new KubeConfig();
        const watch = new Watch(kc);

        const promise = watch.watch('/some/path', {}, () => {}, () => {}, () => {});
        expect(promise).to.be.rejected;
    });
});
