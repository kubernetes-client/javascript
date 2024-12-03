# .LogsApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**logFileHandler**](LogsApi.md#logFileHandler) | **GET** /logs/{logpath} | 
[**logFileListHandler**](LogsApi.md#logFileListHandler) | **GET** /logs/ | 


# **logFileHandler**
> logFileHandler()


### Example


```typescript
import { createConfiguration, LogsApi } from '';
import type { LogsApiLogFileHandlerRequest } from '';

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

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **logpath** | [**string**] | path to the log | defaults to undefined


### Return type

void (empty response body)

### Authorization

[BearerToken](README.md#BearerToken)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**401** | Unauthorized |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **logFileListHandler**
> logFileListHandler()


### Example


```typescript
import { createConfiguration, LogsApi } from '';

const configuration = createConfiguration();
const apiInstance = new LogsApi(configuration);

const request = {};

const data = await apiInstance.logFileListHandler(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters
This endpoint does not need any parameter.


### Return type

void (empty response body)

### Authorization

[BearerToken](README.md#BearerToken)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**401** | Unauthorized |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)


