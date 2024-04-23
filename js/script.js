

window.addEventListener('DOMContentLoaded', () => {

    // Tabs

    const tabs = document.querySelectorAll('.tabheader__item');
    const tabsContent = document.querySelectorAll('.tabcontent');
    const tabsParent = document.querySelector('.tabheader__items');

    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.add('hide');    // toggle здесь исп-ть не можем, иначе будет путаница с классами      
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }

    function showTabContent(i = 0) {   // параметр по умолчанию, если при вызове не передаем др.аргумент
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (event) => {
        const target = event.target;  // если много раз используем event.target то лучше поместить его в переменную

        if(target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {  // когда перебираемый таб совпадет с тем на который кликнули
                    hideTabContent();
                    showTabContent(i);  // покажем его, передав его индекс аргументом 
                }
            });
        }
    });

    // Timer

    const deadLine = '2024-05-11';

    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()); // общее кол-во милисек, между сейчас (начало отсчета) и конечной датой
        const days = Math.floor(t / (1000 * 60 * 60 * 24)); // вычисляем кол-во дней до конечной даты с округлением - общее кол-во делим на кол-во милисек в 1 дне
        const hours = Math.floor((t / (1000 * 60 * 60) % 24)); // делим общие милисекунды на милисек в 1 часе, получая кол-во часов до конечной даты, и затем получаем остаток от деления этих часов на 24, чтобы использовать в таймере его, если часов получилось больше чем в сутках
        const minutes = Math.floor((t / 1000 / 60) % 60);  // делим общие милисек на 1000 получаем секунды и их делим на 60 получаем минуты. и получаем остаток от деления всех минут на 60, т.к. отображаемые минуты не могут быть больше 60
        const seconds = Math.floor((t / 1000) % 60);  // получаем время в секундах, и остаток от деления их на 60

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        }  // возвращаем полученные значения наружу в виде объекта, чтобы там можно было с ними далее работать

        // сокращенный синтаксис, то же что и строки выше
        // return {'total': t, days.hours, minutes, seconds}    
    }


});

