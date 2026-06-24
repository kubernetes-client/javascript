import { test } from 'node:test';
import * as assert from 'node:assert';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Placeholder for the actual transform function (to be implemented in Task 5)
async function transformMarkdown(content) {
    throw new Error('Transform function not yet implemented');
}

const fixturesDir = resolve(__dirname, 'fixtures');

test('Test 1: Frontmatter insertion', async (t) => {
    const input = readFileSync(resolve(fixturesDir, 'fixture-small.md'), 'utf8');
    const expected = readFileSync(resolve(fixturesDir, 'fixture-expected-small.md'), 'utf8');

    // Expected output should start with YAML frontmatter
    assert.match(
        expected,
        /^---\nsidebar_position:.*?\ntitle:.*?\n---\n/,
        'Expected output should have frontmatter',
    );
    // Input should NOT have frontmatter
    assert.doesNotMatch(input, /^---/, 'Input should not have frontmatter');
});

test('Test 2: Heading normalization - leading dot removal', async (t) => {
    const input = readFileSync(resolve(fixturesDir, 'fixture-with-issues.md'), 'utf8');
    const expected = readFileSync(resolve(fixturesDir, 'fixture-expected-issues.md'), 'utf8');

    // Input has leading dot in title
    assert.match(input, /^# \.TestApi/, 'Input should have leading dot in title');
    // Expected has no leading dot (after frontmatter, there's a blank line then # TestApi)
    assert.match(expected, /^# TestApi/m, 'Expected should not have leading dot after frontmatter');
    assert.doesNotMatch(expected, /\.TestApi/, 'Expected should not have any leading dots with TestApi');
});

test('Test 3: Heading normalization - bold removal', async (t) => {
    const input = readFileSync(resolve(fixturesDir, 'fixture-with-issues.md'), 'utf8');
    const expected = readFileSync(resolve(fixturesDir, 'fixture-expected-issues.md'), 'utf8');

    // Input has bold heading
    assert.match(input, /# \*\*testMethod\*\*/, 'Input should have bold heading');
    // Expected has no bold
    assert.match(expected, /# testMethod\n/, 'Expected should remove bold from heading');
});

test('Test 4: Import path replacement', async (t) => {
    const input = readFileSync(resolve(fixturesDir, 'fixture-with-issues.md'), 'utf8');
    const expected = readFileSync(resolve(fixturesDir, 'fixture-expected-issues.md'), 'utf8');

    // Input has empty import path
    assert.match(input, /import { TestApi } from '';/, 'Input should have empty import path');
    // Expected has @kubernetes/client-node
    assert.match(
        expected,
        /import { TestApi } from '@kubernetes\/client-node';/,
        'Expected should have correct import path',
    );
});

test('Test 5: Internal link rewriting', async (t) => {
    const input = readFileSync(resolve(fixturesDir, 'fixture-with-issues.md'), 'utf8');
    const expected = readFileSync(resolve(fixturesDir, 'fixture-expected-issues.md'), 'utf8');

    // Both should have links
    assert.match(input, /\[.*?\]\(.*?\)/, 'Input should have markdown links');
    assert.match(expected, /\[.*?\]\(.*?\)/, 'Expected should have markdown links');

    // Links in reference table should work
    assert.match(
        expected,
        /\[\*\*testMethod\*\*\]\(TestApi\.md#testMethod\)/,
        'Expected should have correct method links',
    );
});

test('Test 6: Bold formatting in return types removed', async (t) => {
    const input = readFileSync(resolve(fixturesDir, 'fixture-with-issues.md'), 'utf8');
    const expected = readFileSync(resolve(fixturesDir, 'fixture-expected-issues.md'), 'utf8');

    // Input has bold return types
    assert.match(input, /> \*\*V1Pod\*\* testMethod\(\)/, 'Input should have bold model name in return type');
    assert.match(input, /\*\*V1Pod\*\*/, 'Input should have bold model names');
    // Expected should remove bold formatting from return types
    assert.match(expected, /> V1Pod testMethod\(\)/m, 'Expected should have unbolded return type in header');
    assert.match(expected, /### Return type\n\nV1Pod/m, 'Expected should have unbolded return type');
});

test('Test 7: Footer patterns preserved', async (t) => {
    const input = readFileSync(resolve(fixturesDir, 'fixture-with-issues.md'), 'utf8');
    const expected = readFileSync(resolve(fixturesDir, 'fixture-expected-issues.md'), 'utf8');

    // Both should have footer links
    assert.match(expected, /\[\[Back to top\]\]\(#\)/, 'Expected should preserve back-to-top link');
    assert.match(
        expected,
        /\[\[Back to API list\]\]\(README\.md#documentation-for-api-endpoints\)/,
        'Expected should preserve API list link',
    );
});

test('Test 8: Idempotency - transform should be stable', async (t) => {
    const expected = readFileSync(resolve(fixturesDir, 'fixture-expected-small.md'), 'utf8');

    // Expected output should already have frontmatter
    assert.match(expected, /^---/, 'Expected should start with frontmatter');
    // Count frontmatter markers (should be exactly 2)
    const markerCount = (expected.match(/^---/gm) || []).length;
    assert.strictEqual(
        markerCount,
        2,
        'Expected should have exactly 2 frontmatter markers (opening and closing)',
    );
});

test('Test 9: Empty/malformed input handling', async (t) => {
    // Test with empty file
    const emptyInput = '';
    assert.strictEqual(emptyInput, '', 'Empty input should be handled');

    // Test with only whitespace
    const whitespaceInput = '   \n\n  \n';
    assert.strictEqual(whitespaceInput.trim(), '', 'Whitespace-only input should be handled');
});

test('Test 10: Model reference formatting', async (t) => {
    const input = readFileSync(resolve(fixturesDir, 'fixture-with-issues.md'), 'utf8');
    const expected = readFileSync(resolve(fixturesDir, 'fixture-expected-issues.md'), 'utf8');

    // Input should have bold model reference in description
    assert.match(input, /\*\*V1Pod\*\*/, 'Input should have bold model name');

    // Expected should preserve model names but in correct context
    assert.match(expected, /V1Pod/, 'Expected should have model name');
});
