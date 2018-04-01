# KubernetesJsClient.V1beta1VolumeAttachmentStatus

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**attachError** | [**V1beta1VolumeError**](V1beta1VolumeError.md) | The last error encountered during attach operation, if any. This field must only be set by the entity completing the attach operation, i.e. the external-attacher. | [optional] 
**attached** | **Boolean** | Indicates the volume is successfully attached. This field must only be set by the entity completing the attach operation, i.e. the external-attacher. | 
**attachmentMetadata** | **{String: String}** | Upon successful attach, this field is populated with any information returned by the attach operation that must be passed into subsequent WaitForAttach or Mount calls. This field must only be set by the entity completing the attach operation, i.e. the external-attacher. | [optional] 
**detachError** | [**V1beta1VolumeError**](V1beta1VolumeError.md) | The last error encountered during detach operation, if any. This field must only be set by the entity completing the detach operation, i.e. the external-attacher. | [optional] 


