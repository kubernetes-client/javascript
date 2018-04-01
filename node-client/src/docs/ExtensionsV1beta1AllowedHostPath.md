# KubernetesJsClient.ExtensionsV1beta1AllowedHostPath

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**pathPrefix** | **String** | is the path prefix that the host volume must match. It does not support &#x60;*&#x60;. Trailing slashes are trimmed when validating the path prefix with a host path.  Examples: &#x60;/foo&#x60; would allow &#x60;/foo&#x60;, &#x60;/foo/&#x60; and &#x60;/foo/bar&#x60; &#x60;/foo&#x60; would not allow &#x60;/food&#x60; or &#x60;/etc/foo&#x60; | [optional] 


