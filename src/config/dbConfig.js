const admCredenciais=require('../private/CredenciaisADM.json') 
const mysql = require('mysql2');
const keysBd = require('../private/keyDb.json');
const databaseCreate=require('./CreateDataBase')
const bcrypt = require('bcrypt');
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);
// Chaves de conexão com o banco de dados
const dbConfig = {
  host: keysBd.host,
  user: keysBd.user,
  password: keysBd.password,
  database: keysBd.database
};
const connection = mysql.createConnection(dbConfig);




// Conectar ao banco de dados
connection.connect((err) => {
  if (err) {
    
  }
  console.log('Conexão com o banco de dados MySQL estabelecida com sucesso.');
});

// Exportar a conexão para uso em outros arquivos

module.exports = connection;
