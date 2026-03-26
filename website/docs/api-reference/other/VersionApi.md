---
id: VersionApi
title: VersionApi
sidebar_label: VersionApi
sidebar_position: 17
---
# VersionApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**getCode**](/docs/api-reference/other/VersionApi#getCode) | **GET** /version/ |

### getCode

<a id="getCode"></a>

> VersionInfo getCode()

get the version information for this server

### Example

<a id="Example"></a>
```typescript
import { createConfiguration, VersionApi } from '@kubernetes/client-node';

const configuration = createConfiguration();
const apiInstance = new VersionApi(configuration);

const request = {};

const data = await apiInstance.getCode(request);
console.log('API called successfully. Returned data:', data);
```

### Parameters

<a id="Parameters"></a>
This endpoint does not need any parameter.

### Return type

VersionInfo

### Authorization

<a id="Authorization"></a>
[BearerToken](#authorization)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | OK |  -  |
**401** | Unauthorized |  -  |

