var hg = require('mercury');
var h = require('mercury').h;
var cuid = require('cuid');

var AddItemForm = require('./add-item-form.js');
var Frame = require('./frame.js');

Project.render = renderProject;

module.exports = Project;

function Project(opts, frames) {
    var frameForm = AddItemForm();

    var state = hg.struct({
        id: cuid(),
        projectName: hg.value(opts.projectName || ''),
        frames: hg.array([]),

        viewState: hg.struct({
            frameForm: frameForm.state,
            allFrames: frames,
            collapsed: hg.value(false)
        }),
        events: {
            toggleCollapse: hg.input()
        }
    });

    frameForm.newItem(function newItem(data) {
        var frame = Frame({
            $name: data.value,
            projectName: state.projectName()
        });
        frames.put(frame.state.id, frame.state);
        state.frames.push(frame.state.id);
    });

    state.events.toggleCollapse(function toggleCollapse() {
        state.viewState.collapsed.set(
            !state.viewState.collapsed());
    });

    return { state: state };
}

function renderProject(project) {
    var frames = project.frames.map(function getFrame(id) {
        return project.viewState.allFrames[id];
    });
    var toggleCollapse = project.events.toggleCollapse;

    return h('li', [
        h('span', {
            'ev-click': hg.event(toggleCollapse)
        }, project.projectName),
        h('ul.frames', {
            hidden: project.viewState.collapsed
        }, frames.map(Frame.render)),
        AddItemForm.render(project.viewState.frameForm, {
            fieldName: 'Frame Name'
        })
    ]);
}
