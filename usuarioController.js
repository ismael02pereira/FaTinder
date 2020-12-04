const mysql = require('../database/mysql').pool
const utils = require('../utils')

module.exports = {
  async login(req, res) {
    const { usuario, senha } = req.headers
    console.log('login ', usuario, senha)
    mysql.getConnection((err, connection) => {
      if (err) return res.status(500).send({ message: err.message })

      connection.query({
        sql: `select * from view_usuario_login where email like ? and senha like ?`,
        values: [`%${usuario}%`, `%${senha}%`]
      }, (err, result) => {
        connection.release()
        if (err) return res.status(401).send({ message: 'Falha na autenticação' })

        return res.status(200).send(result)
      })
    })
  },

  async create(req, res) {
    const { nome, email, senha, dataNascimento, cidade, graduacao, faculdade, whatsapp, descricao, genero } = req.body
    const reqImages = req.files

    mysql.getConnection((err, connection) => {
      if (err) return res.status(500).send({ message: err.message })

      connection.query({
        sql: `insert into usuario(nome, email, senha, dataNascimento, cidade, graduacao, faculdade, whatsapp, descricao, genero)
          values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        values: [nome, email, senha, dataNascimento, cidade, graduacao, faculdade, whatsapp, descricao, genero]
      }, (err, result) => {
        if (err) return res.status(500).send({ message: err.message })
        connection.query({
          sql: `insert into imagem(id_usuario, url) values(?,?)`,
          values: [result.insertId, reqImages[0].filename]
        }, (err, result) => {
          connection.release()
          if (err) return res.status(500).send({ message: err.message })
          return res.status(201).json({ message: 'Cadastrado' })
        })
      })
    })
  },

  async findOne(req, res) {
    const { id } = req.params

    mysql.getConnection((err, connection) => {
      if (err) return res.status(500).send({ message: err.message })

      connection.query({
        sql: `SELECT * FROM view_usuario_imagem where id = ?`,
        values: [id]
      }, (err, result) => {
        connection.release()
        if (err) return res.status(500).send({ message: err.message })

        const usuario = result.map(usuario => {
          return {
            id: usuario.id,
            nome: usuario.nome,
            email: usuario.email,
            senha: usuario.senha,
            dataNascimento: usuario.datanascimento,
            cidade: usuario.cidade,
            graduacao: usuario.graduacao,
            faculdade: usuario.faculdade,
            whatsapp: usuario.whatsapp,
            descricao: usuario.descricao,
            genero: usuario.genero,
            imagem: utils.renderImage({ url: usuario.url, id: usuario.id_imagem, id_usuario: usuario.id })
          }
        })

        return res.status(200).json(usuario)
      })
    })
  },

  async update(req, res) {
    const { nome, email, senha, dataNascimento, cidade, graduacao, faculdade, whatsapp, id, descricao, genero } = req.body

    mysql.getConnection((err, connection) => {
      if (err) return res.status(500).send({ message: err.message })

      connection.query({
        sql: `UPDATE usuario SET nome = ?, email = ?, senha = ?, dataNascimento = ?, cidade = ?, graduacao = ?, 
        faculdade = ?, whatsapp = ?, descricao = ?, genero = ? WHERE id = ?`,
        values: [nome, email, senha, dataNascimento, cidade, graduacao, faculdade, whatsapp, descricao, genero, id]
      }, (err, result) => {
        connection.release()
        if (err) return res.status(500).send({ message: err.message })

        return res.status(200).json({ message: 'Alterado' })
      })
    })
  },

  async findAll(req, res) {
    mysql.getConnection((err, connection) => {
      if (err) return res.status(500).send({ message: err.message })

      connection.query({
        sql: `SELECT * FROM view_usuario_imagem `,
      }, (err, result) => {
        connection.release()
        if (err) return res.status(500).send({ messages: err.message })

        const usuario = result.map(usuario => {
          return {
            id: usuario.id,
            nome: usuario.nome,
            email: usuario.email,
            senha: usuario.senha,
            dataNascimento: usuario.dataNascimento,
            cidade: usuario.cidade,
            graduacao: usuario.graduacao,
            faculdade: usuario.faculdade,
            whatsapp: usuario.whatsapp,
            descricao: usuario.descricao,
            genero: usuario.genero,
            imagem: utils.renderImage({ url: usuario.url, id: usuario.id_imagem, id_usuario: usuario.id })
          }
        })

        return res.status(200).json(usuario)
      })
    })
  },

  async findPessoa(req, res) {
    const { busca } = req.params

    mysql.getConnection((err, connection) => {
      if (err) return res.status(500).send({ message: err.message })

      connection.query({
        sql: `SELECT * FROM view_usuario_imagem where nome like ? OR cidade like ? `,
        values: [`%${busca}%`, `%${busca}%`]
      }, (err, result) => {
        connection.release()
        if (err) return res.status(500).send({ messages: err.message })

        const usuario = result.map(usuario => {
          return {
            id: usuario.id,
            nome: usuario.nome,
            email: usuario.email,
            senha: usuario.senha,
            dataNascimento: usuario.dataNascimento,
            cidade: usuario.cidade,
            graduacao: usuario.graduacao,
            faculdade: usuario.faculdade,
            whatsapp: usuario.whatsapp,
            descricao: usuario.descricao,
            genero: usuario.genero,
            imagem: utils.renderImage({ url: usuario.url, id: usuario.id_imagem, id_usuario: usuario.id })
          }
        })

        return res.status(200).json(usuario)
      })
    })
  },
}