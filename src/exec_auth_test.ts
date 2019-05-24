import { expect } from 'chai';
import * as shell from 'shelljs';

import { ExecAuth } from './exec_auth';

describe('ExecAuth', () => {
    it('should correctly exec', async () => {
        const auth = new ExecAuth();
        (auth as any).execFn = (command: string, opts: shell.ExecOpts): shell.ShellReturnValue => {
            return {
                code: 0,
                stdout: JSON.stringify({ status: { token: 'foo' } }),
            } as shell.ShellReturnValue;
        };

        const token = auth.getToken({
            name: 'user',
            authProvider: {
                config: {
                    exec: {
                        command: 'echo',
                    },
                },
            },
        });
        expect(token).to.equal('Bearer foo');
    });

    it('should exec with env vars', async () => {
        const auth = new ExecAuth();
        let optsOut: shell.ExecOpts = {};
        (auth as any).execFn = (command: string, opts: shell.ExecOpts): shell.ShellReturnValue => {
            optsOut = opts;
            return {
                code: 0,
                stdout: JSON.stringify({ status: { token: 'foo' } }),
            } as shell.ShellReturnValue;
        };
        process.env.BLABBLE = 'flubble';
        const token = auth.getToken({
            name: 'user',
            authProvider: {
                config: {
                    exec: {
                        command: 'echo',
                        env: [
                            {
                                name: 'foo',
                                value: 'bar',
                            },
                        ],
                    },
                },
            },
        });
        expect(optsOut.env.foo).to.equal('bar');
        expect(optsOut.env.PATH).to.equal(process.env.PATH);
        expect(optsOut.env.BLABBLE).to.equal(process.env.BLABBLE);
    });
});
