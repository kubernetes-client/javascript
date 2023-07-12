const k8s = require('@kubernetes/client-node');

const namespace = 'default';

const kc = new k8s.KubeConfig();
kc.loadFromCluster();

const batchV1Api = kc.makeApiClient(k8s.BatchV1Api);
const batchV1beta1Api = kc.makeApiClient(k8s.BatchV1beta1Api);
const cronJobName = 'myCronJob';
const jobName = 'myJob';

const job = new k8s.V1Job();
job.apiVersion = 'batch/v1';
job.kind = 'Job';

const metadata = new k8s.V1ObjectMeta();
metadata.name = jobName;
metadata.annotations = {
    'cronjob.kubernetes.io/instantiate': 'manual',
};
job.metadata = metadata;

const main = async () => {
    try {
        const readJobRes = await batchV1beta1Api.readNamespacedCronJob(cronJobName, namespace);
        job.spec = readJobRes.body.spec.jobTemplate.spec;

        const createJobRes = await batchV1Api.createNamespacedJob(namespace, job);
        console.log(createJobRes.body);
    } catch (err) {
        console.error(err);
    }
};

main();
