# KubernetesJsClient.V1HorizontalPodAutoscalerStatus

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**currentCPUUtilizationPercentage** | **Number** | current average CPU utilization over all pods, represented as a percentage of requested CPU, e.g. 70 means that an average pod is using now 70% of its requested CPU. | [optional] 
**currentReplicas** | **Number** | current number of replicas of pods managed by this autoscaler. | 
**desiredReplicas** | **Number** | desired number of replicas of pods managed by this autoscaler. | 
**lastScaleTime** | **Date** | last time the HorizontalPodAutoscaler scaled the number of pods; used by the autoscaler to control how often the number of pods is changed. | [optional] 
**observedGeneration** | **Number** | most recent generation observed by this autoscaler. | [optional] 


