var Router = require('routes-router');

module.exports = createRouter;

function createRouter() {
    var router = Router();

    // Health check route is required in production.
    router.prefix('/health', require('../endpoints/health/'));

    // This is the auth endpoint, mounted for demo purposes
    router.prefix('/auth', require('../endpoints/auth/'));

    // This is the device endpoint, mounted for demo purposes
    router.prefix('/device', require('../endpoints/device/'));

    router.prefix('/static-lulz', require('./http/static-lulz.js'));

    return router;
}
