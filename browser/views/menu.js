var h = require('mercury').h;
var anchor = require('../lib/route-anchor.js');

module.exports = menu;

function menu() {
    return h('ul', [
        h('li', [
            anchor({
                href: '/'
            }, 'Home')
        ]),
        h('li', [
            anchor({
                href: '/frames'
            }, 'Frames')
        ])
    ]);
}
