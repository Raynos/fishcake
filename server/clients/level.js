var level = require('level');

module.exports = createLevel;

function createLevel(config) {
    return level(config.get('level.dbPath'));
}
