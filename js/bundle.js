/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calc() {
    
    // Calc

    const result = document.querySelector('.calculating__result span');
    let sex, height, weight, age, ratio;

    if (localStorage.getItem('sex')) {     // устанавливаем настройки если пользователь уже заходил и они есть в локал сторэдж
        sex = localStorage.getItem('sex');
    } else {
        sex = 'female';
        localStorage.setItem('sex', 'female');
    }

    if (localStorage.getItem('ratio')) {
        ratio = localStorage.getItem('ratio');
    } else {
        ratio = 1.375;
        localStorage.setItem('ratio', 1.375);
    }

    function initLocalSettings(selector, activeClass) {       // добавляет класс активности блокам, сохраненным в локал сторэдж
        const elements = document.querySelectorAll(selector); // получаем все блоки внутри селектора родителя (ниже вызываем с '#gender div')

        elements.forEach((elem) => {             // перебираем блоки до совпадения
            elem.classList.remove(activeClass);

            if (elem.getAttribute('id') === localStorage.getItem('sex')) {  // когда значение айди в блоке и в локал сторэдж совпадет
                elem.classList.add(activeClass);           // этому блоку вешаем класс активности
            }

            if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {  // тоже по дата-атрибуту для коэффициента активности
                elem.classList.add(activeClass);
            }
        });
    }

    initLocalSettings('#gender div', 'calculating__choose-item_active');
    initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');

    function calcTotal() {   // будет считать результат по формуле. будем вызывать ее каждый раз, когда пользователь меняет данные, чтобы нормально пересчитать значение
        if (!sex || !height || !weight || !age || !ratio) {   // начинаем с проверки, если хотя бы одно поле не заполнено (имеет false в лог.контексте)
            result.textContent = '____';        // выводим сообщение, напр. 'Заполните все поля'
            return;                                           // прерываем функцию, рассчеты проводиться не будут.
        }

        if (sex == 'female') {   // формула для женщин
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        }

        if (sex == 'male') {     // формула для мужчин
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        }
    }

    calcTotal();

    function getStaticInformation(selector, activeClass) {    // получение информации со статических блоков (пол и активность, 1 функция т.к. они одинаковые)
        const elements = document.querySelectorAll(selector);   // получаем все дивы внутри родителя

        elements.forEach((elem) => {
            elem.addEventListener('click', (e) => {
                if (e.target.getAttribute('data-ratio')) {         // если клик на блок с дата-атрибутом активности
                    ratio = +e.target.getAttribute('data-ratio');  // берем оттуда коэффициент
                    localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));  // сохраняем его в локал сторэдж
                } else {                                 // подразумеваем клик на блок с выбором пола
                    sex = e.target.getAttribute('id');   // записываем оттуда пол 
                    localStorage.setItem('sex', e.target.getAttribute('id'))  // сохраняем выбранный пол в локал сторэдж
                }
    
                elements.forEach((elem) => {
                    elem.classList.remove(activeClass);
                });
    
                e.target.classList.add(activeClass);
    
                calcTotal();
            });
        });
    }

    getStaticInformation('#gender div', 'calculating__choose-item_active');
    getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');

    function getInputInformation(selector) {
        const input = document.querySelector(selector);

        input.addEventListener('input', () => {
            if (input.value.match(/\D/g)) {
                input.style.border = '1px solid red';
            } else {
                input.style.border = 'none';
            }

            switch (input.getAttribute('id')) {
                case 'weight':
                    weight = +input.value;
                    break;
                case 'height':
                    height = +input.value;
                    break;
                case 'age':
                    age = +input.value;
                    break;
            }

            calcTotal();
        })
    }

    getInputInformation('#weight');
    getInputInformation('#height');
    getInputInformation('#age');
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");


function cards() {
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

    (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getResource)('http://localhost:3000/menu')
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
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);


/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");



function forms(formSelector, modalTimerId) {
    const forms = document.querySelectorAll(formSelector);

    const message = {
        loading: '../img/form/spinner.svg',     // вместо сообщения просто можно прописать путь картинки
        success: 'Спасибо! Скоро мы с вами свяжемся.',
        failure: 'Что-то пошло не так...'
    };

    forms.forEach(item => {
        bindPostData(item);
    });

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

            (0,_services_services__WEBPACK_IMPORTED_MODULE_1__.postData)('http://localhost:3000/requests', json)  // отсюда вернется промис который сможем нормально обработать с помощью then/catch
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
        (0,_modal__WEBPACK_IMPORTED_MODULE_0__.openModal)('.modal', modalTimerId);

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
            (0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeModal)('.modal');
        }, 4000);
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   closeModal: () => (/* binding */ closeModal),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   openModal: () => (/* binding */ openModal)
/* harmony export */ });
function openModal(modalSelector, modalTimerId) {
    const modal = document.querySelector(modalSelector);

    //modal.classList.toggle('show');
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';

    console.log(modalTimerId);  // на всякий случай. придет в консоль 1 - это как раз уникальный идентификатор таймера - рандомное значение, контролируемое браузером.
    if (modalTimerId) {
        clearInterval(modalTimerId); // ниже есть сеттаймаут открывающий модалку через 5 сек как пользователь зашел. Здесь мы его очищаем в том случае, если пользователь еще раньше сам открыл модалку по нажатию кнопки и уже его видел, чтобы повторно оно не выскакивало и не бесило.
    }
}

