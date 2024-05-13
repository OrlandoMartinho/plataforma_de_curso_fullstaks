let containerAssinatura = document.querySelector('.assinatura');
let btnAssinatura = document.querySelector('.btn-assinatura');
let btnAssinaturaClose = document.querySelectorAll('.icon-close')

let containerSeguranca = document.querySelector('.dados-seguranca');
let btnSeguranca = document.querySelector('.seguranca-btn');
let profileMore = document.querySelector('.profile-more');
let profileBtn = document.querySelector('.Profile-btn')

profileBtn.addEventListener('click',()=>{
    profileMore.classList.toggle('on')
})

btnAssinatura.addEventListener('click',()=>{
    containerAssinatura.classList.add('on')
})

btnSeguranca.addEventListener('click',()=>{
    containerSeguranca.classList.add('on')
})
 
btnAssinaturaClose.forEach((item,index)=>{
    item.addEventListener('click',()=>{
        containerAssinatura.classList.remove('on')
        containerSeguranca.classList.remove('on')
    })
})