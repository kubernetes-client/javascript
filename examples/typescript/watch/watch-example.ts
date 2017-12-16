import k8s = require('@kubernetes/client-node');

let kc = new k8s.KubeConfig();
kc.loadFromFile(process.env['HOME'] + '/.kube/config');

let watch = new k8s.Watch(kc);
let req = watch.watch('/api/v1/namespaces',
    // optional query parameters can go here.
    {}, 
    // callback is called for each received object.
    (type, obj) => {
        if (type == 'ADDED') {
            console.log('new object:');
        } else if (type == 'MODIFIED') {
            console.log('changed object:')
        } else if (type == 'DELETED') {
            console.log('deleted object:');
        } else {
            console.log('unknown type: ' + type);
        }
        console.log(obj);
    },
    // done callback is called if the watch terminates normally
    (err) => {
        if (err) {
            console.log(err);
        }
    });

// watch returns a request object which you can use to abort the watch.
setTimeout(() => { req.abort(); }, 10 * 1000);
