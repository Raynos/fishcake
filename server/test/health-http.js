var test = require('cached-tape');
var request = require('request');

var createService = require('../server.js');

var PORT = Math.round((Math.random() * 10000) + 20000);
var service;

test('start server', function t(assert) {
    service = createService();
    service.server.listen(PORT, assert.end);
});

test('make health request', function t(assert) {
    var url = 'http://localhost:' + PORT + '/health';
    request({
        url: url, json: true
    }, function onResp(err, resp) {
        assert.ifError(err);

        assert.equal(resp.statusCode, 200);
        assert.deepEqual(resp.body, { status: 'ok' });

        assert.end();
    });
});

test('teardown server', function t(assert) {
    service.server.close();
    service.clients.destroy();
    assert.end();
});
