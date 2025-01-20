import { deepStrictEqual, strictEqual } from 'node:assert';
import { V1Namespace } from './api.js';
import { dumpYaml, loadAllYaml, loadYaml } from './yaml.js';

describe('yaml', () => {
    it('should load safely', () => {
        const yaml = 'apiVersion: v1\n' + 'kind: Namespace\n' + 'metadata:\n' + '  name: some-namespace\n';
        const ns = loadYaml<V1Namespace>(yaml);

        strictEqual(ns.apiVersion, 'v1');
        strictEqual(ns.kind, 'Namespace');
        strictEqual(ns.metadata!.name, 'some-namespace');
    });
    it('should load all safely', () => {
        const yaml =
            'apiVersion: v1\n' +
            'kind: Namespace\n' +
            'metadata:\n' +
            '  name: some-namespace\n' +
            '---\n' +
            'apiVersion: v1\n' +
            'kind: Pod\n' +
            'metadata:\n' +
            '  name: some-pod\n' +
            '  namespace: some-ns\n';
        const objects = loadAllYaml(yaml);

        strictEqual(objects.length, 2);
        strictEqual(objects[0].kind, 'Namespace');
        strictEqual(objects[1].kind, 'Pod');
        strictEqual(objects[0].metadata.name, 'some-namespace');
        strictEqual(objects[1].metadata.name, 'some-pod');
        strictEqual(objects[1].metadata.namespace, 'some-ns');
    });
    it('should round trip successfully', () => {
        const expected = {
            metadata: {
                name: 'test',
            },
        };
        const yamlString = dumpYaml(expected);
        const actual = loadYaml(yamlString);
        deepStrictEqual(actual, expected);
    });
});
