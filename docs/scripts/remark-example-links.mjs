/**
 * Remark plugin that auto-injects "Related" links below each <CodeBlock> in
 * example doc pages.  It reads the referenced example source file at build
 * time, detects which SDK classes / API groups are used, and emits a
 * blockquote with links to the matching doc pages.
 *
 * The plugin is stateless — it derives everything from the example source
 * and the doc files on disk, so it stays in sync automatically when examples
 * or doc pages change.
 */

import fs from 'node:fs';
import path from 'node:path';
import { visit } from 'unist-util-visit';

/* ------------------------------------------------------------------ */
/*  Mapping from detected patterns → doc page paths                    */
/* ------------------------------------------------------------------ */

// SDK classes / functions → doc path (relative to docs root, no extension)
const SDK_PATTERNS = [
    { re: /\bKubeConfig\b/, label: 'KubeConfig', path: '/sdk/config/classes/KubeConfig' },
    { re: /\bWatch\b/, label: 'Watch', path: '/sdk/watch/classes/Watch' },
    { re: /\bmakeInformer\b/, label: 'makeInformer', path: '/sdk/informer/functions/makeInformer' },
    {
        re: /\bInformer\b/,
        label: 'Informer',
        path: '/sdk/informer/interfaces/Informer',
        // only if makeInformer is also present (avoid false positives from comments)
        requires: /\bmakeInformer\b/,
    },
    { re: /\bListWatch\b/, label: 'ListWatch', path: '/sdk/cache/classes/ListWatch' },
    { re: /\bObjectCache\b/, label: 'ObjectCache', path: '/sdk/cache/interfaces/ObjectCache' },
    { re: /\bExec\b/, label: 'Exec', path: '/sdk/exec/classes/Exec' },
    { re: /\bAttach\b/, label: 'Attach', path: '/sdk/attach/classes/Attach' },
    { re: /\bPortForward\b/, label: 'PortForward', path: '/sdk/portforward/classes/PortForward' },
    { re: /\bCp\b/, label: 'Cp', path: '/sdk/cp/classes/Cp' },
    { re: /\bLog\b/, label: 'Log', path: '/sdk/log/classes/Log', requires: /new\s+\w*\.?Log\b/ },
    { re: /\bMetrics\b/, label: 'Metrics', path: '/sdk/metrics/classes/Metrics' },
    { re: /\btopNodes\b/, label: 'topNodes', path: '/sdk/top/functions/topNodes' },
    { re: /\btopPods\b/, label: 'topPods', path: '/sdk/top/functions/topPods' },
    { re: /\bPatchStrategy\b/, label: 'PatchStrategy', path: '/sdk/patch/type-aliases/PatchStrategy' },
    {
        re: /\bKubernetesObjectApi\b/,
        label: 'KubernetesObjectApi',
        path: '/sdk/object/classes/KubernetesObjectApi',
    },
    { re: /\bloadYaml\b/, label: 'loadYaml', path: '/sdk/yaml/functions/loadYaml' },
    { re: /\bloadAllYaml\b/, label: 'loadAllYaml', path: '/sdk/yaml/functions/loadAllYaml' },
    { re: /\bdumpYaml\b/, label: 'dumpYaml', path: '/sdk/yaml/functions/dumpYaml' },
    { re: /\bHealth\b/, label: 'Health', path: '/sdk/health/classes/Health' },
];

// API classes → doc path
const API_PATTERNS = [
    { re: /\bCoreV1Api\b/, label: 'CoreV1Api', path: '/api-reference/core-resources/CoreV1Api' },
    { re: /\bAppsV1Api\b/, label: 'AppsV1Api', path: '/api-reference/workloads/AppsV1Api' },
    { re: /\bBatchV1Api\b/, label: 'BatchV1Api', path: '/api-reference/workloads/BatchV1Api' },
    {
        re: /\bNetworkingV1Api\b/,
        label: 'NetworkingV1Api',
        path: '/api-reference/networking/NetworkingV1Api',
    },
    {
        re: /\bCustomObjectsApi\b/,
        label: 'CustomObjectsApi',
        path: '/api-reference/other/CustomObjectsApi',
    },
    { re: /\bRbacAuthorizationV1Api\b/, label: 'RbacAuthorizationV1Api', path: '/api-reference/security/RbacAuthorizationV1Api' },
    { re: /\bStorageV1Api\b/, label: 'StorageV1Api', path: '/api-reference/configuration-storage/StorageV1Api' },
    { re: /\bAutoscalingV1Api\b/, label: 'AutoscalingV1Api', path: '/api-reference/other/AutoscalingV1Api' },
    { re: /\bAutoscalingV2Api\b/, label: 'AutoscalingV2Api', path: '/api-reference/other/AutoscalingV2Api' },
    { re: /\bPolicyV1Api\b/, label: 'PolicyV1Api', path: '/api-reference/configuration-storage/PolicyV1Api' },
    { re: /\bApiextensionsV1Api\b/, label: 'ApiextensionsV1Api', path: '/api-reference/cluster/ApiextensionsV1Api' },
    { re: /\bAdmissionregistrationV1Api\b/, label: 'AdmissionregistrationV1Api', path: '/api-reference/cluster/AdmissionregistrationV1Api' },
    { re: /\bEventsV1Api\b/, label: 'EventsV1Api', path: '/api-reference/core-resources/EventsV1Api' },
    { re: /\bDiscoveryV1Api\b/, label: 'DiscoveryV1Api', path: '/api-reference/networking/DiscoveryV1Api' },
    { re: /\bCoordinationV1Api\b/, label: 'CoordinationV1Api', path: '/api-reference/configuration-storage/CoordinationV1Api' },
    { re: /\bSchedulingV1Api\b/, label: 'SchedulingV1Api', path: '/api-reference/cluster/SchedulingV1Api' },
    { re: /\bCertificatesV1Api\b/, label: 'CertificatesV1Api', path: '/api-reference/security/CertificatesV1Api' },
    { re: /\bNodeV1Api\b/, label: 'NodeV1Api', path: '/api-reference/core-resources/NodeV1Api' },
];

