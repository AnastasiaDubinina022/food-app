function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {

    const tabs = document.querySelectorAll(tabsSelector);
    const tabsContent = document.querySelectorAll(tabsContentSelector);
    const tabsParent = document.querySelector(tabsParentSelector);

    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.add('hide');    // toggle здесь исп-ть не можем, иначе будет путаница с классами      
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(item => {
            item.classList.remove(activeClass);
        });
    }

    function showTabContent(i = 0) {   // параметр по умолчанию, если при вызове не передаем др.аргумент
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add(activeClass);
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (event) => {
        const target = event.target;  // если много раз используем event.target то лучше поместить его в переменную

        if(target && target.classList.contains(tabsSelector.slice(1))) {
            tabs.forEach((item, i) => {
                if (target == item) {  // когда перебираемый таб совпадет с тем на который кликнули
                    hideTabContent();
                    showTabContent(i);  // покажем его, передав его индекс аргументом 
                }
            });
        }
    });
}

export default tabs;