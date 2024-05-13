const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data'); // Importa a biblioteca FormData

async function cadastrarMedico() {
    try {
        // URL da API
        const url = 'http://localhost:3000/usuarios/pedir_assinatura';

        // Dados do médico para enviar para a API
        const dadosMedico = {
            "email":"clementinap143@gmail.com",
            "nome":"Orlando Saiomboo",
            "genero":"Masculino",
            "data_de_nascimento":"2003-12-03",
            "numero_de_telefone":"941139558",
            "accessToken":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c3VhcmlvIjoyLCJlbWFpbCI6ImNsZW1lbnRpbmFwMTQzQGdtYWlsLmNvbSIsInNlbmhhIjoiJDJiJDEwJGlJVjZCS2ZlTmFHb1ptQ3FVRWdnMXVqdzFpcHZMdnIzMlMvSndRV2E1TGhqQ2kudTZ0QUZpIiwiYXNzaW5hZG8iOjAsImlhdCI6MTcxNTE3OTAyNX0.HusP4CgvxTwgZjESjAMl35SZVi_g2M5Ifl6Yv4ftOMQ",
            "numero_do_bi":"shhdjdlsklkddiifklklfiiofgg",
            "localizacao":"Luanda,Benfica,Chinguari"
        };

        // Caminho da imagem a ser enviada
        const caminhoImagem = '2.jpg';

        // Cria um objeto FormData
        const formData = new FormData();

        // Adiciona os dados do médico ao FormData
        Object.entries(dadosMedico).forEach(([key, value]) => {
            formData.append(key, value);
        });
        // Lê o conteúdo da imagem como um buffer
        const imagemBuffer = fs.readFileSync(caminhoImagem);

        // Adiciona a imagem ao FormData
        formData.append('foto', imagemBuffer, {
            filename: 'foto.jpg',
            contentType: 'image/jpg' // Define o tipo de conteúdo da imagem
        });

        // Faz a solicitação POST para a API com os dados do médico e a imagem
        const response = await axios.put(url,formData, {
            body: {
                'Content-Type': `multipart/form-data; boundary=${formData._boundary}` // Define o tipo de conteúdo do FormData
            }
        });

        console.log(response.data); // Exibe a resposta da API
    } catch (error) {
        console.error('Erro ao cadastrar médico:', error.message);
    }
}

// Chama a função para cadastrar o médico
cadastrarMedico();
