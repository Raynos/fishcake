var SubLevel = require('level-sublevel');
var through = require('through2').obj;
var toStream = require('callback-stream');

var DeviceDecoder = require('./entities/device-decoder.js');

module.exports = DeviceService;

function DeviceService(clients) {
    var level = clients.level;
    var db = SubLevel(level).sublevel('devices');

    return {
        getAll: getAll,
        getByUserId: getByUserId
        // OTHER METHODS TBD
    };

    function getStream() {
        return db.createValueStream()
            .pipe(through(toDevice));

        function toDevice(chunk, _, cb) {
            this.push(DeviceDecoder(chunk));
            cb();
        }
    }

    function getAll(cb) {
        getStream().pipe(toStream({
            objectMode: true
        }, cb));
    }

    function getByUserId(userId, cb) {
        getStream()
            .pipe(through(filterByUserId))
            .pipe(toStream({
                objectMode: true
            }, cb));

        function filterByUserId(chunk, _, cb) {
            if (chunk.userId === userId) {
                this.push(chunk);
            }

            cb();
        }
    }
}
