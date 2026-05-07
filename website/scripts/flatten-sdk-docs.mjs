#!/usr/bin/env node

/**
 * Post-processes typedoc-generated SDK docs to flatten shallow modules.
 *
 * - Single-doc modules (e.g. attach with only Attach.md): merges the content
 *   into index.md so the module IS the page (no tile navigation).
 * - Small modules (≤ SMALL_THRESHOLD docs): removes the classes/functions/etc
 *   sub-directory grouping and moves docs up to the module root.
 *
 * Run AFTER typedoc generates and BEFORE Docusaurus builds.
 */

import { readdirSync, readFileSync, writeFileSync, rmSync, mkdirSync, existsSync, renameSync, statSync } from 'node:fs';
import { dirname, join, resolve, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const SDK_DIR = resolve(__dirname, '../docs/sdk');

/** Modules with this many content docs or fewer get sub-dirs flattened. */
const SMALL_THRESHOLD = 4;

/**
 * Collect all .md files in a module dir that are NOT index.md,
 * recursing into sub-directories (classes/, functions/, etc.).
 */
function collectContentFiles(moduleDir) {
    const results = [];

    function walk(dir, rel) {
        for (const entry of readdirSync(dir, { withFileTypes: true })) {
            const fullPath = join(dir, entry.name);
            const relPath = rel ? `${rel}/${entry.name}` : entry.name;
            if (entry.isDirectory()) {
                walk(fullPath, relPath);
            } else if (entry.isFile() && extname(entry.name) === '.md' && entry.name !== 'index.md') {
                results.push({ fullPath, relPath, name: entry.name });
            }
        }
    }

    walk(moduleDir, '');
    return results;
}

/**
 * Get sub-directories in a module dir (classes, functions, interfaces, etc.).
 */
function getSubDirs(moduleDir) {
    return readdirSync(moduleDir, { withFileTypes: true })
        .filter(e => e.isDirectory())
        .map(e => e.name);
}

/**
 * Strip the typedoc-generated title heading (# Class: Foo / # Function: bar())
 * and return { title, body }.
 */
function parseContent(raw) {
    const lines = raw.split('\n');
    let titleLine = '';
    let bodyStart = 0;

    for (let i = 0; i < lines.length; i++) {
        if (lines[i].startsWith('# ')) {
            titleLine = lines[i];
            bodyStart = i + 1;
            // Skip blank line after title
            if (lines[bodyStart]?.trim() === '') bodyStart++;
            break;
        }
    }

    return {
        title: titleLine.replace(/^#\s+/, ''),
        body: lines.slice(bodyStart).join('\n').trim(),
    };
}

/**
 * Single-doc module: replace index.md with the content of the sole doc.
 */
function mergeSingleDoc(moduleDir, moduleName, contentFile) {
    const raw = readFileSync(contentFile.fullPath, 'utf8');
    const { title, body } = parseContent(raw);

    const frontmatter = [
        '---',
        `sidebar_label: ${moduleName}`,
        '---',
        '',
    ].join('\n');

    // Fix relative links: moved from classes/Foo.md to index.md (one level up).
    const fixedBody = body.replace(/(?:\.\.\/){2,}/g, (match) => match.slice(3));
    const merged = `${frontmatter}# ${title}\n\n${fixedBody}\n`;
    writeFileSync(join(moduleDir, 'index.md'), merged, 'utf8');

    // Remove all sub-directories.
    for (const sub of getSubDirs(moduleDir)) {
        rmSync(join(moduleDir, sub), { recursive: true, force: true });
    }

    return { type: 'single', moduleName, title };
}

/**
 * Small module: flatten sub-dirs so docs live directly under the module dir.
 * Keeps index.md but rewrites it to list the flattened docs.
 */
function flattenSmallModule(moduleDir, moduleName, contentFiles) {
    const subDirs = getSubDirs(moduleDir);

    // Move all content files up to the module root, prefixing with category
    // to avoid name collisions (e.g. type-aliases/PatchStrategy.md vs variables/PatchStrategy.md).
    const movedFiles = [];

    for (const sub of subDirs) {
        const subPath = join(moduleDir, sub);
        const files = readdirSync(subPath).filter(f => extname(f) === '.md');

        for (const file of files) {
            const src = join(subPath, file);

            // Check for name collision — if the filename already exists at module root
            // or we already moved one with the same name, prefix with sub-dir name.
            const baseName = file;
            const needsPrefix = movedFiles.some(m => m.fileName === baseName) ||
                existsSync(join(moduleDir, baseName));
            const destName = needsPrefix ? `${sub}-${baseName}` : baseName;
            const dest = join(moduleDir, destName);

            // Read content and fix relative links (go up one fewer level since we moved up).
            // Files moved from sdk/mod/classes/Foo.md -> sdk/mod/Foo.md (one level up).
            // So ../../other -> ../other (remove one ../ from every consecutive run).
            let content = readFileSync(src, 'utf8');
            content = content.replace(/(?:\.\.\/){2,}/g, (match) => {
                // Remove one level of ../ from the chain
                return match.slice(3);
            });

            writeFileSync(dest, content, 'utf8');
            movedFiles.push({ fileName: destName, fromSub: sub, original: file });
        }
    }

    // Rewrite index.md: simple list grouped by original category.
    const grouped = {};
    for (const m of movedFiles) {
        const label = m.fromSub.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
        if (!grouped[label]) grouped[label] = [];
        grouped[label].push(m);
    }

    let indexContent = `---\nsidebar_label: ${moduleName}\n---\n\n# ${moduleName}\n\n`;
    for (const [label, files] of Object.entries(grouped)) {
        indexContent += `## ${label}\n\n`;
        for (const f of files) {
            const docTitle = f.original.replace(/\.md$/, '');
            indexContent += `- [${docTitle}](${f.fileName})\n`;
        }
        indexContent += '\n';
    }

    writeFileSync(join(moduleDir, 'index.md'), indexContent, 'utf8');

    // Remove now-empty sub-directories.
    for (const sub of subDirs) {
        rmSync(join(moduleDir, sub), { recursive: true, force: true });
    }

    return { type: 'flattened', moduleName, count: movedFiles.length };
}

export function flattenSdkDocs(sdkDir = SDK_DIR) {
    if (!existsSync(sdkDir)) return [];
    const modules = readdirSync(sdkDir, { withFileTypes: true })
        .filter(e => e.isDirectory())
        .map(e => e.name);

    const results = [];

    for (const moduleName of modules) {
        const moduleDir = join(sdkDir, moduleName);
        const contentFiles = collectContentFiles(moduleDir);
        const subDirs = getSubDirs(moduleDir);

        // Skip modules with no sub-directories (already flat).
        if (subDirs.length === 0) continue;

        if (contentFiles.length === 1) {
            const r = mergeSingleDoc(moduleDir, moduleName, contentFiles[0]);
            results.push(r);
        } else if (contentFiles.length <= SMALL_THRESHOLD) {
            const r = flattenSmallModule(moduleDir, moduleName, contentFiles);
            results.push(r);
        }
        // Larger modules are left as-is.
    }

    return results;
}

if (process.argv[1] && resolve(process.argv[1]) === __filename) {
    const results = flattenSdkDocs();
    for (const r of results) {
        if (r.type === 'single') {
            console.log(`  merged: ${r.moduleName} (${r.title})`);
        } else {
            console.log(`  flattened: ${r.moduleName} (${r.count} docs)`);
        }
    }
    console.log(`Flattened ${results.length} SDK modules`);
}

/**
 * After flattening, fix relative links in ALL SDK docs that reference
 * files that moved during flatten.  For example:
 *   ../../watch/classes/Watch.md  ->  ../../watch/index.md  (merged)
 *   ../patch/type-aliases/PatchStrategy.md  ->  ../patch/PatchStrategy.md  (flattened)
 */
export function fixCrossReferences(sdkDir = SDK_DIR) {
    const allMdFiles = [];

    function walk(dir) {
        for (const entry of readdirSync(dir, { withFileTypes: true })) {
            const full = join(dir, entry.name);
            if (entry.isDirectory()) walk(full);
            else if (entry.name.endsWith('.md')) allMdFiles.push(full);
        }
    }
    walk(sdkDir);

    let totalFixes = 0;

    for (const file of allMdFiles) {
        let content = readFileSync(file, 'utf8');
        let changed = false;

        // Match relative links: [text](../some/path.md) or [text](../../some/path.md)
        content = content.replace(
            /\]\((\.\.[^)]+\.md)\)/g,
            (full, relPath) => {
                const absTarget = resolve(dirname(file), relPath);

                // If the target exists, leave it alone.
                if (existsSync(absTarget)) return full;

                // Try to find the file after flatten:
                const parts = relPath.replace(/\\/g, '/').split('/');
                const fileName = parts[parts.length - 1];

                // 1. Try: remove the sub-dir (classes/, functions/, etc.)
                //    e.g. ../watch/classes/Watch.md -> ../watch/Watch.md
                if (parts.length >= 3) {
                    const withoutSubDir = [...parts.slice(0, -2), fileName].join('/');
                    const resolved = resolve(dirname(file), withoutSubDir);
                    if (existsSync(resolved)) {
                        changed = true;
                        totalFixes++;
                        return `](${withoutSubDir})`;
                    }
                }

                // 2. Try: merged into index.md
                //    e.g. ../watch/classes/Watch.md -> ../watch/index.md
                if (parts.length >= 3) {
                    const moduleDir = parts.slice(0, -2).join('/');
                    const indexPath = moduleDir + '/index.md';
                    const resolved = resolve(dirname(file), indexPath);
                    if (existsSync(resolved)) {
                        changed = true;
                        totalFixes++;
                        return `](${indexPath})`;
                    }
                }

                // 3. Try: within same module, sub-dir removed
                //    e.g. ../variables/PatchStrategy.md -> PatchStrategy.md (from same module)
                //    or ../interfaces/LogOptions.md -> LogOptions.md
                if (parts.length === 2 && parts[0] === '..') {
                    // This means we're in a flattened module looking at a sibling sub-dir
                    const siblingFile = resolve(dirname(file), fileName);
                    if (existsSync(siblingFile)) {
                        changed = true;
                        totalFixes++;
                        return `](${fileName})`;
                    }
                }

                return full; // Can't resolve — leave as-is
            },
        );

        if (changed) {
            writeFileSync(file, content, 'utf8');
        }
    }

    return totalFixes;
}
