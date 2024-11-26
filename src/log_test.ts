import { expect } from 'chai';
import { AddOptionsToSearchParams, LogOptions } from './log.js';

describe('Log', () => {
    describe('AddOptionsToSearchParams', () => {
        it('should add options to search params', () => {
            let searchParams = new URLSearchParams();
            let options: LogOptions = {
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

            const sinceTime = new Date().toISOString();
            searchParams = new URLSearchParams();
            options = { sinceTime };
            AddOptionsToSearchParams(options, searchParams);
            expect(searchParams.get('sinceTime')).to.equal(sinceTime);
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
        it('sinceTime and sinceSeconds cannot be used together', () => {
            const searchParams = new URLSearchParams();
            const sinceTime = new Date().toISOString();
            const options: LogOptions = {
                sinceSeconds: 1,
                sinceTime,
            };
            expect(() => {
                AddOptionsToSearchParams(options, searchParams);
            }).to.throw('at most one of sinceTime or sinceSeconds may be specified');
        });
    });
});
