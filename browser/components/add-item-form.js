var hg = require('mercury');
var h = require('mercury').h;
var FocusHook = require('virtual-hyperscript/hooks/focus-hook');

var InputComponent = require('./input.js');

AddItemForm.render = render;

module.exports = AddItemForm;

function AddItemForm() {
    var state = hg.struct({
        editing: hg.value(false),
        text: InputComponent('fieldName').state,
        events: {
            editItem: hg.input(),
            saveItem: hg.input(),
            cancelItem: hg.input()
        }
    });
    
    var newItem = hg.input();

    state.events.editItem(editItem);
    state.events.saveItem(saveItem);
    state.events.cancelItem(cancelItem);

    return {
        state: state,
        newItem: newItem
    };

    function editItem() {
        state.editing.set(true);
    }

    function saveItem(data) {
        cancelItem();

        if (!data.fieldName) {
            return;
        }

        newItem({
            value: data.fieldName
        });
    }

    function cancelItem() {
        state.editing.set(false);
        InputComponent.clear(state.text);
    }
}


function render(state, opts) {
    var editItem = state.events.editItem;
    var cancelItem = state.events.cancelItem;
    var saveItem = state.events.saveItem;

    return h('div.item-form', [
        h('label', {
            hidden: !state.editing,
            'ev-event': hg.submitEvent(saveItem, opts.meta || {})
        }, [
            h('span', opts.fieldName),
            InputComponent.render(state.text, {
                'data-hook': state.editing ? FocusHook() : null,
                'ev-blur': hg.event(cancelItem)
            })
        ]),
        h('button.add-item', {
            'ev-click': hg.event(editItem)
        }, '+')
    ]);
}
