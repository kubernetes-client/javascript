# KubernetesJsClient.V1ServerAddressByClientCIDR

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**kubernetes.clientCIDR** | **String** | The CIDR with which kubernetes.clients can match their IP to figure out the server address that they should use. | 
**serverAddress** | **String** | Address of this server, suitable for a kubernetes.client that matches the above CIDR. This can be a hostname, hostname:port, IP or IP:port. | 


