const base_url = 'http://localhost:3000/';

function fazerVerificarEmailNaApi(email) {
    const dados = {
        email: email
    };

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados)
    };

    return fetch(`${base_url}usuarios/verificar_email`, requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao fazer a requisição: ' + response.status);
            }
            return response.json();
        })
        .catch(error => {
            console.error('Erro:', error);
            return null;
        });
}

function cadastrarNaApi(codigo) {
    const nome = localStorage.getItem("nome");
    const email = localStorage.getItem("email");
    const senha = localStorage.getItem("senha");

    const dados = {
        email: email,
        senha: senha,
        nome: nome,
        codigo: codigo
    };

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados)
    };

    return fetch(`${base_url}usuarios/cadastrar`, requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao fazer a requisição: ' + response.status);
            }
            return response.json();
        })
        .catch(error => {
            console.error('Erro:', error);
            return null;
        });
}

document.getElementById('botao_cadastrar').addEventListener("click", function () {
    const senha1 = document.getElementById('senha1').value;
    const senha2 = document.getElementById('senha2').value;
    const email = document.getElementById('email').value;
    const nome = document.getElementById('nome').value;

    if (senha1 === senha2 && email && nome) {
        localStorage.setItem("nome", nome);
        localStorage.setItem("email", email);
        localStorage.setItem("senha", senha1);

        fazerVerificarEmailNaApi(email)
            .then(data => {
                    alert('E-mail cadastrado com sucesso'); 
                    console.log(data)// Mensagem de erro
            })
            .catch(error => {
                console.error('Erro:', error);
                alert('Erro ao fazer Cadastro: ' + error.message);
            });
    } else {
        alert("Campos incorretos! Tente novamente");
    }
});
