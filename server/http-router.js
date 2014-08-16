var Router = require('sirvice/router');

module.exports = createRouter;

function createRouter() {
    var router = Router(require('./endpoints.json'), {
        auth: require('../endpoints/auth/'),
        device: require('../endpoints/device/'),
        health: require('../endpoints/health/')
    });

    router.prefix('/static-lulz', require('./http/static-lulz.js'));

    return router;
}
