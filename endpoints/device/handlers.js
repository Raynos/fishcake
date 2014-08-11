var deviceRepo = require('./repository');

var errors = require('./errors.js');

module.exports = {
    queryAll: queryAll,
    getOne: getOne,
    create: create,
    update: update,
    destroy: destroy
};

function queryAll(incoming, opts, cb) {
    var db = opts.clients.level;

    if ('userId' in incoming) {
        deviceRepo.getFor(db, 'userId', incoming.userId, cb);
    } else {
        deviceRepo.getAll(db, cb);
    }
}

function getOne(incoming, opts, cb) {
    var db = opts.clients.level;

    deviceRepo.getById(db, incoming.id, cb);
}

function create(incoming, opts, cb) {
    var db = opts.clients.level;

    deviceRepo.insert(db, [incoming], onInsert);

    function onInsert(err, records) {
        if (err) {
            return cb(err);
        }

        cb(null, records[0]);
    }
}

function update(incoming, opts, cb) {
    var db = opts.clients.level;

    // incoming has one required field (id)
    if (Object.keys(incoming).length <= 1) {
        return cb(errors.EmptyBody());
    }

    var delta = {};
    ['deviceToken', 'userId', 'type', 'name']
        .forEach(function setDelta(key) {
            if (key in incoming) {
                delta[key] = incoming[key];
            }
        });

    // never do update(id, incoming). Always build the delta
    // object manually, never send user input directly into
    // the database without clipping / filtering it.
    deviceRepo.update(db, incoming.id, delta, onUpdate);

    function onUpdate(err, record) {
        if (err && err.type === 'not.found') {
            return cb(errors.NotFound({
                id: incoming.id
            }));
        }

        cb(null, record);
    }
}

function destroy(incoming, opts, cb) {
    var db = opts.clients.level;

    // do an extra GET to return a 404 before deleting.
    deviceRepo.getById(db, incoming.id, onGet);

    function onGet(err, record) {
        if (err) {
            return cb(err);
        }

        if (record === null) {
            return cb(errors.NotFound({
                id: incoming.id
            }));
        }

        deviceRepo.remove(db, incoming.id, onRemove);

        function onRemove(err)  {
            if (err) {
                return cb(err);
            }

            cb(null, { ok: true });
        }
    }
}
