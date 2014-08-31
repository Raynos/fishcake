var hg = require('mercury');
var h = require('mercury').h;
var FocusHook = require('virtual-hyperscript/hooks/focus-hook');

var styles = require('./styles.js');
var InputComponent = require('../components/input.js');

module.exports = render;

function render(state) {
    return h('.' + styles.projectList, [
        h('h2', 'Project List'),
        h('ul.projects', mapObject(state.projects,
            renderProject.bind(null, state))),
        addItemForm(state.projectForm, {
            fieldName: 'Project Name'
        })
    ]);
}

function renderProject(state, project) {
    return h('li', [
        h('span', project.projectName),
        h('ul.frames', []),
        addItemForm(state.frameForm, {
            meta: {
                id: project.id
            },
            fieldName: 'Frame Name'
        })
    ]);
}

function addItemForm(state, opts) {
    var editItem = state.events.editItem;
    var saveItem = state.events.saveItem;

    return h('div.item-form', [
        h('label', {
            hidden: !state.editing,
            'ev-event': hg.submitEvent(saveItem, opts.meta || {})
        }, [
            h('span', opts.fieldName),
            InputComponent.render(state.text, {
                'data-hook': state.editing ? FocusHook() : null
            })
        ]),
        h('button.add-item', {
            'ev-click': hg.event(editItem)
        }, '+')
    ]);
}

function mapObject(obj, fn) {
    var keys = Object.keys(obj);

    return keys.map(function toValue(key) {
        return fn ? fn(obj[key]) : obj[key];
    });
}
