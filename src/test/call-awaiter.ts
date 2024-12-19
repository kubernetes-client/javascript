import { EventEmitter } from 'node:events';

export class CallAwaiter extends EventEmitter {
    public awaitCall(event: string) {
        return new Promise<any[]>((resolve) => {
            this.once(event, resolve);
        });
    }

    public resolveCall(event: string) {
        return (...args: any[]) => this.emit(event, ...args);
    }
}
