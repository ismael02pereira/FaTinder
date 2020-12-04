const mysql = require('../database/mysql').pool
const utils = require('../utils')

module.exports = {
  async update(req, res) {
    const { id_usuario } = req.body
    const reqImages = req.files

    mysql.getConnection((err, connection) => {
      if (err) return res.status(500).send({ message: err.message })
      connection.query({
        sql: `UPDATE imagem SET url = ? WHERE id_usuario = ?`,
        values: [reqImages[0].filename, id_usuario]
      }, (err, result) => {
        connection.release()
        if (err) return res.status(500).send({ message: err.message })
        return res.status(200).json({ message: 'Imagem alterada' })
      })
    })
  },

  async findAll(req, res) {
    mysql.getConnection((err, connection) => {
      if (err) return res.status(500).send({ message: err.message })
      connection.query({
        sql: `SELECT * FROM imagem`
      }, (err, result) => {
        connection.release()
        if (err) return res.status(500).send({ message: err.message })

        const response = result.map(row => {
          return {
            imagem: utils.renderImage({ id: row.id, url: row.url, id_usuario: row.id_usuario })
          }
        })
        return res.status(200).json(response)
      })
    })
  },

  async delete(req, res) {
    const { id } = req.params

    mysql.getConnection((err, connection) => {
      if (err) return res.status(500).send({ message: err.message })

      connection.query({
        sql: `DELETE FROM imagem WHERE id = ?`,
        values: [id]
      }, (err, result) => {
        connection.release()
        if (err) return res.status(500).send({ message: err.message })
        return res.status(200).json({ message: 'Imagem apagada' })
      })
    })
  }
}