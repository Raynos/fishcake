var mercury = require('mercury');
var h = require('mercury').h;

var Project = require('../components/project.js');
var AddItemForm = require('../components/add-item-form.js');
var styles = require('./styles.js');

FrameList.render = render;

module.exports = FrameList;

function FrameList(frames) {
    var projectForm = AddItemForm();

    var state = mercury.struct({
        frames: frames,
        projects: mercury.varhash({}),

        viewState: mercury.struct({
            projectForm: projectForm.state
        })
    });

    projectForm.newItem(function newItem(data) {
        var project = Project({
            projectName: data.value
        }, frames);
        state.projects.put(project.state.id, project.state);
    });

    return { state: state };
}

function render(state) {
    return h('.' + styles.projectList, [
        h('h2', 'Project List'),
        h('ul.projects',
            mapObject(state.projects, Project.render)),
        AddItemForm.render(state.viewState.projectForm, {
            fieldName: 'Project Name'
        })
    ]);
}

function mapObject(obj, fn) {
    var keys = Object.keys(obj);

    return keys.map(function toValue(key) {
        return fn ? fn(obj[key]) : obj[key];
    });
}
