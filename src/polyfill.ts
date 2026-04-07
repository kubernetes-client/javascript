// Polyfill for `File` global required by undici v7+.
// `File` was added as a global in Node.js 20. On Node.js 18 (>= 18.13.0),
// it is available from `node:buffer` but not set as a global.
import { File as BufferFile } from 'node:buffer';

if (typeof globalThis.File === 'undefined') {
    (globalThis as typeof globalThis & { File: typeof BufferFile }).File = BufferFile;
}
