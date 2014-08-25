module.exports = postSupply;

function postSupply(incoming, opts, cb) {
    cb(null, { id: incoming.id });
}
