
const base_url = 'http://localhost:3000/';

function fazerLoginNaApi(senha, email) {
    const dados = {
        senha: senha,
        email: email
    };

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados)
    };

    return fetch(`${base_url}usuarios/login`, requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao fazer a requisição: ' + response.status);
            }
            return response.json();
        })
        .then(data => {
            return data;
        })
        .catch(error => {
            console.error('Erro:', error);
            return null;
        });
}
function fazerobterUsuario(token) {
    const dados = {
        accessToken: token
    };

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados)
    };

    return fetch(`${base_url}usuarios/obter_usuario_por_token`, requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao fazer a requisição: ' + response.status);
            }
            return response.json();
        })
        .then(data => {
            return data;
        })
        .catch(error => {
            console.error('Erro:', error);
            return null;
        });
}


document.getElementById('entrar').addEventListener("click", function () {
    const senha = document.getElementById('senha').value;
    const email = document.getElementById('email').value;
    console.log(email,senha)
    fazerLoginNaApi(senha, email)
        .then(data => {
            if (data) {
                alert('Login bem-sucedido!');
                localStorage.setItem("token",data.accessToken)
                fazerobterUsuario(data.accessToken)
                .then(data=>{

                    if(data.usuario.id_usuario==1){
                        window.location.href = "pages/admin/home-admin.html";
                    }else{
                        window.location.href = "pages/home.html";

                    }


                }).catch(error => {
                  console.error('Erro:', error);
                  alert('Erro ao fazer login: ' + error.message); // Exibe erro no login
               });
            } else {
                alert('Credenciais inválidas'); // Mensagem de erro
            }
        })
        .catch(error => {
            console.error('Erro:', error);
            alert('Erro ao fazer login: ' + error.message); // Exibe erro no login
        });
});



const dados = {
    accessToken: localStorage.getItem("token"),
};

const requestOptions = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(dados)
};

fetch(`${base_url}`, requestOptions)
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao fazer a requisição: ' + response.status);
        }
        return response.json();
    })
    .then(data => {


        if (data.mensagem === true) {

            fazerobterUsuario(localStorage.getItem("token"))
            .then(data=>{

                if(data.usuario.id_usuario==1){
                    window.location.href = "pages/admin/home-admin.html";
                }else{
                    window.location.href = "pages/home.html";

                }

            }).catch(error => {
              console.error('Erro:', error); // Exibe erro no login
           });

        }



    })
    .catch(error => {
        console.error('Erro:', error);
    });
