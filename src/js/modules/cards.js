import { getResource } from "../services/services";

function cards() {
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
}

export default cards;