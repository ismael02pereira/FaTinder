const { Router } = require('express')
const routes = Router()

const categoriasController = require('../controllers/categoriasController')

routes.post('/', categoriasController.create)
routes.get('/', categoriasController.findAll)
routes.put('/', categoriasController.update)

module.exports = routes