// Heuristic: detect which specific CoreV1Api resource sub-page to link to
// based on method names in the source.
//
// K8s client methods follow the pattern:
//   verbNamespacedResource(...)   e.g. listNamespacedPod, createNamespacedService
//   verbResource(...)             e.g. listNamespace, createNamespace
//   verbResourceForAllNamespaces  e.g. listPodForAllNamespaces
//
// The resource name is always at the END of the method name (possibly followed
// by "ForAllNamespaces" or "Status" / "Scale" suffixes).  We use a helper to
// build regexes that anchor the resource name correctly so that e.g.
// "createNamespacedPod" matches Pod but NOT Namespace.
function resourceRe(resource) {
    return new RegExp(
        `\\b(?:list|create|read|delete|patch|replace)(?:Namespaced)?${resource}(?:ForAllNamespaces|Status|Scale)?\\b`,
    );
}

const CORE_RESOURCE_HINTS = [
    { re: resourceRe('Pod'), label: 'Pod operations', sub: 'pod' },
    { re: resourceRe('Namespace'), label: 'Namespace operations', sub: 'namespace' },
    { re: resourceRe('Service'), label: 'Service operations', sub: 'service' },
    { re: resourceRe('ConfigMap'), label: 'ConfigMap operations', sub: 'config-map' },
    { re: resourceRe('Secret'), label: 'Secret operations', sub: 'secret' },
    { re: resourceRe('Node'), label: 'Node operations', sub: 'node' },
    { re: resourceRe('PersistentVolumeClaim'), label: 'PVC operations', sub: 'persistent-volume-claim' },
    { re: resourceRe('ResourceQuota'), label: 'ResourceQuota operations', sub: 'resource-quota' },
    { re: resourceRe('Event'), label: 'Event operations', sub: 'event' },
    { re: resourceRe('Endpoints'), label: 'Endpoints operations', sub: 'endpoints' },
];

const APPS_RESOURCE_HINTS = [
    { re: resourceRe('Deployment'), label: 'Deployment operations', sub: 'deployment' },
    { re: resourceRe('StatefulSet'), label: 'StatefulSet operations', sub: 'stateful-set' },
    { re: resourceRe('DaemonSet'), label: 'DaemonSet operations', sub: 'daemon-set' },
    { re: resourceRe('ReplicaSet'), label: 'ReplicaSet operations', sub: 'replica-set' },
];

const BATCH_RESOURCE_HINTS = [
    // CronJob must come before Job to avoid false positive
    { re: resourceRe('CronJob'), label: 'CronJob operations', sub: 'cron-job' },
    { re: resourceRe('Job'), label: 'Job operations', sub: 'job' },
];

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

/** Resolve the repo root (two levels up from this script). */
const REPO_ROOT = path.resolve(new URL('.', import.meta.url).pathname, '../..');

function readExampleSource(exampleRelPath) {
    // exampleRelPath looks like "examples/example.js"
    const abs = path.join(REPO_ROOT, exampleRelPath);
    try {
        return fs.readFileSync(abs, 'utf8');
    } catch {
        return null;
    }
}

