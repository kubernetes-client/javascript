import { deepStrictEqual } from 'assert';
import { expect } from 'chai';
import { RequestOptions, Agent } from 'https';
import { Matcher } from 'ts-mockito/lib/matcher/type/Matcher';

export function matchBuffer(channel: number, contents: string): Matcher {
  return new StringBufferMatcher(channel, contents);
}

class StringBufferMatcher extends Matcher {
  constructor(private channel: number, private contents: string) {
      super();
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
  const BUFFER_EQUAL_TRUE = 0
  const ca1 = agent1.options.ca
  const ca2 = agent2.options.ca
  //@ts-ignore
  if(ca1 !== ca2 && Buffer.compare(ca1,ca2) !== BUFFER_EQUAL_TRUE){
    throw("unequal agent ca buffer")
  }
  const cert1 = agent1.options.cert
  const cert2 = agent2.options.cert
  //@ts-ignore
  if(cert1 !== cert2 && Buffer.compare(cert1,cert2) !== BUFFER_EQUAL_TRUE){
    throw("unequal agent cert buffer")

  }

  const key1 = agent1.options.key
  const key2 = agent2.options.key
  //@ts-ignore
  if(key1 !== key2 && Buffer.compare(key1,key2) !== BUFFER_EQUAL_TRUE){
    throw("unequal agent key buffer")
  }

  expect(agent1.options.passphrase).to.equal(agent2.options.passphrase);
  expect(agent1.options.pfx).to.equal(agent2.options.pfx);
  expect(agent1.options.rejectUnauthorized).to.equal(agent2.options.rejectUnauthorized);
}

export function assertRequestOptionsEqual(options1: RequestOptions, options2: RequestOptions): void {
  //@ts-ignore agent has type Agent | Boolean which we expect to be populated with Agent here
  const agent1: Agent = options1.agent
  //@ts-ignore
  const agent2: Agent = options2.agent
  assertRequestAgentsEqual(agent1, agent2)

  expect(options1.auth).to.equal(options2.auth)
  expect(options1.headers).to.deep.equal(options2.headers)
  expect(options1.rejectUnauthorized).to.equal(options2.rejectUnauthorized)
  expect(options1.servername).to.equal(options2.servername)
}
