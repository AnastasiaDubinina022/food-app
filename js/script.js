require('es6-promise').polyfill();
import 'nodelist-foreach-polyfill';

import tabs from './modules/tabs';
import timer from './modules/timer';
import slider from './modules/slider';
import modal from './modules/modal';
import forms from './modules/forms';
import cards from './modules/cards';
import calc from './modules/calc';
import {openModal} from './modules/modal';

window.addEventListener('DOMContentLoaded', () => {

    // создаем таймер здесь, т.к. он используется и в модуле modal, и в forms
    const modalTimerId = setTimeout(() => openModal('.modal', modalTimerId), 50000); // открываем модалку через 5 сек после захода пользователя на страницу

    tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    timer('.timer', '2024-11-18');
    modal('[data-modal]', '.modal', modalTimerId);
    forms('form', modalTimerId);
    cards();
    calc();
    slider({
        container: '.offer__slider',
        slide: '.offer__slide',
        nextArrow: '.offer__slider-next',
        prewArrow: '.offer__slider-prev', 
        totalCounter: '#total', 
        currentCounter: '#current', 
        wrapper: '.offer__slider-wrapper', 
        field: '.offer__slider-inner'
    });
});                                           

