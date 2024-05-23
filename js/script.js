

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

    const deadLine = '2024-05-11';  // задаем конечную дату. она так же может приходить из разных источников.
    
    function getTimeRemaining(endtime) {
        let days, hours, minutes, seconds;
        const t = Date.parse(endtime) - Date.parse(new Date()); // вычисляем общее кол-во милисек, между сейчас (начало отсчета) и конечной датой

        if (t <= 0) {  // если конечная дата прошла, т.е. время закончилось, то отображаем везде нули, чтобы не видеть в таком случае отрицательных значений.
            days = 0;
            hours = 0;
            minutes = 0;
            seconds = 0;
        } else {
            days = Math.floor(t / (1000 * 60 * 60 * 24)); // вычисляем кол-во дней до конечной даты с округлением - общее кол-во делим на кол-во милисек в 1 дне
            hours = Math.floor((t / (1000 * 60 * 60) % 24)); // делим общие милисекунды на милисек в 1 часе, получая кол-во часов до конечной даты, и затем получаем остаток от деления этих часов на 24, чтобы использовать в таймере его, если часов получилось больше чем в сутках
            minutes = Math.floor((t / 1000 / 60) % 60);  // делим общие милисек на 1000 получаем секунды и их делим на 60 получаем минуты. и получаем остаток от деления всех минут на 60, т.к. отображаемые минуты не могут быть больше 60
            seconds = Math.floor((t / 1000) % 60);  // получаем время в секундах, и остаток от деления их на 60
        }
        
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

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }  // функция-помощник, подставляет 0 перед числом если оно однозначное

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector);
        const days = timer.querySelector('#days');
        const hours = timer.querySelector('#hours');
        const minutes = timer.querySelector('#minutes');
        const seconds = timer.querySelector('#seconds');

        const timeInterval = setInterval(updateClock, 1000);  // устанавливаем интервал чтобы таймер обновлялся каждую секунду

        updateClock();  // инициализация функции, первый вызов вручную чтобы сразу вставала нужная дата, а не висело секунду до запуска сетинтервала то, что в верстке
        
        function updateClock() {
            const t = getTimeRemaining(endtime);  // получаем сюда объект с вычисленными величинами из этой функции

            days.innerHTML = getZero(t.days);  
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);  // помещаем их в полученные селекторы

            if(t.total <= 0) {
                clearInterval(timeInterval);  // останавливаем таймер когда истечет конечная дата
            }
        }
    }

    setClock('.timer', deadLine);

    // Modal

    const modalTrigger = document.querySelectorAll('[data-modal]');
    const modalCloseBtn = document.querySelector('[data-close]');
    const modal = document.querySelector('.modal');

    function openModal() {
        //modal.classList.toggle('show');
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden'; 
        clearInterval(modalTimerId); // ниже есть сеттаймаут открывающий модалку через 5 сек как пользователь зашел. Здесь мы его очищаем в том случае, если пользователь еще раньше сам открыл модалку по нажатию кнопки и уже его видел, чтобы повторно оно не выскакивало и не бесило.
    }

    modalTrigger.forEach((item) => {
        item.addEventListener('click', openModal);
    });

    function closeModal() {
        //modal.classList.toggle('show');
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = ''; // восстановить скролл при закрытии окна - браузер сам подставит значение по умолчанию.
    }

    modalCloseBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', (event) => {
    if (event.target === modal) {
        closeModal();
    }
    });

    document.addEventListener('keydown', (event) => {
        if (event.code === 'Escape' && modal.classList.contains('show')) {
        closeModal();
    } // если нажата клавиша esc при открытом модальном окне, то тогда вызываем функцию закрытия, при закрытом окне она не будет срабатывать.
    });

    // const modalTimerId = setTimeout(openModal, 5000); // открываем модалку через 5 сек после захода пользователя на страницу
    
    function showModalByScroll() {
        if (window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight -1) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll); // удаляем обработчик события после того как он отработал 1 раз, для того чтобы больше окно не высвечивалось при повторной прогрутке в конец страницы.

        } // window.scrollY = window.pageYOffset (depricated)
          // document.documentElement.scrollHeight -1 = в конце добавляем -1px иначе не срабатывает - это баг, возможно связанный с некоторыми версиями браузеров или ограничениями некоторых мониторов. т.е. окно срабатывает на 1 px раньше самой нижней точки прокрутки, в этом ничего страшного.
    } 

    window.addEventListener('scroll', showModalByScroll);

    // используем классы для карточек

    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.parent = document.querySelector(parentSelector); // получаем селектор, куда будем вставлять нашу верстку, можно сделать это и в методе рендер
            this.transfer = 90; // пока пишем фиксированный курс доллара к рублю
            this.changeToRUB(); // можем здесь вызвать метод конвертации валюты, на моменте конструирования, или можем тоже в рендере сделать это
        }

        changeToRUB() {
            this.price = +this.price * this.transfer;  // +проверка на дурака, если сюда передадут строку чтобы она трансформировалась в число. 
        }

        render() {
            const element = document.createElement('div');

            console.log(this.src);
            element.innerHTML = `
                <div class="menu__item">
                    <img src=${this.src} alt=${this.alt}>
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> руб/день</div>
                    </div>
                </div>
            `;
            this.parent.append(element);
        }
    }

    // const fitnessMenu = new MenuCard('');
    // fitnessMenu.render();                   
    // это обычный синтаксис создания объекта. 

    // ниже исползуем более короткий - подходит для случаев, когда нам нужен объект только один раз здесь и сейчас, он отработает и удалится, и на него не останется никаких ссылок.

    new MenuCard( 
        "img/tabs/vegy.jpg",
        "vegy",
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        8,
        '.menu .container'
    ).render();
    new MenuCard( 
        "img/tabs/elite.jpg",
        "elite",
        'Меню “Премиум”',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        12,
        '.menu .container'
    ).render();
    new MenuCard( 
        "img/tabs/post.jpg",
        "post",
        'Меню "Постное"',
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
        10,
        '.menu .container'
    ).render(); 
});

