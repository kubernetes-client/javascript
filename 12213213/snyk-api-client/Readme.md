# NodeJS API helper/client for [Snyk API](https://snyk.docs.apiary.io/#reference/users/user-details/get-user-details) [![Known Vulnerabilities](https://snyk.io/test/github/lovebhardwajsnyk/snyk-api-client/badge.svg)](https://snyk.io/test/github/lovebhardwajsnyk/snyk-api-client)

This is a simple set of library functions that can be used to consume the Snyk API. You don't have to worry about calling the endpoint yourself and thinking if it's a `GET` request, `PUT` request, `POST` request, etc. That is already configured for you behind the scenes.

**Note\***: Package is still in development and is not stable

## Config

The client needs to supplied the API token to work. This is required, otherwise a error is thrown. There are two ways to do this:

- You can supply the API token by exporting environment variable `SNYK_API_TOKEN`
- You can import the ClientConfig and set the API token

```ts
import { ClientConfig } from 'snyk-api-client';

ClientConfig.set({ apiToken: process.env.TOKEN_SNYK_API });
```

The following settings the can be configure through the ClientConfig are the following:

- apiToken: set to environment variable SNYK_API_TOKEN by default
- baseUrl: set to https://snyk.io by default
- baseApiPath: set to /api/v1 by default

Example:

```ts
ClientConfig.set({
  baseUrl: 'https://snyk.io.something',
  baseApiPath: '/api/v2',
});
```

## API

Once you have the API token setup you can use the helper functions right away. You can import objects corressponding to each API group. For example for user related API called you can import the `User` object and for Snyk Organization related API calls you can import the `Group` object and then call the required functions to execute an API call. Each object has all corresponding calls as described in the [Snyk API Documentation](https://snyk.docs.apiary.io/#)

```ts
// Import the General API object
import { General, User } from 'snyk-api-client';
// Call the general docs API
const res = await General.getDocs();
const res = await User.getMyDetails();
```

Each function will accepts a optional options object which can used to overwrite the value of ClientConfig that you set earlier. This is helpful in cases where you want to override settings just for one or few API calls or to pass the URL query parameters and the request body. The following fields are available for each request:

- `apiToken`
- `baseUrl`
- `baseApiPath`
- `requestBody`
- `queryParams`

## Request and Response

Every API call returns a `Promise` and whenever the promise is resolved or rejected it return the following object:

```ts
Promise.resolve({
  success: boolean,
  response: object,
  error: Error | null,
  httpCode: number | null,
  snykRequestId: string | null,
});
```

- `sucess`: A boolean value which indicated if the request was a sucess or not
- `response`: The response from the API
- `error`: The error returned by the API or any other error such as API token not set
- `httpCode`: The HTTP return code from calling the API, null if request errored
- `snykRequestId`: The request ID of the request which is used by Snyk for logging, can be used in case of errors or failed request

### Example Usage:

Get Request:

```ts
try {
  const res = await Entitlement.listAllEntitlements({ orgId: 'your-snyk-org-id' });
} catch (error) {
  console.error(error);
}
```

Post Request:

```ts
const requestBody = { email: 'example@example.com' };

try {
  const res = await Org.inviteUserToOrg({ orgId: 'snyk-org-id' }, { requestBody });
} catch (error) {
  console.error(error);
}
```

Sucessful Response:

```ts
{
  success: true,
  response: {
    id: '0b38513b-7dcd-4054-bc62-df93eab3',
    name: 'example:package.json',
    branch: 'master'
  },
  error: null,
  httpCode: 200,
  snykRequestId: 'df93eab3-35bf-406e-91fe-fb4ebecb145b'
}
```

Error Reponse:

```ts
{
  success: false,
  response: {
    code: 401,
    message: 'Invalid auth token provided',
    error: 'Invalid auth token provided'
  },
  error: Error: Invalid token or unauthorized to make the request
      at /snyk-api-helper/dist/lib/utils/processRequest.js:163:31
      at step (/snyk-api-helper/dist/lib/utils/processRequest.js:33:23)
      at Object.throw (/snyk-api-helper/dist/lib/utils/processRequest.js:14:53)
      at rejected (/snyk-api-helper/dist/lib/utils/processRequest.js:6:65)
      at processTicksAndRejections (internal/process/task_queues.js:93:5),
  httpCode: 401,
  snykRequestId: '165ed584-0b7c-480a-8c61-07e061e1fbe2'
}
```

## Examples

Some example to use the pacakge can be found here: [snyk-api-client examples](https://github.com/lovebhardwajsnyk/snyk-api-client-examples)

## Issues and Bugs

Please open a issue if you encounter any bugs or errors