function closeModal(modalSelector) {
    const modal = document.querySelector(modalSelector);

    //modal.classList.toggle('show');
    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = ''; // восстановить скролл при закрытии окна - браузер сам подставит значение по умолчанию.
}

function modal(triggerSelector, modalSelector, modalTimerId) {   
    const modalTrigger = document.querySelectorAll(triggerSelector);
    const modal = document.querySelector(modalSelector);

    modalTrigger.forEach((item) => {
        item.addEventListener('click', () => openModal(modalSelector, modalTimerId)); // поскольку при передаче аргумента мы вызываем функцию, а здесь этого делать нельзя, оборачиваем её в стрелочную, тогда будет работать как положено - вызываться колбек только после клика.
    });

    modal.addEventListener('click', (event) => {
    if (event.target === modal || event.target.getAttribute('data-close') == '') {
        closeModal(modalSelector);
    }
    });

    document.addEventListener('keydown', (event) => {
        if (event.code === 'Escape' && modal.classList.contains('show')) {
        closeModal(modalSelector);
    } // если нажата клавиша esc при открытом модальном окне, то тогда вызываем функцию закрытия, при закрытом окне она не будет срабатывать.
    });
    
    function showModalByScroll() {
        if (window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight -1) {
            openModal(modalSelector, modalTimerId);
            window.removeEventListener('scroll', showModalByScroll); // удаляем обработчик события после того как он отработал 1 раз, для того чтобы больше окно не высвечивалось при повторной прогрутке в конец страницы.

        } // window.scrollY = window.pageYOffset (depricated)
          // document.documentElement.scrollHeight -1 = в конце добавляем -1px иначе не срабатывает - это баг, возможно связанный с некоторыми версиями браузеров или ограничениями некоторых мониторов. т.е. окно срабатывает на 1 px раньше самой нижней точки прокрутки, в этом ничего страшного.
    } 

    window.addEventListener('scroll', showModalByScroll);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);



