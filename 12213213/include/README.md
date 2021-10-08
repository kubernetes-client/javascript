# node-include

Require local files relative to the path provided at require.

# install

npm install include

# usage

```js
var include = require('include')(__dirname);
```

#### without include

```js
var foo = require('../../../path/to/foo');
```

#### with include

```js
var foo = include('path/to/foo');
```

# license
MIT
