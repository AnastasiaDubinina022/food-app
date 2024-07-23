function slider() {
    
    // Slider v.1

    const current = document.querySelector('#current');
    const total = document.querySelector('#total');
    const slides = document.querySelectorAll('.offer__slide');
    const slider = document.querySelector('.offer__slider');
    const prev = document.querySelector('.offer__slider-prev');
    const next = document.querySelector('.offer__slider-next');
    const slidesWrapper = document.querySelector('.offer__slider-wrapper');
    const slidesField = document.querySelector('.offer__slider-inner');
    const width = window.getComputedStyle(slidesWrapper).width;   // '650px'
    let slideIndex = 0;

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

module.exports = slider;