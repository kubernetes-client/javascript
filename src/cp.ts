import { Readable, Transform } from 'stream';
import { WritableStreamBuffer } from 'stream-buffers';
import tar from 'tar-fs';

import { KubeConfig } from './config.js';
import { Exec } from './exec.js';

/**
 * TarPipe wraps the tar stream from a pod with retry capabilities.
 * When a read error occurs during transfer, it can resume from the last successful byte position.
 */
class TarPipe extends Readable {
    private src: {
        namespace: string;
        podName: string;
        containerName: string;
        srcPath: string;
        cwd?: string;
    };
    private execInstance: Exec;
    private maxTries: number;
    private bytesRead: number = 0;
    private retries: number = 0;
    private currentReader: Readable | null = null;
    private errStream: WritableStreamBuffer | null = null;

    constructor(
        namespace: string,
        podName: string,
        containerName: string,
        srcPath: string,
        execInstance: Exec,
        maxTries: number,
        cwd?: string,
    ) {
        super();
        this.src = { namespace, podName, containerName, srcPath, cwd };
        this.execInstance = execInstance;
        this.maxTries = maxTries;
        this.initReadFrom(0);
    }

    private initReadFrom(offset: number): void {
        let command: string[];
        if (this.maxTries !== 0 && offset > 0) {
            // Use shell command with tail to resume from specific byte position
            const tarCmd = this.src.cwd
                ? `tar cf - -C ${this.src.cwd} ${this.src.srcPath}`
                : `tar cf - ${this.src.srcPath}`;
            command = ['sh', '-c', `${tarCmd} | tail -c+${offset}`];
        } else {
            command = ['tar', 'cf', '-'];
            if (this.src.cwd) {
                command.push('-C', this.src.cwd);
            }
            command.push(this.src.srcPath);
        }

        const writerStream = new Transform({
            transform: (chunk, encoding, callback) => {
                callback(null, chunk);
            },
        });

        this.errStream = new WritableStreamBuffer();
        this.currentReader = writerStream;

        // Set up stream event handlers
        writerStream.on('data', (chunk: Buffer) => {
            this.bytesRead += chunk.length;
            if (!this.push(chunk)) {
                writerStream.pause();
            }
        });

        writerStream.on('end', () => {
            this.push(null); // Signal end of stream
        });

        writerStream.on('error', (err: Error) => {
            this.handleError(err);
        });

        // Start exec
        this.execInstance
            .exec(
                this.src.namespace,
                this.src.podName,
                this.src.containerName,
                command,
                writerStream,
                this.errStream,
                null,
                false,
                async () => {
                    if (this.errStream && this.errStream.size()) {
                        const errMsg = this.errStream.getContentsAsString();
                        this.handleError(new Error(`Error from pod - details: \n ${errMsg}`));
                    }
                },
            )
            .catch((err: Error) => {
                this.handleError(err);
            });
    }

    private handleError(err: Error): void {
        if (this.maxTries < 0 || this.retries < this.maxTries) {
            this.retries++;
            console.error(
                `Resuming copy at ${this.bytesRead} bytes, retry ${this.retries}/${this.maxTries < 0 ? '∞' : this.maxTries}`,
            );
            // Resume from the next byte position
            this.initReadFrom(this.bytesRead + 1);
        } else {
            console.error(`Dropping out copy after ${this.retries} retries`);
            this.destroy(err);
        }
    }

    _read(): void {
        if (this.currentReader) {
            this.currentReader.resume();
        }
    }
}

export class Cp {
    public execInstance: Exec;
    public constructor(config: KubeConfig, execInstance?: Exec) {
        this.execInstance = execInstance || new Exec(config);
    }

