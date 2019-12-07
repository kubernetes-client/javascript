import { ADD, DELETE, Informer, ListPromise, ObjectCallback, UPDATE } from './informer';
import { KubernetesObject } from './types';
import { Watch } from './watch';

export interface ObjectCache<T> {
    get(name: string, namespace?: string): T | undefined;
    list(namespace?: string): ReadonlyArray<T>;
}

export class ListWatch<T extends KubernetesObject> implements ObjectCache<T>, Informer<T> {
    private objects: T[] = [];
    private readonly indexCache: { [key: string]: T[] } = {};
    private readonly callbackCache: { [key: string]: Array<ObjectCallback<T>> } = {};

    public constructor(
        private readonly path: string,
        private readonly watch: Watch,
        private readonly listFn: ListPromise<T>,
        autoStart: boolean = true,
    ) {
        this.watch = watch;
        this.listFn = listFn;
        this.callbackCache[ADD] = [];
        this.callbackCache[UPDATE] = [];
        this.callbackCache[DELETE] = [];
        if (autoStart) {
            this.doneHandler(null);
        }
    }

    public async start(): Promise<void> {
        await this.doneHandler(null);
    }

    public on(verb: string, cb: ObjectCallback<T>) {
        if (this.callbackCache[verb] === undefined) {
            throw new Error(`Unknown verb: ${verb}`);
        }
        this.callbackCache[verb].push(cb);
    }

    public off(verb: string, cb: ObjectCallback<T>) {
        if (this.callbackCache[verb] === undefined) {
            throw new Error(`Unknown verb: ${verb}`);
        }
        const indexToRemove: number = this.callbackCache[verb].findIndex(
            (cachedCb: ObjectCallback<T>) => cachedCb === cb,
        );
        if (indexToRemove === -1) {
            return;
        }
        this.callbackCache[verb].splice(indexToRemove, 1);
    }

    public get(name: string, namespace?: string): T | undefined {
        return this.objects.find((obj: T): boolean => {
            return obj.metadata!.name === name && (!namespace || obj.metadata!.namespace === namespace);
        });
    }

    public list(namespace?: string | undefined): ReadonlyArray<T> {
        if (!namespace) {
            return this.objects;
        }
        return this.indexCache[namespace] as ReadonlyArray<T>;
    }

    private async doneHandler(err: any) {
        const promise = this.listFn();
        const result = await promise;
        const list = result.body;
        deleteItems(this.objects, list.items, this.callbackCache[DELETE].slice());
        this.addOrUpdateItems(list.items);
        this.watch.watch(
            this.path,
            { resourceVersion: list.metadata!.resourceVersion },
            this.watchHandler.bind(this),
            this.doneHandler.bind(this),
        );
    }

    private addOrUpdateItems(items: T[]) {
        items.forEach((obj: T) => {
            addOrUpdateObject(
                this.objects,
                obj,
                this.callbackCache[ADD].slice(),
                this.callbackCache[UPDATE].slice(),
            );
            if (obj.metadata!.namespace) {
                this.indexObj(obj);
            }
        });
    }

    private indexObj(obj: T) {
        let namespaceList = this.indexCache[obj.metadata!.namespace!] as T[];
        if (!namespaceList) {
            namespaceList = [];
            this.indexCache[obj.metadata!.namespace!] = namespaceList;
        }
        addOrUpdateObject(namespaceList, obj);
    }

    private watchHandler(phase: string, obj: T) {
        switch (phase) {
            case 'ADDED':
            case 'MODIFIED':
                addOrUpdateObject(
                    this.objects,
                    obj,
                    this.callbackCache[ADD].slice(),
                    this.callbackCache[UPDATE].slice(),
                );
                if (obj.metadata!.namespace) {
                    this.indexObj(obj);
                }
                break;
            case 'DELETED':
                deleteObject(this.objects, obj, this.callbackCache[DELETE].slice());
                if (obj.metadata!.namespace) {
                    const namespaceList = this.indexCache[obj.metadata!.namespace!] as T[];
                    if (namespaceList) {
                        deleteObject(namespaceList, obj);
                    }
                }
                break;
        }
    }
}

// external for testing
export function deleteItems<T extends KubernetesObject>(
    oldObjects: T[],
    newObjects: T[],
    deleteCallback?: Array<ObjectCallback<T>>,
): T[] {
    return oldObjects.filter((obj: T) => {
        if (findKubernetesObject(newObjects, obj) === -1) {
            if (deleteCallback) {
                deleteCallback.forEach((fn: ObjectCallback<T>) => fn(obj));
            }
            return false;
        }
        return true;
    });
}

// Only public for testing.
export function addOrUpdateObject<T extends KubernetesObject>(
    objects: T[],
    obj: T,
    addCallback?: Array<ObjectCallback<T>>,
    updateCallback?: Array<ObjectCallback<T>>,
) {
    const ix = findKubernetesObject(objects, obj);
    if (ix === -1) {
        objects.push(obj);
        if (addCallback) {
            addCallback.forEach((elt: ObjectCallback<T>) => elt(obj));
        }
    } else {
        objects[ix] = obj;
        if (updateCallback) {
            updateCallback.forEach((elt: ObjectCallback<T>) => elt(obj));
        }
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
    objects: T[],
    obj: T,
    deleteCallback?: Array<ObjectCallback<T>>,
) {
    const ix = findKubernetesObject(objects, obj);
    if (ix !== -1) {
        objects.splice(ix, 1);
        if (deleteCallback) {
            deleteCallback.forEach((elt: ObjectCallback<T>) => elt(obj));
        }
    }
}
