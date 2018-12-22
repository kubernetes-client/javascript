import { expect } from 'chai';
import * as mock from 'ts-mockito';

import { V1Namespace, V1ObjectMeta, V1Pod } from './api';
import { deleteObject, ListCallback, ListWatch } from './cache';
import { Watch } from './watch';

describe('ListWatchCache', () => {
    it('should perform basic caching', () => {
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
        const listFn = (callback: ListCallback<V1Namespace>) => {
            callback(list);
        };
        const cache = new ListWatch('/some/path', mock.instance(fakeWatch), listFn);
        const [pathOut, , watchHandler] = mock.capture(fakeWatch.watch).last();
        expect(pathOut).to.equal('/some/path');
        expect(cache.list()).to.deep.equal(list);

        expect(cache.get('name1')).to.equal(list[0]);
        expect(cache.get('name2')).to.equal(list[1]);

        watchHandler('ADDED',  {
            metadata: {
                name: 'name3',
            } as V1ObjectMeta,
        } as V1Namespace);

        expect(cache.list().length).to.equal(3);
        expect(cache.get('name3')).to.not.equal(null);

        watchHandler('MODIFIED',  {
            metadata: {
                name: 'name3',
                resourceVersion: 'baz',
            } as V1ObjectMeta,
        } as V1Namespace);
        expect(cache.list().length).to.equal(3);
        const obj3 = cache.get('name3');
        expect(obj3).to.not.equal(null);
        if (obj3) {
            expect(obj3.metadata.name).to.equal('name3');
            expect(obj3.metadata.resourceVersion).to.equal('baz');
        }

        watchHandler('DELETED', {
            metadata: {
                name: 'name2',
            } as V1ObjectMeta,
        } as V1Namespace);
        expect(cache.list().length).to.equal(2);
        expect(cache.get('name2')).to.equal(null);
    });

    it('should perform namespace caching', () => {
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
        const listFn = (callback: ListCallback<V1Pod>) => {
            callback(list);
        };
        const cache = new ListWatch('/some/path', mock.instance(fakeWatch), listFn);
        const [pathOut, , watchHandler] = mock.capture(fakeWatch.watch).last();
        expect(pathOut).to.equal('/some/path');
        expect(cache.list()).to.deep.equal(list);

        expect(cache.get('name1')).to.equal(list[0]);
        expect(cache.get('name2')).to.equal(list[1]);

        expect(cache.list('ns1').length).to.equal(1);
        expect(cache.list('ns1')[0].metadata.name).to.equal('name1');

        expect(cache.list('ns2').length).to.equal(1);
        expect(cache.list('ns2')[0].metadata.name).to.equal('name2');

        watchHandler('ADDED',  {
            metadata: {
                name: 'name3',
                namespace: 'ns3',
            } as V1ObjectMeta,
        } as V1Pod);

        expect(cache.list().length).to.equal(3);
        expect(cache.get('name3', 'ns3')).to.not.equal(null);

        watchHandler('MODIFIED',  {
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
            expect(obj3.metadata.name).to.equal('name3');
            expect(obj3.metadata.resourceVersion).to.equal('baz');
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
        expect(cache.get('name2', 'ns2')).to.equal(null);
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
});
