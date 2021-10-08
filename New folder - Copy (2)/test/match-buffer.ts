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
