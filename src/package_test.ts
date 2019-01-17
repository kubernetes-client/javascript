import { expect } from 'chai';

// Generic set of tests to verify the package is built and configured correctly
describe('package', () => {
    it('package-lock.json should match package.json', () => {
        const v1 = require('../package.json').version;
        const v2 = require('../package-lock.json').version;
        expect(v1).to.equal(v2);
    });
});
