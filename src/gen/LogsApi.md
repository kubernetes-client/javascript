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
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .LogsApi(configuration);

let body:.LogsApiLogFileHandlerRequest = {
  // string | path to the log
  logpath: "logpath_example",
};

apiInstance.logFileHandler(body).then((data:any) => {
  console.log('API called successfully. Returned data: ' + data);
}).catch((error:any) => console.error(error));
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
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .LogsApi(configuration);

let body:any = {};

apiInstance.logFileListHandler(body).then((data:any) => {
  console.log('API called successfully. Returned data: ' + data);
}).catch((error:any) => console.error(error));
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


