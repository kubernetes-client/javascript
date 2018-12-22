import { KubernetesObject } from './types';
import { Watch } from './watch';

export interface ObjectCache<T> {
    get(name: string, namespace?: string): T | null;
    list(namespace?: string): T[];
}

export type ListCallback<T extends KubernetesObject> = (list: T[]) => void;

export class ListWatch<T extends KubernetesObject> implements ObjectCache<T> {
    private objects: T[] = [];
    private indexCache: any = {};
    private path: string;
    private watch: Watch;
    private listFn: (callback: ListCallback<T>) => void;

    public constructor(path: string, watch: Watch, listFn: (callback: ListCallback<T>) => void) {
        this.watch = watch;
        this.listFn = listFn;
        this.path = path;
        this.doneHandler(null);
    }

    public get(name: string, namespace?: string): T | null {
        let result: T | null = null;
        for (const element of this.objects) {
            if (element.metadata.name === name &&
                (!namespace || element.metadata.namespace === namespace)) {
                result = element;
            }
        }
        return result;
    }

    public list(namespace?: string | undefined): T[] {
        if (!namespace) {
            return this.objects;
        }
        return this.indexCache[namespace] as T[];
    }

    private doneHandler(err: any) {
        this.listFn((result: T[]) => {
            this.objects = result;
            for (const elt of this.objects) {
                this.indexObj(elt);
            }
            this.watch.watch(this.path, {}, this.watchHandler.bind(this), this.doneHandler.bind(this));
        });
    }

    private indexObj(obj: T) {
        let namespaceList = this.indexCache[obj.metadata.namespace] as T[];
        if (!namespaceList) {
            namespaceList = [];
            this.indexCache[obj.metadata.namespace] = namespaceList;
        }
        addOrUpdateObject(namespaceList, obj);
    }

    private watchHandler(phase: string, obj: T) {
        switch (phase) {
            case 'ADDED':
            case 'MODIFIED':
                addOrUpdateObject(this.objects, obj);
                if (obj.metadata.namespace) {
                    this.indexObj(obj);
                }
                break;
            case 'DELETED':
                deleteObject(this.objects, obj);
                if (obj.metadata.namespace) {
                    const namespaceList = this.indexCache[obj.metadata.namespace] as T[];
                    if (namespaceList) {
                        deleteObject(namespaceList, obj);
                    }
                }
                break;
        }
    }
}

// Only public for testing.
export function addOrUpdateObject<T extends KubernetesObject>(objects: T[], obj: T) {
    const ix = findObject(objects, obj);
    if (ix === -1) {
        objects.push(obj);
    } else {
        objects[ix] = obj;
    }
}

// Public for testing.
export function findObject<T extends KubernetesObject>(objects: T[], obj: T): number {
    for (let ix = 0; ix < objects.length; ix++) {
        const elt = objects[ix];
        if (obj.metadata.name !== elt.metadata.name) {
            continue;
        }
        if (obj.metadata.namespace === elt.metadata.namespace) {
            return ix;
        }
    }
    return -1;
}

// Public for testing.
export function deleteObject<T extends KubernetesObject>(objects: T[], obj: T) {
    const ix = findObject(objects, obj);
    if (ix !== -1) {
        objects.splice(ix, 1);
    }
}
