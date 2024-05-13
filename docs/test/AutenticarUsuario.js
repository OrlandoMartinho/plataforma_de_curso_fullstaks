const axios = require('axios');

async function testarAutenticarUsuario() {
    try {
        // Dados do usuário para autenticar
        const dadosUsuario = {
              email: "clementinap143@gmail.com",
              codigo:"5211"
        };

        // URL da API
        const url = 'http://localhost:3000/users/verificar';

        // Envia a solicitação POST para autenticar o usuário
        const response = await axios.post(url, dadosUsuario);

        console.log(response.data); // Exibe a resposta da API
    } catch (error) {
        console.error('Erro ao testar autenticação de usuário:', error.message);
    }
}

testarAutenticarUsuario();
