# KubernetesJsClient.V1beta2StatefulSetStatus

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**collisionCount** | **Number** | collisionCount is the count of hash collisions for the StatefulSet. The StatefulSet controller uses this field as a collision avoidance mechanism when it needs to create the name for the newest ControllerRevision. | [optional] 
**conditions** | [**[V1beta2StatefulSetCondition]**](V1beta2StatefulSetCondition.md) | Represents the latest available observations of a statefulset&#39;s current state. | [optional] 
**currentReplicas** | **Number** | currentReplicas is the number of Pods created by the StatefulSet controller from the StatefulSet version indicated by currentRevision. | [optional] 
**currentRevision** | **String** | currentRevision, if not empty, indicates the version of the StatefulSet used to generate Pods in the sequence [0,currentReplicas). | [optional] 
**observedGeneration** | **Number** | observedGeneration is the most recent generation observed for this StatefulSet. It corresponds to the StatefulSet&#39;s generation, which is updated on mutation by the API Server. | [optional] 
**readyReplicas** | **Number** | readyReplicas is the number of Pods created by the StatefulSet controller that have a Ready Condition. | [optional] 
**replicas** | **Number** | replicas is the number of Pods created by the StatefulSet controller. | 
**updateRevision** | **String** | updateRevision, if not empty, indicates the version of the StatefulSet used to generate Pods in the sequence [replicas-updatedReplicas,replicas) | [optional] 
**updatedReplicas** | **Number** | updatedReplicas is the number of Pods created by the StatefulSet controller from the StatefulSet version indicated by updateRevision. | [optional] 


