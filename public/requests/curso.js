const requestOptions2 = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        accessToken: localStorage.getItem("token")
    })
};

fetch(`${base_url}cursos/listar`, requestOptions2)
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao fazer a requisição: ' + response.status);
        }
        return response.json();
    })
    .then(data => {
        var cursosMain = document.getElementById("cursos-main");
        data.cursos.forEach(function(curso) {
            cursosMain.appendChild(criarCurso(curso));
        });
    })
    .catch(error => {
        console.error('Erro:', error);
    });

function criarCurso(curso) {
    var card = document.createElement("div");
    card.classList.add("cursos");

    card.innerHTML = `
        <div class="cards">
            <div class="card">
                <h6>${curso.titulo}</h6>
                <p>${curso.descricao}</p>
            </div>
        </div>
    `;

    return card;
}
