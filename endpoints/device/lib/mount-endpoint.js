var createEndpoint = require('rtapi-router');
var createRouter = require('routes-router');
var path = require('path');
var fs = require('fs');

module.exports = mountEndpoint;

function mountEndpoint(specDir, specs) {
    var router = createRouter();
    var specFolder = path.join(specDir, 'specs');

    var specSchemas = loadSchemas(specFolder);

    var descriptiveSpec = toDescriptive(specs);

    Object.keys(descriptiveSpec).forEach(function addUri(url) {
        var endpoint = descriptiveSpec[url];
        var handlers = {};

        Object.keys(endpoint).forEach(function addMethod(method) {
            var methodHandler = endpoint[method];
            var schema = resolveSchemas(
                specSchemas, methodHandler.schema);
            schema = toDescriptiveMethod(schema, method);
            var handler = toDescriptiveHandler(methodHandler.handler);

            handlers[method] = createEndpoint(
                schema,
                handler,
                { specDir: specFolder }
            );
        });

        router.addRoute(url, handlers);
    });

    return router;
}

function loadSchemas(specFolder) {
    var specSchemas = {};
    var files = fs.readdirSync(specFolder);
    var jsonFiles = files.filter(function isJSON(fileName) {
        return /\.json$/.test(fileName);
    });

    var jsons = jsonFiles.map(function loadFile(fileName) {
        return require(path.join(specFolder, fileName));
    });

    jsons.forEach(function addSchema(jsonObj) {
        if (jsonObj && typeof jsonObj.id === 'string') {
            specSchemas[jsonObj.id] = jsonObj;
        }
    });

    return specSchemas;
}

function resolveSchemas(specSchemas, schemas) {
    var schema = {};

    Object.keys(schemas).forEach(function addSchema(version) {
        if (typeof schemas[version] === 'string') {
            schema[version] = specSchemas[schemas[version]];
        } else {
            schema[version] = schemas[version];
        }
    });

    return schema;
}

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

function toDescriptiveMethod(schemas, method) {
    var schema = {};

    Object.keys(schemas).forEach(function addSchema(version) {
        var httpSchema = {};
        var methodSchema = schemas[version];

        var bodyRequest = method !== 'GET' ?
            (methodSchema.request || {}) : {};
        var queryRequest = method !== 'POST' ?
            (methodSchema.request || {}) : {};
        var response = methodSchema.response || {};

        httpSchema.request = {
            type: 'object',
            properties: {
                body: bodyRequest,
                query: queryRequest
            }
        };
        httpSchema.response = {
            type: 'object',
            properties: {
                body: response,
                statusCode: {
                    type: 'number',
                    enum: [200]
                }
            }
        };

        schema[version] = httpSchema;
    });

    return schema;
}

function toDescriptiveHandler(handler) {
    return function typedHandler(typedRequest, opts, cb) {
        var incoming = typedRequest.body ||
            typedRequest.query;

        handler(incoming, opts, onResult);

        function onResult(err, value) {
            if (err) {
                return cb(err);
            }

            cb(null, { body: value, statusCode: 200 });
        }
    };
}