    /**
     * @param {string} namespace - The namespace of the pod to exec the command inside.
     * @param {string} podName - The name of the pod to exec the command inside.
     * @param {string} containerName - The name of the container in the pod to exec the command inside.
     * @param {string} srcPath - The source path in the pod
     * @param {string} tgtPath - The target path in local
     * @param {string} [cwd] - The directory that is used as the parent in the pod when downloading
     * @param {number} [maxTries=0] - Set number of retries to complete a copy operation from a container.
     *                                 Specify 0 to disable or any negative value for infinite retrying.
     *                                 The default is 0 (no retry).
     */
    public async cpFromPod(
        namespace: string,
        podName: string,
        containerName: string,
        srcPath: string,
        tgtPath: string,
        cwd?: string,
        maxTries: number = 0,
    ): Promise<void> {
        if (maxTries === 0) {
            // Original implementation without retry
            const command = ['tar', 'cf', '-'];
            if (cwd) {
                command.push('-C', cwd);
            }
            command.push(srcPath);
            const writerStream = tar.extract(tgtPath);
            const errStream = new WritableStreamBuffer();
            await this.execInstance.exec(
                namespace,
                podName,
                containerName,
                command,
                writerStream,
                errStream,
                null,
                false,
                async () => {
                    if (errStream.size()) {
                        throw new Error(
                            `Error from cpFromPod - details: \n ${errStream.getContentsAsString()}`,
                        );
                    }
                },
            );
        } else {
            // Implementation with retry using TarPipe
            const tarPipe = new TarPipe(
                namespace,
                podName,
                containerName,
                srcPath,
                this.execInstance,
                maxTries,
                cwd,
            );
            const writerStream = tar.extract(tgtPath);

            return new Promise<void>((resolve, reject) => {
                tarPipe.on('error', (err: Error) => {
                    reject(err);
                });

                writerStream.on('error', (err: Error) => {
                    reject(err);
                });

                writerStream.on('finish', () => {
                    resolve();
                });

                tarPipe.pipe(writerStream);
            });
        }
    }

    /**
     * @param {string} namespace - The namespace of the pod to exec the command inside.
     * @param {string} podName - The name of the pod to exec the command inside.
     * @param {string} containerName - The name of the container in the pod to exec the command inside.
     * @param {string} srcPath - The source path in local
     * @param {string} tgtPath - The target path in the pod
     * @param {number} [maxTries=0] - Set number of retries to complete a copy operation to a container.
     *                                 Specify 0 to disable or any negative value for infinite retrying.
     *                                 The default is 0 (no retry).
     */
    public async cpToPod(
        namespace: string,
        podName: string,
        containerName: string,
        srcPath: string,
        tgtPath: string,
        maxTries: number = 0,
    ): Promise<void> {
        if (maxTries === 0) {
            // Original implementation without retry
            const command = ['tar', 'xf', '-', '-C', tgtPath];
            const readStream = tar.pack(srcPath);
            const errStream = new WritableStreamBuffer();
            await this.execInstance.exec(
                namespace,
                podName,
                containerName,
                command,
                null,
                errStream,
                readStream,
                false,
                async () => {
                    if (errStream.size()) {
                        throw new Error(
                            `Error from cpToPod - details: \n ${errStream.getContentsAsString()}`,
                        );
                    }
                },
            );
        } else {
            // Implementation with retry
            let retries = 0;
            let lastError: Error | null = null;

            while (maxTries < 0 || retries <= maxTries) {
                try {
                    const command = ['tar', 'xf', '-', '-C', tgtPath];
                    const readStream = tar.pack(srcPath);
                    const errStream = new WritableStreamBuffer();

                    await this.execInstance.exec(
                        namespace,
                        podName,
                        containerName,
                        command,
                        null,
                        errStream,
                        readStream,
                        false,
                        async () => {
                            if (errStream.size()) {
                                throw new Error(
                                    `Error from cpToPod - details: \n ${errStream.getContentsAsString()}`,
                                );
                            }
                        },
                    );
                    // Success - exit the retry loop
                    return;
                } catch (err) {
                    lastError = err as Error;
                    if (maxTries < 0 || retries < maxTries) {
                        retries++;
                        console.error(
                            `Retrying cpToPod, attempt ${retries}/${maxTries < 0 ? '∞' : maxTries}: ${lastError.message}`,
                        );
                    } else {
                        break;
                    }
                }
            }

            throw new Error(`cpToPod failed after ${retries} retries: ${lastError?.message}`);
        }
    }
}
