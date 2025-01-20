import { strictEqual, throws } from 'node:assert';
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
            strictEqual(searchParams.get('follow'), 'true');
            strictEqual(searchParams.get('limitBytes'), '100');
            strictEqual(searchParams.get('pretty'), 'true');
            strictEqual(searchParams.get('previous'), 'true');
            strictEqual(searchParams.get('sinceSeconds'), '1');
            strictEqual(searchParams.get('tailLines'), '1');
            strictEqual(searchParams.get('timestamps'), 'true');

            const sinceTime = new Date().toISOString();
            searchParams = new URLSearchParams();
            options = { sinceTime };
            AddOptionsToSearchParams(options, searchParams);
            strictEqual(searchParams.get('sinceTime'), sinceTime);
        });
        it('should use defaults for', () => {
            const searchParams = new URLSearchParams();
            const options: LogOptions = {};
            AddOptionsToSearchParams(options, searchParams);
            strictEqual(searchParams.get('follow'), 'false');
            strictEqual(searchParams.get('pretty'), 'false');
            strictEqual(searchParams.get('previous'), 'false');
            strictEqual(searchParams.get('timestamps'), 'false');
        });
        it('sinceTime and sinceSeconds cannot be used together', () => {
            const searchParams = new URLSearchParams();
            const sinceTime = new Date().toISOString();
            const options: LogOptions = {
                sinceSeconds: 1,
                sinceTime,
            };
            throws(() => {
                AddOptionsToSearchParams(options, searchParams);
            }, /at most one of sinceTime or sinceSeconds may be specified/);
        });
    });
});
