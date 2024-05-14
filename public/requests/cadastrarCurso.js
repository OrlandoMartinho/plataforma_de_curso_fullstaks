let nome_do_formador = "Orlando Saiombo",titulo = "Excel avançado",categoria="Avançado",modo="Gratuito",modulo="Iniciante",descricao="Aprenda a fazer";
base_url = 'http://localhost:3000/';


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


const arquivos = document.getElementById('file-upload');



document.querySelector('#cadastrar').addEventListener("click",  ()=> {

alert("qqqqqqqqqqqqqqqqq")
    arquivos.addEventListener('change', function(event) {
        const files = event.target.files;
    
            const dados = {
                nome_do_formador: nome_do_formador,
                titulo: titulo,
                categoria:categoria,
                modo:modo,
                modulo:modulo,
                descricao:descricao,
                accessToken:localStorage.getItem("token")
            };
        
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dados)
            };
        
            fetch(`${base_url}cursos/cadastrar`, requestOptions)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Erro ao fazer a requisição: ' + response.status);
                    }
                   response.json();
                })
                .then(data => {
                   console.log(data)
                    localStorage.setItem("nome_do_formador",nome_do_formador) 
                    localStorage.setItem("titulo",titulo) 
                    localStorage.setItem("categoria",categoria) 
                    localStorage.setItem("modo",modo) 
                    localStorage.setItem("modulo",modulo)
                    localStorage.setItem("descricao",descricao)
                })
                .catch(error => {
                    console.error('Erro:', error);
                });
        
    
    });






});