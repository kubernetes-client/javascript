import { expect } from 'chai';
import { jsonpath } from './json_path';

describe('jsonpath', () => {
    it('should throw if vulnerable for RCE (remote code execution)', () => {
        expect(() => {
            jsonpath('$..[?(' + '(function a(arr){' + 'a([...arr, ...arr])' + '})([1]);)]', { nonEmpty: 'object' });
        }).to.throw();
    });
});
