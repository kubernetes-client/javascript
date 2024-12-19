import { ObjectSerializer } from './api';
import {
    ADD,
    CHANGE,
    CONNECT,
    DELETE,
    ERROR,
    ErrorCallback,
    Informer,
    ListPromise,
    ObjectCallback,
    UPDATE,
} from './informer';
import { KubernetesObject } from './types';
import { RequestResult, Watch } from './watch';

export interface ObjectCache<T> {
    get(name: string, namespace?: string): T | undefined;

    list(namespace?: string): ReadonlyArray<T>;
}

// exported for testing
export type CacheMap<T extends KubernetesObject> = Map<string, Map<string, T>>;

export class ListWatch<T extends KubernetesObject> implements ObjectCache<T>, Informer<T> {
    private objects: CacheMap<T> = new Map();
    private resourceVersion: string;
    private readonly callbackCache: {
        [key: string]: (ObjectCallback<T> | ErrorCallback)[];
    } = {};
    private request: RequestResult | undefined;
    private stopped: boolean = false;

    public constructor(
        private readonly path: string,
        private readonly watch: Watch,
        private readonly listFn: ListPromise<T>,
        autoStart: boolean = true,
        private readonly labelSelector?: string,
        private readonly fieldSelector?: string,
    ) {
        this.callbackCache[ADD] = [];
        this.callbackCache[UPDATE] = [];
        this.callbackCache[DELETE] = [];
        this.callbackCache[ERROR] = [];
        this.callbackCache[CONNECT] = [];
        this.resourceVersion = '';
        if (autoStart) {
            this.doneHandler(null);
        }
    }

    public async start(): Promise<void> {
        this.stopped = false;
        await this.doneHandler(null);
    }

    public async stop(): Promise<void> {
        this.stopped = true;
        this._stop();
    }

    public on(verb: ADD | UPDATE | DELETE | CHANGE, cb: ObjectCallback<T>): void;
    public on(verb: ERROR | CONNECT, cb: ErrorCallback): void;
    public on(
        verb: ADD | UPDATE | DELETE | CHANGE | ERROR | CONNECT,
        cb: ObjectCallback<T> | ErrorCallback,
    ): void {
        if (verb === CHANGE) {
            this.on(ADD, cb);
            this.on(UPDATE, cb);
            this.on(DELETE, cb);
            return;
        }
        if (this.callbackCache[verb] === undefined) {
            throw new Error(`Unknown verb: ${verb}`);
        }
        this.callbackCache[verb].push(cb);
    }

    public off(verb: ADD | UPDATE | DELETE | CHANGE, cb: ObjectCallback<T>): void;
    public off(verb: ERROR | CONNECT, cb: ErrorCallback): void;
    public off(
        verb: ADD | UPDATE | DELETE | CHANGE | ERROR | CONNECT,
        cb: ObjectCallback<T> | ErrorCallback,
    ): void {
        if (verb === CHANGE) {
            this.off(ADD, cb);
            this.off(UPDATE, cb);
            this.off(DELETE, cb);
            return;
        }
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
        const nsObjects = this.objects.get(namespace || '');
        if (nsObjects) {
            return nsObjects.get(name);
        }
        return undefined;
    }

    public list(namespace?: string | undefined): ReadonlyArray<T> {
        if (!namespace) {
            const allObjects: T[] = [];
            for (const nsObjects of this.objects.values()) {
                allObjects.push(...nsObjects.values());
            }
            return allObjects;
        }
        const namespaceObjects = this.objects.get(namespace || '');
        if (!namespaceObjects) {
            return [];
        }
        return Array.from(namespaceObjects.values());
    }

    public latestResourceVersion(): string {
        return this.resourceVersion;
    }

    private _stop(): void {
        if (this.request) {
            this.request.removeAllListeners('error');
            this.request.on('error', () => {
                // void - errors emitted post-abort are not relevant for us
            });
            this.request.abort();
            this.request = undefined;
        }
    }

    private async doneHandler(err: unknown): Promise<void> {
        this._stop();
        if (
            err &&
            ((err as { statusCode?: number }).statusCode === 410 || (err as { code?: number }).code === 410)
        ) {
            this.resourceVersion = '';
        } else if (err) {
            this.callbackCache[ERROR].forEach((elt: ErrorCallback) => elt(err));
            return;
        }
        if (this.stopped) {
            // do not auto-restart
            return;
        }
        this.callbackCache[CONNECT].forEach((elt: ErrorCallback) => elt(undefined));
        if (!this.resourceVersion) {
            const promise = this.listFn();
            const result = await promise;
            const list = result.body;
            this.objects = deleteItems(this.objects, list.items, this.callbackCache[DELETE].slice());
            this.addOrUpdateItems(list.items);
            this.resourceVersion = list.metadata!.resourceVersion || '';
        }
        const queryParams = {
            resourceVersion: this.resourceVersion,
        } as {
            resourceVersion: string | undefined;
            labelSelector: string | undefined;
            fieldSelector: string | undefined;
        };
        if (this.labelSelector !== undefined) {
            queryParams.labelSelector = ObjectSerializer.serialize(this.labelSelector, 'string');
        }
        if (this.fieldSelector !== undefined) {
            queryParams.fieldSelector = ObjectSerializer.serialize(this.fieldSelector, 'string');
        }
        this.request = await this.watch.watch(
            this.path,
            queryParams,
            this.watchHandler.bind(this),
            this.doneHandler.bind(this),
        );
    }

