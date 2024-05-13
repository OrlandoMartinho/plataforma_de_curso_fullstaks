const urlImg="../assets/img/curso.jpg"


const cursos = [
    {
        
        duracao: "Formação - 100h",
        titulo: "Desenvolvimento de IA",
        descricao: "Nível intermediário: Sprint-Boot  Postgresql  JUNIT"
    },
    {
        imagem: "../assets/icon/java.png",
        duracao: "Formação - 100h",
        titulo: "Desenvolvimento de IA",
        descricao: "Nível intermediário: Sprint-Boot  Postgresql  JUNIT"
    },
    ,
    {
        imagem: "../assets/icon/java.png",
        duracao: "Formação - 100h",
        titulo: "Desenvolvimento de IA",
        descricao: "Nível intermediário: Sprint-Boot  Postgresql  JUNIT"
    },
    {
        imagem: "../assets/icon/java.png",
        duracao: "Formação - 100h",
        titulo: "Desenvolvimento de IA",
        descricao: "Nível intermediário: Sprint-Boot  Postgresql  JUNIT"
    },
    {
        imagem: "../assets/icon/java.png",
        duracao: "Formação - 100h",
        titulo: "Desenvolvimento de IA",
        descricao: "Nível intermediário: Sprint-Boot  Postgresql  JUNIT"
    },
    {
        imagem: "../assets/icon/java.png",
        duracao: "Formação - 100h",
        titulo: "Desenvolvimento de IA",
        descricao: "Nível intermediário: Sprint-Boot  Postgresql  JUNIT"
    },
    {
        imagem: "../assets/icon/java.png",
        duracao: "Formação - 100h",
        titulo: "Desenvolvimento de IA",
        descricao: "Nível intermediário: Sprint-Boot  Postgresql  JUNIT"
    },
    {
        imagem: "../assets/icon/java.png",
        duracao: "Formação - 100h",
        titulo: "Desenvolvimento de IA",
        descricao: "Nível intermediário: Sprint-Boot  Postgresql  JUNIT"
    },
    {
        imagem: "../assets/icon/java.png",
        duracao: "Formação - 100h",
        titulo: "Desenvolvimento de IA",
        descricao: "Nível intermediário: Sprint-Boot  Postgresql  JUNIT"
    },
    {
        imagem: "../assets/icon/java.png",
        duracao: "Formação - 100h",
        titulo: "Desenvolvimento de IA",
        descricao: "Nível intermediário: Sprint-Boot  Postgresql  JUNIT"
    },
    {
        imagem: "../assets/icon/java.png",
        duracao: "Formação - 100h",
        titulo: "Desenvolvimento de IA",
        descricao: "Nível intermediário: Sprint-Boot  Postgresql  JUNIT"
    },
    {
        imagem: "../assets/icon/java.png",
        duracao: "Formação - 100h",
        titulo: "Desenvolvimento de IA",
        descricao: "Nível intermediário: Sprint-Boot  Postgresql  JUNIT"
    },
    {
        imagem: "../assets/icon/java.png",
        duracao: "Formação - 100h",
        titulo: "Desenvolvimento de IA",
        descricao: "Nível intermediário: Sprint-Boot  Postgresql  JUNIT"
    },
    {
        imagem: "../assets/icon/java.png",
        duracao: "Formação - 100h",
        titulo: "Desenvolvimento de IA",
        descricao: "Nível intermediário: Sprint-Boot  Postgresql  JUNIT"
    },
    {
        imagem: "../assets/icon/java.png",
        duracao: "Formação - 100h",
        titulo: "Desenvolvimento de IA",
        descricao: "Nível intermediário: Sprint-Boot  Postgresql  JUNIT"
    },
    {
        imagem: "../assets/icon/java.png",
        duracao: "Formação - 100h",
        titulo: "Desenvolvimento de IA",
        descricao: "Nível intermediário: Sprint-Boot  Postgresql  JUNIT"
    },
    {
        imagem: "../assets/icon/java.png",
        duracao: "Formação - 100h",
        titulo: "Desenvolvimento de IA",
        descricao: "Nível intermediário: Sprint-Boot  Postgresql  JUNIT"
    },
    {
        imagem: "../assets/icon/java.png",
        duracao: "Formação - 100h",
        titulo: "Desenvolvimento de IA",
        descricao: "Nível intermediário: Sprint-Boot  Postgresql  JUNIT"
    },
    {
        imagem: "../assets/icon/java.png",
        duracao: "Formação - 100h",
        titulo: "Desenvolvimento de IA",
        descricao: "Nível intermediário: Sprint-Boot  Postgresql  JUNIT"
    },
    {
        imagem: "../assets/icon/java.png",
        duracao: "Formação - 100h",
        titulo: "Desenvolvimento de IA",
        descricao: "Nível intermediário: Sprint-Boot  Postgresql  JUNIT"
    },
    {
        imagem: "../assets/icon/java.png",
        duracao: "Formação - 100h",
        titulo: "Desenvolvimento de IA",
        descricao: "Nível intermediário: Sprint-Boot  Postgresql  JUNIT"
    },
    {
        imagem: "../assets/icon/java.png",
        duracao: "Formação - 100h",
        titulo: "Desenvolvimento de IA",
        descricao: "Nível intermediário: Sprint-Boot  Postgresql  JUNIT"
    },
    {
        imagem: "../assets/icon/java.png",
        duracao: "Formação - 100h",
        titulo: "Desenvolvimento de IA",
        descricao: "Nível intermediário: Sprint-Boot  Postgresql  JUNIT"
    },
    {
        imagem: "../assets/icon/java.png",
        duracao: "Formação - 100h",
        titulo: "Desenvolvimento de IA",
        descricao: "Nível intermediário: Sprint-Boot  Postgresql  JUNIT"
    },
    {
        imagem: "../assets/icon/java.png",
        duracao: "Formação - 100h",
        titulo: "Desenvolvimento de IA",
        descricao: "Nível intermediário: Sprint-Boot  Postgresql  JUNIT"
    }
    // Adicione mais cursos conforme necessário
];


function criarCurso(curso) {
    var card = document.createElement("div");
    card.classList.add("cursos");

    card.innerHTML = `
        <div class="cards">
            <div class="card">
                <p>${curso.duracao}</p>
                <h6>${curso.titulo}</h6>
                <p>${curso.descricao}</p>
            </div>
        </div>
    `;

    return card;
}

// Adiciona os cursos à página
var cursosMain = document.getElementById("cursos-main");
cursos.forEach(function(curso) {
    cursosMain.appendChild(criarCurso(curso));
});