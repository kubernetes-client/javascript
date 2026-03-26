---
id: LogsApi
title: LogsApi
sidebar_label: LogsApi
sidebar_position: 10
---
# LogsApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**logFileHandler**](/docs/api-reference/other/LogsApi#logFileHandler) | **GET** /logs/{logpath} |
[**logFileListHandler**](/docs/api-reference/other/LogsApi#logFileListHandler) | **GET** /logs/ |

### logFileHandler

<a id="logFileHandler"></a>

> logFileHandler()

### Example

<a id="Example"></a>
```typescript
import { createConfiguration, LogsApi } from '@kubernetes/client-node';
import type { LogsApiLogFileHandlerRequest } from '@kubernetes/client-node';

const configuration = createConfiguration();
const apiInstance = new LogsApi(configuration);

const request: LogsApiLogFileHandlerRequest = {
    // path to the log
  logpath: "logpath_example",
};

const data = await apiInstance.logFileHandler(request);
console.log('API called successfully. Returned data:', data);
```

### Parameters

<a id="Parameters"></a>
Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **logpath** | [**string**] | path to the log | defaults to undefined

### Return type

void (empty response body)

### Authorization

<a id="Authorization"></a>
[BearerToken](#authorization)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined

### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**401** | Unauthorized |  -  |

### logFileListHandler

<a id="logFileListHandler"></a>

> logFileListHandler()

### Example

<a id="Example"></a>
```typescript
import { createConfiguration, LogsApi } from '@kubernetes/client-node';

const configuration = createConfiguration();
const apiInstance = new LogsApi(configuration);

const request = {};

const data = await apiInstance.logFileListHandler(request);
console.log('API called successfully. Returned data:', data);
```

### Parameters

<a id="Parameters"></a>
This endpoint does not need any parameter.

### Return type

void (empty response body)

### Authorization

<a id="Authorization"></a>
[BearerToken](#authorization)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined

### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**401** | Unauthorized |  -  |

