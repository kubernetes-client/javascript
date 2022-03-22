import { KubeConfig, CoreV1Api, Watch } from '.'

const kc = new KubeConfig()
kc.loadFromDefault()

const client = kc.makeApiClient(CoreV1Api)

client.listNamespace().then(response => {
    console.log(response)
}).catch(err => {
    console.log(err)
})

const watch = new Watch(kc).watch('/api/v1/namespaces', {}, (phase, apiObj, watchObj) => {
    console.log(phase, apiObj, watchObj)
}, err => {
    console.log(err)
})
