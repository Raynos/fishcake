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
            handlers[method] = createEndpoint(
                toDescriptiveMethod(methodHandler.schema),
                methodHandler.handler,
                { specDir: specDir + '/specs' }
            );
        });

        router.addRoute(url, handlers);
    });

    return router;
}

module.exports = mountEndpoint;

function toDescriptive(specs) {
    return specs;
}

function toDescriptiveMethod(methodSchema) {
    return methodSchema;
}
