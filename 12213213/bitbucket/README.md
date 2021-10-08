[![version:@latest](https://img.shields.io/npm/v/bitbucket.svg?style=for-the-badge)](https://www.npmjs.com/package/bitbucket)
[![Documentation](https://img.shields.io/badge/docs-bitbucket.js-blue.svg?style=for-the-badge)](https://bitbucketjs.netlify.app)
[![License](https://img.shields.io/github/license/MunifTanjim/node-bitbucket.svg?style=for-the-badge)](https://github.com/MunifTanjim/node-bitbucket/blob/master/LICENSE)

# Bitbucket.js

Bitbucket API client for Browser and Node.js

Bitbucket API docs: [https://api.bitbucket.org](https://api.bitbucket.org)

---

**BITBUCKET CLOUD API LATEST UPDATES**: [https://developer.atlassian.com/cloud/bitbucket](https://developer.atlassian.com/cloud/bitbucket)

---

## Installation

via **npm**:

```sh
$ npm install --save bitbucket
```

via **yarn**:

```sh
$ yarn add bitbucket
```

## Usage

### Browser

```html
<script src="https://unpkg.com/bitbucket/lib/index.umd.js"></script>
<script>
  const bitbucket = new Bitbucket()
</script>
```

### Node

```js
const { Bitbucket } = require('bitbucket')

const bitbucket = new Bitbucket()
```

#### Client Options

You can set the APIs' `baseUrl` and modify some behaviors (e.g. request timeout etc.) by passing a clientOptions object to the `Bitbucket` constructor.

```js
const clientOptions = {
  baseUrl: 'https://api.bitbucket.org/2.0',
  request: {
    timeout: 10,
  },
}

const bitbucket = new Bitbucket(clientOptions)
```

#### Authentication

**Using `username` and `password`**:

```js
const clientOptions = {
  auth: {
    username: 'username',
    password: 'password',
  },
}

const bitbucket = new Bitbucket(clientOptions)
```

**Using `token`**:

```js
const clientOptions = {
  auth: {
    token: 'abcdef123456',
  },
}

const bitbucket = new Bitbucket(clientOptions)
```

#### API Methods

**async/await**

```js
try {
  const { data, headers, status, url } = await bitbucket.<namespace>.<api>({ ...params })
} catch (err) {
  const { message, error, headers, request, status } = err
}
```

**Promise**

```js
bitbucket.<namespace>
  .<api>({ ...params })
  .then(({ data, headers, status, url }) => {})
  .catch(({ message, error, headers, request, status }) => {})
```

Notes:

- `<namespace>` is one of the _Namespace Names_
- `<api>` is one of the _API Names_

#### Namespace Names

`branching_model`, `branchrestrictions`, `commits`, `commitstatuses`, `deploy`, `deployments`, `downloads`, `hook_events`, `issue_tracker`, `pipelines`, `projects`, `pullrequests`, `refs`, `repositories`, `search`, `snippet`, `snippets`, `source`, `ssh`, `teams`, `user`, `users`, `webhooks`

#### API Names

Check API client docs: [https://bitbucketjs.netlify.com](https://bitbucketjs.netlify.com)

##### Examples

```js
bitbucket.repositories
  .listGlobal({})
  .then(({ data }) => console.log(data.values))
  .catch((err) => console.error(err))
```

## Acknowledgement

This API client is heavily inspired by the **[`octokit/rest.js`](https://github.com/octokit/rest.js/)** and a lot of ideas are taken from there. So, thanks goes to the maintainer [Gregor Martynus](https://github.com/gr2m) and all the [awesome contributors](https://github.com/octokit/rest.js/graphs/contributors) of `octokit/rest.js`.

## License

Licensed under the MIT License. Check the [LICENSE](https://github.com/MunifTanjim/node-bitbucket/blob/master/LICENSE) file for details.
