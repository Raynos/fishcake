var test = require('tape');
var LevelMem = require('level-mem');
var SubLevel = require('level-sublevel');

var handlers = require('../handlers.js');

test('get items', function t(assert) {
    var db = LevelMem('dbname', { encoding: 'json' });

    // interface for getting the devices table
    var devices = SubLevel(db).sublevel('devices');
    devices.put(0, { id: 0 });
    devices.put(1, { id: 1 });

    handlers.queryAll({}, {
        clients: { level: db }
    }, function onValues(err, resp) {
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

    // when querying the handler use the domain interface
    handlers.queryAll({ userId: 10 }, {
        clients: { level: db }
    }, function onValues(err, resp) {
        assert.ifError(err);

        assert.equal(resp.length, 2);
        assert.equal(resp[0].id, 0);
        assert.equal(resp[1].id, 2);

        assert.end();
    });
});
