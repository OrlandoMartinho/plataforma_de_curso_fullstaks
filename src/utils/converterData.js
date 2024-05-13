const dataAtual = new Date();
    
const dia = dataAtual.getDate();
const mes = dataAtual.getMonth() + 1; // Os meses são indexados de 0 a 11, por isso somamos 1
const ano = dataAtual.getFullYear();
const horas = dataAtual.getHours();
const minutos = dataAtual.getMinutes();
const dataFormatada = `${dia}/${mes}/${ano} ${horas}h:${minutos.toString().padStart(2, '0')}`; 

module.exports =dataFormatada;