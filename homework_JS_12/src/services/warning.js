const modal = document.querySelector('.js-warning');

function openModal(e){
    modal.classList.toggle('warning-toggle');
    const close = modal.querySelector('.js-close-warning');
    modal.addEventListener('click', closeModal);
}

function closeModal(e){
    if ( e.target === e.currentTarget|| e.target.tagName === 'BUTTON' ){
    modal.classList.toggle('warning-toggle');
    const close = modal.querySelector('.js-close-warning');
    close.removeEventListener('click', closeModal);
    }
}

export {modal, openModal, closeModal};