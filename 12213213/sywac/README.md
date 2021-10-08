# ![sywac](logo.png)

> So you want a CLI...

[![Build Status](https://travis-ci.org/sywac/sywac.svg?branch=master)](https://travis-ci.org/sywac/sywac)
[![Coverage Status](https://coveralls.io/repos/github/sywac/sywac/badge.svg?branch=master)](https://coveralls.io/github/sywac/sywac?branch=master)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![Greenkeeper badge](https://badges.greenkeeper.io/sywac/sywac.svg)](https://greenkeeper.io/)

A better CLI framework, made for the ES2015 era.

Visit http://sywac.io for detailed documentation. **NOTE!** The docs site is still under construction.

## Feature Highlights

- Single package install
- Asynchronous parsing, validation, and command execution
- Type-based argument parsing
- Plug in your own types or override/extend the built-in ones
- Support for simple CLIs or complex nested command trees
- First-class support for positional arguments, with or without commands
- Flexible auto-generated help content
- Support for ANSI styles/colors (we recommend [chalk](https://github.com/chalk/chalk))
- Define styles/colors inline or decorate content with style hooks
- Coherent API
- Parse strings as easily as `process.argv`
- Supports concurrent parsing, safe for chatbots or other server-side apps

## Quick Start Guide

First install sywac from npm:

```console
$ npm install --save sywac
```

Then create a `cli.js` file with code similar to this:

```js
#!/usr/bin/env node
'use strict'

require('sywac')
  .positional('<string>', { paramsDesc: 'A required string argument' })
  .boolean('-b, --bool', { desc: 'A boolean option' })
  .number('-n, --num <number>', { desc: 'A number option' })
  .help('-h, --help')
  .version('-v, --version')
  .showHelpByDefault()
  .outputSettings({ maxWidth: 75 })
  .parseAndExit()
  .then(argv => {
    console.log(JSON.stringify(argv, null, 2))
  })
```

Make the `cli.js` file executable:

```console
$ chmod +x cli.js
```

And set up `cli.js` as the `"bin"` field in `package.json`:

```json
{
  "name": "example",
  "version": "0.1.0",
  "bin": "cli.js"
}
```

Then test it out. Without any arguments, it will print the help text.

```console
$ ./cli.js
Usage: cli <string> [options]

Arguments:
  <string>  A required string argument                  [required] [string]

Options:
  -b, --bool          A boolean option                            [boolean]
  -n, --num <number>  A number option                              [number]
  -h, --help          Show help                  [commands: help] [boolean]
  -v, --version       Show version number     [commands: version] [boolean]
```

Let's try passing some arguments:

```console
$ ./cli.js hello -b -n 42
{
  "_": [],
  "string": "hello",
  "b": true,
  "bool": true,
  "n": 42,
  "num": 42,
  "h": false,
  "help": false,
  "v": false,
  "version": false
}
```

What happens if we pass flags without a string argument?

```console
$ ./cli.js --bool
Usage: cli <string> [options]

Arguments:
  <string>  A required string argument                  [required] [string]

Options:
  -b, --bool          A boolean option                            [boolean]
  -n, --num <number>  A number option                              [number]
  -h, --help          Show help                  [commands: help] [boolean]
  -v, --version       Show version number     [commands: version] [boolean]

Missing required argument: string
```

Validation failed and sywac printed the help text with an error message. Let's check the exit code of that last run:

```console
$ echo $?
1
```

This is a good sign that our CLI will play well with others.

## API

For details on the full API, go to http://sywac.io

## License

MIT
