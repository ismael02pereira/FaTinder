const mysql = require('../database/mysql').pool
const utils = require('../utils')

module.exports = {
  async findUsuario(req, res) {
    const { id } = req.params

    mysql.getConnection((err, connection) => {
      if (err) return res.status(500).send({ message: err.message })

      connection.query({
        sql: `SELECT * FROM fa.view_usuario_match WHERE ID_USUARIO = ?`,
        values: [id]
      }, (err, result) => {
        connection.release()
        
        if (err) return res.status(500).send({ message: err.message })

        const response = result.map(match => {
          return {
            id: match.id_match,
            nome: match.nome,
            email: match.email,
            senha: match.senha,
            dataNascimento: match.dataNascimento,
            cidade: match.cidade,
            graduacao: match.graduacao,
            faculdade: match.faculdade,
            whatsapp: match.whatsapp,
            descricao: match.descricao,
            genero: match.genero,
            match: match.match,
            imagem: utils.renderImage({ url: match.url, id: match.id_imagem, id_usuario: match.id })
          }
        })

        return res.status(200).json(response)
      })
    })
  },

  async create(req, res) {
    const { id_usuario, id_match } = req.body

    mysql.getConnection((err, connection) => {
      if (err) return res.status(500).send({ message: err.message })

      connection.query({
        sql: `INSERT INTO usuario_match (id_usuario, id_match) VALUES (?, ?)`,
        values: [id_usuario, id_match]
      }, (err, result) => {
        connection.release()
        if (err) return res.status(500).send({ message: err.message })

        return res.status(201).json({ message: 'Match' })
      })
    })
  },

  async delete(req, res) {
    const { id } = req.params

    mysql.getConnection((err, connection) => {
      if (err) return res.status(500).send({ message: err.message })

      connection.query({
        sql: `DELETE FROM usuario_match WHERE id = ?`,
        values: [id]
      }, (err, result) => {
        connection.release()
        if (err) return res.status(500).send({ message: err.message })
        return res.status(200).json({ message: 'Apagado'})
      })
    })
  }
}