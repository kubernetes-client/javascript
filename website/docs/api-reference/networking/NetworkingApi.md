---
id: NetworkingApi
title: NetworkingApi
sidebar_label: NetworkingApi
sidebar_position: 3
---
# NetworkingApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**getAPIGroup**](/docs/api-reference/networking/NetworkingApi#getAPIGroup) | **GET** /apis/networking.k8s.io/ |

### getAPIGroup

<a id="getAPIGroup"></a>

> V1APIGroup getAPIGroup()

get information of a group

### Example

<a id="Example"></a>
```typescript
import { createConfiguration, NetworkingApi } from '@kubernetes/client-node';

const configuration = createConfiguration();
const apiInstance = new NetworkingApi(configuration);

const request = {};

const data = await apiInstance.getAPIGroup(request);
console.log('API called successfully. Returned data:', data);
```

### Parameters

<a id="Parameters"></a>
This endpoint does not need any parameter.

### Return type

V1APIGroup

### Authorization

<a id="Authorization"></a>
[BearerToken](#authorization)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json, application/yaml, application/vnd.kubernetes.protobuf

### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | OK |  -  |
**401** | Unauthorized |  -  |

