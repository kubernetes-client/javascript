# KubernetesJsClient.V1beta1DaemonSetStatus

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**currentNumberScheduled** | **Number** | The number of nodes that are running at least 1 daemon pod and are supposed to run the daemon pod. More info: http://releases.k8s.io/HEAD/docs/admin/daemons.md | 
**desiredNumberScheduled** | **Number** | The total number of nodes that should be running the daemon pod (including nodes correctly running the daemon pod). More info: http://releases.k8s.io/HEAD/docs/admin/daemons.md | 
**numberAvailable** | **Number** | The number of nodes that should be running the daemon pod and have one or more of the daemon pod running and available (ready for at least spec.minReadySeconds) | [optional] 
**numberMisscheduled** | **Number** | The number of nodes that are running the daemon pod, but are not supposed to run the daemon pod. More info: http://releases.k8s.io/HEAD/docs/admin/daemons.md | 
**numberReady** | **Number** | The number of nodes that should be running the daemon pod and have one or more of the daemon pod running and ready. | 
**numberUnavailable** | **Number** | The number of nodes that should be running the daemon pod and have none of the daemon pod running and available (ready for at least spec.minReadySeconds) | [optional] 
**observedGeneration** | **Number** | The most recent generation observed by the daemon set controller. | [optional] 
**updatedNumberScheduled** | **Number** | The total number of nodes that are running updated daemon pod | [optional] 


