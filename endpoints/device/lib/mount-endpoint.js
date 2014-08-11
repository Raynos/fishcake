var createEndpoint = require('rtapi-router');
var createRouter = require('routes-router');

function mountEndpoint(specDir, specs) {
    var router = createRouter();

    var descriptiveSpec = toDescriptive(specs);

    Object.keys(descriptiveSpec).forEach(function addUri(url) {
        var endpoint = descriptiveSpec[url];
        var handlers = {};

        Object.keys(endpoint).forEach(function addMethod(method) {
            var methodHandler = endpoint[method];
            var schema = toDescriptiveMethod(methodHandler.schema);
            var handler = toDescriptiveHandler(methodHandler.handler);

            handlers[method] = createEndpoint(
                schema,
                handler,
                { specDir: specDir + '/specs' }
            );
        });

        router.addRoute(url, handlers);
    });

    return router;
}

module.exports = mountEndpoint;

function toDescriptive(specs) {
    var descriptiveSpec = {};
    var read = specs.read || {};
    var rpc = specs.rpc || {};

    Object.keys(read).forEach(function toGet(queryKey) {
        var url = '/' + queryKey;

        if (queryKey === 'index') {
            url = '/';
        }

        if (!descriptiveSpec[url]) {
            descriptiveSpec[url] = {};
        }

        descriptiveSpec[url].GET = {
            handler: read[queryKey].handler,
            schema: read[queryKey].schema
        };
    });

    Object.keys(rpc).forEach(function toPost(commandKey) {
        var url = '/' + commandKey;

        if (commandKey === 'index') {
            url = '/';
        }

        if (!descriptiveSpec[url]) {
            descriptiveSpec[url] = {};
        }

        descriptiveSpec[url].POST = {
            handler: rpc[commandKey].handler,
            schema: rpc[commandKey].schema
        };
    });

    return descriptiveSpec;
}

function toDescriptiveMethod(schemas) {
    var schema = {};

    Object.keys(schemas).forEach(function addSchema(version) {
        var httpSchema = {};
        var methodSchema = schemas[version];

        var request = methodSchema.request || {};
        var response = methodSchema.response || {};

        httpSchema.request = {
            type: 'object',
            properties: {
                body: request
            }
        };
        httpSchema.response = {
            body: response,
            statusCode: 200
        };

        schema[version] = httpSchema;
    });

    return schema;
}

function toDescriptiveHandler(handler) {
    return function typedHandler(typedRequest, opts, cb) {
        var incoming = typedRequest.body;

        handler(incoming, opts, onResult);

        function onResult(err, value) {
            if (err) {
                return cb(err);
            }

            cb(null, { body: value, statusCode: 200 });
        }
    };
}
