document.addEventListener('DOMContentLoaded', () => {

    // Tabs

    const tabs = document.querySelectorAll('.tabheader__item');
    const tabContent = document.querySelectorAll('.tabcontent');
    const tabHeader = document.querySelector('.tabheader__items');

    function hideTabContent() {
        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
        tabContent.forEach(item => {
            item.classList.remove('visible' ,'fadeIn');
        });
    }

    function showTabContent(i = 0) {
        tabContent[i].classList.add('visible', 'fadeIn');
        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent();

    tabHeader.addEventListener('click', (e) => {
        if (e.target && e.target.matches('.tabheader__item')) {
            const tab = e.target;
            tabs.forEach((item, i) => {
                if (tab === item) {
                    hideTabContent();
                    showTabContent(i);
                } 
            });

        }
    });

    // timer 

    const deadline = '2022-03-07 00:00',
          promoDescr = document.querySelector('.promotion__descr'),
          month = ['января','февраля','марта','апреля','мая','июня','июля','августа','сентября','октября','ноября','декабря'],
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
            return '0'+time;
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

    // modal 

    const modal = document.querySelector('.modal'),
          btns = document.querySelectorAll('[data-modal]');
    
    btns.forEach(btn => {
        btn.addEventListener('click', openModal);
    });
    
    function openModal() {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimerId);
    }

    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    

    modal.addEventListener('click', (e) => {
        if (e.target && e.target.matches('.modal') || e.target.getAttribute('data-close') == '') {
            closeModal()
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === "block") {
            closeModal()
        }
    });

    function scrollOpenModal() {
        if (document.documentElement.scrollHeight <= document.documentElement.clientHeight + document.documentElement.scrollTop) {
            openModal();
            document.removeEventListener('scroll', scrollOpenModal);
        }
    }

    document.addEventListener('scroll', scrollOpenModal);

    const modalTimerId = setTimeout(openModal, 15000);

    // Menu card

    class MenuCard {
        constructor(selector, img, alt, subtitle, descr, price) {
            this.selector = selector;
            this.img = img;
            this.alt = alt;
            this.subtitle = subtitle;
            this.descr = descr;
            this.price = price;
        }

        showCard() {
            const menuField = document.querySelector(this.selector);
            const menuCard = document.createElement('div');

            menuCard.classList.add('menu__item');
            menuCard.innerHTML = `
            <img src="${this.img}" alt="${this.alt}">
            <h3 class="menu__item-subtitle">${this.subtitle}</h3>
            <div class="menu__item-descr">${this.descr}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
                <div class="menu__item-cost">Цена:</div>
                <div class="menu__item-total"><span>${this.price}</span> руб/день</div>
            </div>`
            menuField.append(menuCard);
        }
    }

    new MenuCard('.menu__field .container',
    "img/tabs/vegy.jpg",
    "vegy",
    'Меню "Фитнес"',
    'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
    229).showCard();

   new MenuCard('.menu__field .container',
    "img/tabs/elite.jpg",
    "elite",
    'Меню “Премиум”',
    'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
    550).showCard();

   new MenuCard('.menu__field .container',
    "img/tabs/post.jpg",
    "post",
    'Меню "Постное"',
    'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
    430).showCard();
    
    // forms

    const forms = document.querySelectorAll('form');

    const message = {
        loading: 'icons/spinner.svg',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так',
    };

    forms.forEach(item => {
        postData(item);
    });

    function postData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = 'display: block; margin: 20px auto;';
            form.insertAdjacentElement('afterend', statusMessage);

            const request = new XMLHttpRequest();
            request.open('POST', 'server.php');

            request.setRequestHeader('Content-type', 'application/json');
            const formData = new FormData(form);

            const object = {};

            formData.forEach((value, key) => {
                object[key] = value;
            });

            const json = JSON.stringify(object);

            request.send(json);
            
            request.addEventListener('load', () => {
                if (request.status === 200) {
                    console.log(request.response);
                    showThanksModal(message.success);
                    form.reset();
                    statusMessage.remove();
                } else {
                    showThanksModal(message.failure);
                }
            })
        });
    }

    function showThanksModal(message) {
        const modalDialog = document.querySelector('.modal__dialog');
        modalDialog.style.display = 'none';
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
            modalDialog.style.display = 'block';
            closeModal();
        }, 4000);
    }
});

