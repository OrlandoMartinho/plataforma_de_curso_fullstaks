let containerNotification = document.querySelector('.user-modal');
let btnNotification = document.querySelector('.userView');
let ButtonModal = document.querySelectorAll('.button-modal');

btnNotification.addEventListener('click',()=>{
    containerNotification.classList.add('on')
})

ButtonModal.forEach((value,_)=>{
    value.addEventListener('click',()=>{
        containerNotification.classList.remove('on')
    })
})