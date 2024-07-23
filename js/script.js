

window.addEventListener('DOMContentLoaded', () => {
    const tabs = require('./modules/tabs');
    const timer = require('./modules/timer');
    const slider = require('./modules/slider');
    const modal = require('./modules/modal');
    const forms = require('./modules/forms');
    const cards = require('./modules/cards');
    const calc = require('./modules/calc');

    tabs();
    timer();
    slider();
    modal();
    forms();
    cards();
    calc();
});                                           

