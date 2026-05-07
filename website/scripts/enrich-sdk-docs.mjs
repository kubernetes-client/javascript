/**
 * Enriches generated SDK docs with quick-start snippets and cross-links.
 * Runs after typedoc + flatten, before Docusaurus compiles the docs.
 */

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const SDK_DIR = resolve(__dirname, '../docs/sdk');

const ENRICHMENTS = [
    {
        file: 'config/classes/KubeConfig.md',
        snippet: '> **Quick start:** `const kc = new KubeConfig(); kc.loadFromDefault(); const api = kc.makeApiClient(CoreV1Api);` — [See examples](/examples/basic-operations)',
    },
    {
        file: 'exec/index.md',
        snippet: '> **Quick start:** `const exec = new Exec(kc); exec.exec(ns, pod, container, command, stdout, stderr, stdin, tty);` — [See examples](/examples/pod-operations)',
    },
    {
        file: 'watch/index.md',
        snippet: '> **Quick start:** `const watch = new Watch(kc); watch.watch(path, params, callback, done);` — [See examples](/examples/watching-and-caching)',
    },
    {
        file: 'informer/functions/makeInformer.md',
        snippet: '> **Quick start:** `const informer = makeInformer(kc, path, listFn); informer.on("add", obj => {}); informer.start();` — [See examples](/examples/watching-and-caching)',
    },
    {
        file: 'yaml/index.md',
        snippet: '> **Quick start:** `loadYaml<V1Pod>(yamlString)` / `loadAllYaml(multiDocYaml)` / `dumpYaml(obj)` — [See examples](/examples/advanced)',
    },
    {
        file: 'attach/index.md',
        snippet: '> **Quick start:** `const attach = new Attach(kc); attach.attach(ns, pod, container, stdout, stderr, stdin, tty);` — [See examples](/examples/pod-operations)',
    },
    {
        file: 'portforward/index.md',
        snippet: '> **Quick start:** `const fwd = new PortForward(kc); fwd.portForward(ns, pod, [port], output, null, input);` — [See examples](/examples/pod-operations)',
    },
    {
        file: 'cp/index.md',
        snippet: '> **Quick start:** `const cp = new Cp(kc); cp.cpFromPod(ns, pod, container, srcPath, destPath);` — [See examples](/examples/pod-operations)',
    },
    {
        file: 'log/index.md',
        snippet: '> **Quick start:** `const log = new Log(kc); log.log(ns, pod, container, stream, opts);` — [See examples](/examples/pod-operations)',
    },
];

export function enrichSdkDocs(sdkDir = SDK_DIR) {
    let count = 0;
    for (const { file, snippet } of ENRICHMENTS) {
        const filePath = join(sdkDir, file);
        if (!existsSync(filePath)) continue;

        let content = readFileSync(filePath, 'utf8');

        // Skip if already enriched
        if (content.includes('**Quick start:**')) continue;

        // Insert after the first heading line (# ...)
        const headingMatch = content.match(/^(#\s+.+\n)/m);
        if (!headingMatch) continue;

        const insertPos = headingMatch.index + headingMatch[0].length;
        content = content.slice(0, insertPos) + '\n' + snippet + '\n' + content.slice(insertPos);

        writeFileSync(filePath, content, 'utf8');
        count++;
    }
    return count;
}
