const k8s = require('@kubernetes/client-node');

const kc = new k8s.KubeConfig();
kc.loadFromDefault();

const k8sApi = kc.makeApiClient(k8s.CoreV1Api);

/**
 * This sample code is Javascript equivalent to `kubectl create resourcequota my-quota --hard=pods=3`
 */

const resourceQuotaCreate = async () => {
    try{
        const quota = {
            metadata:{
                name: "my-quota"
            },
            spec:{
                hard:{
                    pods:"3"
                }
            }
        }
        const createdQuota = await k8sApi.createNamespacedResourceQuota("default", quota);
        console.log("Created quota: " + createdQuota.body)
    }
    catch(err){
        console.error(err);
    }
};

resourceQuotaCreate();
