import { expect } from 'chai';
import { jsonpath } from './json_path';

describe('jsonpath', () => {
    it('should throw if tried to run JavaScript inside the path', () => {
        expect(() => {
            jsonpath('$..[?(' + '(function a(arr){' + 'a([...arr, ...arr])' + '})([1]);)]', {
                nonEmpty: 'object',
            });
        }).to.throw();
    });
});
