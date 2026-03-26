#!/usr/bin/env node

import { readFileSync, readdirSync, mkdirSync, writeFileSync, rmSync } from 'node:fs';
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

        return `(/docs/api-reference/${slug}/${className}#${anchor})`;
    });

    // README references: rewrite BearerToken to local authorization section, drop others to plain text.
    result = result.replace(/\[BearerToken\]\(README\.md#BearerToken\)/g, '[BearerToken](#authorization)');
    result = result.replace(/\[([^\]]+)\]\(README\.md#[^)]+\)/g, '$1');
    result = result.replace(/\(README\.md#[^)]+\)/g, '');

    return result;
}

function normalizeHeadings(content) {
    let result = content;

    // Main title heading (# .CoreV1Api -> # CoreV1Api)
    result = result.replace(/^#\s+\.([^\n]+)$/m, (_, title) => `# ${normalizeTitle(title.trim())}`);

    // Method heading normalization with explicit anchor.
    const lines = result.split('\n');
    const out = [];

    for (let i = 0; i < lines.length; i += 1) {
        const line = lines[i];
        const boldMethodMatch = line.match(/^#\s+\*\*([^*]+)\*\*\s*$/);
        if (!boldMethodMatch) {
            out.push(line);
            continue;
        }

        const method = boldMethodMatch[1].trim();
        out.push(`### ${method}`);

        const nextLine = lines[i + 1] ?? '';
        const nextNextLine = lines[i + 2] ?? '';
        const alreadyAnchored = nextLine.trim() === '' && nextNextLine.trim() === `<a id=\"${method}\"></a>`;

        if (!alreadyAnchored) {
            out.push('');
            out.push(`<a id=\"${method}\"></a>`);
        }
    }

    result = out.join('\n');

    // Ensure any existing method anchor after ### heading is exactly one blank line then anchor.
    result = result.replace(
        /^###\s+([A-Za-z0-9_]+)\s*\n(?:\n)?(<a id=\"\1\"><\/a>)?/gm,
        (_, method) => `### ${method}\n\n<a id=\"${method}\"></a>\n`,
    );

    return result;
}

function fixImports(content) {
    return content
        .replace(/from\s+''/g, "from '@kubernetes/client-node'")
        .replace(/from\s+\"\"/g, "from '@kubernetes/client-node'");
}

function cleanupContent(content) {
    let result = content;

    // Footer cleanup
    result = result.replace(/^\[\[Back to top\]\].*$/gm, '');

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

function validateOutputs(outputRoot, warnings) {
    const mdFiles = [];

    for (const slug of Object.values(CATEGORY_SLUG_BY_NAME)) {
        const dir = join(outputRoot, slug);
        let files = [];
        try {
            files = readdirSync(dir).filter((f) => extname(f) === '.md');
        } catch {
            continue;
        }

        for (const file of files) {
            mdFiles.push(join(dir, file));
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

    // Clean output tree for deterministic idempotent output.
    rmSync(outputDir, { recursive: true, force: true });
    mkdirSync(outputDir, { recursive: true });
    writeCategoryFiles(outputDir);

    for (const [categoryIndex, category] of CATEGORY_ORDER.entries()) {
        const slug = CATEGORY_SLUG_BY_NAME[category];
        const classNames = (byCategory.get(category) ?? []).slice().sort((a, b) => a.localeCompare(b));

        for (const className of classNames) {
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
        .filter((className) => !mappedNames.has(className))
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

    const { fileCount, warningCount } = validateOutputs(outputDir, warnings);
    return { fileCount, warningCount, outputDir: toPosixPath(outputDir) };
}

if (process.argv[1] && resolve(process.argv[1]) === __filename) {
    const result = runTransform();
    console.log(`Transformed ${result.fileCount} files with ${result.warningCount} warnings`);
}
