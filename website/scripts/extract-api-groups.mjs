#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Define sidebar categories
const categories = {
    'Core Resources': ['Core', 'Node', 'Events'],
    Workloads: ['Apps', 'Batch'],
    Networking: ['Networking', 'Discovery'],
    Security: ['Authentication', 'Authorization', 'RbacAuthorization', 'Certificates'],
    'Configuration & Storage': ['Storage', 'Coordination', 'Policy', 'Storagemigration'],
    Cluster: ['Admissionregistration', 'Apiextensions', 'Apiregistration', 'Scheduling'],
};

// Reverse map: group name -> category
const groupToCategory = {};
for (const [category, groups] of Object.entries(categories)) {
    for (const group of groups) {
        groupToCategory[group] = category;
    }
}

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

// Extract unique API groups from paths
const groupVersionMap = new Map(); // "{group}/{version}" -> { group, version }

for (const pathKey of Object.keys(swagger.paths)) {
    // Match /api/v1/... or /apis/{group}/{version}/...
    let match = pathKey.match(/^\/api\/([^/]+)(\/|$)/);
    if (match) {
        const version = match[1];
        const groupVersion = `core/${version}`;
        if (!groupVersionMap.has(groupVersion)) {
            groupVersionMap.set(groupVersion, { group: 'core', version, displayName: 'Core' });
        }
        continue;
    }

    match = pathKey.match(/^\/apis\/([^/]+)\/([^/]+)(\/|$)/);
    if (match) {
        const group = match[1];
        const version = match[2];
        const groupVersion = `${group}/${version}`;
        if (!groupVersionMap.has(groupVersion)) {
            groupVersionMap.set(groupVersion, { group, version });
        }
    }
}

// Build mapping from class name to group metadata
const apiGroupMap = {};

// List all doc files
const docsDir = path.join(__dirname, '../..', 'src/gen/docs');
const docFiles = fs.readdirSync(docsDir).filter((f) => f.endsWith('.md'));

for (const docFile of docFiles) {
    const className = docFile.replace('.md', '');

    // Special cases first - handle non-versioned base API classes
    if (className === 'CoreApi') {
        apiGroupMap[className] = {
            group: 'Core',
            version: 'v1',
            category: groupToCategory['Core'] || 'Other',
        };
        continue;
    }

    if (className === 'ApisApi' || className === 'OpenidApi' || className === 'WellKnownApi') {
        apiGroupMap[className] = {
            group: className.slice(0, -3), // Remove trailing "Api"
            version: '',
            category: 'Other',
        };
        continue;
    }

    if (
        className === 'CustomObjectsApi' ||
        className === 'WatchApi' ||
        className === 'VersionApi' ||
        className === 'LogsApi'
    ) {
        apiGroupMap[className] = {
            group: className.slice(0, -3), // Remove trailing "Api"
            version: 'v1',
            category: 'Other',
        };
        continue;
    }

    if (
        className === 'CustomObjectsApi' ||
        className === 'WatchApi' ||
        className === 'VersionApi' ||
        className === 'LogsApi'
    ) {
        apiGroupMap[className] = {
            group: className.replace('Api', ''),
            version: 'v1',
            category: 'Other',
        };
        continue;
    }

    // Parse standard class names like "AppsV1Api", "AdmissionregistrationV1alpha1Api"
    // Pattern: {GroupName}{VersionName}Api
    let group = null;
    let version = null;

    if (className.endsWith('Api')) {
        const withoutApi = className.slice(0, -3); // Remove "Api"

        // Extract version from end: V1, V1alpha1, V2, V1beta1, etc.
        const versionMatch = withoutApi.match(/(V\d+(?:alpha\d+|beta\d+)?)$/);
        if (versionMatch) {
            const versionStr = versionMatch[1];
            group = withoutApi.slice(0, -versionStr.length);
            // Convert V1 -> v1, V1alpha1 -> v1alpha1, etc.
            version = versionStr.toLowerCase();
        } else {
            // No version suffix, it's a base API class
            group = withoutApi;
            version = '';
        }

        if (group) {
            const category = groupToCategory[group] || 'Other';
            apiGroupMap[className] = {
                group: group,
                version: version,
                category: category,
            };
        }
    }
}

// Write output
const outputPath = path.join(__dirname, 'api-group-map.json');
try {
    fs.writeFileSync(outputPath, JSON.stringify(apiGroupMap, null, 2) + '\n');
    console.log(`✓ Generated ${outputPath} with ${Object.keys(apiGroupMap).length} entries`);
} catch (err) {
    console.error(`Failed to write ${outputPath}:`, err.message);
    process.exit(1);
}

// Verify all doc files are in the map
const unmappedFiles = docFiles.filter((f) => !apiGroupMap[f.replace('.md', '')]);
if (unmappedFiles.length > 0) {
    console.warn(`⚠ ${unmappedFiles.length} files not mapped: ${unmappedFiles.join(', ')}`);
}

process.exit(0);
