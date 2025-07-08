import yaml from 'yaml';
import { getSerializationType } from './util.js';
import { KubernetesObject } from './types.js';
import { ObjectSerializer } from './serializer.js';

/**
 * Load a single Kubernetes object from YAML.
 * @param data - The YAML string to load.
 * @param opts - Optional YAML parse options.
 * @returns The deserialized Kubernetes object.
 */
export function loadYaml<T>(data: string, opts?: yaml.ParseOptions): T {
    const yml = yaml.parse(data, { version: '1.1', ...opts }) as any as KubernetesObject;
    if (!yml) {
        throw new Error('Failed to load yaml');
    }
    const type = getSerializationType(yml.apiVersion, yml.kind);
    return ObjectSerializer.deserialize(yml, type) as T;
}

/**
 * Load all Kubernetes objects from a multi-document YAML string.
 * @param data - The YAML string to load.
 * @param opts - Optional YAML parse options.
 * @returns An array of deserialized Kubernetes objects.
 */
export function loadAllYaml(data: string, opts?: yaml.ParseOptions): KubernetesObject[] {
    const ymls = yaml.parseAllDocuments(data, { version: '1.1', ...opts });
    return ymls.map((doc) => {
        const obj = doc.toJSON() as KubernetesObject;
        const type = getSerializationType(obj.apiVersion, obj.kind);
        return ObjectSerializer.deserialize(obj, type);
    });
}

/**
 * Dump a Kubernetes object to a YAML string.
 * @param object - The Kubernetes object to dump.
 * @param opts - Optional YAML stringify options.
 * @returns The YAML string representation of the serialized object.
 */
export function dumpYaml(object: any, opts?: yaml.ToStringOptions): string {
    const kubeObject = object as KubernetesObject;
    const type = getSerializationType(kubeObject.apiVersion, kubeObject.kind);
    const serialized = ObjectSerializer.serialize(kubeObject, type);
    return yaml.stringify(serialized, opts);
}
