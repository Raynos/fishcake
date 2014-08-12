var createAuth = require('./auth/');

module.exports = createServices;

function createServices(clients) {
    return {
        auth: createAuth(clients)
    };
}
