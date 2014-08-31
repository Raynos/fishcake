var mercury = require('mercury');
var h = require('mercury').h;
var cuid = require('cuid');

Frame.render = render;

module.exports = Frame;

function Frame(opts) {
    var state = mercury.struct({
        id: cuid(),
        $name: mercury.value(opts.$name || ''),
        projectName: mercury.value(opts.projectName || ''),

        viewState: mercury.struct({
            open: mercury.value(false)
        }),
        events: {
            open: mercury.input()
        }
    });

    state.events.open(function open() {
        state.viewState.open.set(true);
    });

    return { state: state };
}

function render(frame) {
    var open = frame.events.open;

    return h('li', {
        'ev-click': mercury.event(open)
    }, [
        h('span', frame.$name)
    ]);
}
