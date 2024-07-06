

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

    modal.addEventListener('click', (event) => {
    if (event.target === modal || event.target.getAttribute('data-close') == '') {
        closeModal();
    }
    });

    document.addEventListener('keydown', (event) => {
        if (event.code === 'Escape' && modal.classList.contains('show')) {
        closeModal();
    } // если нажата клавиша esc при открытом модальном окне, то тогда вызываем функцию закрытия, при закрытом окне она не будет срабатывать.
    });

    const modalTimerId = setTimeout(openModal, 50000); // открываем модалку через 5 сек после захода пользователя на страницу
    
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
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes; // не забывать что это массив
            this.parent = document.querySelector(parentSelector); // получаем селектор, куда будем вставлять нашу верстку, можно сделать это и в методе рендер
            this.transfer = 90; // пока пишем фиксированный курс доллара к рублю
            this.changeToRUB(); // можем здесь вызвать метод конвертации валюты, на моменте конструирования, или можем тоже в рендере сделать это
        }

        changeToRUB() {
            this.price = +this.price * this.transfer;  // +проверка на дурака, если сюда передадут строку чтобы она трансформировалась в число. 
        }

        render() {
            const element = document.createElement('div');

            if (this.classes.length === 0 || !this.classes.includes('menu__item')) { // если ни один класс не передан или не передан дефолтный
                this.classes = 'menu__item';          // то присваиваем класс по умолчанию 
                element.classList.add(this.classes);  // и добавляем его элементу
            } else {
                this.classes.forEach(className => element.classList.add(className));  // в остальных случаях каждый переданный в аргументы класс добавляем элементу
            }

            element.innerHTML = `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> руб/день</div>
                </div>
            `;
            this.parent.append(element);
        }
    }

    const getResource = async (url) => {  // гет запрос поэтому передаем только ссылку на базу
        const res = await fetch(url);     // для гет запроса не нужны доп настройки, просто получаем данные

        if (!res.ok) {                    // если в запросе что-то не так пошло, то выкидываем ошибку вручную и сработает блок .catch
            throw new Error(`Could not fetch ${url}, status ${res.status}` );  // выкинуть ошибку
        }

        return await res.json();  // возвращаем промис сразу переводим результат в обычный объект
    } 

    getResource('http://localhost:3000/menu')
    .then(data => {
        data.forEach(({img, altimg, title, descr, price}) => {    // на месте деструктуризируем каждый объект
            new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
        });
    });


    // Альтернативный метод создания карточек из базы данных - не используя классы, а формируя верстку на лету. Например, если нам не нужен шаблон класса, а элементы будут создаваться 1 раз 

    // getResource('http://localhost:3000/menu')
    // .then(data => createCard(data));

    // function createCard(data) {
    //     data.forEach(({img, altimg, title, descr, price}) => {
    //         const element = document.createElement('div');

    //         element.classList.add('menu__item');

    //         element.innerHTML = `
    //             <img src=${img} alt=${altimg}>
    //             <h3 class="menu__item-subtitle">${title}</h3>
    //             <div class="menu__item-descr">${descr}</div>
    //             <div class="menu__item-divider"></div>
    //             <div class="menu__item-price">
    //                 <div class="menu__item-cost">Цена:</div>
    //                 <div class="menu__item-total"><span>${price}</span> руб/день</div>
    //             </div>
    //         `;

    //         document.querySelector('.menu .container').append(element);
    //     })
    // }


    // Использование библиотеки axios

    // axios.get('http://localhost:3000/menu')
    // .then(data => {
    //     data.data.forEach(({img, altimg, title, descr, price}) => {   
    //         new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
    //     });
    // });



    // Forms

    const forms = document.querySelectorAll('form');

    const message = {
        loading: '../img/form/spinner.svg',     // вместо сообщения просто можно прописать путь картинки
        success: 'Спасибо! Скоро мы с вами свяжемся.',
        failure: 'Что-то пошло не так...'
    };

    forms.forEach(item => {
        bindPostData(item);
    });

    const postData = async (url, data) => {   // отвечает за постинг данных. После сможем ее переиспользовать с другими аргументами
        const res = await fetch(url, {   // ждем результата работы запроса, прежде чем продолжить код, чтобы не было ошибки изза того что сервер ещё не успед ответить и в перем. ничего еще не записалось
            method: 'POST',
            headers: {
                'Content-type': 'application/json'  
            },
            body: data 
        });

        return await res.json();  // возвращаем промис сразу переводим результат в обычный объект, потом ниже сможем его обработать через then/catch
    }                             // тоже ждем результата работы метода прежде чем ретёрнить его

    function bindPostData(form) {   // привязка постинга. передаем форму аргументом, удобно внутри на неё повесить обработчик
        form.addEventListener('submit', (event) => {
            event.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;  // устанавливаем изображение спиннера
            statusMessage.style.cssText = `       
                display: block;
                margin: 0 auto;
            `;                    // делаем спиннер по центру (лучше создать css-класс и добавлять класс, а не инлайн-стили)
            
            // form.append(statusMessage);
            form.insertAdjacentElement('afterend', statusMessage);
    
            const formData = new FormData(form);

            // const object = {};    // объект формдаты нельзя преобразовать сразу в джейсон, поэтому создаем новый объект из формдаты
            // formData.forEach(function(value, key) {
            //     object[key] = value;
            // });

            // более элегантный способ преобразовать формдату в джейсон:
            const json = JSON.stringify(Object.fromEntries(formData.entries()));  // формдату трансформируем в матрицу и сразу обратно в объект, после чего преобразуем объект в джейсон

            postData('http://localhost:3000/requests', json)  // отсюда вернется промис который сможем нормально обработать с помощью then/catch
            .then((data) => {
                console.log(data);
                showThanksModal(message.success);
                statusMessage.remove();
            }).catch(() => {
                showThanksModal(message.failure);
            }).finally(() => {
                form.reset();
            });
        });
    };

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide');
        openModal();

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');

        thanksModal.innerHTML = `
            <div class="modal__content">                
                <div class="modal__close" data-close>&times;</div>
                <div class="modal__title">${message}</div>
            </div>
        `;

        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal();
        }, 4000);
    }

    // Slider v.1

    const counter = document.querySelector('.offer__slider-counter');
    const current = counter.querySelector('#current');
    const total = counter.querySelector('#total');
    const slides = document.querySelectorAll('.offer__slide');

    let slideIndex = 0;
    total.textContent = getZero(slides.length);

    hideSlides();
    showSlide();
    
    function hideSlides(){
        slides.forEach(item => {
            item.classList.remove('show', 'fade');
            item.classList.add('hide');
        })
    }

    function showSlide(i = slideIndex) {
        current.textContent = getZero(slideIndex + 1);
        slides[i].classList.add('show', 'fade');
        slides[i].classList.remove('hide');
    }

    counter.addEventListener('click', (event) => {
        if (event.target.classList.contains('offer__slider-next')) {
            if (slideIndex === slides.length - 1) {
                slideIndex = 0;
            } else {
                slideIndex++;
            }   
        }

        if (event.target.classList.contains('offer__slider-prev')) {
            if (slideIndex === 0) {

                slideIndex = slides.length - 1;
            } else {
                slideIndex--;
            }
        } 
        
        hideSlides();
        showSlide(slideIndex);
    });


    


    
});                                           

