import { ListWatch, ObjectCache } from './cache';
import { KubeConfig } from './config';
import { KubernetesListObject, KubernetesObject } from './types';
import { Watch } from './watch';

import http = require('http');

export type ObjectCallback<T extends KubernetesObject> = (obj: T) => void;
export type ErrorCallback = (err?: any) => void;
export type ListCallback<T extends KubernetesObject> = (list: T[], ResourceVersion: string) => void;
export type ListPromise<T extends KubernetesObject> = () => Promise<{
    response: http.IncomingMessage;
    body: KubernetesListObject<T>;
}>;

// These are issued per object
export const ADD = 'add';
export type ADD = typeof ADD;
export const UPDATE = 'update';
export type UPDATE = typeof UPDATE;
export const CHANGE = 'change';
export type CHANGE = typeof CHANGE;
export const DELETE = 'delete';
export type DELETE = typeof DELETE;

// This is issued when a watch connects or reconnects
export const CONNECT = 'connect';
export type CONNECT = typeof CONNECT;
// This is issued when there is an error
export const ERROR = 'error';
export type ERROR = typeof ERROR;

export interface Informer<T extends KubernetesObject> {
    on(verb: ADD | UPDATE | DELETE | CHANGE, cb: ObjectCallback<T>): void;
    on(verb: ERROR | CONNECT, cb: ErrorCallback): void;
    off(verb: ADD | UPDATE | DELETE | CHANGE, cb: ObjectCallback<T>): void;
    off(verb: ERROR | CONNECT, cb: ErrorCallback): void;
    start(): Promise<void>;
    stop(): Promise<void>;
}

export function makeInformer<T extends KubernetesObject>(
    kubeconfig: KubeConfig,
    path: string,
    listPromiseFn: ListPromise<T>,
    labelSelector?: string,
    fieldSelector?: string,
): Informer<T> & ObjectCache<T> {
    const watch = new Watch(kubeconfig);
    return new ListWatch<T>(path, watch, listPromiseFn, false, labelSelector, fieldSelector);
}
