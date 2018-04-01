# KubernetesJsClient.V1FCVolumeSource

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**fsType** | **String** | Filesystem type to mount. Must be a filesystem type supported by the host operating system. Ex. \&quot;ext4\&quot;, \&quot;xfs\&quot;, \&quot;ntfs\&quot;. Implicitly inferred to be \&quot;ext4\&quot; if unspecified. | [optional] 
**lun** | **Number** | Optional: FC target lun number | [optional] 
**readOnly** | **Boolean** | Optional: Defaults to false (read/write). ReadOnly here will force the ReadOnly setting in VolumeMounts. | [optional] 
**targetWWNs** | **[String]** | Optional: FC target worldwide names (WWNs) | [optional] 
**wwids** | **[String]** | Optional: FC volume world wide identifiers (wwids) Either wwids or combination of targetWWNs and lun must be set, but not both simultaneously. | [optional] 


