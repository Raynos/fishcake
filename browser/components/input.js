var h = require('mercury').h;
var mercury = require('mercury');

InputComponent.render = render;
InputComponent.clear = clear;

module.exports = InputComponent;

function InputComponent(name) {
    var state = mercury.struct({
        text: mercury.value(''),
        $name: name,
        events: {
            change: mercury.input()
        }
    });

    state.events.change(function onChange(data) {
        state.text.set(data[name]);
    });

    return { state: state };
}

function clear(state) {
    state.text.set('');
}

function render(state, opts) {
    opts = opts || {};
    opts.value = state.text;
    opts.name = state.$name;
    opts['ev-event'] = mercury.changeEvent(
        state.events.change);

    return h('input', opts);
}
