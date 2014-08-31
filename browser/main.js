var document = require('global/document');
var mercury = require('mercury');
var RCSS = require('rcss');
var DebugStateStorage = require('./lib/debug-state-storage.js');

var TopLevel = require('./top-level.js');

var topLevel = TopLevel();
var appState = topLevel.state;

DebugStateStorage(appState);

// LAWL.
RCSS.injectAll();

mercury.app(document.body, appState, TopLevel.render);
