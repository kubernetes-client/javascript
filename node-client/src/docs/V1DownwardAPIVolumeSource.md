# KubernetesJsClient.V1DownwardAPIVolumeSource

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**defaultMode** | **Number** | Optional: mode bits to use on created files by default. Must be a value between 0 and 0777. Defaults to 0644. Directories within the path are not affected by this setting. This might be in conflict with other options that affect the file mode, like fsGroup, and the result can be other mode bits set. | [optional] 
**items** | [**[V1DownwardAPIVolumeFile]**](V1DownwardAPIVolumeFile.md) | Items is a list of downward API volume file | [optional] 


