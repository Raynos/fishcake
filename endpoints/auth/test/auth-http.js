var test = require('tape');
var http = require('http');
var request = require('request');
var ONClient = require('rt-on-client');

var endpoint = require('../index.js');

var PORT = Math.round((Math.random() * 10000) + 20000);
var ON_PORT = PORT + 1;
var server;
var onServer;

test('start server', function t(assert) {
    onServer = ONServer();
    onServer.listen(ON_PORT);

    server = http.createServer(function watClientz(req, res) {
        endpoint(req, res, {
            clients: {
                onClient: new ONClient({
                    host: 'localhost',
                    port: ON_PORT
                })
            }
        });
    });
    server.listen(PORT, assert.end);
});

test('make auth request', function t(assert) {
    var url = 'http://localhost:' + PORT + '/';
    request({
        url: url,
        method: 'POST',
        json: {
            app: 'client',
            id: 'foo',
            password: 'bar'
        }
    }, function onResp(err, resp) {
        assert.ifError(err);

        assert.equal(resp.statusCode, 200);
        assert.equal(resp.body.token, 'hello');

        assert.end();
    });
});

test('auth fails with bad password', function t(assert) {
    var url = 'http://localhost:' + PORT + '/';

    request({
        url: url,
        method: 'POST',
        json: {
            app: 'client',
            id: 'foo',
            password: 'bad'
        }
    }, function onResp(err, resp) {
        assert.ifError(err);

        assert.equal(resp.statusCode, 400);
        assert.equal(resp.body.errors[0].type,
            'auth.common.incorrectPassword');

        assert.end();
    });
});

test('auth fails with unknown id', function t(assert) {
    var url = 'http://localhost:' + PORT + '/';

    request({
        url: url,
        method: 'POST',
        json: {
            app: 'client',
            id: 'bar',
            password: 'dont care'
        }
    }, function onResp(err, resp) {
        assert.ifError(err);

        assert.equal(resp.statusCode, 500);
        assert.equal(resp.body.errors[0].message,
            'Not Found');

        assert.end();
    });
});

test('teardown server', function t(assert) {
    server.close();
    onServer.close();
    assert.end();
});

var sendJson = require('send-data/json');

function ONServer() {
    return http.createServer(function onReq(req, res) {
        var parts = req.url.split('/');
        var id = parts && parts[2];

        if (id === 'foo') {
            sendJson(req, res, {
                password: 'bar',
                token: 'hello'
            });
        } else {
            res.statusCode = 404;
            sendJson(req, res, {
                message: 'Not Found'
            });
        }
    });
}
