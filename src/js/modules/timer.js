function timer(deadline) {
    const promoDescr = document.querySelector('.promotion__descr'),
        month = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'],
        deadlineDate = new Date(deadline);

    promoDescr.innerHTML += `Акция закончится ${deadlineDate.getDate()} ${month[deadlineDate.getMonth()]} в ${deadline.slice(-5)}`;

    function getTimeRemainig(endTime) {
        const time = new Date(endTime) - new Date(),
            days = Math.floor(time / 1000 / 60 / 60 / 24),
            hours = Math.floor(time / 1000 / 60 / 60 % 24),
            minutes = Math.floor(time / 1000 / 60 % 60),
            seconds = Math.floor(time / 1000 % 60);

        return {
            time,
            days,
            hours,
            minutes,
            seconds
        }
    }

    function showTime(time) {
        if (time >= 0 && time < 10) {
            return '0' + time;
        }
        return time
    }

    function setTimePromo(deadline) {
        const days = document.querySelector('#days'),
            hours = document.querySelector('#hours'),
            minutes = document.querySelector('#minutes'),
            seconds = document.querySelector('#seconds'),
            timer = setInterval(updateTimer, 1000);

        updateTimer();

        function updateTimer() {
            const time = getTimeRemainig(deadline);

            days.textContent = showTime(time.days);
            hours.textContent = showTime(time.hours);
            minutes.textContent = showTime(time.minutes);
            seconds.textContent = showTime(time.seconds);

            if (time.time <= 1000) {
                clearInterval(timer);
                days.textContent = '00';
                hours.textContent = '00';
                minutes.textContent = '00';
                seconds.textContent = '00';
                document.querySelector('.promotion').style.display = 'none';
            }
        }
    }

    setTimePromo(deadline);
}

export default timer;