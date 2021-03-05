const k8s = require('@kubernetes/client-node');

const kc = new k8s.KubeConfig();
kc.loadFromCluster();

const batchV1Api = kc.makeApiClient(k8s.BatchV1Api);
const batchV1beta1Api = kc.makeApiClient(k8s.BatchV1beta1Api);
const cronJobName = 'myCronJob';
const jobName = 'myJob';

const job = new k8s.V1Job();
const metadata = new k8s.V1ObjectMeta();
job.apiVersion = 'batch/v1';
job.kind = 'Job';
metadata.name = jobName;
metadata.annotations = {
    'cronjob.kubernetes.io/instantiate': 'manual',
};
job.metadata = metadata;

batchV1beta1Api.readNamespacedCronJob(cronJobName, 'default')
    .then((cronJobRes) => {
        job.spec = cronJobRes.body.spec.jobTemplate.spec;
        batchV1Api.createNamespacedJob('default', job)
            .then((res) => {
                console.log(res.body);
            })
            .catch((err) => {
                console.log(err);
            });
    })
    .catch((err) => {
        console.log(err);
    });
