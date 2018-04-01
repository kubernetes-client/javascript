# KubernetesJsClient.V1beta1CertificateSigningRequestSpec

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**extra** | **{String: [String]}** | Extra information about the requesting user. See user.Info interface for details. | [optional] 
**groups** | **[String]** | Group information about the requesting user. See user.Info interface for details. | [optional] 
**request** | **Blob** | Base64-encoded PKCS#10 CSR data | 
**uid** | **String** | UID information about the requesting user. See user.Info interface for details. | [optional] 
**usages** | **[String]** | allowedUsages specifies a set of usage contexts the key will be valid for. See: https://tools.ietf.org/html/rfc5280#section-4.2.1.3      https://tools.ietf.org/html/rfc5280#section-4.2.1.12 | [optional] 
**username** | **String** | Information about the requesting user. See user.Info interface for details. | [optional] 


