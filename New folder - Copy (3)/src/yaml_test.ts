import { expect } from 'chai';

import { V1Namespace } from './api';
import { dumpYaml, loadAllYaml, loadYaml } from './yaml';

describe('yaml', () => {
    it('should load safely', () => {
        const yaml = 'apiVersion: v1\n' + 'kind: Namespace\n' + 'metadata:\n' + '  name: some-namespace\n';
        const ns = loadYaml<V1Namespace>(yaml);

        expect(ns.apiVersion).to.equal('v1');
        expect(ns.kind).to.equal('Namespace');
        expect(ns.metadata!.name).to.equal('some-namespace');
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

        expect(objects.length).to.equal(2);
        expect(objects[0].kind).to.equal('Namespace');
        expect(objects[1].kind).to.equal('Pod');
        expect(objects[0].metadata.name).to.equal('some-namespace');
        expect(objects[1].metadata.name).to.equal('some-pod');
        expect(objects[1].metadata.namespace).to.equal('some-ns');
    });
    it('should round trip successfully', () => {
        const expected = {
            metadata: {
                name: 'test',
            },
        };
        const yamlString = dumpYaml(expected);
        const actual = loadYaml(yamlString);
        expect(actual).to.deep.equal(expected);
    });
});
