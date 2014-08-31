var mercury = require('mercury');
var h = require('mercury').h;

var FrameList = require('./frameList/');
var FrameEditor = require('./frameEditor/');

var styles = require('./top-styles.js');

TopLevel.render = render;

module.exports = TopLevel;

function TopLevel() {
    var frames = mercury.varhash({});
    var frameList = FrameList(frames);
    var frameEditor = FrameEditor(frames);

    var state = mercury.struct({
        frameList: frameList.state,
        frameEditor: frameEditor.state
    });

    return { state: state };
}

function render(state) {
    return h('.' + styles.container, [
        h('.' + styles.projectPanel, [
            FrameList.render(state.frameList)
        ]),
        h('.' + styles.editorPanel, [
            FrameEditor.render(state.frameEditor)
        ])
    ]);
}
