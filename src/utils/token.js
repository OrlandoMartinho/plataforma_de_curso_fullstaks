const secretKey = require('../private/secretKey.json');
const jwt = require('jsonwebtoken');
const db = require('../config/dbConfig');

const token = {
    usuarioId: (accessToken) => {
        try {
            const decodedToken = jwt.verify(accessToken, secretKey.secretKey)
            if (decodedToken) {
                return decodedToken.id_usuario;
            } else {
                return null;
            }
        } catch (err) {
            return null;
        }
    },
    usuarioAssinado: (accessToken) => {
        try {
            const decodedToken = jwt.verify(accessToken, secretKey.secretKey)
            if (decodedToken) {
                return decodedToken.assinado;
            } else {
                return null;
            }
        } catch (err) {
            return null;
        }
    }
    ,
    usuarioNome: (accessToken) => {
        try {
            const decodedToken = jwt.verify(accessToken, secretKey.secretKey)
            if (decodedToken) {
                return decodedToken.nome_de_usuario;
            } else {
                return null;
            }
        } catch (err) {
            return null;
        }
    },
    usuarioFoto: (accessToken) => {
        try {
            const decodedToken = jwt.verify(accessToken, secretKey.secretKey)
            if (decodedToken) {
                return decodedToken.foto;
            } else {
                return null;
            }
        } catch (err) {
            return null;
        }
    }
    ,
    usuarioSenha:(accessToken)=>{
        try {
            const decodedToken = jwt.verify(accessToken, secretKey.secretKey)
            if (decodedToken) {
                return decodedToken.senha;
            } else {
                return null;
            }
        } catch (err) {
            return null;
        }

    },
    usuarioEmail: (accessToken) => {
        try {
            const decodedToken = jwt.verify(accessToken, secretKey.secretKey);
            if (decodedToken) {
                return decodedToken.email;
            } else {
                return null;
            }
        } catch (err) {
            return null;
        }
    },
    admId: (accessToken) => {
        try {
            const decodedToken = jwt.verify(accessToken, secretKey.secretKey);
            if (decodedToken.id != null) {
                return decodedToken.id;
            } else {
                return null;
            }
        } catch (err) {
            return null;
        }
    },
    admEmail: (accessToken) => {
        try {
            const decodedToken = jwt.verify(accessToken, secretKey.secretKey);
            if (decodedToken && decodedToken.user && decodedToken.user.id) {
                return decodedToken.user.email;
            } else {
                return null;
            }
        } catch (err) {
            return null;
        }
    },
    verificarTokenUsuario: (accessToken) => {
        return new Promise((resolve, reject) => {
            const id_usuario = token.usuarioId(accessToken);
            const query = 'SELECT token FROM usuarios WHERE id_usuario = ?';
            db.query(query, [id_usuario], (err, result) => {
                if (err) {
                    console.error('Erro ao buscar token do usuário:', err);
                    reject(err);
                } else {
                    if (result.length === 0) {
                        resolve(false);
                    } else {
                        const userToken = result[0].token;
                        resolve(userToken === accessToken);
                    }
                }
            });
        });
    },
    verificarEmailUsuario: (email) => {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM usuarios WHERE email = ?';
            db.query(query, [email], (err, result) => {
                if (err) {
                    console.error('Erro ao buscar email do usuário:', err);
                    reject(err);
                } else {
                    resolve(result.length === 0);
                }
            });
        });
    },
    
    
    
};

module.exports = token;
