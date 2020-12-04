CREATE DATABASE fa;
USE fa;

CREATE TABLE usuario(
	id int not null auto_increment,
    nome varchar(150),
    email varchar(150) unique,
    senha varchar(32),
    dataNascimento varchar(20),
    graduacao varchar(100),
    faculdade varchar(100),
    cidade varchar(150),
    whatsapp varchar(32),
    
    constraint pk_usuario primary key (id)
);

CREATE TABLE imagem(
	id int not null auto_increment,
    id_usuario int,
    url varchar(500),
    
	constraint pk_usuario_imagem primary key (id),
    constraint fk_usuario_imagem foreign key (id_usuario) references usuario(id)
);

CREATE TABLE usuario_match(
	id int not null auto_increment,
    id_usuario int,
    id_match int,
    
    constraint pk_usuario_match primary key (id),
    constraint fk_usuario_id foreign key (id_usuario) references usuario(id),
    constraint fk_usuario_id_match foreign key (id_match) references usuario(id)
);

CREATE TABLE categoria(
	id int not null auto_increment,
    descricao varchar(500),
    
     constraint pk_categoria primary key (id)
);

CREATE TABLE categoria_usuario(
	id int not null auto_increment,
    id_usuario int,
    id_categoria int,
    
    constraint pk_categoria_usuario primary key (id),
    constraint fk_categoria_id_usuario foreign key (id_usuario) references usuario(id),
    constraint fk_categoria_usuario_id foreign key (id_categoria) references categoria(id)
);

ALTER TABLE usuario add descricao VARCHAR(500);
ALTER TABLE usuario add genero VARCHAR(50);

select * from view_usuario_login;
CREATE VIEW view_usuario_login as 
SELECT * FROM usuario;

select * from view_usuario_imagem;
CREATE VIEW view_usuario_imagem as 
SELECT usuario.id, usuario.nome, usuario.email, usuario.senha, usuario.datanascimento, usuario.graduacao, 
	usuario.faculdade, usuario.whatsapp, usuario.cidade, usuario.descricao, usuario.genero, imagem.id as 'id_imagem', imagem.id_usuario, imagem.url FROM usuario 
INNER JOIN imagem on imagem.id_usuario = usuario.id;

select * from view_usuario_match;
CREATE VIEW view_usuario_match as 
SELECT usuario.id, usuario.nome, usuario.email, usuario.datanascimento, usuario.graduacao, usuario.descricao, usuario.genero,
	usuario.faculdade, usuario.whatsapp, usuario.cidade, usuario_match.id_match, usuario_match.id_usuario, usuario_match.id as 'match',
    imagem.id as 'id_imagem', imagem.url FROM usuario
INNER JOIN usuario_match on usuario_match.id_match = usuario.id
LEFT JOIN imagem on imagem.id_usuario = usuario.id;
 
select * from view_categoria;
CREATE VIEW view_categoria as
SELECT
usuario.id as 'id_usuario', usuario.nome, usuario.email, usuario.dataNascimento, usuario.graduacao, usuario.faculdade, usuario.cidade, usuario.whatsapp,
 usuario.descricao, usuario.genero, categoria_usuario.id as 'categoria_usuario_id', categoria_usuario.id_categoria, categoria.descricao as categoria_desc,
  imagem.url, imagem.id as 'id_imagem'
FROM usuario
INNER JOIN categoria_usuario ON categoria_usuario.id_usuario = usuario.id
INNER JOIN categoria ON categoria.id = categoria_usuario.id_categoria
LEFT JOIN imagem on imagem.id_usuario = usuario.id;

INSERT INTO categoria (descricao) VALUE ('CERVEJA'),('FESTA'),('DANÇA'),('FOTOGRAFIA'),('MUSICA'),
										('CARROS'),('DESIGNER'),('ARTE'),('LGBTQ+'),
                                        ('OTAKU'),('ANIME'),('CINEMA'),('LIVROS'),('ESPORTE');
