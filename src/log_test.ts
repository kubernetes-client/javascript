import { expect } from 'chai';
import { AddOptionsToSearchParams, LogOptions } from './log';
import { URLSearchParams } from 'url';

describe('Log', () => {
    describe('AddOptionsToSearchParams', () => {
        it('should add options to search params', () => {
            const searchParams = new URLSearchParams();
            const options: LogOptions = {
                follow: true,
                limitBytes: 100,
                pretty: true,
                previous: true,
                sinceSeconds: 1,
                tailLines: 1,
                timestamps: true,
            };
            AddOptionsToSearchParams(options, searchParams);
            expect(searchParams.get('follow')).to.equal('true');
            expect(searchParams.get('limitBytes')).to.equal('100');
            expect(searchParams.get('pretty')).to.equal('true');
            expect(searchParams.get('previous')).to.equal('true');
            expect(searchParams.get('sinceSeconds')).to.equal('1');
            expect(searchParams.get('tailLines')).to.equal('1');
            expect(searchParams.get('timestamps')).to.equal('true');
        });
        it('should use defaults for', () => {
            const searchParams = new URLSearchParams();
            const options: LogOptions = {};
            AddOptionsToSearchParams(options, searchParams);
            expect(searchParams.get('follow')).to.equal('false');
            expect(searchParams.get('pretty')).to.equal('false');
            expect(searchParams.get('previous')).to.equal('false');
            expect(searchParams.get('timestamps')).to.equal('false');
        });
    })
});