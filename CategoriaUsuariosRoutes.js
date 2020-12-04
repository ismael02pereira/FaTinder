const { Router } = require('express')
const routes = Router()

const categoriasController = require('../controllers/categoriaUsuarioController')

routes.post('/', categoriasController.create)
routes.get('/:id', categoriasController.find)

module.exports = routes
