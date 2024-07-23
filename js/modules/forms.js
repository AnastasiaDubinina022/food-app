function forms() {
    
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
}

module.exports = forms;