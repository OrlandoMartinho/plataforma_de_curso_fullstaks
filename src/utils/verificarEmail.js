
const { validate } = require('email-validator');


const validarEmail={
         

    verificaEmail:async(email)=> {
        // Verificar formato do email
        if (!validate(email)) {
            
            return { valido: false, motivo: "Formato de e-mail inválido" };

        }

        return {"valido":true}

    }
    


}


module.exports = validarEmail.verificaEmail;
