# .VersionApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**getCode**](VersionApi.md#getCode) | **GET** /version/ | 


# **getCode**
> VersionInfo getCode()

get the version information for this server

### Example


```typescript
import { createConfiguration, VersionApi } from '';

const configuration = createConfiguration();
const apiInstance = new VersionApi(configuration);

const request = {};

const data = await apiInstance.getCode(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters
This endpoint does not need any parameter.


### Return type

**VersionInfo**

### Authorization

[BearerToken](README.md#BearerToken)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | OK |  -  |
**401** | Unauthorized |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)