function detectLinks(source) {
    const links = [];
    const seen = new Set();

    const docsDir = path.join(REPO_ROOT, 'website', 'docs');

    /**
     * Resolve a doc path to the actual URL after SDK docs are flattened.
     *
     * Single-doc modules (attach, cp, exec, health, object, portforward, watch)
     * get merged into their module index: /sdk/exec/classes/Exec -> /sdk/exec
     *
     * Small modules (log, middleware, patch, types, yaml) get sub-dirs removed:
     * /sdk/yaml/functions/loadYaml -> /sdk/yaml/loadYaml
     *
     * Large modules (config, config_types, informer, cache, metrics, top) keep
     * their original structure.
     */
    const MERGED_MODULES = new Set(['attach', 'cp', 'exec', 'health', 'object', 'portforward', 'watch']);
    const FLATTENED_MODULES = new Set(['log', 'middleware', 'patch', 'types', 'yaml']);

    function resolveDocPath(docPath) {
        const parts = docPath.split('/');
        // Only transform /sdk/module/sub-dir/File paths
        if (parts[1] !== 'sdk' || parts.length <= 3) return docPath;

        const moduleName = parts[2];
        const fileName = parts[parts.length - 1];

        if (MERGED_MODULES.has(moduleName)) {
            // Single-doc module: content merged into module index
            return parts.slice(0, 3).join('/');
        }
        if (FLATTENED_MODULES.has(moduleName)) {
            // Small module: sub-dirs removed, files at module root
            // If filename matches module name (case-insensitive), it gets a -class slug
            // to avoid route collision with index.md
            let resolved = `${parts.slice(0, 3).join('/')}/${fileName}`;
            if (fileName.toLowerCase() === moduleName.toLowerCase()) {
                resolved += '-class';
            }
            return resolved;
        }
        // Large module: keep original path
        return docPath;
    }

    function add(label, docPath) {
        const resolved = resolveDocPath(docPath);
        if (seen.has(resolved)) return;
        seen.add(resolved);
        links.push({ label, path: resolved });
    }

    // SDK patterns
    for (const p of SDK_PATTERNS) {
        if (p.re.test(source)) {
            if (p.requires && !p.requires.test(source)) continue;
            add(p.label, p.path);
        }
    }

    // API patterns + sub-resource hints
    for (const p of API_PATTERNS) {
        if (!p.re.test(source)) continue;
        add(p.label, p.path);

        // Sub-resource hints for specific APIs
        let hints = [];
        if (p.label === 'CoreV1Api') hints = CORE_RESOURCE_HINTS;
        else if (p.label === 'AppsV1Api') hints = APPS_RESOURCE_HINTS;
        else if (p.label === 'BatchV1Api') hints = BATCH_RESOURCE_HINTS;

        for (const h of hints) {
            if (h.re.test(source)) {
                // Link to sub-page if it exists, otherwise use anchor on parent page.
                const subPath = `${p.path}/${h.sub}`;
                const subFile = path.join(REPO_ROOT, 'website', 'docs', subPath + '.md');
                const subDir = path.join(REPO_ROOT, 'website', 'docs', subPath);
                if (fs.existsSync(subFile) || fs.existsSync(path.join(subDir, 'index.md'))) {
                    add(h.label, subPath);
                } else {
                    // Fall back to anchor on parent page (resource group heading).
                    const anchor = h.sub;
                    add(h.label, `${p.path}#${anchor}`);
                }
            }
        }
    }

    return links;
}

/** Get the `title` attribute value from a CodeBlock JSX node. */
function getCodeBlockTitle(node) {
    if (!node.attributes) return null;
    for (const attr of node.attributes) {
        if (attr.type === 'mdxJsxAttribute' && attr.name === 'title') {
            return attr.value;
        }
    }
    return null;
}

/** Build a blockquote AST node: > **Related:** [A](link) · [B](link) */
function buildRelatedBlockquote(links) {
    // Build children: bold "Related:" then link · link · link
    const children = [
        { type: 'strong', children: [{ type: 'text', value: 'Related:' }] },
        { type: 'text', value: ' ' },
    ];

    for (let i = 0; i < links.length; i++) {
        if (i > 0) {
            children.push({ type: 'text', value: ' · ' });
        }
        children.push({
            type: 'link',
            url: links[i].path,
            children: [{ type: 'text', value: links[i].label }],
        });
    }

    return {
        type: 'blockquote',
        children: [{ type: 'paragraph', children }],
    };
}

/* ------------------------------------------------------------------ */
/*  Plugin                                                             */
/* ------------------------------------------------------------------ */

// v2
export default function remarkExampleLinks() {
    return (tree, file) => {
        // Only process files under docs/examples/
        const filePath = file.history?.[0] || file.path || '';
        if (!filePath.includes(path.join('docs', 'examples'))) return;

        // Collect insertions (index → node) to avoid mutating during visit
        const insertions = [];

        visit(tree, 'mdxJsxFlowElement', (node, index, parent) => {
            if (node.name !== 'CodeBlock') return;

            const title = getCodeBlockTitle(node);
            if (!title) return;

            const source = readExampleSource(title);
            if (!source) return;

            const links = detectLinks(source);
            if (links.length === 0) return;

            insertions.push({ parent, index, blockquote: buildRelatedBlockquote(links) });
        });

        // Insert in reverse order so indices stay valid
        for (let i = insertions.length - 1; i >= 0; i--) {
            const { parent, index, blockquote } = insertions[i];
            parent.children.splice(index + 1, 0, blockquote);
        }
    };
}
