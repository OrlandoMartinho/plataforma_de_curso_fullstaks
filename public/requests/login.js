const base_url = 'http://localhost:3000/';

function fazerLoginNaApi(senha, email) {
    const dados = {
        senha: senha,
        email: email
    };

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados)
    };

    return fetch(`${base_url}usuarios/login`, requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao fazer a requisição: ' + response.status);
            }
            return response.json();
        })
        .then(data => {
            return data;
        })
        .catch(error => {
            console.error('Erro:', error);
            return null;
        });
}

document.getElementById('entrar').addEventListener("click", function () {
    const senha = document.getElementById('senha').value;
    const email = document.getElementById('email').value;

    fazerLoginNaApi(senha, email)
        .then(data => {
            if (data) {
                alert('Login bem-sucedido!'); // Mensagem de sucesso
                // Faça o que quiser com os dados aqui
            } else {
                alert('Credenciais inválidas'); // Mensagem de erro
            }
        })
        .catch(error => {
            console.error('Erro:', error);
            alert('Erro ao fazer login: ' + error.message); // Exibe erro no login
        });
});

