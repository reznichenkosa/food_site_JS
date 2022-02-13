function tabs() {

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
}

export default tabs;