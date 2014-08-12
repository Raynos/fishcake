module.exports = authenticateDriver;

function authenticateDriver(clients, credentials, cb) {
    process.nextTick(function onTick() {
        cb(new Error('Not Implemented'));
    });
}
