var Router = require('routes-router');

module.exports = createRouter;

function createRouter() {
    var router = Router();

    // Health check route is required in production.
    router.prefix('/health', require('../endpoints/health/'));

    return router;
}
