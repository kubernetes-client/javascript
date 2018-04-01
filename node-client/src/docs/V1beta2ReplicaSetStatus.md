# KubernetesJsClient.V1beta2ReplicaSetStatus

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**availableReplicas** | **Number** | The number of available replicas (ready for at least minReadySeconds) for this replica set. | [optional] 
**conditions** | [**[V1beta2ReplicaSetCondition]**](V1beta2ReplicaSetCondition.md) | Represents the latest available observations of a replica set&#39;s current state. | [optional] 
**fullyLabeledReplicas** | **Number** | The number of pods that have labels matching the labels of the pod template of the replicaset. | [optional] 
**observedGeneration** | **Number** | ObservedGeneration reflects the generation of the most recently observed ReplicaSet. | [optional] 
**readyReplicas** | **Number** | The number of ready replicas for this replica set. | [optional] 
**replicas** | **Number** | Replicas is the most recently oberved number of replicas. More info: https://kubernetes.io/docs/concepts/workloads/controllers/replicationcontroller/#what-is-a-replicationcontroller | 


