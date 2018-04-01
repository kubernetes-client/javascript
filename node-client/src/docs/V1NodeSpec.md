# KubernetesJsClient.V1NodeSpec

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**configSource** | [**V1NodeConfigSource**](V1NodeConfigSource.md) | If specified, the source to get node configuration from The DynamicKubeletConfig feature gate must be enabled for the Kubelet to use this field | [optional] 
**externalID** | **String** | External ID of the node assigned by some machine database (e.g. a cloud provider). Deprecated. | [optional] 
**podCIDR** | **String** | PodCIDR represents the pod IP range assigned to the node. | [optional] 
**providerID** | **String** | ID of the node assigned by the cloud provider in the format: &lt;ProviderName&gt;://&lt;ProviderSpecificNodeID&gt; | [optional] 
**taints** | [**[V1Taint]**](V1Taint.md) | If specified, the node&#39;s taints. | [optional] 
**unschedulable** | **Boolean** | Unschedulable controls node schedulability of new pods. By default, node is schedulable. More info: https://kubernetes.io/docs/concepts/nodes/node/#manual-node-administration | [optional] 


