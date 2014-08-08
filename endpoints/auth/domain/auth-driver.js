module.exports = authenticateDriver;

function authenticateDriver(credentials, clients, cb) {
    process.nextTick(function onTick() {
        cb(new Error('Not Implemented'));
    });
}
