/**
 * Docusaurus plugin that flattens SDK docs after typedoc generates them.
 * Runs in the `loadContent` lifecycle, which executes after all plugins
 * have initialized (including typedoc).
 */

import { flattenSdkDocs, fixCrossReferences } from './flatten-sdk-docs.mjs';
import { enrichSdkDocs } from './enrich-sdk-docs.mjs';

export default function pluginFlattenSdk() {
    return {
        name: 'flatten-sdk-docs',
        async loadContent() {
            const results = flattenSdkDocs();
            if (results.length > 0) {
                for (const r of results) {
                    if (r.type === 'single') {
                        console.log(`  [flatten] merged: ${r.moduleName} (${r.title})`);
                    } else {
                        console.log(`  [flatten] flattened: ${r.moduleName} (${r.count} docs)`);
                    }
                }
            }
            const fixes = fixCrossReferences();
            if (fixes > 0) {
                console.log(`  [flatten] fixed ${fixes} cross-reference(s)`);
            }
            const enriched = enrichSdkDocs();
            if (enriched > 0) {
                console.log(`  [flatten] enriched ${enriched} SDK page(s) with quick-start snippets`);
            }
        },
    };
}
