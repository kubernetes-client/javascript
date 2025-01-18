import { strictEqual } from 'node:assert';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);

// Generic set of tests to verify the package is built and configured correctly
describe('package', () => {
    it('package-lock.json should match package.json', () => {
        const v1 = require('../package.json').version;
        const v2 = require('../package-lock.json').version;
        strictEqual(v1, v2);

        const v3 = require('../package-lock.json').packages[''].version;
        strictEqual(v1, v3);
    });

    it('package-lock should only reference npm', () => {
        const validateDependencies = (deps) => {
            if (!deps.dependencies) {
                return;
            }
            for (const key in deps.dependencies) {
                const dep = deps.dependencies[key];
                const resolved = new URL(dep.resolved);
                strictEqual(resolved.hostname, 'registry.npmjs.org');
                strictEqual(resolved.protocol, 'https:');
                validateDependencies(dep);
            }
        };
        const deps = require('../package-lock.json');
        validateDependencies(deps);
    });
});
