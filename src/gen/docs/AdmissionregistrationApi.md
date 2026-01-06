# .AdmissionregistrationApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**getAPIGroup**](AdmissionregistrationApi.md#getAPIGroup) | **GET** /apis/admissionregistration.k8s.io/ | 


# **getAPIGroup**
> V1APIGroup getAPIGroup()

get information of a group

### Example


```typescript
import { createConfiguration, AdmissionregistrationApi } from '';

const configuration = createConfiguration();
const apiInstance = new AdmissionregistrationApi(configuration);

const request = {};

const data = await apiInstance.getAPIGroup(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters
This endpoint does not need any parameter.


### Return type

**V1APIGroup**

### Authorization

[BearerToken](README.md#BearerToken)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json, application/yaml, application/vnd.kubernetes.protobuf


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | OK |  -  |
**401** | Unauthorized |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)


