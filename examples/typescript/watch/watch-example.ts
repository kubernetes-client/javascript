import * as k8s from '@kubernetes/client-node';

const kc = new k8s.KubeConfig();
kc.loadFromDefault();

const watch = new k8s.Watch(kc);
watch.watch('/api/v1/namespaces',
    // optional query parameters can go here.
    {},
    // callback is called for each received object.
    (type, obj) => {
        if (type === 'ADDED') {
            // tslint:disable-next-line:no-console
            console.log('new object:');
        } else if (type === 'MODIFIED') {
            // tslint:disable-next-line:no-console
            console.log('changed object:');
        } else if (type === 'DELETED') {
            // tslint:disable-next-line:no-console
            console.log('deleted object:');
        } else {
            // tslint:disable-next-line:no-console
            console.log('unknown type: ' + type);
        }
        // tslint:disable-next-line:no-console
        console.log(obj);
    },
    // done callback is called if the watch terminates normally
    (err) => {
        // tslint:disable-next-line:no-console
        console.log(err);
    })
.then((req) => {
    // watch returns a request object which you can use to abort the watch.
    setTimeout(() => { req.abort(); }, 10 * 1000);
});
