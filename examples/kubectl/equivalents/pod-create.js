const k8s = require('@kubernetes/client-node');

const kc = new k8s.KubeConfig();
kc.loadFromDefault();

const k8sApi = kc.makeApiClient(k8s.CoreV1Api);

/**
 * This sample code is Javascript equivalent to `kubectl run demo-pod --image=nginx --namespace=default`
 */

const podCreate = async () => {
    const pod = {
        metadata:{
            name: "demo-pod"
        },
        spec:{
            containers:[{
                name: "nginx-container",
                image:"nginx"
            }]
        }
    }
    try{
        const createdPod = await k8sApi.createNamespacedPod('default', pod)
        console.log("Created pod: " + createdPod.body)

    }
    catch(err){
        console.error(err);
    }
};

podCreate();
