var window = require('global/window');
var choke = require('choke');
var localStorage = require('global/window').localStorage;
var STORAGE_KEY = 'debug-state-storage@1';

var debugStateInfo = {};

load();

window.DebugStateStorage = {
    enable: function enable() {
        debugStateInfo.enabled = true;
        save();
    },
    disable: function disable() {
        debugStateInfo.enabled = false;
        save();
    },
    clear: function clear() {
        delete debugStateInfo.state;
        save();
    }
};

module.exports = DebugStateStorage;

function DebugStateStorage(observ) {
    if (!debugStateInfo.enabled) {
        return;
    }

    if ('state' in debugStateInfo) {
        observ.set(debugStateInfo.state);
    }

    observ(choke(function onChange(newState) {
        debugStateInfo.state = newState;
        save();
    }, 250).listener);
}

function load() {
    var blob = localStorage.getItem(STORAGE_KEY);

    if (blob) {
        debugStateInfo = JSON.parse(blob);
    } else {
        save();
    }
}

function save() {
    localStorage.setItem(STORAGE_KEY,
        JSON.stringify(debugStateInfo));
}
