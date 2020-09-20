import { Readable, ReadableOptions } from 'stream';

export interface ResizableStream {
    columns: number;
    rows: number;
    on(event: 'resize', cb: () => void): void;
}

export interface TerminalSize {
    height: number;
    width: number;
}

export class TerminalSizeQueue extends Readable {
    constructor(opts: ReadableOptions = {}) {
        super({
            ...opts,
            // tslint:disable-next-line:no-empty
            read(): void {},
        });
    }

    public handleResizes(writeStream: ResizableStream): void {
        // Set initial size
        this.resize(getTerminalSize(writeStream));

        // Handle future size updates
        writeStream.on('resize', () => this.resize(getTerminalSize(writeStream)));
    }

    private resize(size: TerminalSize): void {
        this.push(JSON.stringify(size));
    }
}

export function isResizable(stream: any): boolean {
    if (stream == null) {
        return false;
    }

    const hasRows = 'rows' in stream;
    const hasColumns = 'columns' in stream;
    const hasOn = typeof stream.on === 'function';
    return hasRows && hasColumns && hasOn;
}

function getTerminalSize(writeStream: ResizableStream): TerminalSize {
    return { height: writeStream.rows!, width: writeStream.columns! };
}
