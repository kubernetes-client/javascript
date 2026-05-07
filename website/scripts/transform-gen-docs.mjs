#!/usr/bin/env node

import { readFileSync, readdirSync, mkdirSync, writeFileSync, rmSync, statSync, existsSync } from 'node:fs';
import { dirname, extname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const CATEGORY_SLUG_BY_NAME = {
    'Core Resources': 'core-resources',
    Workloads: 'workloads',
    Networking: 'networking',
    Security: 'security',
    'Configuration & Storage': 'configuration-storage',
    Cluster: 'cluster',
    Other: 'other',
};

const CATEGORY_ORDER = [
    'Core Resources',
    'Workloads',
    'Networking',
    'Security',
    'Configuration & Storage',
    'Cluster',
    'Other',
];

const SKIP_CLASSES = new Set([
    'AdmissionregistrationApi', 'ApiextensionsApi', 'ApiregistrationApi', 'ApisApi',
    'AppsApi', 'AuthenticationApi', 'AuthorizationApi', 'AutoscalingApi', 'BatchApi',
    'CertificatesApi', 'CoordinationApi', 'CoreApi', 'DiscoveryApi', 'EventsApi',
    'FlowcontrolApiserverApi', 'InternalApiserverApi', 'LogsApi', 'NetworkingApi',
    'NodeApi', 'OpenidApi', 'PolicyApi', 'RbacAuthorizationApi', 'ResourceApi',
    'SchedulingApi', 'StorageApi', 'StoragemigrationApi', 'VersionApi', 'WellKnownApi',
]);

function toPosixPath(p) {
    return p.replaceAll('\\\\', '/');
}

function normalizeTitle(value) {
    return value.replace(/^\.+/, '');
}

function loadApiGroupMap(mapPath) {
    const raw = readFileSync(mapPath, 'utf8');
    return JSON.parse(raw);
}

function stripExistingFrontmatter(content) {
    if (!content.startsWith('---\n')) {
        return content;
    }

    const endMarker = content.indexOf('\n---\n', 4);
    if (endMarker === -1) {
        return content;
    }

    return content.slice(endMarker + '\n---\n'.length);
}

function rewriteLinks(content, apiGroupMap, warnings) {
    const apiLinkPattern = /\(([^)\s]+\.md)#([^)\s]+)\)/g;
    let result = content.replace(apiLinkPattern, (full, targetFile, anchor) => {
        const className = targetFile.replace(/\.md$/, '');
        if (!className.endsWith('Api')) {
            return full;
        }
        const meta = apiGroupMap[className];
        if (!meta) {
            warnings.push(`No api-group-map entry for ${className}`);
            return full;
        }

        const slug = CATEGORY_SLUG_BY_NAME[meta.category];
        if (!slug) {
            warnings.push(`No category slug mapping for category \"${meta.category}\" (${className})`);
            return full;
        }

        return `(/api-reference/${slug}/${className}#${anchor})`;
    });

    // README references: rewrite BearerToken to local authorization section, drop others to plain text.
    result = result.replace(/\[BearerToken\]\(README\.md#BearerToken\)/g, '[BearerToken](#authorization)');
    result = result.replace(/\[([^\]]+)\]\(README\.md#[^)]+\)/g, '$1');
    result = result.replace(/\(README\.md#[^)]+\)/g, '');

    return result;
}

// Sub-section headings that belong under each method and should be demoted to ####.
const METHOD_SUBSECTIONS = new Set([
    'Example',
    'Parameters',
    'Return type',
    'Authorization',
    'HTTP request headers',
    'HTTP response details',
]);

function normalizeHeadings(content) {
    let result = content;

    // Main title heading (# .CoreV1Api -> # CoreV1Api)
    result = result.replace(/^#\s+\.([^\n]+)$/m, (_, title) => `# ${normalizeTitle(title.trim())}`);

    // Method heading normalization with explicit anchor.
    const lines = result.split('\n');
    const out = [];

    for (let i = 0; i < lines.length; i += 1) {
        const line = lines[i];

        // Demote sub-section headings (### Example -> #### Example)
        const subSectionMatch = line.match(/^###\s+(.+)$/);
        if (subSectionMatch && METHOD_SUBSECTIONS.has(subSectionMatch[1].trim())) {
            out.push(`#### ${subSectionMatch[1].trim()}`);
            continue;
        }

        const boldMethodMatch = line.match(/^#\s+\*\*([^*]+)\*\*\s*$/);
        if (!boldMethodMatch) {
            out.push(line);
            continue;
        }

        const method = boldMethodMatch[1].trim();
        out.push(`## ${method}`);

        const nextLine = lines[i + 1] ?? '';
        const nextNextLine = lines[i + 2] ?? '';
        const alreadyAnchored = nextLine.trim() === '' && nextNextLine.trim() === `<a id=\"${method}\"></a>`;

        if (!alreadyAnchored) {
            out.push('');
            out.push(`<a id=\"${method}\"></a>`);
        }
    }

    result = out.join('\n');

    // Ensure any existing method anchor after ## heading is exactly one blank line then anchor.
    result = result.replace(
        /^##\s+([A-Za-z0-9_]+)\s*\n(?:\n)?(<a id=\"\1\"><\/a>)?/gm,
        (_, method) => `## ${method}\n\n<a id=\"${method}\"></a>\n`,
    );

    return result;
}

/**
 * Extract the Kubernetes resource name from an API method name.
 * e.g. "createNamespacedConfigMap" -> "ConfigMap"
 *      "connectGetNamespacedPodExec" -> "Pod"
 *      "deleteCollectionNamespacedPod" -> "Pod"
 *      "listPodForAllNamespaces" -> "Pod"
 */
function extractResource(method) {
    // connect methods: connectVerbNamespacedResource... or connectVerbResource...
    if (method.startsWith('connect')) {
        const withoutConnect = method.replace(/^connect[A-Z][a-z]+/, '');
        const withoutNs = withoutConnect.replace(/^Namespaced/, '');
        // Match longest known resource prefix
        for (const res of ['Pod', 'Service', 'Node']) {
            if (withoutNs.startsWith(res)) return res;
        }
        return withoutNs;
    }

    // Standard CRUD verbs
    const verbMatch = method.match(/^(create|deleteCollection|delete|list|patch|read|replace|get)(.*)/);
    if (!verbMatch) return method;

    let rest = verbMatch[2];
    rest = rest.replace(/^Namespaced/, '');
    rest = rest.replace(/ForAllNamespaces$/, '');

    // Map sub-resources to their parent resource
    const subResourceMap = [
        // Order matters: longer matches first
        ['PodBinding', 'Pod'],
        ['PodEviction', 'Pod'],
        ['PodEphemeralcontainers', 'Pod'],
        ['PodResize', 'Pod'],
        ['PodStatus', 'Pod'],
        ['PodLog', 'Pod'],
        ['PodTemplate', 'PodTemplate'],  // PodTemplate is its own resource, not a Pod sub-resource
        ['ServiceAccountToken', 'ServiceAccount'],
        ['ServiceAccount', 'ServiceAccount'],  // before Service
        ['NamespaceFinalize', 'Namespace'],
        ['ComponentStatus', 'ComponentStatus'],  // not a sub-resource of Component
    ];

    for (const [suffix, resource] of subResourceMap) {
        if (rest === suffix) return resource;
    }

    // Generic sub-resource pattern: FooStatus -> Foo, FooScale -> Foo
    const subResourceSuffix = rest.match(/^(.+?)(Status|Scale)$/);
    if (subResourceSuffix) {
        return subResourceSuffix[1];
    }

    return rest;
}

/** Verb priority for ordering methods within a resource group. */
function methodSortKey(method) {
    const order = [
        'create', 'read', 'list', 'patch', 'replace', 'delete', 'deleteCollection', 'connect',
    ];

    for (let i = 0; i < order.length; i++) {
        if (method.startsWith(order[i])) {
            // Sub-sort: plain resource first, then sub-resources (Status, Scale, Log, etc.)
            const isSubResource = /(?:Status|Scale|Log|Binding|Eviction|Ephemeralcontainers|Resize|Token|Finalize|Proxy|Attach|Exec|Portforward)/.test(method);
            const isForAllNamespaces = method.includes('ForAllNamespaces');
            const subPriority = isSubResource ? 1 : isForAllNamespaces ? 0.5 : 0;
            return i + subPriority;
        }
    }
    return order.length;
}

/** Human-readable label for a resource group. */
function resourceLabel(resource) {
    // Insert spaces before capitals: PersistentVolumeClaim -> Persistent Volume Claim
    return resource.replace(/([a-z])([A-Z])/g, '$1 $2');
}

/**
 * Group methods by resource and rewrite the markdown with resource-level headings.
 *
 * Transforms:
 *   ## methodName          ->  ## Resource
 *   #### Example                ### methodName
 *                               #### Example
 *
 * Also rebuilds the summary table grouped by resource.
 */
function groupByResource(content) {
    const lines = content.split('\n');

    // 1. Split into preamble (everything before first ## method) and method blocks.
    let preambleEnd = -1;
    const methodBlocks = []; // { name, lines, resource }

    for (let i = 0; i < lines.length; i++) {
        const match = lines[i].match(/^## ([A-Za-z0-9_]+)\s*$/);
        if (match) {
            if (preambleEnd === -1) preambleEnd = i;

            // Find the end of this method block (next ## or EOF).
            let end = lines.length;
            for (let j = i + 1; j < lines.length; j++) {
                if (/^## [A-Za-z0-9_]+\s*$/.test(lines[j])) {
                    end = j;
                    break;
                }
            }

            const name = match[1];
            methodBlocks.push({
                name,
                resource: extractResource(name),
                lines: lines.slice(i, end),
            });

            i = end - 1; // -1 because loop will i++
        }
    }

    // If no method blocks found, return as-is (non-API doc).
    if (methodBlocks.length === 0) return content;

    const preambleLines = lines.slice(0, preambleEnd);

    // 2. Group by resource.
    const resourceOrder = [];
    const resourceGroups = new Map();

    for (const block of methodBlocks) {
        if (!resourceGroups.has(block.resource)) {
            resourceOrder.push(block.resource);
            resourceGroups.set(block.resource, []);
        }
        resourceGroups.get(block.resource).push(block);
    }

    // Sort methods within each group by verb priority.
    for (const blocks of resourceGroups.values()) {
        blocks.sort((a, b) => methodSortKey(a.name) - methodSortKey(b.name));
    }

    // 3. Rebuild the summary table grouped by resource.
    //    Extract table rows from preamble (lines matching [**methodName**](link) | ...).
    const tableRowsByMethod = new Map();
    const tableHeaderLines = [];
    let inTable = false;

    for (const line of preambleLines) {
        if (line.startsWith('[**') && line.includes('|')) {
            const nameMatch = line.match(/\[\*\*(\w+)\*\*\]/);
            if (nameMatch) {
                tableRowsByMethod.set(nameMatch[1], line);
                inTable = true;
            }
        } else if (inTable && line.match(/^-{3,}/)) {
            // table separator line — skip, we'll regenerate
        } else if (line.startsWith('Method |') || line.startsWith('Method|')) {
            tableHeaderLines.push(line);
        } else if (line.match(/^-+\s*\|/)) {
            tableHeaderLines.push(line);
        }
    }

    // Extract descriptions from method blocks (the first non-empty text line after the > signature).
    const descByMethod = new Map();
    for (const block of methodBlocks) {
        let pastSignature = false;
        for (const line of block.lines) {
            if (line.startsWith('> ')) {
                pastSignature = true;
                continue;
            }
            if (pastSignature && line.trim() !== '') {
                // Stop at sub-sections — the description is before any #### heading
                if (line.startsWith('#')) break;
                descByMethod.set(block.name, line.trim());
                break;
            }
        }
    }

    // Build new preamble: everything before the table, then grouped table.
    const newPreambleLines = [];
    let seenTable = false;
    let skippingOldTable = false;

    for (const line of preambleLines) {
        // Detect the start of the old table (header line)
        if (!seenTable && (line.startsWith('Method |') || line.startsWith('Method|'))) {
            skippingOldTable = true;
            seenTable = true;
            continue;
        }

        // Skip the separator line right after table header
        if (skippingOldTable && line.match(/^-+\s*\|/)) {
            continue;
        }

        // Old table rows — skip and emit grouped table on first encounter
        if (line.startsWith('[**') && line.includes('|')) {
            if (skippingOldTable) {
                skippingOldTable = false;
                // Insert grouped table here
                for (const resource of resourceOrder) {
                    const label = resourceLabel(resource);
                    newPreambleLines.push('');
                    newPreambleLines.push(`### ${label}`);
                    newPreambleLines.push('');
                    newPreambleLines.push('Method | HTTP request | Description');
                    newPreambleLines.push('------------- | ------------- | -------------');
                    const blocks = resourceGroups.get(resource);
                    for (const block of blocks) {
                        let row = tableRowsByMethod.get(block.name);
                        if (row) {
                            // Inject description into the table row if the last column is empty
                            const desc = descByMethod.get(block.name);
                            if (desc && row.match(/\|\s*$/)) {
                                row = row.replace(/\|\s*$/, `| ${desc}`);
                            }
                            newPreambleLines.push(row);
                        }
                    }
                }
                newPreambleLines.push('');
            }
            continue;
        }

        newPreambleLines.push(line);
    }

    // 4. Rebuild method sections with resource group headings.
    //    ## Resource -> ### method, #### sub -> #### sub (keep), but we also need
    //    to demote: ## method -> ### method, #### sub -> ##### sub
    const outputLines = [...newPreambleLines];

    for (const resource of resourceOrder) {
        const label = resourceLabel(resource);
        const blocks = resourceGroups.get(resource);

        outputLines.push('');
        outputLines.push(`## ${label}`);
        outputLines.push('');

        for (const block of blocks) {
            for (const line of block.lines) {
                // Demote ## method -> ### method
                if (/^## [A-Za-z0-9_]+\s*$/.test(line)) {
                    outputLines.push(line.replace(/^## /, '### '));
                }
                // Demote #### sub-section -> ##### sub-section
                else if (/^#### /.test(line)) {
                    outputLines.push(line.replace(/^#### /, '##### '));
                }
                else {
                    outputLines.push(line);
                }
            }
        }
    }

    return outputLines.join('\n');
}

function fixImports(content) {
    return content
        .replace(/from\s+''/g, "from '@kubernetes/client-node'")
        .replace(/from\s+\"\"/g, "from '@kubernetes/client-node'");
}

const MODEL_GROUP_MAP = {
    'core': /^V1(Pod|Service|Node|Namespace|ConfigMap|Secret|Endpoint|Event|Binding|Component|LimitRange|PersistentVolume|ReplicationController|ResourceQuota|PodTemplate|ServiceAccount|API)/,
    'workloads': /^V1(Deployment|StatefulSet|DaemonSet|ReplicaSet|ControllerRevision|Job|CronJob|HorizontalPodAutoscaler|Scale)/,
    'networking': /^V1(Ingress|NetworkPolicy|EndpointSlice|IPAddress|ServiceCIDR)/,
    'security': /^V1(ClusterRole|Role|CertificateSigningRequest|TokenReview|SubjectAccessReview|SelfSubjectAccessReview|SelfSubjectRulesReview|LocalSubjectAccessReview|TokenRequest)/,
    'configuration-storage': /^V1(StorageClass|VolumeAttachment|CSI|Lease|FlowSchema|PriorityLevelConfiguration|PodDisruptionBudget)/,
    'cluster': /^V1(CustomResourceDefinition|MutatingWebhookConfiguration|ValidatingWebhookConfiguration|ValidatingAdmissionPolicy|PriorityClass|Scheduling|Admission)/,
};

function resolveModelPage(typeName) {
    const modelsDir = resolve(__dirname, '../../src/gen/models');
    if (!existsSync(join(modelsDir, `${typeName}.ts`))) return null;

    for (const [slug, pattern] of Object.entries(MODEL_GROUP_MAP)) {
        if (pattern.test(typeName)) return slug;
    }
    return 'other';
}

/** Max optional top-level params to keep in generated examples. */
const MAX_OPTIONAL_PARAMS = 3;
/** Examples longer than this (after truncation) get wrapped in <details>. */
const COLLAPSE_THRESHOLD = 40;

/**
 * Truncate bloated generated code examples and optionally collapse them.
 *
 * 1. For each ```typescript code block inside a method section (## heading):
 *    a. Find the `body: { ... }` object literal and replace it with a
 *       one-line placeholder that links to the model type.
 *    b. Keep all required top-level request fields (no "(optional)" comment)
 *       plus the first MAX_OPTIONAL_PARAMS optional ones, drop the rest.
 * 2. Wrap the example in a <details> block if the result exceeds
 *    COLLAPSE_THRESHOLD lines.
 */
function truncateExamples(content) {
    // Split content into method sections (## headings).
    // Process each section to truncate bloated examples.
    const lines = content.split('\n');
    const sections = [];
    let current = [];

    for (const line of lines) {
        if (line.startsWith('## ') && current.length > 0) {
            sections.push(current.join('\n'));
            current = [];
        }
        current.push(line);
    }
    if (current.length > 0) sections.push(current.join('\n'));

    const processed = sections.map(section => {
        if (!section.startsWith('## ')) return section;

        // Find the body param type from the parameter table.
        const bodyTypeMatch = section.match(
            /\*\*body\*\*\s*\|\s*(?:\*\*)?\[?\*?\*?(V\d\w+)\b/,
        );
        const bodyType = bodyTypeMatch?.[1] ?? null;
        const bodyModelPage = bodyType ? resolveModelPage(bodyType) : null;
        const bodyLink = bodyModelPage
            ? `See ${bodyType}: /models/${bodyModelPage}#${bodyType.toLowerCase()}`
            : bodyType
              ? `See ${bodyType} type definition`
              : 'See type definition in parameter table';

        // Process code blocks inside this section.
        return section.replace(
            /```typescript\n([\s\S]*?)```/g,
            (codeBlock, code) => {
                let codeLines = code.split('\n');

                // --- Step 1: Truncate body: { ... } ---
                codeLines = truncateBodyLiteral(codeLines, bodyLink);

                // --- Step 2: Trim optional params ---
                codeLines = trimOptionalParams(codeLines);

                const trimmedCode = codeLines.join('\n');
                const lineCount = codeLines.length;

                // --- Step 3: Collapse if still long ---
                if (lineCount > COLLAPSE_THRESHOLD) {
                    return `<details>\n<summary>Example</summary>\n\n\`\`\`typescript\n${trimmedCode}\`\`\`\n\n</details>`;
                }
                return `\`\`\`typescript\n${trimmedCode}\`\`\``;
            },
        );
    });

    return processed.join('\n');
}

/**
 * Replace `body: { ...deeply nested... }` with a single-line placeholder.
 */
function truncateBodyLiteral(lines, bodyLink) {
    const result = [];
    let i = 0;
    while (i < lines.length) {
        const line = lines[i];

        // Match `body: {` at request-field indent (2-6 leading spaces).
        if (/^\s{2,6}body:\s*\{/.test(line)) {
            // Track brace depth to find the matching close.
            let depth = 0;
            for (let j = i; j < lines.length; j++) {
                for (const ch of lines[j]) {
                    if (ch === '{') depth++;
                    if (ch === '}') depth--;
                }
                if (depth <= 0) {
                    // Extract indent from the original line.
                    const indent = line.match(/^(\s*)/)[1];
                    result.push(`${indent}body: { /* ${bodyLink} */ },`);
                    i = j + 1;
                    break;
                }
            }
            continue;
        }
        result.push(line);
        i++;
    }
    return result;
}

/**
 * Keep all required params + first MAX_OPTIONAL_PARAMS optional ones.
 * Optional params are identified by a preceding comment containing "(optional)".
 */
function trimOptionalParams(lines) {
    // Find the request object region: `const request: ...Request = {` ... `};`
    const reqStart = lines.findIndex(l => /^\s*const request:.*=\s*\{/.test(l));
    if (reqStart === -1) return lines;

    // Find matching `};`
    let depth = 0;
    let reqEnd = -1;
    for (let i = reqStart; i < lines.length; i++) {
        for (const ch of lines[i]) {
            if (ch === '{') depth++;
            if (ch === '}') depth--;
        }
        if (depth <= 0) { reqEnd = i; break; }
    }
    if (reqEnd === -1) return lines;

    // Parse fields inside the request object.
    // Each field is optionally preceded by a comment line containing "(optional)".
    // Field lines look like: `  name: "value",` or `  body: { /* ... */ },`
    const before = lines.slice(0, reqStart + 1);
    const inner = lines.slice(reqStart + 1, reqEnd);
    const after = lines.slice(reqEnd);

    const fields = [];      // { commentLines, fieldLines, isOptional }
    let currentComment = [];
    let currentField = [];
    let isOpt = false;
    let fieldDepth = 0;

    for (const line of inner) {
        const trimmed = line.trim();

        // Comment line
        if (trimmed.startsWith('//')) {
            // If we were accumulating a field, flush it.
            if (currentField.length > 0) {
                fields.push({ commentLines: currentComment, fieldLines: currentField, isOptional: isOpt });
                currentComment = [];
                currentField = [];
                isOpt = false;
            }
            currentComment.push(line);
            if (trimmed.includes('(optional)')) isOpt = true;
            continue;
        }

        // Blank line between fields
        if (trimmed === '' && fieldDepth === 0) {
            if (currentField.length > 0) {
                fields.push({ commentLines: currentComment, fieldLines: currentField, isOptional: isOpt });
                currentComment = [];
                currentField = [];
                isOpt = false;
            }
            // Keep blank lines as separators (will be re-added)
            continue;
        }

        // Track depth for multi-line field values
        for (const ch of line) {
            if (ch === '{' || ch === '[') fieldDepth++;
            if (ch === '}' || ch === ']') fieldDepth--;
        }
        currentField.push(line);

        if (fieldDepth <= 0) {
            fields.push({ commentLines: currentComment, fieldLines: currentField, isOptional: isOpt });
            currentComment = [];
            currentField = [];
            isOpt = false;
            fieldDepth = 0;
        }
    }
    // Flush last
    if (currentField.length > 0 || currentComment.length > 0) {
        fields.push({ commentLines: currentComment, fieldLines: currentField, isOptional: isOpt });
    }

    // Keep required fields + first N optional
    const kept = [];
    let optionalKept = 0;
    let droppedOptional = 0;
    for (const f of fields) {
        if (!f.isOptional) {
            kept.push(f);
        } else if (optionalKept < MAX_OPTIONAL_PARAMS) {
            kept.push(f);
            optionalKept++;
        } else {
            droppedOptional++;
        }
    }

    // Rebuild
    const newInner = [];
    for (const f of kept) {
        newInner.push(...f.commentLines, ...f.fieldLines);
    }
    if (droppedOptional > 0) {
        // Determine indent from first field
        const indent = kept[0]?.fieldLines[0]?.match(/^(\s*)/)?.[1] ?? '    ';
        newInner.push(`${indent}// ...${droppedOptional} more optional parameter(s)`);
    }

    return [...before, ...newInner, ...after];
}


/**
 * Strip per-method boilerplate sections that are identical across all methods.
 * Removes: Authorization, HTTP request headers, HTTP response details.
 * These are replaced by a single shared section injected at the API-page level.
 */
function stripBoilerplate(content) {
    // Remove #### Authorization ... #### next-section
    let result = content.replace(
        /^#{3,5} Authorization\n+\[BearerToken\]\(#authorization\)\n+/gm,
        '',
    );

    // Remove #### HTTP request headers ... #### next-section
    result = result.replace(
        /^#{3,5} HTTP request headers\n+(?:\s*-\s+\*\*(?:Content-Type|Accept)\*\*:.*\n)+\n*/gm,
        '',
    );

    // Remove #### HTTP response details ... (table until next heading or blank-line-then-heading)
    result = result.replace(
        /^#{3,5} HTTP response details\n+\|[^\n]*\n\|[-| ]*\n(?:\*\*\d+\*\*[^\n]*\n)*\n*/gm,
        '',
    );

    return result;
}

// Parameters that appear across many API methods and should link to a central reference page.
// Threshold: appears in 100+ methods. 'name' and 'namespace' excluded (context-specific descriptions).
const COMMON_PARAM_NAMES = new Set([
    'pretty', 'dryRun', 'fieldManager', 'fieldValidation',
    'labelSelector', 'fieldSelector', '_continue', 'limit',
    'resourceVersion', 'resourceVersionMatch', 'timeoutSeconds',
    'sendInitialEvents', 'gracePeriodSeconds', 'orphanDependents',
    'propagationPolicy', 'ignoreStoreReadErrorWithClusterBreakingPotential',
    'force', 'allowWatchBookmarks', 'watch',
]);

/**
 * Collect full (pre-truncation) descriptions for common parameters from raw source files.
 * Returns a Map<name, { type, description }>.
 */
function collectCommonParams(docsDir) {
    const params = new Map();
    for (const file of readdirSync(docsDir).filter(f => extname(f) === '.md')) {
        const content = readFileSync(join(docsDir, file), 'utf8');
        for (const m of content.matchAll(/^ \*\*(\w+)\*\* \| \[\*\*(\w+)\*\*\] \| (.+?) \| (.+)$/gm)) {
            const [, name, type, desc] = m;
            if (!COMMON_PARAM_NAMES.has(name)) continue;
            // Keep the longest description variant
            if (!params.has(name) || desc.length > params.get(name).description.length) {
                params.set(name, { type, description: desc });
            }
        }
    }
    return params;
}

/**
 * Decode HTML entities that the OpenAPI generator emits.
 */
function decodeHtmlEntities(str) {
    return str
        .replace(/&#x60;/g, '`')
        .replace(/&#x3D;/g, '=')
        .replace(/&quot;/g, '"')
        .replace(/\\""/g, '"')
        .replace(/\\&quot;/g, '"')
        .replace(/&amp;/g, '&')
        .replace(/&#39;/g, "'")
        .replace(/\\&#39;/g, "'")
        .replace(/\\_&quot;/g, '"')
        .replace(/\\&/g, '&');
}

/**
 * Generate the common-parameters.md reference page.
 */
function generateCommonParamsPage(outputDir, commonParams) {
    // Order params by logical grouping
    const order = [
        // Read / list
        'pretty', 'labelSelector', 'fieldSelector', 'limit', '_continue',
        'resourceVersion', 'resourceVersionMatch', 'timeoutSeconds',
        'watch', 'allowWatchBookmarks', 'sendInitialEvents',
        // Write
        'dryRun', 'fieldManager', 'fieldValidation', 'force',
        // Delete
        'gracePeriodSeconds', 'orphanDependents', 'propagationPolicy',
        'ignoreStoreReadErrorWithClusterBreakingPotential',
    ];

    const lines = [
        '---',
        'id: common-parameters',
        'title: Common Parameters',
        'sidebar_label: Common Parameters',
        'sidebar_position: 0',
        '---',
        '',
        '# Common Parameters',
        '',
        'These parameters appear across many Kubernetes API methods. Individual method pages link here for the full description.',
        '',
    ];

    for (const name of order) {
        const param = commonParams.get(name);
        if (!param) continue;
        const displayName = name === '_continue' ? 'continue' : name;
        const decoded = decodeHtmlEntities(param.description);
        lines.push(`## ${displayName} {#${name}}`);
        lines.push('');
        lines.push(`**Type:** \`${param.type}\``);
        lines.push('');
        lines.push(decoded);
        lines.push('');
    }

    writeFileSync(join(outputDir, 'common-parameters.md'), lines.join('\n'), 'utf8');
}

/**
 * Truncate overly verbose parameter descriptions in markdown tables.
 * Keeps the first sentence (up to ~120 chars) and drops the rest.
 * Also links common parameter names to the central reference page.
 */
function truncateParamDescriptions(content) {
    return content.replace(
        /^(\s*)\*\*(\w+)\*\*(\s*\|\s*\[?\*?\*?\w+\*?\*?\]?\s*\|\s*)(.+?)(\s*\|\s*\(optional\).*$)/gm,
        (full, indent, paramName, middle, desc, suffix) => {
            const isCommon = COMMON_PARAM_NAMES.has(paramName);
            // Link common params to the reference page
            const nameCol = isCommon
                ? `${indent}[**${paramName}**](/api-reference/common-parameters#${paramName})${middle}`
                : `${indent}**${paramName}**${middle}`;

            // For common params, replace description with a short version + link
            if (isCommon) {
                // Keep first sentence or truncate, then append link
                let shortDesc = desc;
                if (desc.length > 150) {
                    const sentenceEnd = desc.match(/^(.{40,140}?[.])\s/);
                    shortDesc = sentenceEnd ? sentenceEnd[1] : desc.slice(0, 120) + '...';
                }
                return `${nameCol}${shortDesc} [More info](/api-reference/common-parameters#${paramName})${suffix}`;
            }

            if (desc.length <= 150) return `${nameCol}${desc}${suffix}`;
            // Find first sentence boundary
            const sentenceEnd = desc.match(/^(.{40,140}?[.])\s/);
            if (sentenceEnd) {
                return `${nameCol}${sentenceEnd[1]}${suffix}`;
            }
            // No sentence boundary — hard truncate at 120
            return `${nameCol}${desc.slice(0, 120)}...${suffix}`;
        },
    );
}

/** Minimal body examples for common resource types. */
const MINIMAL_BODIES = {
    V1Pod: `{ apiVersion: "v1", kind: "Pod", metadata: { name: "example" }, spec: { containers: [{ name: "app", image: "nginx" }] } }`,
    V1Namespace: `{ apiVersion: "v1", kind: "Namespace", metadata: { name: "example" } }`,
    V1Service: `{ apiVersion: "v1", kind: "Service", metadata: { name: "example" }, spec: { selector: { app: "example" }, ports: [{ port: 80 }] } }`,
    V1ConfigMap: `{ apiVersion: "v1", kind: "ConfigMap", metadata: { name: "example" }, data: { key: "value" } }`,
    V1Secret: `{ apiVersion: "v1", kind: "Secret", metadata: { name: "example" }, stringData: { password: "secret" } }`,
    V1Deployment: `{ apiVersion: "apps/v1", kind: "Deployment", metadata: { name: "example" }, spec: { replicas: 1, selector: { matchLabels: { app: "example" } }, template: { metadata: { labels: { app: "example" } }, spec: { containers: [{ name: "app", image: "nginx" }] } } } }`,
    V1StatefulSet: `{ apiVersion: "apps/v1", kind: "StatefulSet", metadata: { name: "example" }, spec: { replicas: 1, selector: { matchLabels: { app: "example" } }, serviceName: "example", template: { metadata: { labels: { app: "example" } }, spec: { containers: [{ name: "app", image: "nginx" }] } } } }`,
    V1DaemonSet: `{ apiVersion: "apps/v1", kind: "DaemonSet", metadata: { name: "example" }, spec: { selector: { matchLabels: { app: "example" } }, template: { metadata: { labels: { app: "example" } }, spec: { containers: [{ name: "app", image: "nginx" }] } } } }`,
    V1Job: `{ apiVersion: "batch/v1", kind: "Job", metadata: { name: "example" }, spec: { template: { spec: { containers: [{ name: "job", image: "busybox", command: ["echo", "hello"] }], restartPolicy: "Never" } } } }`,
    V1CronJob: `{ apiVersion: "batch/v1", kind: "CronJob", metadata: { name: "example" }, spec: { schedule: "*/5 * * * *", jobTemplate: { spec: { template: { spec: { containers: [{ name: "job", image: "busybox", command: ["echo", "hello"] }], restartPolicy: "Never" } } } } } }`,
    V1Ingress: `{ apiVersion: "networking.k8s.io/v1", kind: "Ingress", metadata: { name: "example" }, spec: { rules: [{ host: "example.com", http: { paths: [{ path: "/", pathType: "Prefix", backend: { service: { name: "example", port: { number: 80 } } } }] } }] } }`,
};

/**
 * Replace generic body placeholder comments with minimal realistic examples
 * for well-known Kubernetes resource types.
 */
function inlineMinimalBodies(content) {
    return content.replace(
        /body: \{ \/\* See (V\d\w+): ([^\*]+) \*\/ \}/g,
        (full, typeName, modelLink) => {
            const minimal = MINIMAL_BODIES[typeName];
            if (minimal) {
                return `body: ${minimal}, // See full type: ${modelLink.trim()}`;
            }
            return full;
        },
    );
}


function cleanupContent(content) {
    let result = content;

    // Decode HTML entities left by the OpenAPI code generator.
    result = result.replace(/\\?&quot;/g, '"');
    result = result.replace(/\\?&#39;/g, "'");
    result = result.replace(/\\?&amp;/g, '&');
    result = result.replace(/\\?&lt;/g, '<');
    result = result.replace(/\\?&gt;/g, '>');
    result = result.replace(/&#x60;/g, '`');
    result = result.replace(/&#x3D;/g, '=');
    result = result.replace(/&#x([0-9a-fA-F]+);/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)));

    // Footer cleanup
    result = result.replace(/^\[\[Back to top\]\].*$/gm, '');

    result = result.replace(
        /^((?:>\s+)?)(V\d(?:alpha\d|beta\d)?[A-Z]\w+)((?:\s+\w+\(.*\))?)$/gm,
        (full, prefix, typeName, methodSig) => {
            const page = resolveModelPage(typeName);
            if (!page) return full;
            const link = `/models/${page}#${typeName.toLowerCase()}`;
            if (methodSig) {
                return `${prefix}[${typeName}](${link})${methodSig}`;
            }
            return `${prefix}[${typeName}](${link})`;
        },
    );
    result = result.replace(
        /\*\*(V\d(?:alpha\d|beta\d)?[A-Z]\w+)\*\*/g,
        (full, typeName) => {
            const page = resolveModelPage(typeName);
            if (!page) return full;
            return `**[${typeName}](/models/${page}#${typeName.toLowerCase()})**`;
        },
    );
    // Also link types in parameter table body column: **body** | **V1Pod** | ...
    result = result.replace(
        /\*\*(V\d(?:alpha\d|beta\d)?[A-Z]\w+)\*\*/g,
        (full, typeName) => `**[${typeName}](${K8S_SOURCE_BASE}/${typeName}.ts)**`,
    );

    // Unbold model names in return signatures and return type sections
    result = result.replace(/^>\s+\*\*([^*]+)\*\*(\s+.+)$/gm, '> $1$2');
    result = result.replace(/^\*\*([^*]+)\*\*$/gm, '$1');

    // Trim trailing spaces and collapse excessive end-newlines.
    result = result
        .split('\n')
        .map((line) => line.replace(/\s+$/g, ''))
        .join('\n')
        .replace(/\n{3,}/g, '\n\n')
        .replace(/\s*$/g, '\n');

    return result;
}

function makeFrontmatter({ id, title, sidebarLabel, sidebarPosition }) {
    return [
        '---',
        `id: ${id}`,
        `title: ${title}`,
        `sidebar_label: ${sidebarLabel}`,
        `sidebar_position: ${sidebarPosition}`,
        'toc_max_heading_level: 2',
        '---',
        '',
    ].join('\n');
}

export function transformMarkdown(content, { className, sidebarPosition, apiGroupMap, warnings }) {
    const withoutFrontmatter = stripExistingFrontmatter(content);
    const title = normalizeTitle(className);

    let transformed = withoutFrontmatter;
    transformed = normalizeHeadings(transformed);
    transformed = rewriteLinks(transformed, apiGroupMap, warnings);
    transformed = fixImports(transformed);
    transformed = truncateExamples(transformed);
    transformed = inlineMinimalBodies(transformed);
    transformed = stripBoilerplate(transformed);
    transformed = truncateParamDescriptions(transformed);
    transformed = groupByResource(transformed);
    transformed = cleanupContent(transformed);

    const frontmatter = makeFrontmatter({
        id: className,
        title,
        sidebarLabel: title,
        sidebarPosition,
    });

    return `${frontmatter}${transformed}`;
}

function buildCategoryIndex(apiGroupMap) {
    const byCategory = new Map(CATEGORY_ORDER.map((category) => [category, []]));

    for (const className of Object.keys(apiGroupMap).sort()) {
        const category = apiGroupMap[className]?.category ?? 'Other';
        if (!byCategory.has(category)) {
            byCategory.set(category, []);
        }
        byCategory.get(category).push(className);
    }

    return byCategory;
}

function writeCategoryFiles(outputRoot) {
    CATEGORY_ORDER.forEach((category, index) => {
        const slug = CATEGORY_SLUG_BY_NAME[category];
        if (!slug) {
            return;
        }

        const categoryDir = join(outputRoot, slug);
        mkdirSync(categoryDir, { recursive: true });

        const categoryMeta = {
            label: category,
            position: index + 1,
        };

        writeFileSync(
            join(categoryDir, '_category_.json'),
            `${JSON.stringify(categoryMeta, null, 2)}\n`,
            'utf8',
        );
    });
}

/** Size threshold in bytes above which a file gets split by resource group. */
const SPLIT_THRESHOLD = 500 * 1024;

/**
 * Convert a resource label like "Persistent Volume Claim" to a URL-safe slug.
 */
function resourceSlug(label) {
    return label.replace(/\s+/g, '-').toLowerCase();
}

/**
 * Split large API reference files into per-resource pages.
 *
 * For a file like CoreV1Api.md (2MB), creates:
 *   CoreV1Api/index.md        — summary table with links
 *   CoreV1Api/pod.md           — Pod resource methods
 *   CoreV1Api/service.md       — Service resource methods
 *   ...
 *
 * Then updates all cross-references in other files.
 */
function splitLargeFiles(outputRoot, warnings) {
    const splitResults = [];

    for (const slug of Object.values(CATEGORY_SLUG_BY_NAME)) {
        const categoryDir = join(outputRoot, slug);
        let files;
        try {
            files = readdirSync(categoryDir).filter((f) => extname(f) === '.md');
        } catch {
            continue;
        }

        for (const file of files) {
            const filePath = join(categoryDir, file);
            const stat = statSync(filePath);
            if (stat.size < SPLIT_THRESHOLD) continue;

            const className = file.replace(/\.md$/, '');
            const content = readFileSync(filePath, 'utf8');
            const result = splitSingleFile(content, className, categoryDir, slug, warnings);
            if (result) {
                splitResults.push(result);
                // Remove the original monolithic file.
                rmSync(filePath);
            }
        }
    }

    // Rewrite cross-references in ALL files to point to split pages.
    if (splitResults.length > 0) {
        rewriteSplitReferences(outputRoot, splitResults);
        // Also rewrite versioned docs.
        const versionedDir = resolve(outputRoot, '../../versioned_docs');
        try {
            for (const versionEntry of readdirSync(versionedDir, { withFileTypes: true })) {
                if (versionEntry.isDirectory()) {
                    const versionedApiRef = join(versionedDir, versionEntry.name, 'api-reference');
                    try {
                        rewriteSplitReferences(versionedApiRef, splitResults);
                    } catch {
                        // No api-reference in this version, skip.
                    }
                }
            }
        } catch {
            // No versioned_docs dir, skip.
        }
    }

    return splitResults;
}

function splitSingleFile(content, className, categoryDir, categorySlug, warnings) {
    const lines = content.split('\n');

    // Extract frontmatter.
    let frontmatterEnd = 0;
    if (lines[0] === '---') {
        for (let i = 1; i < lines.length; i++) {
            if (lines[i] === '---') {
                frontmatterEnd = i + 1;
                break;
            }
        }
    }

    // Find preamble end and resource sections.
    // Preamble = everything from after frontmatter to the first ## Resource heading.
    // Resource sections start with ^## ResourceLabel$
    const sections = []; // { label, slug, startLine, endLine }
    let preambleEnd = lines.length;

    for (let i = frontmatterEnd; i < lines.length; i++) {
        const match = lines[i].match(/^## (.+)$/);
        if (match) {
            if (sections.length === 0) {
                preambleEnd = i;
            } else {
                sections[sections.length - 1].endLine = i;
            }
            const label = match[1];
            sections.push({ label, slug: resourceSlug(label), startLine: i, endLine: lines.length });
        }
    }

    if (sections.length < 2) {
        warnings.push(`${className}: only ${sections.length} sections, skipping split`);
        return null;
    }

    // Create subdirectory.
    const subDir = join(categoryDir, className);
    mkdirSync(subDir, { recursive: true });

    // Write _category_.json for Docusaurus sidebar.
    // Extract sidebar_position from frontmatter.
    const posMatch = content.match(/sidebar_position:\s*(\d+)/);
    const sidebarPosition = posMatch ? parseInt(posMatch[1], 10) : 1;

    writeFileSync(
        join(subDir, '_category_.json'),
        JSON.stringify({ label: className, position: sidebarPosition }, null, 2) + '\n',
        'utf8',
    );

    // Build the index page with grouped summary tables.
    // Take preamble lines (title, "All URIs..." text, summary tables).
    const preambleContent = lines.slice(frontmatterEnd, preambleEnd);

    // Rewrite summary table links: #methodName -> ./resource-slug#methodName
    const methodToSlug = new Map();
    for (const section of sections) {
        for (let i = section.startLine; i < section.endLine; i++) {
            const methodMatch = lines[i].match(/^### ([a-zA-Z0-9_]+)\s*$/);
            if (methodMatch) {
                methodToSlug.set(methodMatch[1], section.slug);
            }
        }
    }

    const rewrittenPreamble = preambleContent.map((line) => {
        // Rewrite method links in summary table: #method -> ./slug#method
        return line.replace(
            new RegExp(`(${className}#)(\\w+)`, 'g'),
            (full, prefix, method) => {
                const slug = methodToSlug.get(method);
                if (slug) return `${className}/${slug}#${method}`;
                return full;
            },
        );
    });

    const indexFrontmatter = [
        '---',
        `id: ${className}`,
        `title: ${className}`,
        `sidebar_label: ${className}`,
        'toc_max_heading_level: 3',
        '---',
        '',
    ].join('\n');

    writeFileSync(
        join(subDir, 'index.md'),
        indexFrontmatter + rewrittenPreamble.join('\n') + '\n',
        'utf8',
    );

    // Write individual resource pages.
    for (let si = 0; si < sections.length; si++) {
        const section = sections[si];
        const sectionLines = lines.slice(section.startLine, section.endLine);

        // Promote headings back up: ## Resource -> # Resource, ### method -> ## method, ##### -> ####
        const promotedLines = sectionLines.map((line) => {
            if (/^## /.test(line)) return line.replace(/^## /, '# ');
            if (/^### /.test(line)) return line.replace(/^### /, '## ');
            if (/^##### /.test(line)) return line.replace(/^##### /, '#### ');
            return line;
        });

        const pageFrontmatter = [
            '---',
            `id: ${section.slug}`,
            `title: "${className}: ${section.label}"`,
            `sidebar_label: ${section.label}`,
            `sidebar_position: ${si + 1}`,
            'toc_max_heading_level: 2',
            '---',
            '',
        ].join('\n');

        writeFileSync(
            join(subDir, `${section.slug}.md`),
            pageFrontmatter + promotedLines.join('\n') + '\n',
            'utf8',
        );
    }

    return {
        className,
        categorySlug,
        methods: methodToSlug, // Map<methodName, resourceSlug>
    };
}

/**
 * Rewrite cross-references across ALL output files to point to split pages.
 * e.g. /api-reference/core-resources/CoreV1Api#createNamespacedPod
 *   -> /api-reference/core-resources/CoreV1Api/pod#createNamespacedPod
 */
function rewriteSplitReferences(outputRoot, splitResults) {
    // Build lookup: className -> Map<method, resourceSlug>
    const lookup = new Map();
    for (const result of splitResults) {
        lookup.set(result.className, { categorySlug: result.categorySlug, methods: result.methods });
    }

    // Walk all markdown files.
    function walkDir(dir) {
        for (const entry of readdirSync(dir, { withFileTypes: true })) {
            const fullPath = join(dir, entry.name);
            if (entry.isDirectory()) {
                walkDir(fullPath);
            } else if (entry.isFile() && extname(entry.name) === '.md') {
                let content = readFileSync(fullPath, 'utf8');
                let changed = false;

                for (const [className, { categorySlug, methods }] of lookup) {
                    // Match links like /api-reference/slug/ClassName#method
                    const pattern = new RegExp(
                        `(/api-reference/${categorySlug}/${className})#(\\w+)`,
                        'g',
                    );

                    content = content.replace(pattern, (full, base, method) => {
                        const resSlug = methods.get(method);
                        if (resSlug) {
                            changed = true;
                            return `${base}/${resSlug}#${method}`;
                        }
                        return full;
                    });
                }

                if (changed) {
                    writeFileSync(fullPath, content, 'utf8');
                }
            }
        }
    }

    walkDir(outputRoot);
}

function validateOutputs(outputRoot, warnings) {
    const mdFiles = [];

    function collectMdFiles(dir) {
        for (const entry of readdirSync(dir, { withFileTypes: true })) {
            const fullPath = join(dir, entry.name);
            if (entry.isDirectory()) {
                collectMdFiles(fullPath);
            } else if (entry.isFile() && extname(entry.name) === '.md') {
                mdFiles.push(fullPath);
            }
        }
    }

    for (const slug of Object.values(CATEGORY_SLUG_BY_NAME)) {
        const dir = join(outputRoot, slug);
        try {
            collectMdFiles(dir);
        } catch {
            continue;
        }
    }

    for (const filePath of mdFiles) {
        const raw = readFileSync(filePath, 'utf8');
        if (raw.includes("from ''") || raw.includes('from ""')) {
            throw new Error(`Validation failed: empty import path in ${filePath}`);
        }
        if (!raw.startsWith('---\n')) {
            throw new Error(`Validation failed: missing frontmatter in ${filePath}`);
        }
        if (/^#\s+\./m.test(raw)) {
            throw new Error(`Validation failed: dotted title heading remains in ${filePath}`);
        }
    }

    return { fileCount: mdFiles.length, warningCount: warnings.length };
}

export function runTransform({
    docsDir = resolve(__dirname, '../../src/gen/docs'),
    outputDir = resolve(__dirname, '../docs/api-reference'),
    mapPath = resolve(__dirname, './api-group-map.json'),
} = {}) {
    const apiGroupMap = loadApiGroupMap(mapPath);
    const byCategory = buildCategoryIndex(apiGroupMap);
    const warnings = [];

    const inputFiles = readdirSync(docsDir)
        .filter((name) => extname(name) === '.md')
        .sort((a, b) => a.localeCompare(b));

    // Collect full common parameter descriptions before any truncation.
    const commonParams = collectCommonParams(docsDir);

    // Clean output tree for deterministic idempotent output.
    rmSync(outputDir, { recursive: true, force: true });
    mkdirSync(outputDir, { recursive: true });
    writeCategoryFiles(outputDir);

    // Generate common parameters reference page.
    generateCommonParamsPage(outputDir, commonParams);

    for (const [categoryIndex, category] of CATEGORY_ORDER.entries()) {
        const slug = CATEGORY_SLUG_BY_NAME[category];
        const classNames = (byCategory.get(category) ?? []).slice().sort((a, b) => a.localeCompare(b));

        for (const className of classNames) {
            if (SKIP_CLASSES.has(className)) continue;

            const inputFileName = `${className}.md`;
            if (!inputFiles.includes(inputFileName)) {
                warnings.push(`Missing input markdown for ${className}`);
                continue;
            }

            const inputPath = join(docsDir, inputFileName);
            const outputPath = join(outputDir, slug, inputFileName);
            const source = readFileSync(inputPath, 'utf8');
            const sidebarPosition = classNames.indexOf(className) + 1;

            const transformed = transformMarkdown(source, {
                className,
                sidebarPosition,
                apiGroupMap,
                warnings,
            });

            writeFileSync(outputPath, transformed, 'utf8');
        }

        void categoryIndex;
    }

    // Process any input file not represented in map as "Other".
    const mappedNames = new Set(Object.keys(apiGroupMap));
    const unmappedInputs = inputFiles
        .map((f) => f.replace(/\.md$/, ''))
        .filter((className) => !mappedNames.has(className) && !SKIP_CLASSES.has(className))
        .sort((a, b) => a.localeCompare(b));

    for (const className of unmappedInputs) {
        warnings.push(`Unmapped class ${className}; emitted under Other`);
        const inputPath = join(docsDir, `${className}.md`);
        const outputPath = join(outputDir, CATEGORY_SLUG_BY_NAME.Other, `${className}.md`);
        const source = readFileSync(inputPath, 'utf8');
        const existingCount = readdirSync(join(outputDir, CATEGORY_SLUG_BY_NAME.Other)).filter((f) =>
            f.endsWith('.md'),
        ).length;

        const transformed = transformMarkdown(source, {
            className,
            sidebarPosition: existingCount + 1,
            apiGroupMap,
            warnings,
        });
        writeFileSync(outputPath, transformed, 'utf8');
    }

    // Split large files into per-resource pages.
    const splitResults = splitLargeFiles(outputDir, warnings);

    const { fileCount, warningCount } = validateOutputs(outputDir, warnings);
    return { fileCount, warningCount, splitCount: splitResults.length, outputDir: toPosixPath(outputDir) };
}

if (process.argv[1] && resolve(process.argv[1]) === __filename) {
    const result = runTransform();
    console.log(`Transformed ${result.fileCount} files (${result.splitCount} split) with ${result.warningCount} warnings`);
}
