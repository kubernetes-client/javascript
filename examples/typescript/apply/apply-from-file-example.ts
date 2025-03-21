import * as k8s from '@kubernetes/client-node';
import yaml from 'js-yaml';
import fs from 'node:fs/promises';

/**
 * Replicate the functionality of `kubectl apply`.  That is, create the resources defined in the `specFile` if they do
 * not exist, patch them if they do exist.
 *
 * @param specPath File system path to a YAML Kubernetes spec.
 * @return Array of resources created
 */
export async function apply(specPath: string): Promise<k8s.KubernetesObject[]> {
    const kc = new k8s.KubeConfig();
    kc.loadFromDefault();

    const client = k8s.KubernetesObjectApi.makeApiClient(kc);

    const specString = await fs.readFile(specPath, 'utf8');
    const specs: k8s.KubernetesObject[] = yaml.loadAll(specString);
    const validSpecs = specs.filter((s) => s && s.kind && s.metadata);
    const created: k8s.KubernetesObject[] = [];
    for (const spec of validSpecs) {
        // this is to convince the old version of TypeScript that metadata exists even though we already filtered specs
        // without metadata out
        spec.metadata = spec.metadata || {};
        spec.metadata.annotations = spec.metadata.annotations || {};
        spec.metadata.annotations['kubectl.kubernetes.io/last-applied-configuration'] = JSON.stringify(spec);
        try {
            // try to get the resource, if it does not exist an error will be thrown and we will end up in the catch
            // block.
            await client.read(spec);
            // we got the resource, so it exists, so patch it
            //
            // Note that this could fail if the spec refers to a custom resource. For custom resources you may need
            // to specify a different patch merge strategy in the content-type header.
            //
            // See: https://github.com/kubernetes/kubernetes/issues/97423
            const response = await client.patch(spec);
            created.push(response);
        } catch (err) {
            // if the resource doesnt exist then create it
            if (err instanceof k8s.ApiException && err.code === 404) {
                const response = await client.create(spec);
                created.push(response);
            } else {
                throw err;
            }
        }
    }

    return created;
}
