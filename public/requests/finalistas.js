var dadoss = [];

const requestOptions2 = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        accessToken: localStorage.getItem("token")
    })
};

fetch(`${base_url}finalistas/obter_todos_finalistas`, requestOptions2)
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao fazer a requisição: ' + response.status);
        }
        return response.json();
    })
    .then(data => {
        dadoss = data.finalistas;
      //  popularTabela(); // Chama a função após receber os dados
    })
    .catch(error => {
        console.error('Erro:', error);
    });

// Função para popular a tabela com os dados
function popularTabela() {
    var tableBody = document.querySelector("#tabela");
    tableBody.innerHTML = ""; // Limpar o conteúdo da tabela

    // Iterar sobre os dados e adicionar as linhas à tabela
    dadoss.forEach(function (item) {
        var row = "<tr>";
        row += "<td>" + item.id_finalista + "</td>";
        row += "<td>" + item.nome + "</td>";
        row += "<td>" + item.data_de_finalizacao + "</td>";
        row += "<td><button class='userView' onclick='selecionarArquivo(" + item.id_finalista + ")'>Adicionar</button></td>";
        row += "</tr>";

        tableBody.innerHTML += row;
    });
}
function enviarArquivo(id, arquivo) {
    var formData = new FormData();
    formData.append('id_finalista', id);
    formData.append('file', arquivo);
    formData.append('accessToken',localStorage.getItem("token"))
    

    fetch(`${base_url}finalistas/cadastrar_certificado`, {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao enviar arquivo: ' + response.status);
        }
        return response.json();
    })
    .then(data => {
        console.log('Arquivo enviado com sucesso:', data);
        
    })
    .catch(error => {
        console.error('Erro ao enviar arquivo:', error);
    });
}
// Função chamada ao clicar no botão Adicionar
function selecionarArquivo(id) {
    var input = document.createElement('input');
    input.type = 'file';

    input.onchange = function(e) {
        var file = e.target.files[0];
        console.log('Arquivo selecionado:', file);
        console.log('Arquivo selecionado:', file);
        enviarArquivo(id, file);
    }

    input.click();
}
