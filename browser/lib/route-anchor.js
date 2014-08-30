var h = require('mercury').h;
var window = require('global/window');
var document = require('global/document');
var clickEvent = require('./click-event.js');

module.exports = anchor;

function anchor(props, text) {
    var href = props.href;
    props.href = '#';

    props['ev-click'] = clickEvent(pushState, {
        ctrl: false,
        meta: false,
        rightClick: false
    });

    return h('a', props, text);

    function pushState() {
        window.history.pushState(
            undefined, document.title, href);
    }
}
