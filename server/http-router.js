var SirviceRouter = require('sirvice/router');

module.exports = createRouter;

function createRouter() {
    var router = Router(
        require('./endpoints.json'),
        {
            auth: require('../endpoints/auth/'),
            device: require('../endpoints/device/'),
            health: require('../endpoints/health/')
        }
    );

    router.prefix('/static-lulz', require('./http/static-lulz.js'));

    return router;
}

function Router(endPointDefn, handlerFns) {
    var router = SirviceRouter();

    Object.keys(endPointDefn || {})
        .forEach(function setHandler(uri) {
            var endpoint = endPointDefn[uri];
            var handler = handlerFns[endpoint.handlerId];

            router.prefix(uri, handler);
        });

    return router;
}
