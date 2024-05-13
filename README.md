
# Plataforma de Curso

Este é um aplicativo desenvolvido em Node.js para uma plataforma de cursos online. A plataforma permite que os usuários se inscrevam em cursos, assistam a vídeos, marquem os vídeos como assistidos e se tornem finalistas quando concluírem todos os vídeos de um curso.

## Requisitos

- Node.js
- MySQL
- Apache HTTP Server
- HTML
- CSS
- JavaScript

## Instalação e Configuração

Após clonar o repositório, siga as etapas abaixo para configurar e iniciar o servidor:

1. **Instale o Node.js:**

   Baixe e instale o Node.js a partir do [site oficial](https://nodejs.org/).

2. **Instale o Apache HTTP Server e o MySQL:**

   Instale o Apache e o MySQL em seu sistema. Você pode usar o [XAMPP](https://www.apachefriends.org/index.html) ou [WampServer](https://www.wampserver.com/en/) para instalar o Apache, MySQL e PHP facilmente.

3. **Clone o repositório:**

   ```bash
   git clone https://github.com/seu-usuario/plataforma-de-curso.git
   cd plataforma-de-curso
   ```

4. **Instale as dependências:**

   ```bash
   npm install
   ```

5. **Configuração do banco de dados:**

   - Crie um banco de dados MySQL para a aplicação.
   - Importe o arquivo `database.sql` para criar as tabelas necessárias.
   - Renomeie o arquivo `.env.example` para `.env` e configure as variáveis de ambiente, como o nome do banco de dados, o usuário e a senha.

6. **Inicie o servidor:**

   ```bash
   npm start
   ```

   O servidor estará acessível em [http://localhost:3000](http://localhost:3000).

## Estrutura do Projeto

- `docs/` - Contém os diagramas e os arquivos de teste.
- `public/` - Contém os arquivos de visualização.
- `src/` - Contém o código-fonte da aplicação em Node.js.
  - `config/` - Criação das tabelas e do banco de dados, assim como configuração para o envio de e-mail.
  - `controllers/` - Arquivos de controladores da aplicação.
  - `routes/` - Arquivos das rotas.
  - `utils/` - Funções adicionais.
- `uploads/` - Pasta para receber todos os arquivos enviados pelos usuários.

## Tecnologias Utilizadas

- Node.js
- Express.js
- MySQL
- Apache HTTP Server
- HTML
- CSS
- JavaScript

## Contribuindo

Contribuições são bem-vindas! Abra uma issue para discutir as mudanças que você gostaria de fazer ou envie um pull request.

## Licença

Este projeto está licenciado sob a [Licença MIT](LICENSE).

---

Este README.md fornece instruções detalhadas para a configuração e execução do aplicativo, bem como uma visão geral das tecnologias utilizadas e da estrutura do projeto, de acordo com as especificações fornecidas.