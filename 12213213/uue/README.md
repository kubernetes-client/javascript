The **UUE** module is able to perform [uuencoding](http://en.wikipedia.org/wiki/Uuencoding) of a file (or Node.js Buffer) to a text message. This module is also able to find and decode uuencoded files in text messages.

The module is named after a common `.UUE` suffix for Fidonet echomail areas where uuencoded files are posted (sometimes the results of such encoding are also known as “UUE codes”).

The module is written in JavaScript and requires [Node.js](http://nodejs.org/) to run.

## Installing the UUE module

[![(npm package version)](https://nodei.co/npm/uue.png?downloads=true)](https://npmjs.org/package/uue)

* Latest packaged version: `npm install uue`

* Latest githubbed version: `npm install https://github.com/Mithgol/node-uue/tarball/master`

The npm package does not contain the tests, they're published on GitHub only.

You may visit https://github.com/Mithgol/node-uue#readme occasionally to read the latest `README` because the package's version is not planned to grow after changes when they happen in `README` only. (And `npm publish --force` is [forbidden](http://blog.npmjs.org/post/77758351673/no-more-npm-publish-f) nowadays.)

## Using the UUE module

When you `require()` the installed module, you get an object that has the following methods:

### encode(encodeSource, encodeOptions)

Returns a string of UUE codes that represent the given source.

* If `encodeSource` is a string, it is interpreted as a path of some file, and that file is uuencoded.

* If `encodeSource` is a Node.js [Buffer](http://nodejs.org/docs/latest/api/buffer.html), the contents of that buffer become uuencoded.

**Note: ** if a file's name is given to the `.encode` method, a synchronous reading of the given file is performed. If you need an asynchronous reading, perform it yourself and give the resulting Buffer to the `.encode` method.

The optional `encodeOptions` parameter is an object with the following optional properties:

* `mode` — read/write/execute permissions for the file. If this property is omitted, three last octal digits of the `mode` property of the given file's [`fs.Stats`](http://nodejs.org/docs/latest/api/fs.html#fs_class_fs_stats) object are used (or `'644'` if a Buffer is given in `encodeSource` instead of a file). The `mode` property may be given as a string (of octal digits) or as a number (for example, `'666'` and `438` are equivalent).

* `filename` — a file's name to be given in UUE codes. (For example, if `encodeOptions` is `{mode:'664', filename:'filename.ext'}`, then the first line of UUE codes is `begin 664 filename.ext`.) If this property is omitted, then [`path.basename(encodeSource)`](http://nodejs.org/docs/latest/api/path.html#path_path_basename_p_ext) is used (or `'buffer.bin'` if a Buffer is given in `encodeSource` instead of a file).

* `eol` — end-of-line character(s). If this property is omitted, `\n` (`\x0A`) is used (as in Web or UN*X applications). You may want to set `encodeOptions.eol` equal to [`os.EOL`](http://nodejs.org/docs/latest/api/os.html#os_os_eol) on other systems. The value of `encodeOptions.eol` is used only as a separator between lines of UUE codes, but neither in the beginning nor at the end of the returned string.

Example (uuencoding the word `'Cat'`, [as in Wikipedia):](http://en.wikipedia.org/w/index.php?title=Uuencoding&oldid=607304984#Formatting_mechanism)

![(uuencoding example)](https://cloud.githubusercontent.com/assets/1088720/3140039/8953db68-e901-11e3-9759-0ebff59ea331.gif)

### decodeFile(text, filename)

Using the given `filename`, finds the uuencoded file in the given `text`, decodes the file and returns it as a Node.js [Buffer.](http://nodejs.org/docs/latest/api/buffer.html)

Lines in the given `text` are expected to be separated by `'\n'` (`\x0A`).

Invalid UUE codes are ignored.

Any UUE codes of any file that has a different filename (not the given `filename`) are ignored. (If `text` contains several uuencoded files, it is not necessary for `filename` to go first.)

If several uuencoded files have the same `filename`, only the first is returned.

If the file cannot be found, `null` is returned.

## Locking files

The module **does not** lock any files and **does not** create any “lock files” (flag files, semaphore files). The module's caller should control the access to the file that is being encoded.

## Testing the UUE module

[![(build testing status)](https://travis-ci.org/Mithgol/node-uue.svg?branch=master)](https://travis-ci.org/Mithgol/node-uue)

The tests are not included in the npm package of the module (to keep it small). Use the version from GitHub.

It is necessary to install [Mocha](http://visionmedia.github.io/mocha/) and [JSHint](http://jshint.com/) for testing.

* You may install Mocha globally (`npm install mocha -g`) or locally (`npm install mocha` in the directory of the UUE module).

* You may install JSHint globally (`npm install jshint -g`) or locally (`npm install jshint` in the directory of the UUE module).

After that you may run `npm test` (in the directory of the UUE module).

## License

MIT license (see the `LICENSE` file).