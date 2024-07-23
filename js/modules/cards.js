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
}

module.exports = cards;
