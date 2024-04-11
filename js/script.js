window.addEventListener('DOMContentLoaded', () => {

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

});