// Função para adicionar uma notificação dinamicamente
function adicionarNotificacao(titulo, descricao) {
    var notificacaoBox = document.createElement("div");
    notificacaoBox.classList.add("box", "box-information");

    var conteudo = `
        <div>
            <h1>${titulo}</h1>
            <p>${descricao}</p>
        </div>
    `;
    
    notificacaoBox.innerHTML = conteudo;

    // Adiciona a notificação ao elemento pai desejado
    var elementoPai = document.getElementById("container-notificacoes");
    elementoPai.appendChild(notificacaoBox);
}

// Array de notificações
var notificacoes = [];

// Requisição para obter notificações da API
const requestOptions2 = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        accessToken: localStorage.getItem("token")
    })
};

fetch(`${base_url}notificacoes/`, requestOptions2)
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao fazer a requisição: ' + response.status);
        }
        return response.json();
    })
    .then(data => {
        notificacoes = data.Notificacoes; 
        console.log(notificacoes)// Armazena os dados da API no array de notificações
        notificacoes.forEach(function(notificacao) {
            adicionarNotificacao(notificacao.titulo, notificacao.descricao);
        });
    })
    .catch(error => {
        console.error('Erro:', error);
    });


    document.getElementById("apagar").addEventListener("click", ()=>{
       
        const requestOptions2 = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                accessToken: localStorage.getItem("token")
            })
        };
        
        fetch(`${base_url}notificacoes/`, requestOptions2)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao fazer a requisição: ' + response.status);
                }
                return response.json();
            })
            .then(data => { 
                console.log(data)// Armazena os dados da API no array de not
            })
            .catch(error => {
                console.error('Erro:', error);
            });


    });
    