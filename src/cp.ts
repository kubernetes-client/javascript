import fs, { rmSync } from 'node:fs';
import { WritableStreamBuffer } from 'stream-buffers';
import tar from 'tar-fs';
import tmp from 'tmp-promise';
import path from 'node:path';

import { KubeConfig } from './config.js';
import { Exec } from './exec.js';
import { getServers } from 'node:dns';

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
     */
    public async cpFromPod(
        namespace: string,
        podName: string,
        containerName: string,
        srcPath: string,
        tgtPath: string,
    ): Promise<void> {
        const tmpFile = tmp.fileSync();
        const tmpFileName = tmpFile.name;
        const command = ['tar', 'zcf', '-', srcPath];
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
