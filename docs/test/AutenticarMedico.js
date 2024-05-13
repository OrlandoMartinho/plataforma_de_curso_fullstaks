const axios = require('axios');

async function cadastrarMedico() {
    try {
        // URL da API
        const url = 'http://localhost:3000/medicos/autenticar';

        // Dados do médico para enviar para a API
        const dadosMedico = {
            email: 'orlandopedro176@gmail.com',
            codigo: '1123',
        };
        const response = await axios.post(url,dadosMedico, {
           
        });

        console.log(response.data); // Exibe a resposta da API
    } catch (error) {
        console.error('Erro ao cadastrar médico:', error.message);
    }
}

cadastrarMedico();
