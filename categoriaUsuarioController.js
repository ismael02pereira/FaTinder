const utils = require('../utils')

const mysql = require('../database/mysql').pool

module.exports = {
  async create(req, res) {
    const { id_usuario, id_categoria } = req.body
    console.log(id_usuario, id_categoria)
    mysql.getConnection((err, connection) => {
      if (err) return res.status(500).json({ message: err.message })

      connection.query({
        sql: `INSERT INTO categoria_usuario (id_usuario, id_categoria) VALUES (?, ?)`,
        values: [id_usuario, id_categoria]
      }, (err, result) => {
        connection.release()
        if (err) return res.status(500).json({ message: err.message })
        return res.status(201).json({ message: 'Cadastrado' })
      })
    })
  },

  async find(req, res) {
    const { id } = req.params

    mysql.getConnection((err, connection) => {
      if (err) return res.status(500).json({ message: err.message })

      connection.query({
        sql: `SELECT * FROM view_categoria WHERE id_usuario = ?`,
        values: [id]
      }, (err, results) => {
        connection.release()
        if (err) return res.status(500).json({ message: err.message })

        const response = results.map(result => {
          return {
            id_usuario: result.id_usuario,
            nome: result.nome,
            dataNascimento: result.dataNascimento,
            faculdade: result.faculdade,
            graduacao: result.graduacao,
            cidade: result.cidade,
            whatsapp: result.whatsapp,
            descricao: result.descricao,
            genero: result.genero,
            categoria: {
              id_categoria: result.id_categoria,
              descricao: result.categoria_desc,
            },
            imagem: utils.renderImage({ url: result.url, id: result.id_imagem, id_usuario: result.id_usuario })
          }
        })

        return res.status(200).json(response)
      })
    })
  }
}