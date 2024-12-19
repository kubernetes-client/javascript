import { EventEmitter } from 'events';

export class CallAwaiter extends EventEmitter {
  public awaitCall(event: string) {
    return new Promise<any[]>((resolve) => {
      this.once(event, (...args: any[]) => resolve(args));
    });
  }

  public resolveCall(event: string, returnValue?: any) {
    return (...args: any[]) => {
      this.emit(event, ...args);
      return returnValue;
    }
  }
}
