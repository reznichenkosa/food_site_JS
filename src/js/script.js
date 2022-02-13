import tabs from './modules/tabs';
import timer from './modules/timer';
import modal from './modules/modal';
import cards from './modules/cards';
import form from './modules/form';
import slider from './modules/slider';
import calculator from './modules/calculator';

document.addEventListener('DOMContentLoaded', () => {

    tabs();
    timer('2022-03-01 00:00');
    modal('[data-modal]', '.modal');
    cards();
    form();
    slider();
    calculator();
    
});