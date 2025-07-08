import { describe, it } from 'node:test';
import { deepEqual, deepStrictEqual, strictEqual } from 'node:assert';
import { V1CustomResourceDefinition, V1Namespace } from './api.js';
import { dumpYaml, loadAllYaml, loadYaml } from './yaml.js';

describe('yaml', () => {
    it('should load safely', () => {
        const yaml = 'apiVersion: v1\n' + 'kind: Namespace\n' + 'metadata:\n' + '  name: some-namespace\n';
        const ns = loadYaml<V1Namespace>(yaml);

        strictEqual(ns.apiVersion, 'v1');
        strictEqual(ns.kind, 'Namespace');
        strictEqual(ns.metadata!.name, 'some-namespace');
    });
    it('should load safely by mapping properties correctly', () => {
        const yaml = `
apiVersion: apiextensions.k8s.io/v1
kind: CustomResourceDefinition
metadata:
    name: my-crd.example.com
spec:
  group: example.com
  versions:
    - name: v1
      served: true
      storage: true
      schema:
        openAPIV3Schema:
          type: object
          properties:
            foobar:
                anyOf:
                - type: integer
                - type: string
                x-kubernetes-int-or-string: true
`;
        const ns = loadYaml<V1CustomResourceDefinition>(yaml);

        strictEqual(ns.apiVersion, 'apiextensions.k8s.io/v1');
        strictEqual(ns.kind, 'CustomResourceDefinition');
        strictEqual(ns.metadata!.name, 'my-crd.example.com');
        strictEqual(
            ns.spec.versions[0]!.schema!.openAPIV3Schema!.properties!['foobar'].x_kubernetes_int_or_string,
            true,
        );
        strictEqual(
            ns.spec.versions[0]!.schema!.openAPIV3Schema!.properties!['foobar']['x-kubernetes-int-or-string'],
            undefined,
        );
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
            '  namespace: some-ns\n' +
            '---\n' +
            'apiVersion: apiextensions.k8s.io/v1\n' +
            'kind: CustomResourceDefinition\n' +
            'metadata:\n' +
            '  name: my-crd.example.com\n' +
            'spec:\n' +
            '  group: example.com\n' +
            '  versions:\n' +
            '    - name: v1\n' +
            '      served: true\n' +
            '      storage: true\n' +
            '      schema:\n' +
            '        openAPIV3Schema:\n' +
            '          type: object\n' +
            '          properties:\n' +
            '            foobar:\n' +
            '              anyOf:\n' +
            '              - type: integer\n' +
            '              - type: string\n' +
            '              x-kubernetes-int-or-string: true\n';
        const objects = loadAllYaml(yaml);

        strictEqual(objects.length, 3);
        strictEqual(objects[0].kind, 'Namespace');
        strictEqual(objects[1].kind, 'Pod');
        strictEqual(objects[0].metadata.name, 'some-namespace');
        strictEqual(objects[1].metadata.name, 'some-pod');
        strictEqual(objects[1].metadata.namespace, 'some-ns');
        strictEqual(objects[2].apiVersion, 'apiextensions.k8s.io/v1');
        strictEqual(objects[2].kind, 'CustomResourceDefinition');
        strictEqual(objects[2].metadata!.name, 'my-crd.example.com');
        strictEqual(
            objects[2].spec.versions[0]!.schema!.openAPIV3Schema!.properties!['foobar']
                .x_kubernetes_int_or_string,
            true,
        );
        strictEqual(
            objects[2].spec.versions[0]!.schema!.openAPIV3Schema!.properties!['foobar'][
                'x-kubernetes-int-or-string'
            ],
            undefined,
        );
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

    it('should round trip successfully with mapped properties', () => {
        const expected: V1CustomResourceDefinition = {
            apiVersion: 'apiextensions.k8s.io/v1',
            kind: 'CustomResourceDefinition',
            metadata: {
                name: 'my-crd.example.com',
            },
            spec: {
                group: 'example.com',
                names: {
                    kind: 'MyCRD',
                    plural: 'mycrds',
                },
                scope: 'Namespaced',
                versions: [
                    {
                        name: 'v1',
                        schema: {
                            openAPIV3Schema: {
                                properties: {
                                    foobar: {
                                        anyOf: [{ type: 'integer' }, { type: 'string' }],
                                        x_kubernetes_int_or_string: true,
                                    },
                                },
                                type: 'object',
                            },
                        },
                        served: true,
                        storage: true,
                    },
                ],
            },
        };
        const yamlString = dumpYaml(expected);
        const actual = loadYaml(yamlString);
        // not using strict equality as types are not matching
        deepEqual(actual, expected);
    });

    it('should parse octal-like strings as numbers (YAML 1.1 style)', () => {
        const yaml = `
    defaultMode: 0644
    fileMode: 0755
    `;
        const result = loadYaml<{
            defaultMode: number;
            fileMode: number;
        }>(yaml);

        // 0644 (octal) = 420 decimal, 0755 = 493
        strictEqual(result.defaultMode, 420);
        strictEqual(result.fileMode, 493);
    });

    it('should parse boolean-like strings as booleans (YAML 1.1 style)', () => {
        const yaml = `
    enableFeature: yes
    debugMode: ON
    maintenance: no
    safeMode: off
    `;
        const result = loadYaml<{
            enableFeature: boolean;
            debugMode: boolean;
            maintenance: boolean;
            safeMode: boolean;
        }>(yaml);

        strictEqual(result.enableFeature, true);
        strictEqual(result.debugMode, true);
        strictEqual(result.maintenance, false);
        strictEqual(result.safeMode, false);
    });
});
