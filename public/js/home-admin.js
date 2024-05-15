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


    // Função para atualizar os botões com base no tipo de assinatura
    function atualizarBotoes() {
        // Obtém todas as linhas da tabela
        const linhas = document.querySelectorAll('.userView');

        // Itera sobre cada linha
        linhas.forEach(linha => {
            // Obtém a célula que contém o tipo de assinatura
            const tipoAssinatura = linha.querySelector('td:nth-child(5)').innerText.trim();

            // Obtém a célula que contém os botões
            const celulaBotoes = linha.querySelector('td:last-child');

            // Remove todos os botões existentes
            celulaBotoes.innerHTML = '';

            // Adiciona os botões com base no tipo de assinatura
            if (tipoAssinatura === 'Assinado') {
                const botaoRevogar = document.createElement('button');
                botaoRevogar.textContent = 'Revogar assinatura';
                celulaBotoes.appendChild(botaoRevogar);
            } else if (tipoAssinatura === 'Em espera') {
                const botaoBaixar = document.createElement('button');
                botaoBaixar.textContent = 'Baixar comprovativo';

                const botaoValidar = document.createElement('button');
                botaoValidar.textContent = 'Validar Assinatura';

                celulaBotoes.appendChild(botaoBaixar);
                celulaBotoes.appendChild(botaoValidar);
            }
            // Não precisa de condição para o caso 'Não Assinado' já que não há botão para adicionar
        });
    }

    // Chama a função para atualizar os botões quando a página carrega
    window.onload = atualizarBotoes;
