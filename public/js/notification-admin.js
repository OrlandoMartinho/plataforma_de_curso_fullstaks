let containerNotification = document.querySelector('.delete-all-notifications');
let btnNotification = document.querySelector('.more-options');
let ButtonModal = document.querySelectorAll('.button-modal');

btnNotification.addEventListener('click',()=>{
    console.log('jj')
    containerNotification.classList.add('on')
})

ButtonModal.forEach((value,_)=>{
    value.addEventListener('click',()=>{
        containerNotification.classList.remove('on')
    })
})