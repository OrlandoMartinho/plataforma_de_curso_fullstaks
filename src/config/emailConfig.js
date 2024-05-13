const credenciaisEmail=require('../private/CredenciaisEmails.json')
const nodemailer = require('nodemailer');


let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: credenciaisEmail.email+'', // Seu endereço de e-mail
      pass: credenciaisEmail.senha+'' // Sua senha de e-mail
    },
    tls: {
     rejectUnauthorized: false // Ignorar certificado autoassinado (use apenas para desenvolvimento)
    }
  });

module.exports=transporter