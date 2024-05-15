let nome_do_formador = "Orlando Saiombo", titulo = "Excel avançado", categoria="Avançado", modo="Gratuito", modulo="Iniciante", descricao="Aprenda a fazer";

const arquivos = document.getElementById('file-upload');

document.querySelector('#cadastrar').addEventListener("click",  ()=> {
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
            return response.json();
        })
        .then(data => {
            localStorage.setItem("nome_do_formador",nome_do_formador) 
            localStorage.setItem("titulo",titulo) 
            localStorage.setItem("categoria",categoria) 
            localStorage.setItem("modo",modo) 
            localStorage.setItem("modulo",modulo)
            localStorage.setItem("descricao",descricao)
            localStorage.setItem("id_curso",data.id_curso)
            
            arquivos.addEventListener('change', function(event) {
                const files = event.target.files;

                var formData = new FormData();
                formData.append('id_curso', localStorage.getItem('id_curso'));
                formData.append('accessToken', localStorage.getItem("token"));

                for (let i = 0; i < files.length; i++) {
                    formData.append('files', files[i]);
                }
                
                fetch(`${base_url}videos/cadastrar`, {
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
                    console.log('Arquivos enviados com sucesso:', data);
                })
                .catch(error => {
                    console.error('Erro ao enviar arquivo:', error);
                });
            });
        })
        .catch(error => {
            console.error('Erro:', error);
        });
});
