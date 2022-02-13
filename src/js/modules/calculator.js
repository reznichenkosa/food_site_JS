function calculator() {
    const result = document.querySelector('.calculating__result span');
    let sex, height, weight, age, ratio;

    function calcTotal() {
        if (!(sex && height && weight && age && ratio)) {
            result.textContent = '0';
            return;
        }

        if(sex === 'female') {
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        } else {
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        }

        if (result.textContent <= 0) {
            result.textContent = '0';
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
}

export default calculator;