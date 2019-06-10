import { Informer, ObjectCallback } from './informer';
import { KubernetesObject } from './types';
import { Watch } from './watch';

export interface ObjectCache<T> {
    get(name: string, namespace?: string): T | undefined;
    list(namespace?: string): ReadonlyArray<T>;
}

export type ListCallback<T extends KubernetesObject> = (list: T[], ResourceVersion: string) => void;

export class ListWatch<T extends KubernetesObject> implements ObjectCache<T>, Informer<T> {
    private objects: T[] = [];
    private readonly indexCache: { [key: string]: T[] } = {};
    private readonly callbackCache: { [key: string]: ObjectCallback<T> } = {};

    public constructor(
        private readonly path: string,
        private readonly watch: Watch,
        private readonly listFn: (callback: ListCallback<T>) => void,
    ) {
        this.watch = watch;
        this.listFn = listFn;
        this.doneHandler(null);
    }

    public on(verb: string, cb: ObjectCallback<T>) {
        this.callbackCache[verb] = cb;
    }

    public get(name: string, namespace?: string): T | undefined {
        return this.objects.find(
            (obj: T): boolean => {
                return obj.metadata!.name === name && (!namespace || obj.metadata!.namespace === namespace);
            },
        );
    }

    public list(namespace?: string | undefined): ReadonlyArray<T> {
        if (!namespace) {
            return this.objects;
        }
        return this.indexCache[namespace] as ReadonlyArray<T>;
    }

    private doneHandler(err: any) {
        this.listFn((result: T[], resourceVersion: string) => {
            this.objects = result;
            for (const elt of this.objects) {
                this.indexObj(elt);
            }
            this.watch.watch(this.path, { resourceVersion }, this.watchHandler.bind(this), this.doneHandler.bind(this));
        });
    }

    private indexObj(obj: T) {
        let namespaceList = this.indexCache[obj.metadata!.namespace!] as T[];
        if (!namespaceList) {
            namespaceList = [];
            this.indexCache[obj.metadata!.namespace!] = namespaceList;
        }
        addOrUpdateObject(namespaceList, obj, this.callbackCache['add'], this.callbackCache['update']);
    }

    private watchHandler(phase: string, obj: T) {
        switch (phase) {
            case 'ADDED':
            case 'MODIFIED':
                addOrUpdateObject(this.objects, obj,  this.callbackCache['add'], this.callbackCache['update']);
                if (obj.metadata!.namespace) {
                    this.indexObj(obj);
                }
                break;
            case 'DELETED':
                deleteObject(this.objects, obj, this.callbackCache['delete']);
                if (obj.metadata!.namespace) {
                    const namespaceList = this.indexCache[obj.metadata!.namespace!] as T[];
                    if (namespaceList) {
                        deleteObject(namespaceList, obj, this.callbackCache['delete']);
                    }
                }
                break;
        }
    }
}

// Only public for testing.
export function addOrUpdateObject<T extends KubernetesObject>(
    objects: T[], obj: T,
    addCallback: ObjectCallback<T>, updateCallback: ObjectCallback<T>) {
    const ix = findKubernetesObject(objects, obj);
    if (ix === -1) {
        objects.push(obj);
        addCallback(obj);
    } else {
        objects[ix] = obj;
        updateCallback(obj);
    }
}

function isSameObject<T extends KubernetesObject>(o1: T, o2: T): boolean {
    return o1.metadata!.name === o2.metadata!.name && o1.metadata!.namespace === o2.metadata!.namespace;
}

function findKubernetesObject<T extends KubernetesObject>(objects: T[], obj: T): number {
    return objects.findIndex((elt: T) => {
        return isSameObject(elt, obj);
    });
}

// Public for testing.
export function deleteObject<T extends KubernetesObject>(
    objects: T[], obj: T, deleteCallback: ObjectCallback<T>) {
    const ix = findKubernetesObject(objects, obj);
    if (ix !== -1) {
        objects.splice(ix, 1);
        deleteCallback(obj);
    }
}
