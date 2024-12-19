const k8s = require('@kubernetes/client-node');

const kc = new k8s.KubeConfig();
kc.loadFromDefault();

const k8sApi = kc.makeApiClient(k8s.CoreV1Api);

/**
 * This sample code is Javascript equivalent to `kubectl get resourcequotas --all-namespaces`
 */

const resourceQuotaList = async () => {
    try{
        const resourceQuotas = await k8sApi.listResourceQuotaForAllNamespaces();
        resourceQuotas.body.items.map(quota => console.log(quota.metadata.name))
    }
    catch(err){
        console.error(err);
    }
};

resourceQuotaList();
