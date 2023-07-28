import * as fs from 'fs';
import { WritableStreamBuffer } from 'stream-buffers';
import * as tar from 'tar';
import { KubeConfig } from './config';
import { Exec } from './exec';
import { generateTmpFileName } from './util';

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
     */
    public async cpFromPod(
        namespace: string,
        podName: string,
        containerName: string,
        srcPath: string,
        tgtPath: string,
        cwd?: string,
    ): Promise<void> {
        const tmpFileName = await generateTmpFileName();
        const command = ['tar', 'zcf', '-'];
        if (cwd) {
            command.push('-C', cwd);
        }
        command.push(srcPath);
        const writerStream = fs.createWriteStream(tmpFileName);
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
            async ({ status }) => {
                writerStream.close();
                if (status === 'Failure' || errStream.size()) {
                    throw new Error(`Error from cpFromPod - details: \n ${errStream.getContentsAsString()}`);
                }
                await tar.x({
                    file: tmpFileName,
                    cwd: tgtPath,
                });
            },
        );
    }

    /**
     * @param {string} namespace - The namespace of the pod to exec the command inside.
     * @param {string} podName - The name of the pod to exec the command inside.
     * @param {string} containerName - The name of the container in the pod to exec the command inside.
     * @param {string} srcPath - The source path in local
     * @param {string} tgtPath - The target path in the pod
     * @param {string} [cwd] - The directory that is used as the parent in the host when uploading
     */
    public async cpToPod(
        namespace: string,
        podName: string,
        containerName: string,
        srcPath: string,
        tgtPath: string,
        cwd?: string,
    ): Promise<void> {
        const tmpFileName = await generateTmpFileName();
        const command = ['tar', 'xf', '-', '-C', tgtPath];
        await tar.c({ file: tmpFileName, cwd }, [srcPath]);
        const readStream = fs.createReadStream(tmpFileName);
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
            async ({ status }) => {
                if (status === 'Failure' || errStream.size()) {
                    throw new Error(`Error from cpToPod - details: \n ${errStream.getContentsAsString()}`);
                }
            },
        );
    }
}
