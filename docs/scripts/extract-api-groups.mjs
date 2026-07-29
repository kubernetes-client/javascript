#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// -----------------------------------------------------------------------------
// The ONLY hand-maintained taxonomy: which display category each API group
// belongs to. This is an editorial decision (how we want to bucket groups in
// the sidebar) and cannot be derived from the spec. Everything else below is
// derived from src/gen/swagger.json so that new Kubernetes API groups/versions
// are picked up automatically instead of silently landing in "Other".
//
// Keyed by the group token as it appears in swagger operation tags
// (e.g. "apps", "rbacAuthorization", "storagemigration").
// -----------------------------------------------------------------------------
const CATEGORY_BY_GROUP = {
    // Core Resources
    core: 'Core Resources',
    node: 'Core Resources',
    events: 'Core Resources',
    // Workloads
    apps: 'Workloads',
    batch: 'Workloads',
    autoscaling: 'Workloads',
    // Networking
    networking: 'Networking',
    discovery: 'Networking',
    // Security
    authentication: 'Security',
    authorization: 'Security',
    rbacAuthorization: 'Security',
    certificates: 'Security',
    // Configuration & Storage
    storage: 'Configuration & Storage',
    coordination: 'Configuration & Storage',
    policy: 'Configuration & Storage',
    storagemigration: 'Configuration & Storage',
    // Cluster
    admissionregistration: 'Cluster',
    apiextensions: 'Cluster',
    apiregistration: 'Cluster',
    scheduling: 'Cluster',
    flowcontrolApiserver: 'Cluster',
    internalApiserver: 'Cluster',
    resource: 'Cluster',
};

const DEFAULT_CATEGORY = 'Other';

// Ordered list of display categories (drives sidebar ordering). Single source
// of truth, re-exported for the doc transform step. "Other" is always last.
export const CATEGORY_ORDER = [
    'Core Resources',
    'Workloads',
    'Networking',
    'Security',
    'Configuration & Storage',
    'Cluster',
    DEFAULT_CATEGORY,
];

