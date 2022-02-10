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
            item.classList.remove('visible', 'fadeIn');
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

    // modal 

    const modal = document.querySelector('.modal'),
        btns = document.querySelectorAll('[data-modal]');

    btns.forEach(btn => {
        btn.addEventListener('click', openModal);
    });

    function openModal() {
        modal.style.display = 'block';
        modal.classList.add('fadeInModal');
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimerId);
    }

    function closeModal() {
        modal.classList.remove('fadeInModal');
        modal.classList.add('fadeOutModal');
        setTimeout(() => {
            modal.style.display = 'none';
            modal.classList.remove('fadeOutModal');
        }, 700);
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
        constructor(selector, img, altimg, title, descr, price) {
            this.selector = selector;
            this.img = img;
            this.alt = altimg;
            this.subtitle = title;
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

    const getResource = async (url) => {
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }
        return await res.json();
    };

    getResource('http://localhost:3000/menu')
        .then(data => {
            data.forEach(({
                img,
                altimg,
                title,
                descr,
                price
            }) => {
                new MenuCard('.menu__field .container', img, altimg, title, descr, price).showCard();
            });
        });


    // forms

    const forms = document.querySelectorAll('form');

   

    const message = {
        loading: 'icons/spinner.svg',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так',
    };

    forms.forEach(item => {
        bindPostData(item);
    });

    const postData = async (url, data) => {
        const res = await fetch(url, {
            method: "POST",
            headers: {
                "Content-type": 'application/json'
            },
            body: data
        });

        return await res.json();
    };
    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = 'display: block; margin: 20px auto;';
            form.insertAdjacentElement('afterend', statusMessage);

            const formData = new FormData(form);

            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            postData('http://localhost:3000/requests', json)
                .then(data => {
                    console.log(data);
                    showThanksModal(message.success);
                    statusMessage.remove();
                }).catch(() => {
                    showThanksModal(message.failure);
                }).finally(() => {
                    form.reset();
                })

        });
    }

    function showThanksModal(message) {
        const modalDialog = document.querySelector('.modal__dialog');
        modalDialog.classList.add('fadeOutModal');
        setTimeout(() => {
            modalDialog.style.display = 'none';
            modalDialog.classList.remove('fadeOutModal');
            openModal();


            const thanksModal = document.createElement('div');
            thanksModal.classList.add('modal__dialog', 'fadeInModal');
            thanksModal.innerHTML = `
                <div class="modal__content">
                    <div class="modal__close" data-close>&times;</div>
                    <div class="modal__title">${message}</div>
                </div>
            `;
            document.querySelector('.modal').append(thanksModal);
            setTimeout(() => {
                setTimeout(() => {
                    thanksModal.remove();
                    modalDialog.style.display = 'block';
                }, 600);
                closeModal();
            }, 4000);
        }, 700);


    }


    // slider 

    const prev = document.querySelector('.offer__slider-prev'),
        next = document.querySelector('.offer__slider-next'),
        current = document.querySelector('#current'),
        total = document.querySelector('#total'),
        slides = document.querySelectorAll('.offer__slide'),
        boxSlider = document.querySelector('.offer__slider-wrapper');

    const sliderNav = document.createElement('ul');
    sliderNav.classList.add('offer__slider-nav');
    sliderNav.innerHTML = `
          <li></li>
          <li></li>
          <li></li>
          <li></li>`;

    boxSlider.insertAdjacentElement('afterend', sliderNav);

    const sliderNavItems = document.querySelectorAll('.offer__slider-nav li');

    function showSlide(i) {
        if (i < 0) {
            i = slides.length - 1;
        }
        if (i >= slides.length) {
            i = 0;
        }
        boxSlider.style.left = -i * (Number.parseInt(window.getComputedStyle(slides[i]).width)) + 'px';
        current.textContent = addZeroCount(i + 1);
        total.textContent = addZeroCount(slides.length);

        sliderNavItems.forEach((item, index) => {
            if (index === i) {
                sliderNavItems[index].style.background = '#54ed39';
                sliderNavItems[index].style.opacity = '1';
            } else {
                sliderNavItems[index].style.opacity = '0.6';
                sliderNavItems[index].style.background = 'white';
            }
        });
    }

    function addZeroCount(count) {
        if (count >= 0 && count < 10) {
            return '0' + count;
        }
        return count
    }
    showSlide(0);

    //autoplay

    function autoplaySlider() {
        let currenSlide = +current.textContent;
        currenSlide = (currenSlide >= slides.length) ? 0 : currenSlide;
        current.classList.add('scaleNumber');
        setTimeout(() => {
            current.classList.remove('scaleNumber');
        }, 200);
        showSlide(currenSlide);
    }
    const autoplayId = setInterval(autoplaySlider, 4000);



    next.addEventListener('click', () => {
        clearInterval(autoplayId);

        let count = +current.textContent;

        showSlide(count);

        current.classList.add('scaleNumber');
        setTimeout(() => {
            current.classList.remove('scaleNumber');
        }, 200);
    });

    prev.addEventListener('click', () => {
        clearInterval(autoplayId);
        let count = +current.textContent - 2;

        showSlide(count);
        current.classList.add('scaleNumber');
        setTimeout(() => {
            current.classList.remove('scaleNumber');
        }, 200);
    })

    sliderNavItems.forEach((item, i) => {
        item.addEventListener('click', () => {
            showSlide(i);
        })
    });

    // calculator 

    const result = document.querySelector('.calculating__result span');
    let sex, height, weight, age, ratio;

    function calcTotal() {
        if (!(sex && height && weight && age && ratio)) {
            result.textContent = '_____';
            return;
        }

        if(sex === 'female') {
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        } else {
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        }

        if (result.textContent <= 0) {
            result.textContent = '____';
        }
    }

    calcTotal();

    function getStaticInfo(parentSelector, activeClass) {
        const elements = document.querySelectorAll(`${parentSelector} div`);

        document.querySelector(parentSelector).addEventListener('click', (e) => {
            
            if (e.target != document.querySelector(parentSelector)) {
                if (e.target.getAttribute('data-ratio')) {
                    ratio = +e.target.getAttribute('data-ratio')
                } else {
                    sex = e.target.getAttribute('data-sex')
                }
    
                elements.forEach(elem => {
                    elem.classList.remove(activeClass);
                })
                
                e.target.classList.add(activeClass);
            }
            calcTotal();
        });
    }

    getStaticInfo('#gender', 'calculating__choose-item_active');
    getStaticInfo('.calculating__choose_big', 'calculating__choose-item_active');

    function getDynamicInfo(selector) {
        const input = document.querySelector(selector);

        input.addEventListener('input', () => {
            if (input.value.match(/\D/g)) {
                input.style.border = '2px solid red';
            } else {
                input.style.border = 'none';
            }
            age = (input.getAttribute('id') === 'age') ? +input.value : age;
            weight = (input.getAttribute('id') === 'weight') ? +input.value : weight;
            height = (input.getAttribute('id') === 'height') ? +input.value : height; 
            calcTotal();
        });
        
    }

    getDynamicInfo('#height');
    getDynamicInfo('#weight');
    getDynamicInfo('#age');
});
