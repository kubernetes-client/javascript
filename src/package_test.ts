import { expect } from 'chai';
import { URL } from 'url';

// Generic set of tests to verify the package is built and configured correctly
describe('package', () => {
    it('package-lock.json should match package.json', () => {
        const v1 = require('../package.json').version;
        const v2 = require('../package-lock.json').version;
        expect(v1).to.equal(v2);
    });

    it('package-lock should only reference npm', () => {
        const validateDependencies = (deps) => {
            if (!deps.dependencies) {
                return;
            }
            for (const key in deps.dependencies) {
                const dep = deps.dependencies[key];
                const resolved = new URL(dep.resolved);
                expect(resolved.hostname).to.equal('registry.npmjs.org');
                expect(resolved.protocol).to.equal('https:');
                validateDependencies(dep);
            }
        };
        const deps = require('../package-lock.json');
        validateDependencies(deps);
    });
});
