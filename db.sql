create database mini_instagram;

create table usuarios(
	id serial primary key,
  username varchar(80) not null unique,
  email varchar(150) not null unique,
  senha varchar(100) not null,
  imagem text,
  nome varchar(100),
  site varchar(255),
  bio text,
  telefone varchar(25),
  genero varchar(25),
  verificado boolean default false
);

create table postagens(
	id serial primary key,
  usuario_id int not null references usuarios(id),
  texto text,
  data timestamptz default now(),
  curtida int default 0
);

create table postagem_fotos(
	id serial primary key,
  postagem_id int not null references postagens(id),
  imagem text not null
);

create table postagem_comentarios(
	id serial primary key,
  usuario_id int not null references usuarios(id),
  postagem_id int not null references postagens(id),
  texto text,
  data timestamptz default now()
);

create table postagem_curtidas(
	id serial primary key,
	usuario_id int not null unique references usuarios(id),
  postagem_id int not null unique references postagens(id), 
  data timestamptz default now()
);

