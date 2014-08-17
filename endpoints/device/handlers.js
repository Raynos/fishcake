// var errors = require('./errors.js');

module.exports = {
    queryAll: queryAll
    // getOne: getOne,
    // create: create,
    // update: update,
    // destroy: destroy
};

function queryAll(incoming, opts, cb) {
    var device = opts.services.device;

    if ('userId' in incoming) {
        device.getByUserId(incoming.userId, cb);
    } else {
        device.getAll(cb);
    }
}

// function getOne(incoming, opts, cb) {
//     var device = opts.services.device;

//     device.getById(incoming.id, cb);
// }

// function create(incoming, opts, cb) {
//     var device = opts.services.device;

//     // device.create not implemented for demo
//     device.create(incoming, cb);
// }

// function update(incoming, opts, cb) {
//     var device = opts.services.device;

//     // Need at least one key else its an invalid POST
//     if (Object.keys(incoming).length === 1) {
//         return cb(errors.EmptyBody());
//     }

//     var delta = pluck(incoming, [
//         'deviceToken', 'userId', 'type', 'name'
//     ]);

//     // never do update(id, incoming). Always build the delta
//     // object manually, never send user input directly into
//     // the database without clipping / filtering it.
//     // device.update not implemented for demo
//     device.update(incoming.id, delta, cb);
// }

// function destroy(incoming, opts, cb) {
//     var device = opts.services.device;

//     // device.remove not implemented for demo
//     device.remove(incoming.id, onRemove);

//     function onRemove(err) {
//         if (err) {
//             return cb(err);
//         }

//         cb(null, { ok: true });
//     }
// }

// function pluck(obj, keys) {
//     var result = {};
//     keys.forEach(setKey);

//     return result;

//     function setKey(key) {
//         if (key in obj) {
//             result[key] = obj[key];
//         }
//     }
// }
