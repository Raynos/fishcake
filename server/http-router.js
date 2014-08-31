var path = require('path');
var fs = require('fs');
var Router = require('routes-router');
var ServeBrowserify = require('serve-browserify');
var sendHtml = require('send-data/html');
var sendCss = require('send-data/css');

var indexPage = fs.readFileSync(
    path.join(__dirname, 'http', 'index.html'), 'utf8');
var resetCss = fs.readFileSync(
    path.join(__dirname, 'http', 'reset.css'), 'utf8');

module.exports = createRouter;

function createRouter() {
    var router = Router();

    router.addRoute('/', writePage);
    router.addRoute('/frames*', writePage);
    router.addRoute('/favicon.ico', function nope(req, res) {
        res.end('');
    });

    router.addRoute('/browser/:id', ServeBrowserify({
        root: path.join(__dirname, '..', 'browser'),
        base: '/browser',
        debug: true
    }));
    router.addRoute('/reset.css', writeCss);

    return router;

    function writePage(req, res) {
        sendHtml(req, res, indexPage);
    }

    function writeCss(req, res) {
        sendCss(req, res, resetCss);
    }
}
