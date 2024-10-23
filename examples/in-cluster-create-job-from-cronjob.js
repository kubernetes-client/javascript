import * as k8s from '@kubernetes/client-node';

const namespace = 'default';

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

try {
    const cronJobRes = await batchV1beta1Api.readNamespacedCronJob({ name: cronJobName, namespace });
    job.spec = cronJobRes?.spec?.jobTemplate.spec;
    const res = await batchV1Api..createNamespacedJob({ namespace, body: job });
    console.log(res);
} catch (err) {
    console.error(err);
}
