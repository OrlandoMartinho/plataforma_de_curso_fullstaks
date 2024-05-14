
const base_url = 'http://localhost:3000/';

const dados = {
    accessToken: localStorage.getItem("token"),
};

const requestOptions = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(dados)
};

fetch(`${base_url}`, requestOptions)
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao fazer a requisição: ' + response.status);
        }
        return response.json();
    })
    .then(data => {
        if (data.mensagem === false) {
           
            window.location.href = "../../index.html";
        }
    })
    .catch(error => {
        console.error('Erro:', error);
    });
