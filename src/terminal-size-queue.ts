import { Readable, ReadableOptions } from 'stream';

export interface TerminalSize {
    height: number;
    width: number;
}

export class TerminalSizeQueue extends Readable {
    constructor(opts: ReadableOptions = {}) {
        super({
            ...opts,
            // tslint:disable-next-line:no-empty
            read() {},
        });
    }

    public resize(size: TerminalSize) {
        this.push(JSON.stringify(size));
    }
}
