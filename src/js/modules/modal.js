
function openModal(modalSelector, modalTimerId = 0) {
    const modal = document.querySelector(modalSelector);
    modal.style.display = 'block';
    modal.classList.add('fadeInModal');
    document.body.style.overflow = 'hidden';
    if (modalTimerId) {
        clearInterval(modalTimerId);
    }
}

function closeModal(modalSelector) {
    const modal = document.querySelector(modalSelector);
    modal.classList.remove('fadeInModal');
    modal.classList.add('fadeOutModal');
    setTimeout(() => {
        modal.style.display = 'none';
        modal.classList.remove('fadeOutModal');
    }, 700);
    document.body.style.overflow = 'auto';
}

function modal(triggerSelector, modalSelector) {
    const modal = document.querySelector(modalSelector),
        btns = document.querySelectorAll(triggerSelector);

    btns.forEach(btn => {
        btn.addEventListener('click', () => openModal(modalSelector, modalTimerId));
    });

    modal.addEventListener('click', (e) => {
        if (e.target && e.target.matches(modalSelector) || e.target.getAttribute('data-close') == '') {
            closeModal(modalSelector)
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === "block") {
            closeModal(modalSelector)
        }
    });

    function scrollOpenModal() {
        if (document.documentElement.scrollHeight <= document.documentElement.clientHeight + document.documentElement.scrollTop) {
            openModal(modalSelector, modalTimerId);
            document.removeEventListener('scroll', scrollOpenModal);
        }
    }

    document.addEventListener('scroll', scrollOpenModal);

    const modalTimerId = setTimeout(()=> {
        openModal(modalSelector, modalTimerId)
    }, 20000);
}

export default modal;
export {closeModal};
export {openModal};