let img = document.querySelector('.img-troca')
let btn = document.querySelector('.click');
let condicional = 0;
let content = document.querySelector('.content');
let box = document.querySelector('.box');
let type_pagamento_express = document.querySelector('.pagamento-type-express')
let type_pagamento_other = document.querySelector('.pagamento-type-other')
btn.addEventListener('click',()=>{
   if(condicional==0){
      img.src = '../assets/icon/Icon-arrow-down.png'
      box.classList.remove('on')
      content.classList.add('on')
      condicional=1;
   }else{
      img.src='../assets/icon/arrow-down.png'
      content.classList.remove('on')
      box.classList.add('on')
      condicional=0;

   }
})

