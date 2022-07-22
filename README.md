# Boas vindas ao repositório do TFC - Trybe Futebol Clube! ⚽️

Esse projeto foi desenvolvido durante o módulo de _BackEnd_ na Trybe! #vqv 🚀

Aqui você vai encontrar os detalhes de como foi o desenvolvimento do projeto.

---
# Habilidades desenvolvidas
 - Dockerização dos apps, network, volume e compose;
 - Modelagem dados com **MySQL** através do **Sequelize**;
 - Criação e associação tabelas usando `models` do `sequelize`;
 - Construção de uma **API REST** com endpoints para consumir os models criados;
 - Desenvolvimento de um `CRUD` utilizando `ORM`;
 ---
## O que foi desenvolvido

Foi arquitetado e desenvolvido uma aplicação responsável pela serie A do campeonato __TFC - Trybe Futebol Clube__. Começando pela API, foi desenvolvido alguns endpoints (seguindo os princípios **REST**) que estão conectados ao banco de dados, Aplicando os principios **SOLID**.

O back-end implementa regras de negócio para popular adequadamente a tabela disponível no front-end que será exibida para a pessoa usuária do sistema.

---

## Funcionamento da aplicação

⚠ **Atenção:** ⚠

- **Utilize o `node` na versão 16**

Não utilizar a versão 16 do `node` faz com  que alguns scripts utilizado no projeto falharem.

- #### **Inicie seu `docker-compose` antes de testar localmente!**

- Você pode **instalar as aplicações (front e back)** rodando o comando:
```sh
npm run install:apps
```
- Você pode **iniciar e buildar os containers(backend + frontend + db)** rodando o comando:
```sh
npm run compose:up
```
- Para finalizar o processo, você pode **parar os containers** rodando o comando:
```sh
npm run compose:down
```

### Acessando a aplicação

- Para acessar a aplicação, você pode acessar o  `localhost:3000`;

- Email e senha do usuário administrador: `admin@admin.com` -> `secret_admin`;

- Email e senha do usuário usuário padrão: `user@user.com` -> `secret_user`;

### Portas utilizadas

  - Porta do frontend: `3000`;
  - Porta do backend: `3001`;
  - Porta do banco de dados: `3306`.
