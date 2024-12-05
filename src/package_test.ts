import { createRequire } from 'node:module';
import { expect } from 'chai';
const require = createRequire(import.meta.url);

// Generic set of tests to verify the package is built and configured correctly
describe('package', () => {
    it('package-lock.json should match package.json', () => {
        const v1 = require('../package.json').version;
        const v2 = require('../package-lock.json').version;
        expect(v1).to.equal(v2);

        const v3 = require('../package-lock.json').packages[''].version;
        expect(v1).to.equal(v3);
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
