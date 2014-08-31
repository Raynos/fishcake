var document = require('global/document');
var mercury = require('mercury');
var RCSS = require('rcss');

var TopLevel = require('./top-level.js');

var topLevel = TopLevel();
var appState = topLevel.state;

// LAWL.
RCSS.injectAll();

mercury.app(document.body, appState, TopLevel.render);