    private addOrUpdateItems(items: T[]): void {
        items.forEach((obj: T) => {
            addOrUpdateObject(
                this.objects,
                obj,
                this.callbackCache[ADD].slice(),
                this.callbackCache[UPDATE].slice(),
            );
        });
    }

    private async watchHandler(
        phase: string,
        obj: T,
        watchObj?: { type: string; object: KubernetesObject },
    ): Promise<void> {
        switch (phase) {
            case 'ADDED':
            case 'MODIFIED':
                addOrUpdateObject(
                    this.objects,
                    obj,
                    this.callbackCache[ADD].slice(),
                    this.callbackCache[UPDATE].slice(),
                );
                break;
            case 'DELETED':
                deleteObject(this.objects, obj, this.callbackCache[DELETE].slice());
                break;
            case 'BOOKMARK':
                // nothing to do, here for documentation, mostly.
                break;
            case 'ERROR':
                await this.doneHandler(obj);
                return;
        }
        this.resourceVersion = obj.metadata!.resourceVersion || '';
    }
}

// exported for testing
export function cacheMapFromList<T extends KubernetesObject>(newObjects: T[]): CacheMap<T> {
    const objects: CacheMap<T> = new Map();
    // build up the new list
    for (const obj of newObjects) {
        let namespaceObjects = objects.get(obj.metadata!.namespace || '');
        if (!namespaceObjects) {
            namespaceObjects = new Map();
            objects.set(obj.metadata!.namespace || '', namespaceObjects);
        }

        const name = obj.metadata!.name || '';
        namespaceObjects.set(name, obj);
    }
    return objects;
}

// external for testing
export function deleteItems<T extends KubernetesObject>(
    oldObjects: CacheMap<T>,
    newObjects: T[],
    deleteCallback?: ObjectCallback<T>[],
): CacheMap<T> {
    const newObjectsMap = cacheMapFromList(newObjects);

    for (const [namespace, oldNamespaceObjects] of oldObjects.entries()) {
        const newNamespaceObjects = newObjectsMap.get(namespace);
        if (newNamespaceObjects) {
            for (const [name, oldObj] of oldNamespaceObjects.entries()) {
                if (!newNamespaceObjects.has(name)) {
                    oldNamespaceObjects.delete(name);
                    if (deleteCallback) {
                        deleteCallback.forEach((fn: ObjectCallback<T>) => fn(oldObj));
                    }
                }
            }
        } else {
            oldObjects.delete(namespace);
            oldNamespaceObjects.forEach((obj: T) => {
                if (deleteCallback) {
                    deleteCallback.forEach((fn: ObjectCallback<T>) => fn(obj));
                }
            });
        }
    }

    return oldObjects;
}

// Only public for testing.
export function addOrUpdateObject<T extends KubernetesObject>(
    objects: CacheMap<T>,
    obj: T,
    addCallbacks?: ObjectCallback<T>[],
    updateCallbacks?: ObjectCallback<T>[],
): void {
    let namespaceObjects = objects.get(obj.metadata!.namespace || '');
    if (!namespaceObjects) {
        namespaceObjects = new Map();
        objects.set(obj.metadata!.namespace || '', namespaceObjects);
    }

    const name = obj.metadata!.name || '';
    const found = namespaceObjects.get(name);
    if (!found) {
        namespaceObjects.set(name, obj);
        if (addCallbacks) {
            addCallbacks.forEach((elt: ObjectCallback<T>) => elt(obj));
        }
    } else {
        if (!isSameVersion(found, obj)) {
            namespaceObjects.set(name, obj);
            if (updateCallbacks) {
                updateCallbacks.forEach((elt: ObjectCallback<T>) => elt(obj));
            }
        }
    }
}

function isSameVersion<T extends KubernetesObject>(o1: T, o2: T): boolean {
    return (
        o1.metadata!.resourceVersion !== undefined &&
        o1.metadata!.resourceVersion !== null &&
        o1.metadata!.resourceVersion === o2.metadata!.resourceVersion
    );
}

// Public for testing.
export function deleteObject<T extends KubernetesObject>(
    objects: CacheMap<T>,
    obj: T,
    deleteCallbacks?: ObjectCallback<T>[],
): void {
    const namespace = obj.metadata!.namespace || '';
    const name = obj.metadata!.name || '';

    const namespaceObjects = objects.get(namespace);
    if (!namespaceObjects) {
        return;
    }
    const deleted = namespaceObjects.delete(name);
    if (deleted) {
        if (deleteCallbacks) {
            deleteCallbacks.forEach((elt: ObjectCallback<T>) => elt(obj));
        }
        if (namespaceObjects.size === 0) {
            objects.delete(namespace);
        }
    }
}
