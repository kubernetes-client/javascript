---
id: InternalApiserverApi
title: InternalApiserverApi
sidebar_label: InternalApiserverApi
sidebar_position: 8
---
# InternalApiserverApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**getAPIGroup**](/docs/api-reference/other/InternalApiserverApi#getAPIGroup) | **GET** /apis/internal.apiserver.k8s.io/ |

### getAPIGroup

<a id="getAPIGroup"></a>

> V1APIGroup getAPIGroup()

get information of a group

### Example

<a id="Example"></a>
```typescript
import { createConfiguration, InternalApiserverApi } from '@kubernetes/client-node';

const configuration = createConfiguration();
const apiInstance = new InternalApiserverApi(configuration);

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

