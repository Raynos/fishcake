var document = require('global/document');
var mercury = require('mercury');

var TopLevel = require('./top-level.js');

var topLevel = TopLevel();
var appState = topLevel.state;

mercury.app(document.body, appState, TopLevel.render);
