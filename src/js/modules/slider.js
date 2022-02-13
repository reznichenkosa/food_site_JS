function slider() {
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
}

export default slider;