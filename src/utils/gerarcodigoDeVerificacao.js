

function gerarCodigoDeVerificacao() {
    const min = 1000; // Menor número de 4 dígitos
    const max = 9999; // Maior número de 4 dígitos
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports=gerarCodigoDeVerificacao;