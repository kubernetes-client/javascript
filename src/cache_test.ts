import { expect, use } from 'chai';
import chaiAsPromised from 'chai-as-promised';

import mock from 'ts-mockito';

import { V1Namespace, V1NamespaceList, V1ObjectMeta, V1Pod, V1PodList, V1ListMeta } from './api.js';
import {
    deleteObject,
    ListWatch,
    deleteItems,
    CacheMap,
    cacheMapFromList,
    addOrUpdateObject,
} from './cache.js';
import { KubeConfig } from './config.js';
import { Cluster, Context, User } from './config_types.js';
import { ListPromise } from './informer.js';

use(chaiAsPromised);

import nock from 'nock';
import { Watch } from './watch.js';

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

describe('ListWatchCache', () => {
    it('should throw on unknown update', () => {
        const fake = mock.mock(Watch);
        const listFn: ListPromise<V1Namespace> = function (): Promise<V1NamespaceList> {
            return new Promise<V1NamespaceList>((resolve, reject) => {
                resolve({
                    metadata: {
                        resourceVersion: '12345',
                    } as V1ListMeta,
                    items: [],
                } as V1NamespaceList);
            });
        };
        const lw = new ListWatch('/some/path', fake, listFn);
        const verb = 'FOOBAR';
        // The 'as any' is a hack to get around Typescript which prevents an unknown verb from being
        // passed. We want to test for Javascript clients also, where this is possible
        expect(() => (lw as any).on(verb, (obj?: V1Namespace) => {})).to.throw(`Unknown verb: ${verb}`);
    });

    it('should perform basic caching', async () => {
        const fakeWatch = mock.mock(Watch);
        const list: V1Pod[] = [
            {
                metadata: {
                    name: 'name1',
                    namespace: 'default',
                } as V1ObjectMeta,
            } as V1Pod,
            {
                metadata: {
                    name: 'name2',
                    namespace: 'default',
                } as V1ObjectMeta,
            } as V1Pod,
        ];
        const listObj = {
            metadata: {
                resourceVersion: '12345',
            } as V1ListMeta,
            items: list,
        } as V1PodList;

        const emptyObj = {
            metadata: {
                resourceVersion: '123456',
            } as V1ListMeta,
            items: [
                {
                    metadata: {
                        name: 'name3',
                        namespace: 'default',
                    } as V1ObjectMeta,
                } as V1Pod,
            ],
        } as V1PodList;

        let calls = 0;
        const listFn: ListPromise<V1Pod> = function (): Promise<V1PodList> {
            return new Promise<V1PodList>((resolve, reject) => {
                if (calls++ === 0) {
                    resolve(listObj);
                } else {
                    resolve(emptyObj);
                }
            });
        };
        const promise = new Promise((resolve) => {
            mock.when(
                fakeWatch.watch(mock.anything(), mock.anything(), mock.anything(), mock.anything()),
            ).thenCall(() => {
                resolve(new AbortController());
            });
        });
        const cache = new ListWatch('/some/path', mock.instance(fakeWatch), listFn);
        await promise;
        const [pathOut, , watchHandler, doneHandler] = mock.capture(fakeWatch.watch).last();
        expect(pathOut).to.equal('/some/path');
        expect(cache.list()).to.deep.equal(list);

        expect(cache.list('default')).to.deep.equal(list);
        expect(cache.list('non-existent')).to.deep.equal([]);

        watchHandler('ADDED', {
            metadata: {
                name: 'name3',
                namespace: 'other',
            } as V1ObjectMeta,
        } as V1Pod);

        expect(cache.list().length).to.equal(3);
        expect(cache.get('name3')).to.not.equal(null);

        expect(cache.list('default').length).to.equal(2);
        expect(cache.list('other').length).to.equal(1);
        expect(cache.list('non-existent')).to.deep.equal([]);

        watchHandler('MODIFIED', {
            metadata: {
                name: 'name3',
                namespace: 'other',
                resourceVersion: 'baz',
            } as V1ObjectMeta,
        } as V1Pod);
        expect(cache.list().length).to.equal(3);
        const obj3 = cache.get('name3');
        expect(obj3).to.not.equal(null);
        if (obj3) {
            expect(obj3.metadata!.name).to.equal('name3');
            expect(obj3.metadata!.resourceVersion).to.equal('baz');
        }

        watchHandler('DELETED', {
            metadata: {
                name: 'name2',
                namespace: 'default',
            } as V1ObjectMeta,
        } as V1Pod);
        expect(cache.list().length).to.equal(2);
        expect(cache.get('name2')).to.equal(undefined);

        expect(cache.list('default').length).to.equal(1);
        expect(cache.list('other').length).to.equal(1);

        watchHandler('ADDED', {
            metadata: {
                name: 'name2',
                namespace: 'default',
            } as V1ObjectMeta,
        } as V1Pod);

        const error = new Error('Gone') as Error & { statusCode: number | undefined };
        error.statusCode = 410;
        await doneHandler(error);
        expect(cache.list().length, 'all pod list').to.equal(1);
        expect(cache.list('default').length, 'default pod list').to.equal(1);
        expect(cache.list('other'), 'other pod list').to.deep.equal([]);
    });

    it('should perform work as an informer', async () => {
        const fakeWatch = mock.mock(Watch);
        const list: V1Namespace[] = [
            {
                metadata: {
                    name: 'name1',
                } as V1ObjectMeta,
            } as V1Namespace,
            {
                metadata: {
                    name: 'name2',
                } as V1ObjectMeta,
            } as V1Namespace,
        ];
        const listObj = {
            metadata: {
                resourceVersion: '12345',
            } as V1ListMeta,
            items: list,
        } as V1NamespaceList;

        const listFn: ListPromise<V1Namespace> = function (): Promise<V1NamespaceList> {
            return new Promise<V1NamespaceList>((resolve, reject) => {
                resolve(listObj);
            });
        };
        const promise = new Promise((resolve) => {
            mock.when(
                fakeWatch.watch(mock.anything(), mock.anything(), mock.anything(), mock.anything()),
            ).thenCall(() => {
                resolve(new AbortController());
            });
        });
        const informer = new ListWatch('/some/path', mock.instance(fakeWatch), listFn);
        await promise;
        const [pathOut, , watchHandler] = mock.capture(fakeWatch.watch).last();
        expect(pathOut).to.equal('/some/path');

        const addPromise = new Promise<V1Namespace>((resolve: (V1Namespace) => void) => {
            informer.on('add', (obj?: V1Namespace) => {
                resolve(obj);
            });
        });

        const updatePromise = new Promise<V1Namespace>((resolve: (V1Namespace) => void) => {
            informer.on('update', (obj?: V1Namespace) => {
                resolve(obj);
            });
        });

        const deletePromise = new Promise<V1Namespace>((resolve: (V1Namespace) => void) => {
            informer.on('delete', (obj?: V1Namespace) => {
                resolve(obj);
            });
        });

        watchHandler('ADDED', {
            metadata: {
                name: 'name3',
            } as V1ObjectMeta,
        } as V1Namespace);

        watchHandler('MODIFIED', {
            metadata: {
                name: 'name3',
                resourceVersion: 'baz',
            } as V1ObjectMeta,
        } as V1Namespace);

        watchHandler('DELETED', {
            metadata: {
                name: 'name2',
            } as V1ObjectMeta,
        } as V1Namespace);

        return Promise.all([
            expect(addPromise).to.eventually.have.property('metadata').that.deep.equals({ name: 'name3' }),
            expect(updatePromise)
                .to.eventually.have.property('metadata')
                .that.deep.equals({ name: 'name3', resourceVersion: 'baz' }),
            expect(deletePromise).to.eventually.have.property('metadata').that.deep.equals({ name: 'name2' }),
        ]);
    });

    it('should handle change events correctly', async () => {
        const fakeWatch = mock.mock(Watch);
        const list: V1Namespace[] = [
            {
                metadata: {
                    name: 'name1',
                } as V1ObjectMeta,
            } as V1Namespace,
            {
                metadata: {
                    name: 'name2',
                } as V1ObjectMeta,
            } as V1Namespace,
        ];
        const listObj = {
            metadata: {
                resourceVersion: '12345',
            } as V1ListMeta,
            items: list,
        } as V1NamespaceList;

        const listFn: ListPromise<V1Namespace> = function (): Promise<V1NamespaceList> {
            return new Promise<V1NamespaceList>((resolve, reject) => {
                resolve(listObj);
            });
        };
        const promise = new Promise((resolve) => {
            mock.when(
                fakeWatch.watch(mock.anything(), mock.anything(), mock.anything(), mock.anything()),
            ).thenCall(() => {
                resolve(new AbortController());
            });
        });
        const informer = new ListWatch('/some/path', mock.instance(fakeWatch), listFn);
        await promise;
        const [pathOut, , watchHandler] = mock.capture(fakeWatch.watch).last();
        expect(pathOut).to.equal('/some/path');

        let count = 0;
        const changePromise = new Promise<boolean>((resolve: (V1Namespace) => void) => {
            informer.on('change', (obj?: V1Namespace) => {
                count++;
                if (count == 3) {
                    resolve(true);
                }
            });
        });

        watchHandler('ADDED', {
            metadata: {
                name: 'name3',
            } as V1ObjectMeta,
        } as V1Namespace);

        watchHandler('MODIFIED', {
            metadata: {
                name: 'name3',
                resourceVersion: 'baz',
            } as V1ObjectMeta,
        } as V1Namespace);

        watchHandler('DELETED', {
            metadata: {
                name: 'name2',
            } as V1ObjectMeta,
        } as V1Namespace);

        expect(changePromise).to.eventually.be.true;
    });

    it('should perform work as an informer with multiple handlers', async () => {
        const fakeWatch = mock.mock(Watch);
        const listObj = {
            metadata: {
                resourceVersion: '12345',
            } as V1ListMeta,
            items: [],
        } as V1NamespaceList;

        const listFn: ListPromise<V1Namespace> = function (): Promise<V1NamespaceList> {
            return new Promise<V1NamespaceList>((resolve, reject) => {
                resolve(listObj);
            });
        };
        const promise = new Promise((resolve) => {
            mock.when(
                fakeWatch.watch(mock.anything(), mock.anything(), mock.anything(), mock.anything()),
            ).thenCall(() => {
                resolve(new AbortController());
            });
        });
        const informer = new ListWatch('/some/path', mock.instance(fakeWatch), listFn);
        await promise;
        const [pathOut, , watchHandler] = mock.capture(fakeWatch.watch).last();
        expect(pathOut).to.equal('/some/path');

        const addPromise = new Promise<V1Namespace>((resolve: (V1Namespace) => void) => {
            informer.on('add', (obj?: V1Namespace) => {
                resolve(obj);
            });
        });

        const addPromise2 = new Promise<V1Namespace>((resolve: (V1Namespace) => void) => {
            informer.on('add', (obj?: V1Namespace) => {
                resolve(obj);
            });
        });

        watchHandler('ADDED', {
            metadata: {
                name: 'name3',
            } as V1ObjectMeta,
        } as V1Namespace);

        return Promise.all([
            expect(addPromise).to.eventually.have.property('metadata').that.deep.equals({ name: 'name3' }),
            expect(addPromise2).to.eventually.have.property('metadata').that.deep.equals({ name: 'name3' }),
        ]);
    });

    it('should perform work as an informer with initial list', async () => {
        const fakeWatch = mock.mock(Watch);
        const list: V1Namespace[] = [
            {
                metadata: {
                    name: 'name1',
                    resourceVersion: '9876',
                } as V1ObjectMeta,
            } as V1Namespace,
            {
                metadata: {
                    name: 'name2',
                    resourceVersion: '8765',
                } as V1ObjectMeta,
            } as V1Namespace,
        ];
        const listObj = {
            metadata: {
                resourceVersion: '12345',
            } as V1ListMeta,
            items: list,
        } as V1NamespaceList;

        const listFn: ListPromise<V1Namespace> = function (): Promise<V1NamespaceList> {
            return new Promise<V1NamespaceList>((resolve, reject) => {
                resolve(listObj);
            });
        };
        let promise = new Promise((resolve) => {
            mock.when(
                fakeWatch.watch(mock.anything(), mock.anything(), mock.anything(), mock.anything()),
            ).thenCall(() => {
                resolve(new AbortController());
            });
        });
        const informer = new ListWatch('/some/path', mock.instance(fakeWatch), listFn, false);

        const addObjects: V1Namespace[] = [];
        informer.on('add', (obj?: V1Namespace) => addObjects.push(obj!));
        const updateObjects: V1Namespace[] = [];
        informer.on('update', (obj?: V1Namespace) => updateObjects.push(obj!));

        informer.start();
        await promise;
        const [pathOut, , , doneHandler] = mock.capture(fakeWatch.watch).last();

        expect(pathOut).to.equal('/some/path');
        expect(addObjects).to.deep.equal(list);
        expect(updateObjects).to.deep.equal([]);

        promise = new Promise((resolve) => {
            mock.when(
                fakeWatch.watch(mock.anything(), mock.anything(), mock.anything(), mock.anything()),
            ).thenCall(() => {
                resolve(new AbortController());
            });
        });
        doneHandler(null);
        await promise;
        expect(addObjects).to.deep.equal(list);
        expect(updateObjects).to.deep.equal([]);
    });

    it('should perform work as an informer with initial list and delete after', async () => {
        const fakeWatch = mock.mock(Watch);
        const list: V1Namespace[] = [
            {
                metadata: {
                    name: 'name1',
                    resourceVersion: '9876',
                } as V1ObjectMeta,
            } as V1Namespace,
            {
                metadata: {
                    name: 'name2',
                    resourceVersion: '8765',
                } as V1ObjectMeta,
            } as V1Namespace,
        ];
        const list2: V1Namespace[] = [
            {
                metadata: {
                    name: 'name1',
                    resourceVersion: '9999',
                } as V1ObjectMeta,
            } as V1Namespace,
        ];
        const listObj = {
            metadata: {
                resourceVersion: '12345',
            } as V1ListMeta,
            items: list,
        } as V1NamespaceList;

        const listFn: ListPromise<V1Namespace> = function (): Promise<V1NamespaceList> {
            return new Promise<V1NamespaceList>((resolve, reject) => {
                resolve(listObj);
            });
        };
        let promise = new Promise((resolve) => {
            mock.when(
                fakeWatch.watch(mock.anything(), mock.anything(), mock.anything(), mock.anything()),
            ).thenCall(() => {
                resolve(new AbortController());
            });
        });
        const informer = new ListWatch('/some/path', mock.instance(fakeWatch), listFn, false);

        const addObjects: V1Namespace[] = [];
        informer.on('add', (obj?: V1Namespace) => addObjects.push(obj!));
        const updateObjects: V1Namespace[] = [];
        informer.on('update', (obj?: V1Namespace) => updateObjects.push(obj!));
        const deleteObjects: V1Namespace[] = [];
        informer.on('delete', (obj?: V1Namespace) => deleteObjects.push(obj!));
        informer.start();
        await promise;
        const [pathOut, , , doneHandler] = mock.capture(fakeWatch.watch).last();

        expect(pathOut).to.equal('/some/path');
        expect(addObjects).to.deep.equal(list);
        expect(updateObjects).to.deep.equal([]);

        promise = new Promise((resolve) => {
            mock.when(
                fakeWatch.watch(mock.anything(), mock.anything(), mock.anything(), mock.anything()),
            ).thenCall(() => {
                resolve(new AbortController());
            });
        });
        listObj.items = list2;
        const error = new Error('Gone') as Error & { statusCode: number | undefined };
        error.statusCode = 410;
        await doneHandler(error);
        await promise;
        expect(addObjects).to.deep.equal(list);
        expect(updateObjects).to.deep.equal(list2);
        expect(deleteObjects).to.deep.equal([
            {
                metadata: {
                    name: 'name2',
                    resourceVersion: '8765',
                } as V1ObjectMeta,
            } as V1Namespace,
        ]);
    });

    it('should perform namespace caching', async () => {
        const fakeWatch = mock.mock(Watch);
        const list: V1Pod[] = [
            {
                metadata: {
                    name: 'name1',
                    namespace: 'ns1',
                } as V1ObjectMeta,
            } as V1Pod,
            {
                metadata: {
                    name: 'name2',
                    namespace: 'ns2',
                } as V1ObjectMeta,
            } as V1Pod,
        ];
        const listObj = {
            metadata: {
                resourceVersion: '12345',
            } as V1ListMeta,
            items: list,
        } as V1PodList;

        const listFn: ListPromise<V1Pod> = function (): Promise<V1PodList> {
            return new Promise<V1PodList>((resolve, reject) => {
                resolve(listObj);
            });
        };
        const promise = new Promise((resolve) => {
            mock.when(
                fakeWatch.watch(mock.anything(), mock.anything(), mock.anything(), mock.anything()),
            ).thenCall(() => {
                resolve(new AbortController());
            });
        });
        const cache = new ListWatch('/some/path', mock.instance(fakeWatch), listFn);
        await promise;
        const [pathOut, , watchHandler] = mock.capture(fakeWatch.watch).last();
        expect(pathOut).to.equal('/some/path');
        expect(cache.list()).to.deep.equal(list);

        expect(cache.list('ns1').length).to.equal(1);
        expect(cache.list('ns1')[0].metadata!.name).to.equal('name1');

        expect(cache.list('ns2').length).to.equal(1);
        expect(cache.list('ns2')[0].metadata!.name).to.equal('name2');

        watchHandler('ADDED', {
            metadata: {
                name: 'name3',
                namespace: 'ns3',
            } as V1ObjectMeta,
        } as V1Pod);

        expect(cache.list().length).to.equal(3);
        expect(cache.get('name3', 'ns3')).to.not.equal(null);

        watchHandler('MODIFIED', {
            metadata: {
                name: 'name3',
                namespace: 'ns3',
                resourceVersion: 'baz',
            } as V1ObjectMeta,
        } as V1Pod);
        expect(cache.list().length).to.equal(3);
        const obj3 = cache.get('name3', 'ns3');
        expect(obj3).to.not.equal(null);
        if (obj3) {
            expect(obj3.metadata!.name).to.equal('name3');
            expect(obj3.metadata!.resourceVersion).to.equal('baz');
        }

        watchHandler('DELETED', {
            metadata: {
                name: 'name2',
                namespace: 'other-ns',
            } as V1ObjectMeta,
        } as V1Pod);
        expect(cache.list().length).to.equal(3);
        expect(cache.get('name2')).to.not.equal(null);

        watchHandler('DELETED', {
            metadata: {
                name: 'name2',
                namespace: 'ns2',
            } as V1ObjectMeta,
        } as V1Pod);
        expect(cache.list().length).to.equal(2);
        expect(cache.list('ns2').length).to.equal(0);
        expect(cache.get('name2', 'ns2')).to.equal(undefined);
    });

    it('should perform non-namespace caching', async () => {
        const fakeWatch = mock.mock(Watch);
        const list: V1Namespace[] = [
            {
                metadata: {
                    name: 'name1',
                } as V1ObjectMeta,
            } as V1Namespace,
            {
                metadata: {
                    name: 'name2',
                } as V1ObjectMeta,
            } as V1Namespace,
        ];
        const listObj = {
            metadata: {
                resourceVersion: '12345',
            } as V1ListMeta,
            items: list,
        } as V1NamespaceList;

        const listFn: ListPromise<V1Namespace> = function (): Promise<V1NamespaceList> {
            return new Promise<V1NamespaceList>((resolve, reject) => {
                resolve(listObj);
            });
        };
        const promise = new Promise((resolve) => {
            mock.when(
                fakeWatch.watch(mock.anything(), mock.anything(), mock.anything(), mock.anything()),
            ).thenCall(() => {
                resolve(new AbortController());
            });
        });
        const cache = new ListWatch('/some/path', mock.instance(fakeWatch), listFn);
        await promise;
        const [pathOut, , watchHandler] = mock.capture(fakeWatch.watch).last();
        expect(pathOut).to.equal('/some/path');
        expect(cache.list()).to.deep.equal(list);
        expect(cache.get('name1')).to.not.equal(null);
        expect(cache.get('name2')).to.not.equal(null);

        expect(cache.list('ns1')).to.deep.equal([]);

        watchHandler('ADDED', {
            metadata: {
                name: 'name3',
            } as V1ObjectMeta,
        } as V1Namespace);

        expect(cache.list().length).to.equal(3);
        expect(cache.get('name3')).to.not.equal(null);

        watchHandler('MODIFIED', {
            metadata: {
                name: 'name3',
                resourceVersion: 'baz',
            } as V1ObjectMeta,
        } as V1Namespace);
        expect(cache.list().length).to.equal(3);
        const obj3 = cache.get('name3');
        expect(obj3).to.not.equal(null);
        if (obj3) {
            expect(obj3.metadata!.name).to.equal('name3');
            expect(obj3.metadata!.resourceVersion).to.equal('baz');
        }

        watchHandler('DELETED', {
            metadata: {
                name: 'name2',
            } as V1ObjectMeta,
        } as V1Namespace);
        expect(cache.list().length).to.equal(2);
        expect(cache.get('name2', 'ns2')).to.equal(undefined);
    });

    it('should delete an object correctly', () => {
        const list: V1Pod[] = [
            {
                metadata: {
                    name: 'name1',
                    namespace: 'ns1',
                } as V1ObjectMeta,
            } as V1Pod,
            {
                metadata: {
                    name: 'name2',
                    namespace: 'ns2',
                } as V1ObjectMeta,
            } as V1Pod,
        ];
        const objs: CacheMap<V1Pod> = new Map();
        list.forEach((elt: V1Pod) => {
            addOrUpdateObject(objs, elt);
        });
        deleteObject(objs, {
            metadata: {
                name: 'other',
                namespace: 'ns1',
            },
        } as V1Pod);
        expect(objs.size).to.equal(2);
        deleteObject(objs, {
            metadata: {
                name: 'name1',
                namespace: 'ns2',
            },
        } as V1Pod);
        expect(objs.size).to.equal(2);
        deleteObject(objs, {
            metadata: {
                name: 'name1',
                namespace: 'ns1',
            },
        } as V1Pod);
        expect(objs.size).to.equal(1);
    });

    it('should not call handlers which have been unregistered', async () => {
        const fakeWatch = mock.mock(Watch);
        const list: V1Namespace[] = [];
        const listObj = {
            metadata: {
                resourceVersion: '12345',
            } as V1ListMeta,
            items: list,
        } as V1NamespaceList;
        const listFn: ListPromise<V1Namespace> = function (): Promise<V1NamespaceList> {
            return new Promise<V1NamespaceList>((resolve) => {
                resolve(listObj);
            });
        };
        const watchCalled = new Promise((resolve) => {
            mock.when(
                fakeWatch.watch(mock.anything(), mock.anything(), mock.anything(), mock.anything()),
            ).thenCall(resolve);
        });
        const informer = new ListWatch('/some/path', mock.instance(fakeWatch), listFn);

        const addedList1: V1Namespace[] = [];
        const addToList1Fn = function (obj?: V1Namespace) {
            addedList1.push(obj!);
        };
        const addedList2: V1Namespace[] = [];
        const addToList2Fn = function (obj?: V1Namespace) {
            addedList2.push(obj!);
        };

        informer.start();

        await watchCalled;
        const [, , watchHandler] = mock.capture(fakeWatch.watch).last();

        informer.on('add', addToList1Fn);
        informer.on('add', addToList2Fn);

        watchHandler('ADDED', {
            metadata: {
                name: 'name1',
            } as V1ObjectMeta,
        } as V1Namespace);

        informer.off('add', addToList2Fn);

        watchHandler('ADDED', {
            metadata: {
                name: 'name2',
            } as V1ObjectMeta,
        } as V1Namespace);

        expect(addedList1.length).to.equal(2);
        expect(addedList2.length).to.equal(1);
    });

    it('mutating handlers in a callback should not affect those which remain', async () => {
        const fakeWatch = mock.mock(Watch);
        const list: V1Namespace[] = [];
        const listObj = {
            metadata: {
                resourceVersion: '12345',
            } as V1ListMeta,
            items: list,
        } as V1NamespaceList;
        const listFn: ListPromise<V1Namespace> = function (): Promise<V1NamespaceList> {
            return new Promise<V1NamespaceList>((resolve) => {
                resolve(listObj);
            });
        };
        const watchCalled = new Promise((resolve) => {
            mock.when(
                fakeWatch.watch(mock.anything(), mock.anything(), mock.anything(), mock.anything()),
            ).thenCall(resolve);
        });
        const informer = new ListWatch('/some/path', mock.instance(fakeWatch), listFn);

        const addedList: V1Namespace[] = [];
        const addToListFn = function (obj?: V1Namespace) {
            addedList.push(obj!);
        };
        const removeSelf = function () {
            informer.off('add', removeSelf);
        };

        informer.start();

        await watchCalled;
        const [, , watchHandler] = mock.capture(fakeWatch.watch).last();

        informer.on('add', removeSelf);
        informer.on('add', addToListFn);

        watchHandler('ADDED', {
            metadata: {
                name: 'name1',
            } as V1ObjectMeta,
        } as V1Namespace);

        expect(addedList.length).to.equal(1);
    });

    it('should resolve start promise after seeding the cache', async () => {
        const fakeWatch = mock.mock(Watch);
        const list: V1Namespace[] = [
            {
                metadata: {
                    name: 'name1',
                } as V1ObjectMeta,
            } as V1Namespace,
            {
                metadata: {
                    name: 'name2',
                } as V1ObjectMeta,
            } as V1Namespace,
        ];
        const listObj = {
            metadata: {
                resourceVersion: '12345',
            } as V1ListMeta,
            items: list,
        } as V1NamespaceList;

        const listFn: ListPromise<V1Namespace> = function (): Promise<V1NamespaceList> {
            return new Promise<V1NamespaceList>((resolve) => {
                // setImmediate will defer the resolve to the next message loop to keep the list from being immediately available
                setImmediate(() => {
                    resolve(listObj);
                });
            });
        };
        const cache = new ListWatch('/some/path', mock.instance(fakeWatch), listFn, false);
        const startPromise: Promise<void> = cache.start();
        expect(cache.list().length).to.equal(0);
        await startPromise;
        expect(cache.list().length).to.equal(2);
    });

    it('should only call update handlers once', async () => {
        const fakeWatch = mock.mock(Watch);
        const list: V1Namespace[] = [];
        const listObj = {
            metadata: {
                resourceVersion: '12345',
            } as V1ListMeta,
            items: list,
        } as V1NamespaceList;
        const listFn: ListPromise<V1Namespace> = function (): Promise<V1NamespaceList> {
            return new Promise<V1NamespaceList>((resolve) => {
                resolve(listObj);
            });
        };
        const watchCalled = new Promise((resolve) => {
            mock.when(
                fakeWatch.watch(mock.anything(), mock.anything(), mock.anything(), mock.anything()),
            ).thenCall(resolve);
        });
        const informer = new ListWatch('/some/path', mock.instance(fakeWatch), listFn);

        const addedList1: V1Namespace[] = [];
        const addToList1Fn = function (obj?: V1Namespace) {
            addedList1.push(obj!);
        };
        const addedList2: V1Namespace[] = [];
        const addToList2Fn = function (obj?: V1Namespace) {
            addedList2.push(obj!);
        };

        informer.start();

        await watchCalled;
        const [, , watchHandler] = mock.capture(fakeWatch.watch).last();

        let adds = 0;
        informer.on('add', () => adds++);
        informer.on('add', addToList1Fn);
        informer.on('add', addToList2Fn);

        watchHandler('ADDED', {
            metadata: {
                name: 'name1',
                namespace: 'something',
            } as V1ObjectMeta,
        } as V1Namespace);

        informer.off('add', addToList2Fn);

        watchHandler('ADDED', {
            metadata: {
                name: 'name2',
                namespace: 'something',
            } as V1ObjectMeta,
        } as V1Namespace);

        expect(adds).to.equal(2);
        expect(addedList1.length).to.equal(2);
        expect(addedList2.length).to.equal(1);
    });

    it('should not auto-restart after explicitly stopping until restarted again', async () => {
        const fakeWatch = mock.mock(Watch);
        const list: V1Pod[] = [
            {
                metadata: {
                    name: 'name1',
                    namespace: 'ns1',
                } as V1ObjectMeta,
            } as V1Pod,
            {
                metadata: {
                    name: 'name2',
                    namespace: 'ns2',
                } as V1ObjectMeta,
            } as V1Pod,
        ];
        const listObj = {
            metadata: {
                resourceVersion: '12345',
            } as V1ListMeta,
            items: list,
        } as V1NamespaceList;

        const listFn: ListPromise<V1Namespace> = function (): Promise<V1NamespaceList> {
            return new Promise<V1NamespaceList>((resolve, reject) => {
                resolve(listObj);
            });
        };
        const promise = new Promise((resolve) => {
            mock.when(
                fakeWatch.watch(mock.anything(), mock.anything(), mock.anything(), mock.anything()),
            ).thenCall(() => {
                resolve(new AbortController());
            });
        });

        const cache = new ListWatch('/some/path', mock.instance(fakeWatch), listFn);
        await promise;

        const [, , , doneHandler] = mock.capture(fakeWatch.watch).last();

        // stop the informer
        cache.stop();

        await doneHandler(null);

        mock.verify(
            fakeWatch.watch(mock.anything(), mock.anything(), mock.anything(), mock.anything()),
        ).once();

        // restart the informer
        await cache.start();

        mock.verify(
            fakeWatch.watch(mock.anything(), mock.anything(), mock.anything(), mock.anything()),
        ).twice();
    });

    it('does not auto-restart after an error', async () => {
        const fakeWatch = mock.mock(Watch);
        const list: V1Pod[] = [
            {
                metadata: {
                    name: 'name1',
                    namespace: 'ns1',
                } as V1ObjectMeta,
            } as V1Pod,
            {
                metadata: {
                    name: 'name2',
                    namespace: 'ns2',
                } as V1ObjectMeta,
            } as V1Pod,
        ];
        const listObj = {
            metadata: {
                resourceVersion: '12345',
            } as V1ListMeta,
            items: list,
        } as V1NamespaceList;

        const listFn: ListPromise<V1Namespace> = function (): Promise<V1NamespaceList> {
            return new Promise<V1NamespaceList>((resolve, reject) => {
                resolve(listObj);
            });
        };
        const promise = new Promise((resolve) => {
            mock.when(
                fakeWatch.watch(mock.anything(), mock.anything(), mock.anything(), mock.anything()),
            ).thenCall(() => {
                resolve(new AbortController());
            });
        });

        const cache = new ListWatch('/some/path', mock.instance(fakeWatch), listFn);
        await promise;

        let errorEmitted = false;
        cache.on('error', () => (errorEmitted = true));

        const [, , , doneHandler] = mock.capture(fakeWatch.watch).last();

        const error = new Error('testing');
        await doneHandler(error);

        mock.verify(
            fakeWatch.watch(mock.anything(), mock.anything(), mock.anything(), mock.anything()),
        ).once();
        expect(errorEmitted).to.equal(true);
    });

    it('should not re-list if the watch can be restarted from the latest resourceVersion', async () => {
        let listCalls = 0;
        const fakeWatch = mock.mock(Watch);
        const list: V1Namespace[] = [];
        const listObj = {
            metadata: {
                resourceVersion: '12345',
            } as V1ListMeta,
            items: list,
        } as V1NamespaceList;

        const listFn: ListPromise<V1Namespace> = function (): Promise<V1NamespaceList> {
            return new Promise<V1NamespaceList>((resolve) => {
                listCalls++;
                resolve(listObj);
            });
        };
        let promise = new Promise((resolve) => {
            mock.when(
                fakeWatch.watch(mock.anything(), mock.anything(), mock.anything(), mock.anything()),
            ).thenCall(() => {
                resolve(new AbortController());
            });
        });
        const informer = new ListWatch('/some/path', mock.instance(fakeWatch), listFn, false);

        informer.start();
        await promise;

        const [, , watchHandler] = mock.capture(fakeWatch.watch).last();
        watchHandler(
            'ADDED',
            {
                metadata: {
                    name: 'name3',
                } as V1ObjectMeta,
            } as V1Namespace,
            { metadata: { resourceVersion: '23456' } },
        );

        await informer.stop();
        promise = new Promise((resolve) => {
            mock.when(
                fakeWatch.watch(mock.anything(), mock.anything(), mock.anything(), mock.anything()),
            ).thenCall(() => {
                resolve(new AbortController());
            });
        });
        informer.start();
        await promise;
        expect(listCalls).to.be.equal(1);
    });

    it('should list if the watch cannot be restarted from the latest resourceVersion', async () => {
        const fakeWatch = mock.mock(Watch);
        const list: V1Pod[] = [];
        const listObj = {
            metadata: {
                resourceVersion: '12345',
            } as V1ListMeta,
            items: list,
        } as V1NamespaceList;

        let listCalls = 0;
        const listFn: ListPromise<V1Namespace> = function (): Promise<V1NamespaceList> {
            return new Promise<V1NamespaceList>((resolve) => {
                listCalls++;
                resolve(listObj);
            });
        };
        let promise = new Promise((resolve) => {
            mock.when(
                fakeWatch.watch(mock.anything(), mock.anything(), mock.anything(), mock.anything()),
            ).thenCall(() => {
                resolve(new AbortController());
            });
        });

        const informer = new ListWatch('/some/path', mock.instance(fakeWatch), listFn, false);

        informer.start();
        await promise;

        const [, , watchHandler] = mock.capture(fakeWatch.watch).last();
        watchHandler(
            'ADDED',
            {
                metadata: {
                    name: 'name3',
                } as V1ObjectMeta,
            } as V1Namespace,
            { metadata: { resourceVersion: '23456' } },
        );

        await informer.stop();

        let errorEmitted = false;
        informer.on('error', () => (errorEmitted = true));

        promise = new Promise((resolve) => {
            mock.when(
                fakeWatch.watch(mock.anything(), mock.anything(), mock.anything(), mock.anything()),
            ).thenCall(() => {
                resolve(new AbortController());
            });
        });

        informer.start();
        await promise;

        const [, , , doneHandler] = mock.capture(fakeWatch.watch).last();

        const error = new Error('Gone') as Error & { statusCode: number | undefined };
        error.statusCode = 410;
        await doneHandler(error);

        mock.verify(
            fakeWatch.watch(mock.anything(), mock.anything(), mock.anything(), mock.anything()),
        ).thrice();
        expect(errorEmitted).to.equal(false);
        expect(listCalls).to.be.equal(2);
    });

    it('should list if the watch cannot be restarted from the latest resourceVersion with an ERROR event', async () => {
        const fakeWatch = mock.mock(Watch);
        const list: V1Pod[] = [];
        const listObj = {
            metadata: {
                resourceVersion: '12345',
            } as V1ListMeta,
            items: list,
        } as V1NamespaceList;

        let listCalls = 0;
        const listFn: ListPromise<V1Namespace> = function (): Promise<V1NamespaceList> {
            return new Promise<V1NamespaceList>((resolve) => {
                listCalls++;
                resolve(listObj);
            });
        };
        let promise = new Promise((resolve) => {
            mock.when(
                fakeWatch.watch(mock.anything(), mock.anything(), mock.anything(), mock.anything()),
            ).thenCall(() => {
                resolve(new AbortController());
            });
        });

        const informer = new ListWatch('/some/path', mock.instance(fakeWatch), listFn, false);

        informer.start();
        await promise;

        const [, , watchHandler] = mock.capture(fakeWatch.watch).last();
        watchHandler(
            'ADDED',
            {
                metadata: {
                    name: 'name3',
                } as V1ObjectMeta,
            } as V1Namespace,
            { metadata: { resourceVersion: '23456' } },
        );

        await informer.stop();

        let errorEmitted = false;
        informer.on('error', () => (errorEmitted = true));

        promise = new Promise((resolve) => {
            mock.when(
                fakeWatch.watch(mock.anything(), mock.anything(), mock.anything(), mock.anything()),
            ).thenCall(() => {
                resolve(new AbortController());
            });
        });

        informer.start();
        await promise;

        const [, , watchHandler2, doneHandler] = mock.capture(fakeWatch.watch).last();
        watchHandler2('ERROR', {
            code: 410,
        });
        doneHandler(undefined);
        mock.verify(
            fakeWatch.watch(mock.anything(), mock.anything(), mock.anything(), mock.anything()),
        ).twice();
        expect(errorEmitted).to.equal(false);
        expect(listCalls).to.be.equal(2);
    });

    it('should send label selector', async () => {
        const APP_LABEL_SELECTOR = 'app=foo';

        const list: V1Namespace[] = [
            {
                metadata: {
                    name: 'name1',
                    labels: {
                        app: 'foo',
                    },
                } as V1ObjectMeta,
            } as V1Namespace,
            {
                metadata: {
                    name: 'name2',
                    labels: {
                        app: 'foo',
                    },
                } as V1ObjectMeta,
            } as V1Namespace,
        ];
        const listObj = {
            metadata: {
                resourceVersion: '12345',
            } as V1ListMeta,
            items: list,
        } as V1NamespaceList;

        const listFn: ListPromise<V1Namespace> = function (): Promise<V1NamespaceList> {
            return new Promise<V1NamespaceList>((resolve, reject) => {
                resolve(listObj);
            });
        };

        const kc = new KubeConfig();
        Object.assign(kc, fakeConfig);
        const watch = new Watch(kc);

        const path = '/some/path';

        const informer = new ListWatch(path, watch, listFn, false, APP_LABEL_SELECTOR);

        const scope = nock(fakeConfig.clusters[0].server);
        const s = scope
            .get(path)
            .query({
                watch: true,
                resourceVersion: '12345',
                labelSelector: APP_LABEL_SELECTOR,
            })
            .reply(
                200,
                () =>
                    JSON.stringify({
                        type: 'ADDED',
                        object: {
                            metadata: {
                                name: 'name3',
                                labels: {
                                    app: 'foo3',
                                },
                            } as V1ObjectMeta,
                        },
                    }) + '\n',
            );

        await informer.start();

        let doneResolve: any;
        const donePromise = new Promise((resolve) => {
            doneResolve = resolve;
        });

        informer.on('add', doneResolve);

        const value = await donePromise;

        expect(value).to.deep.equal({
            metadata: {
                labels: {
                    app: 'foo3',
                },
                name: 'name3',
            },
        });

        s.done();
    });
});

