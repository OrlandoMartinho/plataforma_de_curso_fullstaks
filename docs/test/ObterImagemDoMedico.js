const axios = require('axios');

async function cadastrarMedico() {
    try {
        // URL da API
        const url = 'http://localhost:3000/medicos/obter_imagem';

        // Dados do médico para enviar para a API
        const dadosMedico = {
            email: 'orlandopedro176@gmail.com',
            codigo: '1123',
            accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmb3RvIjoiLi91cGxvYWRzLzUuanBnIiwiY29kaWdvIjoiMTEyMyIsImlkIjo1LCJlbWFpbCI6Im9ybGFuZG9wZWRybzE3NkBnbWFpbC5jb20iLCJhY2Nlc3NUb2tlbiI6ImV5SmhiR2NpT2lKSVV6STFOaUlzSW5SNWNDSTZJa3BYVkNKOS5leUoxYzJWeUlqcDdJbWxrSWpvd0xDSmxiV0ZwYkNJNkltTnNhVzVwWTJGbmFYSmhjM056YjJ4QVoyMWhhV3d1WTI5dEluMHNJbk5sYm1oaElqcDdJbkJoYzNOM2IzSmtJam9pTVRJek5EVTJOemdpZlN3aWFXRjBJam94TnpFeU1EWTBOek0xZlEuRnVyOFdpemhkZV9uUVJ0cllDRFQxQkZMdVBrdjNDOURKRWJ1QTdHcnJoQSIsImlhdCI6MTcxMjE0Mjk5OH0.UNaJOFP1cnwapZ9QZRSZOYTp7eMu-18L5cNq9pUG2Uk'
        };

        const response = await axios.post(url, dadosMedico);

        console.log(response.data); // Exibe a resposta da API
    } catch (error) {
        console.error('Erro ao cadastrar médico:', error.message);
    }
}

cadastrarMedico();
