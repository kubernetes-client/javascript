# KubernetesJsClient.V1beta2DaemonSetStatus

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**collisionCount** | **Number** | Count of hash collisions for the DaemonSet. The DaemonSet controller uses this field as a collision avoidance mechanism when it needs to create the name for the newest ControllerRevision. | [optional] 
**conditions** | [**[V1beta2DaemonSetCondition]**](V1beta2DaemonSetCondition.md) | Represents the latest available observations of a DaemonSet&#39;s current state. | [optional] 
**currentNumberScheduled** | **Number** | The number of nodes that are running at least 1 daemon pod and are supposed to run the daemon pod. More info: https://kubernetes.io/docs/concepts/workloads/controllers/daemonset/ | 
**desiredNumberScheduled** | **Number** | The total number of nodes that should be running the daemon pod (including nodes correctly running the daemon pod). More info: https://kubernetes.io/docs/concepts/workloads/controllers/daemonset/ | 
**numberAvailable** | **Number** | The number of nodes that should be running the daemon pod and have one or more of the daemon pod running and available (ready for at least spec.minReadySeconds) | [optional] 
**numberMisscheduled** | **Number** | The number of nodes that are running the daemon pod, but are not supposed to run the daemon pod. More info: https://kubernetes.io/docs/concepts/workloads/controllers/daemonset/ | 
**numberReady** | **Number** | The number of nodes that should be running the daemon pod and have one or more of the daemon pod running and ready. | 
**numberUnavailable** | **Number** | The number of nodes that should be running the daemon pod and have none of the daemon pod running and available (ready for at least spec.minReadySeconds) | [optional] 
**observedGeneration** | **Number** | The most recent generation observed by the daemon set controller. | [optional] 
**updatedNumberScheduled** | **Number** | The total number of nodes that are running updated daemon pod | [optional] 


