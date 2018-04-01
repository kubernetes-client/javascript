# KubernetesJsClient.V1NodeStatus

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**addresses** | [**[V1NodeAddress]**](V1NodeAddress.md) | List of addresses reachable to the node. Queried from cloud provider, if available. More info: https://kubernetes.io/docs/concepts/nodes/node/#addresses | [optional] 
**allocatable** | **{String: String}** | Allocatable represents the resources of a node that are available for scheduling. Defaults to Capacity. | [optional] 
**capacity** | **{String: String}** | Capacity represents the total resources of a node. More info: https://kubernetes.io/docs/concepts/storage/persistent-volumes#capacity | [optional] 
**conditions** | [**[V1NodeCondition]**](V1NodeCondition.md) | Conditions is an array of current observed node conditions. More info: https://kubernetes.io/docs/concepts/nodes/node/#condition | [optional] 
**daemonEndpoints** | [**V1NodeDaemonEndpoints**](V1NodeDaemonEndpoints.md) | Endpoints of daemons running on the Node. | [optional] 
**images** | [**[V1ContainerImage]**](V1ContainerImage.md) | List of container images on this node | [optional] 
**nodeInfo** | [**V1NodeSystemInfo**](V1NodeSystemInfo.md) | Set of ids/uuids to uniquely identify the node. More info: https://kubernetes.io/docs/concepts/nodes/node/#info | [optional] 
**phase** | **String** | NodePhase is the recently observed lifecycle phase of the node. More info: https://kubernetes.io/docs/concepts/nodes/node/#phase The field is never populated, and now is deprecated. | [optional] 
**volumesAttached** | [**[V1AttachedVolume]**](V1AttachedVolume.md) | List of volumes that are attached to the node. | [optional] 
**volumesInUse** | **[String]** | List of attachable volumes in use (mounted) by the node. | [optional] 


