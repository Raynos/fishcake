var mercury = require('mercury');
var h = require('mercury').h;
var Event = require('geval/event');

var Project = require('./components/project.js');
var AddItemForm = require('./components/add-item-form.js');
var styles = require('./styles.js');

FrameList.render = render;

module.exports = FrameList;

function FrameList() {
    var projectForm = AddItemForm();
    var newFrame = Event();

    var state = mercury.struct({
        projects: mercury.varhash({}),

        viewState: mercury.struct({
            projectForm: projectForm.state
        })
    });

    projectForm.newItem(function newItem(data) {
        var project = Project({
            projectName: data.value
        });
        state.projects.put(project.state.id, project.state);
        project.newFrame(function onFrame(frame) {
            newFrame.broadcast(frame);
        });
    });

    return {
        state: state,
        newFrame: newFrame.listen
    };
}

function render(state, frames) {
    return h('.' + styles.projectList, [
        h('h2', 'Project List'),
        h('ul.projects',
            mapObject(state.projects, renderProject)),
        AddItemForm.render(state.viewState.projectForm, {
            fieldName: 'Project Name'
        })
    ]);

    function renderProject(proj) {
        return Project.render(proj, {
            frames: frames
        });
    }
}

function mapObject(obj, fn) {
    var keys = Object.keys(obj);

    return keys.map(function toValue(key) {
        return fn ? fn(obj[key]) : obj[key];
    });
}
