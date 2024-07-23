function modal() {
    
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
}

module.exports = modal;