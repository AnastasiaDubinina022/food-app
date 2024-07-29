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

export default modal;
export {openModal};
export {closeModal};