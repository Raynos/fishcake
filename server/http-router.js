var path = require('path');
var fs = require('fs');
var Router = require('routes-router');
var ServeBrowserify = require('serve-browserify');
var sendHtml = require('send-data/html');

var indexPage = fs.readFileSync(
    path.join(__dirname, 'http', 'index.html'), 'utf8');

// Seriously, fix this.
var cors = require('corsify')({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, api_key, Authorization',
    'Access-Control-Allow-Methods': 'GET, POST, DELETE, PUT, PATCH, OPTIONS'
});

module.exports = createRouter;

function createRouter() {
    var router = Router();

    router.addRoute('/', function writePage(req, res) {
        sendHtml(req, res, indexPage);
    });
    router.addRoute('/favicon.ico', function nope(req, res) {
        res.end('');
    });

    router.addRoute('/browser/:id', ServeBrowserify({
        root: path.join(__dirname, '..', 'browser'),
        base: '/browser'
    }));

    return cors(router);
}
