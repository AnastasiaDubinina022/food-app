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

export default calc;