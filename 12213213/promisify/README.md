# Promisify: Convert callback-based APIs to promises

Promises are a popular solution to some of the drawbacks of the
callback-style async APIs dominant in node.js libraries.  But it's
awkward to write an node.js application using promises when all the
libraries you want to use are callback-based.

Hence Promisify.  It converts callback-style APIs to use promises
instead.  To use it, you provide a concise description of the
structure of the API to tell Promisify what to convert.  For example,
here is a sample which converts a substantial portion of the MongoDB
driver API to Promises:

    var promisify = require('promisify');

    var promisify_collection = promisify.object({
        insert: promisify.cb_func(),
        remove: promisify.cb_func(),
        findOne: promisify.cb_func(),
        find: promisify.func(promisify.object({
            stream: promisify.func(promisify.read_stream())
        }))
    });

    var promisify_connection = promisify.object({
        collection: promisify.cb_func(promisify_collection),
        createCollection: promisify.cb_func(promisify_collection),
        dropCollection: promisify.cb_func()
    });

    var promisify_mongodb = promisify.object({
        connect: promisify.cb_func(promisify_connection)
    });

    var mongodb = promisify_mongodb(require('mongodb'));

Promisify is built upon the [when.js](https://github.com/cujojs/when)
implementation of promises.
