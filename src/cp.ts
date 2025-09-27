import { WritableStreamBuffer } from 'stream-buffers';
import tar from 'tar-fs';

import { KubeConfig } from './config.js';
import { Exec } from './exec.js';

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
     * @param {string} cwd - The directory that is used as the parent in the pod when downloading
     */
    public async cpFromPod(
        namespace: string,
        podName: string,
        containerName: string,
        srcPath: string,
        tgtPath: string,
        cwd?: string,
    ): Promise<void> {
        const command = ['tar', 'zcf', '-'];
        if (cwd) {
            command.push('-C', cwd);
        }
        command.push(srcPath);
        const writerStream = tar.extract(tgtPath);
        const errStream = new WritableStreamBuffer();
        this.execInstance.exec(
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
                    throw new Error(`Error from cpFromPod - details: \n ${errStream.getContentsAsString()}`);
                }
            },
        );
    }

    /**
     * @param {string} namespace - The namespace of the pod to exec the command inside.
     * @param {string} podName - The name of the pod to exec the command inside.
     * @param {string} containerName - The name of the container in the pod to exec the command inside.
     * @param {string} srcPath - The source path in local
     * @param {string} tgtPath - The target path in the pod
     */
    public async cpToPod(
        namespace: string,
        podName: string,
        containerName: string,
        srcPath: string,
        tgtPath: string,
    ): Promise<void> {
        const command = ['tar', 'xf', '-', '-C', tgtPath];
        const readStream = tar.pack(srcPath);
        const errStream = new WritableStreamBuffer();
        this.execInstance.exec(
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
                    throw new Error(`Error from cpToPod - details: \n ${errStream.getContentsAsString()}`);
                }
            },
        );
    }
}
