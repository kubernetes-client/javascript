# KubernetesJsClient.ExtensionsV1beta1DeploymentStatus

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**availableReplicas** | **Number** | Total number of available pods (ready for at least minReadySeconds) targeted by this deployment. | [optional] 
**conditions** | [**[ExtensionsV1beta1DeploymentCondition]**](ExtensionsV1beta1DeploymentCondition.md) | Represents the latest available observations of a deployment&#39;s current state. | [optional] 
**observedGeneration** | **Number** | The generation observed by the deployment controller. | [optional] 
**readyReplicas** | **Number** | Total number of ready pods targeted by this deployment. | [optional] 
**replicas** | **Number** | Total number of non-terminated pods targeted by this deployment (their labels match the selector). | [optional] 
**unavailableReplicas** | **Number** | Total number of unavailable pods targeted by this deployment. | [optional] 
**updatedReplicas** | **Number** | Total number of non-terminated pods targeted by this deployment that have the desired template spec. | [optional] 


