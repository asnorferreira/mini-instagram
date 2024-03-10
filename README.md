# Documentação do Mini Instagram

## Introdução

O Mini Instagram é uma aplicação web inspirada no Instagram, onde os usuários podem compartilhar fotos, curtir postagens, comentar e interagir com outros usuários.

## Funcionalidades Principais

### 1. Autenticação de Usuários

- Os usuários podem criar uma conta fornecendo um nome de usuário, endereço de e-mail e senha.
- Eles também podem fazer login na plataforma usando suas credenciais registradas.

### 2. Publicação de Postagens

- Os usuários podem fazer upload de imagens para criar novas postagens.
- Eles têm a opção de adicionar uma legenda à sua postagem.

### 3. Interação com Postagens

- Os usuários podem curtir postagens de outros usuários.
- Eles podem comentar em postagens para interagir com o autor e outros usuários.

### 4. Feed de Postagens

- O feed exibe uma lista de postagens de outros usuários, permitindo que os usuários naveguem e descubram novos conteúdos.
- As postagens são exibidas em ordem cronológica, com as mais recentes no topo.

## Endpoints da API

### 1. Autenticação

- `POST /api/auth/register`: Registra um novo usuário na plataforma.
- `POST /api/auth/login`: Autentica um usuário existente e gera um token de acesso.

### 2. Postagens

- `POST /api/posts`: Cria uma nova postagem.
- `GET /api/posts`: Recupera o feed de postagens para o usuário logado.
- `GET /api/posts/:postId`: Recupera detalhes de uma postagem específica.
- `POST /api/posts/:postId/like`: Curte uma postagem.
- `DELETE /api/posts/:postId/like`: Descurte uma postagem.
- `POST /api/posts/:postId/comment`: Comenta em uma postagem.
- `DELETE /api/posts/:postId/comment/:commentId`: Remove um comentário de uma postagem.

## Instalação e Execução

1. Clone o repositório do Mini Instagram: `git clone https://github.com/seu-usuario/mini-instagram.git`
2. Navegue até o diretório do projeto: `cd mini-instagram`
3. Instale as dependências do projeto: `npm install`
4. Configure as variáveis de ambiente no arquivo `.env`.
5. Inicie o servidor: `npm start`
6. Acesse a aplicação em `http://localhost:3000`.

## Tecnologias Utilizadas

- Node.js
- Express.js
- PostgreSQL
- Knex.js
- Deploy

## Autor

Este projeto foi desenvolvido por [Seu Nome] como parte de [descrição do projeto].

