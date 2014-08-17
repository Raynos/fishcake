var test = require('tape');
var request = require('request');
var cuid = require('cuid');
var path = require('path');
var rimraf = require('rimraf');
var SubLevel = require('level-sublevel');
var timestamp = require('monotonic-timestamp');

var createService = require('../server.js');

var PORT = Math.round((Math.random() * 10000) + 20000);
var levelDir = path.join(__dirname, cuid());
var service;

test('start server', function t(assert) {
    service = createService({
        level: {
            dbPath: levelDir
        }
    });
    service.server.listen(PORT, assert.end);
});

test('get items', function t(assert) {
    var url = 'http://localhost:' + PORT + '/device';

    var db = SubLevel(service.clients.level).sublevel('devices');
    var idOne = timestamp();
    var idTwo = timestamp();
    db.batch([
        { type: 'put', key: idOne, value: { id: idOne } },
        { type: 'put', key: idTwo, value: { id: idTwo } }
    ], function onBatch(err) {
        assert.ifError(err);

        request({
            url: url,
            method: 'GET',
            json: true
        }, function onResp(err, resp) {
            assert.ifError(err);

            assert.equal(resp.body.length, 2);

            assert.equal(resp.body[0].id, idOne);
            assert.equal(resp.body[1].id, idTwo);

            assert.end();
        });
    });
});

test('get items by userId', function t(assert) {
    var url = 'http://localhost:' + PORT + '/device';

    var userId = timestamp();
    var idOne = timestamp();
    var idTwo = timestamp();
    var idThree = timestamp();

    var db = SubLevel(service.clients.level).sublevel('devices');

    /*jshint camelcase: false*/
    // when putting test db in database use the DB interface
    db.batch([
        { type: 'put', key: idOne, value: {
            user_id: userId,
            id: idOne
        } },
        { type: 'put', key: idTwo, value: {
            user_id: userId + 10,
            id: idTwo
        } },
        { type: 'put', key: idThree, value: {
            user_id: userId,
            id: idThree
        } }
    ], function onBatch(err) {
        assert.ifError(err);

        request({
            url: url + '?userId=' + userId,
            method: 'GET',
            json: true
        }, function onResp(err, resp) {
            assert.ifError(err);

            assert.equal(resp.body.length, 2);
            assert.equal(resp.body[0].id, idOne);
            assert.equal(resp.body[0].userId, userId);
            assert.equal(resp.body[1].id, idThree);
            assert.equal(resp.body[1].userId, userId);

            assert.end();
        });
    });
});

test('teardown server', function t(assert) {
    service.server.close();
    service.clients.destroy();
    rimraf(levelDir, assert.end);
});
