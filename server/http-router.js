var Router = require('sirvice/router');

// Seriously, fix this.
var cors = require('corsify')({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, api_key, Authorization',
    'Access-Control-Allow-Methods': 'GET, POST, DELETE, PUT, PATCH, OPTIONS'
});


module.exports = createRouter;

function createRouter() {
    var router = Router(require('./endpoints.json'), {
        auth: require('../endpoints/auth/'),
        device: require('../endpoints/device/'),
        health: require('../endpoints/health/')
    });

    router.prefix('/static-lulz', require('./http/static-lulz.js'));

    return cors(router);
}
