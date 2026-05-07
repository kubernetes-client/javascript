#!/usr/bin/env node

/**
 * Generates model reference pages from TypeScript source files.
 * Only includes models that are actually referenced in the API docs.
 * Groups models into a small number of pages by API group prefix.
 */

import { readFileSync, readdirSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const MODELS_DIR = resolve(__dirname, '../../src/gen/models');
const API_DOCS_DIR = resolve(__dirname, '../docs/api-reference');
const OUTPUT_DIR = resolve(__dirname, '../docs/models');
const GITHUB_BASE = 'https://github.com/kubernetes-client/javascript/blob/main/src/gen/models';

function collectReferencedTypes() {
    const types = new Set();
    const pattern = /V\d(?:alpha\d|beta\d)?[A-Z][A-Za-z]*/g;

    function walkDir(dir) {
        for (const entry of readdirSync(dir, { withFileTypes: true })) {
            const full = join(dir, entry.name);
            if (entry.isDirectory()) {
                walkDir(full);
            } else if (entry.name.endsWith('.md')) {
                const content = readFileSync(full, 'utf8');
                for (const match of content.matchAll(pattern)) {
                    const name = match[0];
                    if (!name.endsWith('Api')) {
                        const tsFile = join(MODELS_DIR, `${name}.ts`);
                        if (existsSync(tsFile)) types.add(name);
                    }
                }
            }
        }
    }

    walkDir(API_DOCS_DIR);
    return [...types].sort();
}

function parseModelFile(typeName) {
    const filePath = join(MODELS_DIR, `${typeName}.ts`);
    const content = readFileSync(filePath, 'utf8');

    const classDocMatch = content.match(/\/\*\*\s*\n\s*\*\s*(.+?)\s*\n\s*\*\//);
    let description = '';

    const lines = content.split('\n');
    for (let i = 0; i < lines.length; i++) {
        if (lines[i].includes('export class')) {
            if (i > 0 && lines[i - 1].trim() === '*/') {
                for (let j = i - 1; j >= 0; j--) {
                    if (lines[j].trim().startsWith('/**')) {
                        const block = lines.slice(j, i).join('\n');
                        const descMatch = block.match(/\*\s*([^@*][^\n]*)/);
                        if (descMatch) description = descMatch[1].trim();
                        break;
                    }
                }
            }
            break;
        }
    }

    const properties = [];
    const propPattern = /\/\*\*\s*\n\s*\*\s*(.*?)\s*\n\s*\*\/\s*\n\s*'(\w+)'\??\s*:\s*([^;]+)/g;
    let propMatch;
    while ((propMatch = propPattern.exec(content)) !== null) {
        properties.push({
            doc: propMatch[1].trim(),
            name: propMatch[2],
            type: propMatch[3].trim(),
        });
    }

    const bareProps = /^\s+'(\w+)'\??\s*:\s*([^;]+);/gm;
    const documentedNames = new Set(properties.map(p => p.name));
    let bareMatch;
    while ((bareMatch = bareProps.exec(content)) !== null) {
        if (!documentedNames.has(bareMatch[1]) && bareMatch[1] !== 'discriminator' && bareMatch[1] !== 'mapping' && bareMatch[1] !== 'attributeTypeMap') {
            properties.push({
                doc: '',
                name: bareMatch[1],
                type: bareMatch[2].trim(),
            });
        }
    }

    return { typeName, description, properties };
}

function formatType(typeStr) {
    return typeStr
        .replace(/Array<(\w+)>/g, '$1[]')
        .replace(/\{ \[key: string\]: string; \}/g, 'Record<string, string>');
}

function typeLink(typeStr) {
    return typeStr.replace(
        /\b(V\d(?:alpha\d|beta\d)?[A-Z]\w+)\b/g,
        (m) => {
            const tsFile = join(MODELS_DIR, `${m}.ts`);
            if (existsSync(tsFile)) return `[${m}](#${m.toLowerCase()})`;
            return m;
        }
    );
}

const GROUP_MAP = {
    'Core': /^V1(Pod|Service|Node|Namespace|ConfigMap|Secret|Endpoint|Event|Binding|Component|LimitRange|PersistentVolume|ReplicationController|ResourceQuota|PodTemplate|ServiceAccount|API)/,
    'Workloads': /^V1(Deployment|StatefulSet|DaemonSet|ReplicaSet|ControllerRevision|Job|CronJob|HorizontalPodAutoscaler|Scale)/,
    'Networking': /^V1(Ingress|NetworkPolicy|EndpointSlice|IPAddress|ServiceCIDR)/,
    'Security': /^V1(ClusterRole|Role|CertificateSigningRequest|TokenReview|SubjectAccessReview|SelfSubjectAccessReview|SelfSubjectRulesReview|LocalSubjectAccessReview|TokenRequest)/,
    'Configuration & Storage': /^V1(StorageClass|VolumeAttachment|CSI|Lease|FlowSchema|PriorityLevelConfiguration|PodDisruptionBudget)/,
    'Cluster': /^V1(CustomResourceDefinition|MutatingWebhookConfiguration|ValidatingWebhookConfiguration|ValidatingAdmissionPolicy|PriorityClass|Scheduling|Admission)/,
};

function groupType(typeName) {
    for (const [group, pattern] of Object.entries(GROUP_MAP)) {
        if (pattern.test(typeName)) return group;
    }
    return 'Other';
}

/**
 * Scan API reference docs to find which methods use each model type
 * (as body param or return type). Returns a Map of typeName -> [{ method, page }].
 */
function collectModelUsage() {
    const usage = new Map();
    const pattern = /\b(V\d(?:alpha\d|beta\d)?[A-Z]\w+)\b/g;

    function walkDir(dir) {
        for (const entry of readdirSync(dir, { withFileTypes: true })) {
            const full = join(dir, entry.name);
            if (entry.isDirectory()) {
                walkDir(full);
            } else if (entry.name.endsWith('.md')) {
                const content = readFileSync(full, 'utf8');
                // Find method headings and their associated types
                const lines = content.split('\n');
                let currentMethod = null;
                // Derive the page path from the file path
                const relPath = full.replace(/.*\/docs\//, '/').replace(/\.md$/, '').replace(/\/index$/, '');
                for (const line of lines) {
                    const methodMatch = line.match(/^#{2,3}\s+([a-z]\w+)\s*$/);
                    if (methodMatch) {
                        currentMethod = methodMatch[1];
                        continue;
                    }
                    if (!currentMethod) continue;
                    // Look for model types in signature, param table, and return type lines
                    if (line.includes('V1') || line.includes('V2')) {
                        for (const m of line.matchAll(pattern)) {
                            const typeName = m[0];
                            if (typeName.endsWith('Api') || typeName.endsWith('Request')) continue;
                            if (!usage.has(typeName)) usage.set(typeName, []);
                            const refs = usage.get(typeName);
                            const ref = { method: currentMethod, page: relPath };
                            // Deduplicate
                            if (!refs.some(r => r.method === ref.method && r.page === ref.page)) {
                                refs.push(ref);
                            }
                        }
                    }
                    // Reset on next heading
                    if (line.match(/^#{2,3}\s/)) currentMethod = null;
                }
            }
        }
    }

    walkDir(API_DOCS_DIR);
    return usage;
}

function generateModelPage(group, models, modelUsage) {
    const slug = group.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const lines = [
        '---',
        `id: ${slug}`,
        `title: "API Models: ${group}"`,
        `sidebar_label: ${group}`,
        'toc_max_heading_level: 2',
        '---',
        '',
        `# ${group} Models`,
        '',
    ];

    for (const model of models) {
        lines.push(`## ${model.typeName}`);
        lines.push('');
        if (model.description) {
            lines.push(model.description);
            lines.push('');
        }
        lines.push(`[Source](${GITHUB_BASE}/${model.typeName}.ts)`);
        lines.push('');

        if (model.properties.length > 0) {
            lines.push('| Property | Type | Description |');
            lines.push('|----------|------|-------------|');
            for (const prop of model.properties) {
                const type = typeLink(formatType(prop.type));
                const doc = prop.doc.length > 200
                    ? prop.doc.slice(0, 200).replace(/\s\S*$/, '') + '...'
                    : prop.doc;
                lines.push(`| \`${prop.name}\` | \`${type}\` | ${doc} |`);
            }
            lines.push('');
        }

        // Add "Used by" reverse links to API methods
        const refs = modelUsage?.get(model.typeName);
        if (refs && refs.length > 0) {
            // Deduplicate by page and pick at most 8 representative methods
            const byPage = new Map();
            for (const ref of refs) {
                if (!byPage.has(ref.page)) byPage.set(ref.page, []);
                byPage.get(ref.page).push(ref.method);
            }
            const links = [];
            for (const [page, methods] of byPage) {
                const label = page.split('/').pop();
                const methodAnchors = methods.slice(0, 3).map(m => `[\`${m}\`](${page}#${m})`);
                links.push(...methodAnchors);
            }
            if (links.length > 0) {
                const INLINE_LIMIT = 20;
                if (links.length <= INLINE_LIMIT) {
                    lines.push(`**Used by:** ${links.join(' · ')}`);
                } else {
                    const shown = links.slice(0, INLINE_LIMIT);
                    const rest = links.slice(INLINE_LIMIT);
                    lines.push(`**Used by:** ${shown.join(' · ')}`);
                    lines.push('');
                    lines.push(`<details><summary>and ${rest.length} more…</summary>`);
                    lines.push('');
                    lines.push(rest.join(' · '));
                    lines.push('');
                    lines.push('</details>');
                }
                lines.push('');
            }
        }
    }

    return { slug, content: lines.join('\n') };
}

export function generateModels() {
    const referencedTypes = collectReferencedTypes();
    console.log(`Found ${referencedTypes.length} referenced model types`);

    const models = referencedTypes.map(parseModelFile);
    const modelUsage = collectModelUsage();

    const groups = new Map();
    for (const model of models) {
        const group = groupType(model.typeName);
        if (!groups.has(group)) groups.set(group, []);
        groups.get(group).push(model);
    }

    mkdirSync(OUTPUT_DIR, { recursive: true });

    const groupOrder = ['Core', 'Workloads', 'Networking', 'Security', 'Configuration & Storage', 'Cluster', 'Other'];
    let position = 1;
    const results = [];

    for (const group of groupOrder) {
        const groupModels = groups.get(group);
        if (!groupModels || groupModels.length === 0) continue;

        const { slug, content } = generateModelPage(group, groupModels, modelUsage);
        writeFileSync(join(OUTPUT_DIR, `${slug}.md`), content, 'utf8');
        results.push({ group, slug, count: groupModels.length });
        position++;
    }

    writeFileSync(
        join(OUTPUT_DIR, '_category_.json'),
        JSON.stringify({ label: 'API Models', position: 4 }, null, 2) + '\n',
        'utf8',
    );

    return results;
}

if (process.argv[1] && resolve(process.argv[1]) === __filename) {
    const results = generateModels();
    for (const r of results) {
        console.log(`  ${r.group}: ${r.count} models -> ${r.slug}.md`);
    }
}
