import { deepStrictEqual, strictEqual } from 'node:assert';
import { RequestOptions, Agent } from 'node:https';
import { Matcher } from 'ts-mockito/lib/matcher/type/Matcher.js';

export function matchBuffer(channel: number, contents: string): StringBufferMatcher {
    return new StringBufferMatcher(channel, contents);
}

class StringBufferMatcher extends Matcher {
    private channel: number;
    private contents: string;
    constructor(channel: number, contents: string) {
        super();
        this.channel = channel;
        this.contents = contents;
    }

    public valueOf(): string {
        return this.contents;
    }

    public match(value: any): boolean {
        if (value instanceof Buffer) {
            const buffer = value as Buffer;
            const channel: number = buffer.readInt8(0);
            const contents: string = buffer.toString('utf8', 1);
            return this.channel === channel && this.contents === contents;
        }

        return false;
    }

    public toString(): string {
        return `buffer did not contain "${this.contents}"`;
    }
}

export function assertRequestAgentsEqual(agent1: Agent, agent2: Agent): void {
    const BUFFER_EQUAL_TRUE = 0;
    const ca1 = agent1.options.ca;
    const ca2 = agent2.options.ca;
    // @ts-expect-error
    if (ca1 !== ca2 && Buffer.compare(ca1, ca2) !== BUFFER_EQUAL_TRUE) {
        throw 'unequal agent ca buffer';
    }
    const cert1 = agent1.options.cert;
    const cert2 = agent2.options.cert;
    // @ts-expect-error
    if (cert1 !== cert2 && Buffer.compare(cert1, cert2) !== BUFFER_EQUAL_TRUE) {
        throw 'unequal agent cert buffer';
    }

    const key1 = agent1.options.key;
    const key2 = agent2.options.key;
    // @ts-expect-error
    if (key1 !== key2 && Buffer.compare(key1, key2) !== BUFFER_EQUAL_TRUE) {
        throw 'unequal agent key buffer';
    }

    strictEqual(agent1.options.passphrase, agent2.options.passphrase);
    strictEqual(agent1.options.pfx, agent2.options.pfx);
    strictEqual(agent1.options.rejectUnauthorized, agent2.options.rejectUnauthorized);
}

export function assertRequestOptionsEqual(options1: RequestOptions, options2: RequestOptions): void {
    // @ts-expect-error agent has type Agent | Boolean which we expect to be populated with Agent here
    const agent1: Agent = options1.agent;
    // @ts-expect-error
    const agent2: Agent = options2.agent;
    assertRequestAgentsEqual(agent1, agent2);

    strictEqual(options1.auth, options2.auth);
    deepStrictEqual(options1.headers, options2.headers);
    strictEqual(options1.rejectUnauthorized, options2.rejectUnauthorized);
    strictEqual(options1.servername, options2.servername);
}
