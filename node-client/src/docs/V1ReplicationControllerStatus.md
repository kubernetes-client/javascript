# KubernetesJsClient.V1ReplicationControllerStatus

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**availableReplicas** | **Number** | The number of available replicas (ready for at least minReadySeconds) for this replication controller. | [optional] 
**conditions** | [**[V1ReplicationControllerCondition]**](V1ReplicationControllerCondition.md) | Represents the latest available observations of a replication controller&#39;s current state. | [optional] 
**fullyLabeledReplicas** | **Number** | The number of pods that have labels matching the labels of the pod template of the replication controller. | [optional] 
**observedGeneration** | **Number** | ObservedGeneration reflects the generation of the most recently observed replication controller. | [optional] 
**readyReplicas** | **Number** | The number of ready replicas for this replication controller. | [optional] 
**replicas** | **Number** | Replicas is the most recently oberved number of replicas. More info: https://kubernetes.io/docs/concepts/workloads/controllers/replicationcontroller#what-is-a-replicationcontroller | 


