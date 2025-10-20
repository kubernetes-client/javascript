import yaml from 'js-yaml';
import { getSerializationType } from './util.js';
import { KubernetesObject } from './types.js';
import { ObjectSerializer } from './serializer.js';

/**
 * Load a Kubernetes object from YAML.
 * @param data - The YAML string to load.
 * @param opts - Optional YAML load options.
 * @returns The deserialized Kubernetes object.
 */
export function loadYaml<T>(data: string, opts?: yaml.LoadOptions): T {
    const yml = yaml.load(data, opts) as any as KubernetesObject;
    if (!yml) {
        throw new Error('Failed to load YAML');
    }
    const type = getSerializationType(yml.apiVersion, yml.kind) ?? 'KubernetesObject';

    return ObjectSerializer.deserialize(yml, type) as T;
}

/**
 * Load all Kubernetes objects from YAML.
 * @param data - The YAML string to load.
 * @param opts - Optional YAML load options.
 * @returns An array of deserialized Kubernetes objects.
 */
export function loadAllYaml(data: string, opts?: yaml.LoadOptions): any[] {
    const ymls = yaml.loadAll(data, undefined, opts);
    return ymls.map((yml) => {
        const obj = yml as KubernetesObject;
        const type = getSerializationType(obj.apiVersion, obj.kind) ?? 'KubernetesObject';
        return ObjectSerializer.deserialize(yml, type);
    });
}

/**
 * Dump a Kubernetes object to YAML.
 * @param object - The Kubernetes object to dump.
 * @param opts - Optional YAML dump options.
 * @returns The YAML string representation of the serialized Kubernetes object.
 */
export function dumpYaml(object: any, opts?: yaml.DumpOptions): string {
    const kubeObject = object as KubernetesObject;
    const type = getSerializationType(kubeObject.apiVersion, kubeObject.kind) ?? 'KubernetesObject';
    const serialized = ObjectSerializer.serialize(kubeObject, type);
    return yaml.dump(serialized, opts);
}
