var mercury = require('mercury');
var h = require('mercury').h;

FrameEditor.render = render;

module.exports = FrameEditor;

function FrameEditor() {
    var state = mercury.struct({});

    return { state: state };
}

function render(state, frames) {
    return h('div', [
        windowTabs(state, frames)
    ]);
}

function windowTabs(state, frames) {
    var openFrames = Object.keys(frames)
        .map(toOpenFrame).filter(Boolean);

    return h('div.window-tabs', openFrames.map(windowTab));

    function toOpenFrame(key) {
        var frame = frames[key];

        return frame.viewState.open ? frame : null;
    }
}

function windowTab(frame) {
    return h('div.window-tabs-tab', [
        h('span', frame.$name),
        h('a.close-tab', 'x')
    ]);
}
