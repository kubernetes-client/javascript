# KubernetesJsClient.V1beta2DeploymentStatus

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**availableReplicas** | **Number** | Total number of available pods (ready for at least minReadySeconds) targeted by this deployment. | [optional] 
**collisionCount** | **Number** | Count of hash collisions for the Deployment. The Deployment controller uses this field as a collision avoidance mechanism when it needs to create the name for the newest ReplicaSet. | [optional] 
**conditions** | [**[V1beta2DeploymentCondition]**](V1beta2DeploymentCondition.md) | Represents the latest available observations of a deployment&#39;s current state. | [optional] 
**observedGeneration** | **Number** | The generation observed by the deployment controller. | [optional] 
**readyReplicas** | **Number** | Total number of ready pods targeted by this deployment. | [optional] 
**replicas** | **Number** | Total number of non-terminated pods targeted by this deployment (their labels match the selector). | [optional] 
**unavailableReplicas** | **Number** | Total number of unavailable pods targeted by this deployment. This is the total number of pods that are still required for the deployment to have 100% available capacity. They may either be pods that are running but not yet available or pods that still have not been created. | [optional] 
**updatedReplicas** | **Number** | Total number of non-terminated pods targeted by this deployment that have the desired template spec. | [optional] 