// Derive a URL/directory slug from a category display name.
export function categorySlug(category) {
    return category
        .toLowerCase()
        .replace(/&/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

// category name -> slug, derived (no hand-maintained duplicate).
export const CATEGORY_SLUG_BY_NAME = Object.fromEntries(
    CATEGORY_ORDER.map((category) => [category, categorySlug(category)]),
);

// Base API classes that are not group/version-specific. These live under
// "Other" and have no derivable swagger tag of the {group}_{version} form.
const SPECIAL_CLASSES = {
    CoreApi: { group: 'Core', version: 'v1', category: CATEGORY_BY_GROUP.core },
    ApisApi: { group: 'Apis', version: '', category: DEFAULT_CATEGORY },
    OpenidApi: { group: 'Openid', version: '', category: DEFAULT_CATEGORY },
    WellKnownApi: { group: 'WellKnown', version: '', category: DEFAULT_CATEGORY },
    CustomObjectsApi: { group: 'CustomObjects', version: 'v1', category: DEFAULT_CATEGORY },
    WatchApi: { group: 'Watch', version: 'v1', category: DEFAULT_CATEGORY },
    VersionApi: { group: 'Version', version: 'v1', category: DEFAULT_CATEGORY },
    LogsApi: { group: 'Logs', version: 'v1', category: DEFAULT_CATEGORY },
};

/**
 * Collect the set of valid {group}_{version} operation tags from a swagger spec.
 * The Kubernetes OpenAPI spec tags every operation with a tag of the form
 * "<group>" (base) or "<group>_<version>" (e.g. "apps_v1", "rbacAuthorization_v1").
 * This is the authoritative source of group/version, replacing the previous
 * approach of reverse-engineering them from generated class-name strings.
 */
function collectSwaggerTags(swagger) {
    const swaggerTags = new Set();
    for (const pathItem of Object.values(swagger.paths)) {
        for (const operation of Object.values(pathItem)) {
            if (operation && Array.isArray(operation.tags)) {
                for (const tag of operation.tags) {
                    swaggerTags.add(tag);
                }
            }
        }
    }
    return swaggerTags;
}

/**
 * Convert a generated API class name into the swagger tag it corresponds to.
 * e.g. "AppsV1Api" -> { tag: "apps_v1", group: "Apps", version: "v1" }
 *      "RbacAuthorizationV1Api" -> { tag: "rbacAuthorization_v1", group: "RbacAuthorization", version: "v1" }
 *
 * Returns null if the class name is not a versioned "{Group}{Version}Api".
 */
function parseClassName(className) {
    if (!className.endsWith('Api')) {
        return null;
    }
    const withoutApi = className.slice(0, -3);
    const versionMatch = withoutApi.match(/(V\d+(?:alpha\d+|beta\d+)?)$/);

    const displayGroup = versionMatch ? withoutApi.slice(0, -versionMatch[1].length) : withoutApi;
    const version = versionMatch ? versionMatch[1].toLowerCase() : '';

    // swagger group token uses lowerCamelCase (lowercase first letter of the
    // PascalCase generated group name), e.g. "RbacAuthorization" -> "rbacAuthorization".
    const groupToken = displayGroup.charAt(0).toLowerCase() + displayGroup.slice(1);
    const tag = version ? `${groupToken}_${version}` : groupToken;

    return { tag, groupToken, displayGroup, version };
}

// Build mapping from class name to group metadata, driven by the doc files that
// actually exist and validated against the swagger spec.
export function buildApiGroupMap(swagger, docFiles) {
    const swaggerTags = collectSwaggerTags(swagger);
    const apiGroupMap = {};
    const warnings = [];

    for (const docFile of docFiles) {
        const className = docFile.replace('.md', '');

        // Non-group/version base API classes handled explicitly.
        if (SPECIAL_CLASSES[className]) {
            apiGroupMap[className] = { ...SPECIAL_CLASSES[className] };
            continue;
        }

        const parsed = parseClassName(className);
        if (!parsed) {
            warnings.push(`Could not parse class name "${className}"`);
            continue;
        }

        // Validate against the spec: the derived tag (or its base group token)
        // must exist in swagger. This turns silent guesses into verified facts.
        if (!swaggerTags.has(parsed.tag) && !swaggerTags.has(parsed.groupToken)) {
            warnings.push(
                `"${className}" derived tag "${parsed.tag}" not found in swagger tags — spec may have changed`,
            );
        }

        const category = CATEGORY_BY_GROUP[parsed.groupToken];
        if (!category) {
            warnings.push(
                `Group "${parsed.groupToken}" (${className}) is not assigned to a category — ` +
                    `defaulting to "${DEFAULT_CATEGORY}". Add it to CATEGORY_BY_GROUP to categorize it.`,
            );
        }

        apiGroupMap[className] = {
            group: parsed.displayGroup,
            version: parsed.version,
            category: category || DEFAULT_CATEGORY,
        };
    }

    return { apiGroupMap, warnings };
}

function main() {
    // Load swagger.json
    const swaggerPath = path.join(__dirname, '../..', 'src/gen/swagger.json');
    let swagger;
    try {
        const content = fs.readFileSync(swaggerPath, 'utf-8');
        swagger = JSON.parse(content);
    } catch (err) {
        console.error(`Failed to read or parse ${swaggerPath}:`, err.message);
        process.exit(1);
    }

    if (!swagger.paths) {
        console.error('swagger.json has no paths property');
        process.exit(1);
    }

    const docsDir = path.join(__dirname, '../..', 'src/gen/docs');
    const docFiles = fs.readdirSync(docsDir).filter((f) => f.endsWith('.md'));

    const { apiGroupMap, warnings } = buildApiGroupMap(swagger, docFiles);

    // Write output
    const outputPath = path.join(__dirname, 'api-group-map.json');
    try {
        fs.writeFileSync(outputPath, JSON.stringify(apiGroupMap, null, 2) + '\n');
        console.log(`✓ Generated ${outputPath} with ${Object.keys(apiGroupMap).length} entries`);
    } catch (err) {
        console.error(`Failed to write ${outputPath}:`, err.message);
        process.exit(1);
    }

    if (warnings.length > 0) {
        console.warn(`⚠ ${warnings.length} warning(s):`);
        for (const w of warnings) {
            console.warn(`  - ${w}`);
        }
    }
}

// Only run when invoked directly, not when imported for its exported constants.
if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
    main();
}
