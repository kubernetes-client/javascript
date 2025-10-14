import yaml from 'yaml';
import { getSerializationType } from './util.js';
import { KubernetesObject, YamlParseOptions } from './types.js';
import { ObjectSerializer } from './serializer.js';

/**
 * Load a Kubernetes object from YAML.
 * @param data - The YAML string to load.
 * @param opts - Optional YAML load options.
 * @returns The deserialized Kubernetes object.
 */
export function loadYaml<T>(data: string, opts?: YamlParseOptions): T {
    const yml = yaml.parse(data, { version: '1.1', ...opts }) as any as KubernetesObject;
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
export function loadAllYaml(data: string, opts?: YamlParseOptions): any[] {
    const ymls = yaml.parseAllDocuments(data, { version: '1.1', ...opts });
    return ymls.map((yml) => {
        const obj = yml.toJS() as KubernetesObject;
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
export function dumpYaml(object: any, opts?: YamlParseOptions): string {
    const kubeObject = object as KubernetesObject;
    const type = getSerializationType(kubeObject.apiVersion, kubeObject.kind);
    const serialized = ObjectSerializer.serialize(kubeObject, type);
    return yaml.stringify(serialized, { version: '1.1', ...opts });
}
