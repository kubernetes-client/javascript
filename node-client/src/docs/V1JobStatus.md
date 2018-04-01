# KubernetesJsClient.V1JobStatus

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**active** | **Number** | The number of actively running pods. | [optional] 
**completionTime** | **Date** | Represents time when the job was completed. It is not guaranteed to be set in happens-before order across separate operations. It is represented in RFC3339 form and is in UTC. | [optional] 
**conditions** | [**[V1JobCondition]**](V1JobCondition.md) | The latest available observations of an object&#39;s current state. More info: https://kubernetes.io/docs/concepts/workloads/controllers/jobs-run-to-completion/ | [optional] 
**failed** | **Number** | The number of pods which reached phase Failed. | [optional] 
**startTime** | **Date** | Represents time when the job was acknowledged by the job controller. It is not guaranteed to be set in happens-before order across separate operations. It is represented in RFC3339 form and is in UTC. | [optional] 
**succeeded** | **Number** | The number of pods which reached phase Succeeded. | [optional] 


