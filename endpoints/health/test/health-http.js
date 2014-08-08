var test = require('tape');
var http = require('http');
var request = require('request');

var endpoint = require('../index.js');

var PORT = Math.round((Math.random() * 10000) + 20000);
var server;

test('start server', function t(assert) {
    server = http.createServer(endpoint);
    server.listen(PORT, assert.end);
});

test('make health request', function t(assert) {
    var url = 'http://localhost:' + PORT + '/';
    request({
        url: url, json: true
    }, function onResp(err, resp) {
        assert.ifError(err);

        assert.equal(resp.statusCode, 200);
        assert.equal(resp.body, 'OK');

        assert.end();
    });
});

test('teardown server', function t(assert) {
    server.close();
    assert.end();
});
