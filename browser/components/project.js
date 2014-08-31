var mercury = require('mercury');
var h = require('mercury').h;
var cuid = require('cuid');

var AddItemForm = require('./add-item-form.js');
var Frame = require('../entities/frame.js');

Project.render = renderProject;

module.exports = Project;

function Project(opts, frames) {
    var frameForm = AddItemForm();

    var state = mercury.struct({
        id: cuid(),
        projectName: mercury.value(opts.projectName || ''),
        frames: mercury.array([]),

        viewState: mercury.struct({
            frameForm: frameForm.state,
            allFrames: frames
        })
    });

    frameForm.newItem(function newItem(data) {
        var frame = Frame({
            $name: data.value,
            projectName: state.projectName()
        });
        frames.put(frame.id, frame);
        state.frames.push(frame.id);
    });

    return { state: state };
}

function renderProject(project) {
    var frames = project.frames.map(function getFrame(id) {
        return project.viewState.allFrames[id];
    });

    return h('li', [
        h('span', project.projectName),
        h('ul.frames', frames.map(renderFrame)),
        AddItemForm.render(project.viewState.frameForm, {
            fieldName: 'Frame Name'
        })
    ]);
}

function renderFrame(frame) {
    return h('li', [
        h('span', frame.$name)
    ]);
}
