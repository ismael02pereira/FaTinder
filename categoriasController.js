const mysql = require('../database/mysql').pool

module.exports = {
  async create(req, res) {
    const { descricao } = req.body

    mysql.getConnection((err, connection) => {
      if (err) return res.status(500).json({ message: err.message })

      connection.query({
        sql: `INSERT INTO categoria (descricao) VALUES (?)`,
        values: [descricao]
      }, (err, results) => {
        connection.release()
        if (err) return res.status(500).json({ message: err.message })

        return res.status(201).json({message: 'Cadsatrado'})
      })
    })
  },

  async findAll(req, res) {
    mysql.getConnection((err, connection) => {
      if (err) return res.status(500).json({ message: err.message })

      connection.query({
        sql: `SELECT * FROM categoria`
      }, (err, results) => {
        connection.release()
        if (err) return res.status(500).json({ message: err.message})
        return res.status(200).json(results)
      })
    })
  },

  async update(req, res) {
    const {id, descricao} = req.body

    mysql.getConnection((err, connection) => {
      if (err) return res.status(500).json({ message: err.message })

      connection.query({
        sql: `UPDATE categoria SET descricao = ? WHERE id = ?`,
        values: [descricao, id]
      })
    })
  }
}