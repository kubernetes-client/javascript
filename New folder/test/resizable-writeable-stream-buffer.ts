import { WritableStreamBuffer } from 'stream-buffers';

export class ResizableWriteableStreamBuffer extends WritableStreamBuffer implements NodeJS.WritableStream {
  public columns: number = 0;
  public rows: number = 0;
}
