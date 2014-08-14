var test = require('tape');
var LevelMem = require('level-mem');
var SubLevel = require('level-sublevel');

var device = require('../device/');

test('get items', function t(assert) {
    var db = LevelMem('dbname', { encoding: 'json' });

    // interface for getting the devices table
    var devicesDb = SubLevel(db).sublevel('devices');
    devicesDb.put(0, { id: 0 });
    devicesDb.put(1, { id: 1 });

    var service = device({ level: db });

    service.getAll(function onValues(err, resp) {
        assert.ifError(err);

        assert.equal(resp.length, 2);
        assert.equal(resp[0].id, 0);
        assert.equal(resp[1].id, 1);

        assert.end();
    });
});

test('get items by userId', function t(assert) {
    var db = LevelMem('dbname', { encoding: 'json' });

    // interface for getting the devices table
    var devices = SubLevel(db).sublevel('devices');
    /*jshint camelcase: false*/
    // when putting test db in database use the DB interface
    devices.put(0, { id: 0, user_id: 10 });
    devices.put(1, { id: 1, user_id: 12 });
    devices.put(2, { id: 2, user_id: 10 });

    var service = device({ level: db });

    // when querying the handler use the domain interface
    service.getByUserId(10, function onValues(err, resp) {
        assert.ifError(err);

        assert.equal(resp.length, 2);
        assert.equal(resp[0].id, 0);
        assert.equal(resp[1].id, 2);

        assert.end();
    });
});
