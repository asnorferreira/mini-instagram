# mini-instagram

## O que o usuário pode fazer

- Fazer login
- Fazer cadastro
- Ver os dados do seu perfil
- Editar os dados do seu perfil
- Ver postagens de outras pessoas
- Curtir postagens de outras pessoas
- Ver quantidade de curtidas numa postagem
- Ver os comentários em uma postagem
- Comentar em postagens
- Curtir uma postagem

## O que não será possível fazer

- Ver localização de uma postagem
- Ver pessoas que curtiram uma postagem
- Curtir um comentário
- Comentar em outros comentários


## Endpoints

### POST - Login

#### Dados enviados
- username
- senha

#### Dados retornados
- sucesso / error
- token

#### Objetivos gerais
- Validar username e senha
- Buscar o usuario no banco de dados
- Verificar se a senha informada está correta
- Gerar token de acesso
- Retornar dados do usuario e o token

---

### POST - Cadastro

#### Dados enviados
- username
- senha

#### Dados retornados
- sucesso / error

#### Objetivos gerais
- Validar username e senha
- Validar se o username já existe no banco de dados
- Criptografar a senha
- Cadastrar usuario no banco de dados
- Retornar sucesso ou error

---

### GET - Perfil 

#### Dados enviados
- token (terá id ou username)

#### Dados retornados
> Objeto de profile
- URL da foto
- Nome
- Username
- Site
- Bio
> Objeto de Private Information
- Email
- Telefone
- Genero

#### Objetivos gerais
- Validar token do usuario 
- Buscar o cadastro do usuario com a informação do token
- Retornar os dados do usuario

---

### PUT - Perfil

#### Dados enviados
- token (terá id ou username)
> Objeto de profile
- URL da foto?
- Nome?
- Username?
- Site?
- Bio?
> Objeto de Private Information
- Email?
- Telefone?
- Genero?
- Senha

#### Dados retornados
- sucesso / error


#### Objetivos gerais
- Validar token do usuario 
- Buscar o cadastro do usuario com a informação do token
- Exigir no mínimo um campo para atualizar
- Criptografar nova senha informada
- Verificar se o email e username são existentes no banco de dados informado
- Atualizar registro do usuario no banco de dados
- Retornar sucesso ou error

---

### GET - Postagens

#### Dados enviados
- token (terá id ou username)
- offset

#### Dados retornados
- Postagens []
    - id
    - curtido por mim
    - Usuario
        - URL da foto
        - username
        - é perfil Oficial?
    - Fotos []
    - Quantidade de curtida
    - Comentários []
        - username
        - texto
    - Data

#### Objetivos gerais
- Validar token do usuario 
- Buscar o cadastro do usuario com a informação do token
- Retornar os dados da postagem

---

### POST - Postagens

#### Dados enviados
- token (terá id ou username)
- texto
- array com fotos

#### Dados retornados
- sucesso / error

#### Objetivos gerais
- Validar token do usuario 
- Buscar o cadastro do usuario com a informação do token
- Exigir no mínimo uma foto no array
- Cadastrar postagem para o usuario logado
- Cadastro das fotos da postagem


---

### POST - Curtir

#### Dados enviados
- token (terá id ou username)
- id da postagem

#### Dados retornados
- sucesso / error

#### Objetivos gerais
- Validar token do usuario 
- Buscar o cadastro do usuario com a informação do token
- Buscar o cadastro da postagem com o id informado
- Verificar se o usuario já curtiu a postagem
- Cadastrar curtida da postagem no banco de dados
- Retornar sucesso ou error

---

### POST - Comentar

#### Dados enviados
- token (terá id ou username)
- id da postagem
- texto

#### Dados retornados
- sucesso / error

#### Objetivos gerais
- Validar token do usuario 
- Buscar o cadastro do usuario com a informação do token
- Validar texto informado
- Buscar o cadastro da postagem com o id informado
- Cadastrar comentário da postagem no banco de dados
- Retornar sucesso ou error


---

## Validando endpoints

- [ ] POST login
- [ ] POST cadastro
- [ ] GET perfil
- [ ] PUT perfil
- [ ] GET postagem
- [ ] POST postagem
- [ ] POST curtir
- [ ] POST comentar