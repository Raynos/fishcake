var document = require('global/document');
var mercury = require('mercury');
var h = mercury.h;

mercury.app(document.body, mercury.value(), render);

function render() {
    return h('div', 'Hello world');
}
