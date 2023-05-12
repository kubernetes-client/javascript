// in a real program use require('@kubernetes/client-node')
const k8s = require('../dist/index');

const kc = new k8s.KubeConfig();
kc.loadFromCluster();

const batchV1Api = kc.makeApiClient(k8s.BatchV1Api);
const batchV1beta1Api = kc.makeApiClient(k8s.BatchV1beta1Api);
const cronJobName = 'cronjob';
const jobName = 'myjob';

const job = new k8s.V1Job();
const metadata = new k8s.V1ObjectMeta();
job.apiVersion = 'batch/v1';
job.kind = 'Job';
metadata.name = jobName;
metadata.annotations = {
    'cronjob.kubernetes.io/instantiate': 'manual',
};
job.metadata = metadata;

batchV1beta1Api
    .readNamespacedCronJob({ name: cronJobName, namespace: 'default' })
    .then((cronJobRes) => {
        job.spec = cronJobRes?.spec?.jobTemplate.spec;
        batchV1Api
            .createNamespacedJob({ namespace: 'default', body: job })
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    })
    .catch((err) => {
        console.log(err);
    });
