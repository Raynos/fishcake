module.exports = healthHandler;

function healthHandler(incoming, opts, cb) {
    cb(null, { status: 'ok' });
}
