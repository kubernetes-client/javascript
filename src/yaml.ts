import YAML from 'yaml';
import { getSerializationType } from './util.js';
import { KubernetesObject } from './types.js';
import { ObjectSerializer } from './serializer.js';

/**
 * Load a Kubernetes object from YAML.
 * @param data - The YAML string to load.
 * @param opts - Optional YAML load options.
 * @returns The deserialized Kubernetes object.
 */
export function loadYaml<T>(data: string): T {
    const yml = YAML.parse(data, { version: '1.1' }) as any as KubernetesObject;
    if (!yml) {
        throw new Error('Failed to load YAML');
    }
    const type = getSerializationType(yml.apiVersion, yml.kind);
    return ObjectSerializer.deserialize(yml, type) as T;
}

/**
 * Load all Kubernetes objects from YAML.
 * @param data - The YAML string to load.
 * @param opts - Optional YAML load options.
 * @returns An array of deserialized Kubernetes objects.
 */
export function loadAllYaml(data: string): any[] {
    const ymls = YAML.parseAllDocuments(data, { version: '1.1' });
    return ymls.map((doc) => {
        const obj = doc.toJS() as KubernetesObject;
        const type = getSerializationType(obj.apiVersion, obj.kind);
        return ObjectSerializer.deserialize(obj, type);
    });
}

/**
 * Dump a Kubernetes object to YAML.
 * @param object - The Kubernetes object to dump.
 * @param opts - Optional YAML dump options.
 * @returns The YAML string representation of the serialized Kubernetes object.
 */
export function dumpYaml(object: any): string {
    const kubeObject = object as KubernetesObject;
    const type = getSerializationType(kubeObject.apiVersion, kubeObject.kind);
    const serialized = ObjectSerializer.serialize(kubeObject, type);
    return YAML.stringify(serialized);
}