/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function slider({container, slide, nextArrow, prewArrow, totalCounter, currentCounter, wrapper, field}) {

    const slides = document.querySelectorAll(slide);
    const slider = document.querySelector(container);
    const prev = document.querySelector(prewArrow);
    const next = document.querySelector(nextArrow);
    const current = document.querySelector(currentCounter);
    const total = document.querySelector(totalCounter);
    const slidesWrapper = document.querySelector(wrapper);
    const slidesField = document.querySelector(field);
    const width = window.getComputedStyle(slidesWrapper).width;   // '650px'
    let slideIndex = 0;

    // Slider v.1

    // total.textContent = getZero(slides.length);

    // hideSlides();
    // showSlide(slideIndex);
    
    // function hideSlides(){
    //     slides.forEach(item => {
    //         item.classList.remove('show', 'fade');
    //         item.classList.add('hide');
    //     });
    // }

    // function showSlide(i) {
    //     slides[i].classList.add('show', 'fade');
    //     slides[i].classList.remove('hide');
    //     current.textContent = getZero(i + 1);
    // }

    // function calculateSlideIndex(i) {
    //     if (i === slides.length) {
    //         slideIndex = 0;
    //     }

    //     if (i < 0) {
    //         slideIndex = slides.length - 1;
    //     }

    //     showSlide(slideIndex);
    // }

    // prev.addEventListener('click', () => {
    //     slideIndex--;
    //     hideSlides();
    //     calculateSlideIndex(slideIndex);
    // });

    // next.addEventListener('click', () => {
    //     slideIndex++;
    //     hideSlides();
    //     calculateSlideIndex(slideIndex);
    // });

    
    // Slider v.2 (carousel)

    let offset = 0;  // отступ, на который будем двигать поле слайдеров, изначальная позиция 0.
    
    setTotal();
    setSlideIndex();

    function setTotal() {
        if (slides.length < 10) {
            total.textContent = `0${slides.length}`;
        } else {
            total.textContent  = slides.length;
        }
    }

    function setSlideIndex() {
        if (slides.length < 10) {
            current.textContent = `0${slideIndex + 1}`;
        } else {
            current.textContent = slideIndex + 1;
        }
    }

    slidesField.style.width = 100 * slides.length + '%';  // устанавливаем ширину всего поля слайдов (4 слайда = 400%)
    slidesField.style.display = 'flex';         // выстраиваем слайды в строку
    slidesField.style.transition = '0.5s all';  

    slidesWrapper.style.overflow = 'hidden';  // скрываем остальные слайды, выходящие за предел окна

    slides.forEach(slide => {          
        slide.style.width = width;  // убеждаемся что все слайды будут одинаковой ширины и поместятся в поле
    });

    slider.style.position = 'relative'; 

    function transformSlidesField() {
        slidesField.style.transform = `translateX(-${offset}px)`;  // сдвигаем поле слайдов на ширину отступа
    }

    const indicators = document.createElement('ol');
    const dots = [];  // создаем настоящий массив чтобы запушить в него точки и затем навесить им класс активности

    indicators.classList.add('carousel-indicators');
    slider.append(indicators);

    for (let i = 0; i < slides.length; i++) {    // создаем точки 
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i);
        dot.classList.add('dot');

        if (i == 0) {
            dot.style.opacity = 1;
        }

        indicators.append(dot);
        dots.push(dot);
    };

    function displayActiveDot() {  
        dots.forEach(dot => dot.style.opacity = '0.5');
        dots[slideIndex].style.opacity = 1;
    }

    function deleteNotDigits(str) {
        return +str.replace(/\D/g, '');
    }

    next.addEventListener('click', () => {
        if (offset == deleteNotDigits(width) * (slides.length - 1)) {  // если отступ равен общей ширине скрытых слайдов (650 * 3), т.е. если мы уже на последнем слайде, возвращаем отступ в исходное 0 - т.е. возвращаемся на первый слайд
            offset = 0;
        } else {
            offset += deleteNotDigits(width);  // в остальных случаях добавляем отступ равный ширине слайда
        }

        transformSlidesField();  

        if (slideIndex == slides.length - 1) {
            slideIndex = 0;
        } else {
            slideIndex++;
        }

        setSlideIndex();
        displayActiveDot();
    });

    prev.addEventListener('click', () => {
        if (offset == 0) {                 // если отступ равен 0 - мы на первом слайде
            offset = deleteNotDigits(width) * (slides.length - 1);  // то устанавливаем оступ равный ширине всех скрытых слайдов - т.е. перелистываем на последний слайд
        } else {
            offset -= deleteNotDigits(width);  // в остальных случаях отнимаем отступ равный ширине слайда
        }

        transformSlidesField();   

        if (slideIndex == 0) {
            slideIndex = slides.length - 1;
        } else {
            slideIndex--;
        }

        setSlideIndex();
        displayActiveDot();
    });

    dots.forEach(dot => {
        dot.addEventListener('click', (event) => {
            const slideTo = event.target.getAttribute('data-slide-to');

            slideIndex = +slideTo;
            offset = deleteNotDigits(width) * (slideTo);

            transformSlidesField();  
            setSlideIndex();
            displayActiveDot();
        });
    });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function timer(id, deadLine) {
    
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
 
     setClock(id, deadLine);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getResource: () => (/* binding */ getResource),
/* harmony export */   postData: () => (/* binding */ postData)
/* harmony export */ });
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

const getResource = async (url) => {  // гет запрос поэтому передаем только ссылку на базу
    const res = await fetch(url);     // для гет запроса не нужны доп настройки, просто получаем данные

    if (!res.ok) {                    // если в запросе что-то не так пошло, то выкидываем ошибку вручную и сработает блок .catch
        throw new Error(`Could not fetch ${url}, status ${res.status}` );  // выкинуть ошибку
    }

    return await res.json();  // возвращаем промис сразу переводим результат в обычный объект
} 




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");









window.addEventListener('DOMContentLoaded', () => {

    // создаем таймер здесь, т.к. он используется и в модуле modal, и в forms
    const modalTimerId = setTimeout(() => (0,_modules_modal__WEBPACK_IMPORTED_MODULE_3__.openModal)('.modal', modalTimerId), 50000); // открываем модалку через 5 сек после захода пользователя на страницу

    (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    (0,_modules_timer__WEBPACK_IMPORTED_MODULE_1__["default"])('.timer', '2024-11-18');
    (0,_modules_modal__WEBPACK_IMPORTED_MODULE_3__["default"])('[data-modal]', '.modal', modalTimerId);
    (0,_modules_forms__WEBPACK_IMPORTED_MODULE_4__["default"])('form', modalTimerId);
    (0,_modules_cards__WEBPACK_IMPORTED_MODULE_5__["default"])();
    (0,_modules_calc__WEBPACK_IMPORTED_MODULE_6__["default"])();
    (0,_modules_slider__WEBPACK_IMPORTED_MODULE_2__["default"])({
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


/******/ })()
;
//# sourceMappingURL=bundle.js.map