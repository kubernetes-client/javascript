import { expect, use } from 'chai';
import chaiAsPromised = require('chai-as-promised');

import * as mock from 'ts-mockito';

import http = require('http');

import { V1Namespace, V1NamespaceList, V1ObjectMeta, V1Pod, V1ListMeta } from './api';
import { deleteObject, ListWatch, deleteItems } from './cache';
import { ListCallback, ADD, UPDATE, DELETE, ListPromise } from './informer';

use(chaiAsPromised);

import { Watch } from './watch';

describe('ListWatchCache', () => {
    it('should throw on unknown update', () => {
        const fake = mock.mock(Watch);
        const listFn: ListPromise<V1Namespace> = function(): Promise<{
            response: http.IncomingMessage;
            body: V1NamespaceList;
        }> {
            return new Promise<{ response: http.IncomingMessage; body: V1NamespaceList }>(
                (resolve, reject) => {
                    resolve({
                        response: {} as http.IncomingMessage,
                        body: {} as V1NamespaceList,
                    });
                },
            );
        };
        const lw = new ListWatch('/some/path', fake, listFn);
        const verb = 'FOOBAR';
        expect(() => lw.on(verb, (obj: V1Namespace) => {})).to.throw(`Unknown verb: ${verb}`);
    });

    it('should perform basic caching', async () => {
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

        const listFn: ListPromise<V1Namespace> = function(): Promise<{
            response: http.IncomingMessage;
            body: V1NamespaceList;
        }> {
            return new Promise<{ response: http.IncomingMessage; body: V1NamespaceList }>(
                (resolve, reject) => {
                    resolve({ response: {} as http.IncomingMessage, body: listObj });
                },
            );
        };
        const promise = new Promise((resolve) => {
            mock.when(
                fakeWatch.watch(
                    mock.anything(),
                    mock.anything(),
                    mock.anything(),
                    mock.anything(),
                    mock.anything(),
                ),
            ).thenCall(() => {
                resolve();
            });
        });
        const cache = new ListWatch('/some/path', mock.instance(fakeWatch), listFn);
        await promise;
        const [pathOut, , watchHandler] = mock.capture(fakeWatch.watch).last();
        expect(pathOut).to.equal('/some/path');
        expect(cache.list()).to.deep.equal(list);

        expect(cache.get('name1')).to.equal(list[0]);
        expect(cache.get('name2')).to.equal(list[1]);

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
        expect(cache.get('name2')).to.equal(undefined);
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

        const listFn: ListPromise<V1Namespace> = function(): Promise<{
            response: http.IncomingMessage;
            body: V1NamespaceList;
        }> {
            return new Promise<{ response: http.IncomingMessage; body: V1NamespaceList }>(
                (resolve, reject) => {
                    resolve({ response: {} as http.IncomingMessage, body: listObj });
                },
            );
        };
        const promise = new Promise((resolve) => {
            mock.when(
                fakeWatch.watch(
                    mock.anything(),
                    mock.anything(),
                    mock.anything(),
                    mock.anything(),
                    mock.anything(),
                ),
            ).thenCall(() => {
                resolve();
            });
        });
        const informer = new ListWatch('/some/path', mock.instance(fakeWatch), listFn);
        await promise;
        const [pathOut, , watchHandler] = mock.capture(fakeWatch.watch).last();
        expect(pathOut).to.equal('/some/path');

        const addPromise = new Promise<V1Namespace>((resolve: (V1Namespace) => void) => {
            informer.on(ADD, (obj: V1Namespace) => {
                resolve(obj);
            });
        });

        const updatePromise = new Promise<V1Namespace>((resolve: (V1Namespace) => void) => {
            informer.on(UPDATE, (obj: V1Namespace) => {
                resolve(obj);
            });
        });

        const deletePromise = new Promise<V1Namespace>((resolve: (V1Namespace) => void) => {
            informer.on(DELETE, (obj: V1Namespace) => {
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
            expect(addPromise)
                .to.eventually.have.property('metadata')
                .that.deep.equals({ name: 'name3' }),
            expect(updatePromise)
                .to.eventually.have.property('metadata')
                .that.deep.equals({ name: 'name3', resourceVersion: 'baz' }),
            expect(deletePromise)
                .to.eventually.have.property('metadata')
                .that.deep.equals({ name: 'name2' }),
        ]);
    });

    it('should perform work as an informer with multiple handlers', async () => {
        const fakeWatch = mock.mock(Watch);
        const listObj = {
            metadata: {
                resourceVersion: '12345',
            } as V1ListMeta,
            items: [],
        } as V1NamespaceList;

        const listFn: ListPromise<V1Namespace> = function(): Promise<{
            response: http.IncomingMessage;
            body: V1NamespaceList;
        }> {
            return new Promise<{ response: http.IncomingMessage; body: V1NamespaceList }>(
                (resolve, reject) => {
                    resolve({ response: {} as http.IncomingMessage, body: listObj });
                },
            );
        };
        const promise = new Promise((resolve) => {
            mock.when(
                fakeWatch.watch(
                    mock.anything(),
                    mock.anything(),
                    mock.anything(),
                    mock.anything(),
                    mock.anything(),
                ),
            ).thenCall(() => {
                resolve();
            });
        });
        const informer = new ListWatch('/some/path', mock.instance(fakeWatch), listFn);
        await promise;
        const [pathOut, , watchHandler] = mock.capture(fakeWatch.watch).last();
        expect(pathOut).to.equal('/some/path');

        const addPromise = new Promise<V1Namespace>((resolve: (V1Namespace) => void) => {
            informer.on(ADD, (obj: V1Namespace) => {
                resolve(obj);
            });
        });

        const addPromise2 = new Promise<V1Namespace>((resolve: (V1Namespace) => void) => {
            informer.on(ADD, (obj: V1Namespace) => {
                resolve(obj);
            });
        });

        watchHandler('ADDED', {
            metadata: {
                name: 'name3',
            } as V1ObjectMeta,
        } as V1Namespace);

        return Promise.all([
            expect(addPromise)
                .to.eventually.have.property('metadata')
                .that.deep.equals({ name: 'name3' }),
            expect(addPromise2)
                .to.eventually.have.property('metadata')
                .that.deep.equals({ name: 'name3' }),
        ]);
    });

    it('should perform work as an informer with initial list', async () => {
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

        const listFn: ListPromise<V1Namespace> = function(): Promise<{
            response: http.IncomingMessage;
            body: V1NamespaceList;
        }> {
            return new Promise<{ response: http.IncomingMessage; body: V1NamespaceList }>(
                (resolve, reject) => {
                    resolve({ response: {} as http.IncomingMessage, body: listObj });
                },
            );
        };
        let promise = new Promise((resolve) => {
            mock.when(
                fakeWatch.watch(
                    mock.anything(),
                    mock.anything(),
                    mock.anything(),
                    mock.anything(),
                    mock.anything(),
                ),
            ).thenCall(() => {
                resolve();
            });
        });
        const informer = new ListWatch('/some/path', mock.instance(fakeWatch), listFn, false);

        const addObjects: V1Namespace[] = [];
        informer.on(ADD, (obj: V1Namespace) => addObjects.push(obj));
        const updateObjects: V1Namespace[] = [];
        informer.on(UPDATE, (obj: V1Namespace) => updateObjects.push(obj));

        informer.start();
        await promise;
        const [pathOut, , , doneHandler] = mock.capture(fakeWatch.watch).last();

        expect(pathOut).to.equal('/some/path');
        expect(addObjects).to.deep.equal(list);
        expect(updateObjects).to.deep.equal([]);

        promise = new Promise((resolve) => {
            mock.when(
                fakeWatch.watch(
                    mock.anything(),
                    mock.anything(),
                    mock.anything(),
                    mock.anything(),
                    mock.anything(),
                ),
            ).thenCall(() => {
                resolve();
            });
        });
        doneHandler();
        await promise;
        expect(addObjects).to.deep.equal(list);
        expect(updateObjects).to.deep.equal(list);
    });

    it('should perform work as an informer with initial list and delete after', async () => {
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
        const list2: V1Namespace[] = [
            {
                metadata: {
                    name: 'name1',
                } as V1ObjectMeta,
            } as V1Namespace,
        ];
        const listObj = {
            metadata: {
                resourceVersion: '12345',
            } as V1ListMeta,
            items: list,
        } as V1NamespaceList;

        const listFn: ListPromise<V1Namespace> = function(): Promise<{
            response: http.IncomingMessage;
            body: V1NamespaceList;
        }> {
            return new Promise<{ response: http.IncomingMessage; body: V1NamespaceList }>(
                (resolve, reject) => {
                    resolve({ response: {} as http.IncomingMessage, body: listObj });
                },
            );
        };
        let promise = new Promise((resolve) => {
            mock.when(
                fakeWatch.watch(
                    mock.anything(),
                    mock.anything(),
                    mock.anything(),
                    mock.anything(),
                    mock.anything(),
                ),
            ).thenCall(() => {
                resolve();
            });
        });
        const informer = new ListWatch('/some/path', mock.instance(fakeWatch), listFn, false);

        const addObjects: V1Namespace[] = [];
        informer.on(ADD, (obj: V1Namespace) => addObjects.push(obj));
        const updateObjects: V1Namespace[] = [];
        informer.on(UPDATE, (obj: V1Namespace) => updateObjects.push(obj));
        const deleteObjects: V1Namespace[] = [];
        informer.on(DELETE, (obj: V1Namespace) => deleteObjects.push(obj));
        informer.start();
        await promise;
        const [pathOut, , , doneHandler] = mock.capture(fakeWatch.watch).last();

        expect(pathOut).to.equal('/some/path');
        expect(addObjects).to.deep.equal(list);
        expect(updateObjects).to.deep.equal([]);

        promise = new Promise((resolve) => {
            mock.when(
                fakeWatch.watch(
                    mock.anything(),
                    mock.anything(),
                    mock.anything(),
                    mock.anything(),
                    mock.anything(),
                ),
            ).thenCall(() => {
                resolve();
            });
        });
        listObj.items = list2;
        doneHandler();
        await promise;
        expect(addObjects).to.deep.equal(list);
        expect(updateObjects).to.deep.equal(list2);
        expect(deleteObjects).to.deep.equal([
            {
                metadata: {
                    name: 'name2',
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
        } as V1NamespaceList;

        const listFn: ListPromise<V1Namespace> = function(): Promise<{
            response: http.IncomingMessage;
            body: V1NamespaceList;
        }> {
            return new Promise<{ response: http.IncomingMessage; body: V1NamespaceList }>(
                (resolve, reject) => {
                    resolve({ response: {} as http.IncomingMessage, body: listObj });
                },
            );
        };
        const promise = new Promise((resolve) => {
            mock.when(
                fakeWatch.watch(
                    mock.anything(),
                    mock.anything(),
                    mock.anything(),
                    mock.anything(),
                    mock.anything(),
                ),
            ).thenCall(() => {
                resolve();
            });
        });
        const cache = new ListWatch('/some/path', mock.instance(fakeWatch), listFn);
        await promise;
        const [pathOut, , watchHandler] = mock.capture(fakeWatch.watch).last();
        expect(pathOut).to.equal('/some/path');
        expect(cache.list()).to.deep.equal(list);

        expect(cache.get('name1')).to.equal(list[0]);
        expect(cache.get('name2')).to.equal(list[1]);

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
        deleteObject(list, {
            metadata: {
                name: 'other',
                namespace: 'ns1',
            },
        } as V1Pod);
        expect(list.length).to.equal(2);
        deleteObject(list, {
            metadata: {
                name: 'name1',
                namespace: 'ns2',
            },
        } as V1Pod);
        expect(list.length).to.equal(2);
        deleteObject(list, {
            metadata: {
                name: 'name1',
                namespace: 'ns1',
            },
        } as V1Pod);
        expect(list.length).to.equal(1);
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
        const listFn: ListPromise<V1Namespace> = function(): Promise<{
            response: http.IncomingMessage;
            body: V1NamespaceList;
        }> {
            return new Promise<{ response: http.IncomingMessage; body: V1NamespaceList }>((resolve) => {
                resolve({ response: {} as http.IncomingMessage, body: listObj });
            });
        };
        const watchCalled = new Promise((resolve) => {
            mock.when(
                fakeWatch.watch(
                    mock.anything(),
                    mock.anything(),
                    mock.anything(),
                    mock.anything(),
                    mock.anything(),
                ),
            ).thenCall(resolve);
        });
        const informer = new ListWatch('/some/path', mock.instance(fakeWatch), listFn);

        const addedList1: V1Namespace[] = [];
        const addToList1Fn = function(obj: V1Namespace) {
            addedList1.push(obj);
        };
        const addedList2: V1Namespace[] = [];
        const addToList2Fn = function(obj: V1Namespace) {
            addedList2.push(obj);
        };

        informer.start();

        await watchCalled;
        const [, , watchHandler] = mock.capture(fakeWatch.watch).last();

        informer.on(ADD, addToList1Fn);
        informer.on(ADD, addToList2Fn);

        watchHandler('ADDED', {
            metadata: {
                name: 'name1',
            } as V1ObjectMeta,
        } as V1Namespace);

        informer.off(ADD, addToList2Fn);

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
        const listFn: ListPromise<V1Namespace> = function(): Promise<{
            response: http.IncomingMessage;
            body: V1NamespaceList;
        }> {
            return new Promise<{ response: http.IncomingMessage; body: V1NamespaceList }>((resolve) => {
                resolve({ response: {} as http.IncomingMessage, body: listObj });
            });
        };
        const watchCalled = new Promise((resolve) => {
            mock.when(
                fakeWatch.watch(
                    mock.anything(),
                    mock.anything(),
                    mock.anything(),
                    mock.anything(),
                    mock.anything(),
                ),
            ).thenCall(resolve);
        });
        const informer = new ListWatch('/some/path', mock.instance(fakeWatch), listFn);

        const addedList: V1Namespace[] = [];
        const addToListFn = function(obj: V1Namespace) {
            addedList.push(obj);
        };
        const removeSelf = function() {
            informer.off(ADD, removeSelf);
        };

        informer.start();

        await watchCalled;
        const [, , watchHandler] = mock.capture(fakeWatch.watch).last();

        informer.on(ADD, removeSelf);
        informer.on(ADD, addToListFn);

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

        const listFn: ListPromise<V1Namespace> = function(): Promise<{
            response: http.IncomingMessage;
            body: V1NamespaceList;
        }> {
            return new Promise<{ response: http.IncomingMessage; body: V1NamespaceList }>((resolve) => {
                // setImmediate will defer the resolve to the next message loop to keep the list from being immediately available
                setImmediate(() => {
                    resolve({ response: {} as http.IncomingMessage, body: listObj });
                });
            });
        };
        const cache = new ListWatch('/some/path', mock.instance(fakeWatch), listFn, false);
        const startPromise: Promise<void> = cache.start();
        expect(cache.list().length).to.equal(0);
        await startPromise;
        expect(cache.list().length).to.equal(2);
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
                    name: 'name1',
                    namespace: 'ns1',
                } as V1ObjectMeta,
            } as V1Pod,
        ];

        const output = deleteItems(listA, listB);
        expect(output).to.deep.equal(expected);
    });

    it('should callback correctly', () => {
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

        deleteItems(listA, listB, [(obj: V1Pod) => pods.push(obj)]);
        expect(pods).to.deep.equal(expected);
    });
});
