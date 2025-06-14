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

export default timer;