document.querySelector('#cadastrar').addEventListener("click", async () => {
    const nome_do_formador = document.getElementById('nome_do_formador').value; 
    const titulo = document.getElementById('titulo').value; 
    const categoria = document.getElementById('categoria').value; 
    const modo = document.getElementById('modo').value; 
    const modulo = document.getElementById('modulo').value;
    const descricao = document.getElementById('descricao').value;
    const arquivos = document.getElementById('file-upload').files;

    const dados = {
        nome_do_formador: nome_do_formador,
        titulo: titulo,
        categoria: categoria,
        modo: modo,
        modulo: modulo,
        descricao: descricao,
        accessToken: localStorage.getItem("token")
    };

    try {
        const response = await fetch(`${base_url}cursos/cadastrar`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados)
        });

        if (!response.ok) {
            throw new Error('Erro ao fazer a requisição: ' + response.status);
        }

        const cursoData = await response.json();
        localStorage.setItem("nome_do_formador", nome_do_formador); 
        localStorage.setItem("titulo", titulo); 
        localStorage.setItem("categoria", categoria); 
        localStorage.setItem("modo", modo); 
        localStorage.setItem("modulo", modulo);
        localStorage.setItem("descricao", descricao);
        localStorage.setItem("id_curso", cursoData.id_curso);

        for (let i = 0; i < arquivos.length; i++) {
            const formData = new FormData(); // Criar um novo FormData para cada iteração do loop
            formData.append('id_curso', localStorage.getItem('id_curso'));
            formData.append('accessToken', localStorage.getItem("token"));
            formData.append('file', arquivos[i]);

            const videoResponse = await fetch(`${base_url}videos/cadastrar`, {
                method: 'POST',
                body: formData
            });

            if (!videoResponse.ok) {
                throw new Error('Erro ao enviar arquivo: ' + videoResponse.status);
            }

            const videoData = await videoResponse.json();
            console.log('Arquivo enviado com sucesso:', videoData);
        }

    } catch (error) {
        console.error('Erro:', error);
    }
});
