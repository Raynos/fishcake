var h = require('mercury').h;

var AddItemForm = require('../components/add-item-form.js');
var styles = require('./styles.js');

module.exports = render;

function render(state) {
    return h('.' + styles.projectList, [
        h('h2', 'Project List'),
        h('ul.projects', mapObject(state.projects,
            renderProject.bind(null, state))),
        AddItemForm.render(state.projectForm, {
            fieldName: 'Project Name'
        })
    ]);
}

function renderProject(state, project) {
    var frames = project.frames.map(function (id) {
        return state.frames[id];
    });

    return h('li', [
        h('span', project.projectName),
        h('ul.frames', frames.map(
            renderFrame.bind(null, state))),
        AddItemForm.render(project.frameForm, {
            fieldName: 'Frame Name'
        })
    ]);
}

function renderFrame(state, frame) {
    return h('li', [
        h('span', frame.$name)
    ]);
}


function mapObject(obj, fn) {
    var keys = Object.keys(obj);

    return keys.map(function toValue(key) {
        return fn ? fn(obj[key]) : obj[key];
    });
}
