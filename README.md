# REST API NodeJS 
### Descrição 
Repositório criado para estudos sobre REST APIs em NodeJS com Express. A API simula um petshop. Os ideais e conceitos utilizados nesse repositório tem por base a formação de NodeJS com Express do Alura.

Na primeira versão foi realizada a construção da arquitetura da API, o banco de dados e os métodos foram gerados a partir do Sequelize. Nesta versão foram criados os seguintes itens:
 - Tabela de Fornecedores e seus repectivos métodos
 - Classes de validações de erros e filtragem de respostas
 - Configuração de informações confidenciais em arquivo externalizado
 - Configuração de métodos de reposta JSON e XML

### Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/), [MySQL](https://www.mysql.com/), [Postman](https://www.postman.com/) ou [Insomnia](https://insomnia.rest/). 
Além disto é bom ter um editor para trabalhar com o código como [VSCode](https://code.visualstudio.com/).

### Tecnologias

As seguintes ferramentas foram usadas na construção do projeto:

- [Node.js](https://nodejs.org/en/)
- [MySQL](https://www.mysql.com/)

As seguintes bibliotecas foram utilizadas no projeto:

- Versão 1:
  - Body-parser
  - Config (utilizado para externalização de informações)
  - Express
  - Jsontoxml
  - MySQL2
  - Sequelize

### Tabela de Fornecedores:

|Parâmetro|Tipo|Observações|
|:-------:|:--:|:---------:|
|id|INT|Manipulado pelo Sequelize|
|empresa|Varchar(255)|Obrigatório|
|email|Varchar(255)|Obrigatório|
|categoria|ENUM('ração', 'brinquedos')|Obrigatório|
|dataCriacao|Datetime|Manipulado pelo Sequelize|
|dataAtualizacao|Datetime|Manipulado pelo Sequelize|
|versao|INT|-|

### Montagem dos requests de Fornecedores:

*O retorno padrão da api é no formato JSON, caso queira receber em formato XML, basta adicionar no cabeçalho da requisição o header 'Accept' com valor 'application/xml'

*Todo corpo de requisição deve ser no formato JSON

|Request | Método | URL | Corpo da requisição |
|--------|:------:|:---:|---------------------|
|Lista de fornecedores|GET|http://localhost:3000/api/fornecedores/|não possui|
|Listar único fornecedor|GET|http://localhost:3000/api/fornecedores/1|não possui|
|Criar fornecedor|POST|http://localhost:3000/api/fornecedores/|{ "empresa": "nomeDaEmpresa", "email": "emailEmpresa", "categoria": "categoria"}|
|Atualizar fornecedor|PUT|http://localhost:3000/api/fornecedores/|{"empresa": "nomeDaEmpresa"}|
|Deletar fornecedor|DELETE|http://localhost:3000/api/fornecedores/1|não possui|



### Rodando a API
```bash
# Clone este repositório
$ git clone <https://github.com/jrdc21/nodeJS>

# Instale as dependências
$ npm install

# Acesse o arquivo /config/default.json e realize a configuração do banco de dados e porta da api

# Execute a aplicação 
$ npm start
```
<br />

### Autor
---


<img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/56178099?v=4" width="100px;" alt=""/>
<br />
<sub><b>Daniel Junior</b></sub>


Feito com ❤️ por Daniel Junior !

[![Hotmail Badge](https://img.shields.io/badge/Microsoft_Outlook-0078D4?style=for-the-badge&logo=microsoft-outlook&logoColor=white)](mailto:junior.dalcoli@hotmail.com)
[![Linkedin Badge](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/danielcolijr/)