describe('delete items', () => {
    it('should remove correctly', () => {
        const listA: V1Pod[] = [
            {
                metadata: {
                    name: 'name1',
                    namespace: 'ns1',
                } as V1ObjectMeta,
            } as V1Pod,
            {
                metadata: {
                    name: 'name2',
                    namespace: 'ns2',
                } as V1ObjectMeta,
            } as V1Pod,
        ];
        const listB: V1Pod[] = [
            {
                metadata: {
                    name: 'name1',
                    namespace: 'ns1',
                } as V1ObjectMeta,
            } as V1Pod,
            {
                metadata: {
                    name: 'name3',
                    namespace: 'ns3',
                } as V1ObjectMeta,
            } as V1Pod,
        ];
        const expected: V1Pod[] = [
            {
                metadata: {
                    name: 'name2',
                    namespace: 'ns2',
                } as V1ObjectMeta,
            } as V1Pod,
        ];
        const pods: V1Pod[] = [];

        const objs: CacheMap<V1Pod> = new Map();
        listA.forEach((elt) => {
            addOrUpdateObject(objs, elt);
        });

        deleteItems(objs, listB, [(obj?: V1Pod) => pods.push(obj!)]);
        expect(pods).to.deep.equal(expected);
    });

    it('should call the connect handler', async () => {
        const fakeWatch = mock.mock(Watch);
        const listObj = {
            metadata: {
                resourceVersion: '12345',
            } as V1ListMeta,
            items: [],
        } as V1NamespaceList;

        const listFn: ListPromise<V1Namespace> = function (): Promise<V1NamespaceList> {
            return new Promise<V1NamespaceList>((resolve, reject) => {
                resolve(listObj);
            });
        };
        const informer = new ListWatch('/some/path', mock.instance(fakeWatch), listFn, false);
        const connectPromise = new Promise<boolean>((resolve: (boolean) => void) => {
            informer.on('connect', (obj?: V1Namespace) => {
                resolve(true);
            });
        });
        informer.start();

        expect(connectPromise).to.eventually.be.true;
    });

    it('does calls connect after a restart after an error', async () => {
        const fakeWatch = mock.mock(Watch);
        const list: V1Pod[] = [
            {
                metadata: {
                    name: 'name1',
                    namespace: 'ns1',
                } as V1ObjectMeta,
            } as V1Pod,
            {
                metadata: {
                    name: 'name2',
                    namespace: 'ns2',
                } as V1ObjectMeta,
            } as V1Pod,
        ];
        const listObj = {
            metadata: {
                resourceVersion: '12345',
            } as V1ListMeta,
            items: list,
        } as V1NamespaceList;

        const listFn: ListPromise<V1Namespace> = function (): Promise<V1NamespaceList> {
            return new Promise<V1NamespaceList>((resolve, reject) => {
                resolve(listObj);
            });
        };
        const promise = new Promise((resolve) => {
            mock.when(
                fakeWatch.watch(mock.anything(), mock.anything(), mock.anything(), mock.anything()),
            ).thenCall(() => {
                resolve(new AbortController());
            });
        });

        const cache = new ListWatch('/some/path', mock.instance(fakeWatch), listFn);
        await promise;

        let errorEmitted = false;
        cache.on('error', () => (errorEmitted = true));

        const [, , , doneHandler] = mock.capture(fakeWatch.watch).last();

        const error = new Error('testing');
        await doneHandler(error);

        mock.verify(
            fakeWatch.watch(mock.anything(), mock.anything(), mock.anything(), mock.anything()),
        ).once();
        expect(errorEmitted).to.equal(true);

        const connectPromise = new Promise<boolean>((resolve: (boolean) => void) => {
            cache.on('connect', (obj?: V1Namespace) => {
                resolve(true);
            });
        });
        cache.start();

        expect(connectPromise).to.eventually.be.true;
    });
});
