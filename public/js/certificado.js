let modalBtn = document.querySelectorAll('.certificadoContent');

let modal = document.querySelector('.modal')
let profileMore = document.querySelector('.profile-more');
let profileBtn = document.querySelector('.Profile-btn')

profileBtn.addEventListener('click',()=>{
    profileMore.classList.toggle('on')
})




modalBtn.forEach((item,index)=>{
    item.addEventListener('click',()=>{
        modal.classList.add('on')
    })
})