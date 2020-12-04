const { Router } = require('express')
const routes = Router()

const matchController = require('../controllers/MatchController')

routes.post('/', matchController.create)
routes.get('/:id', matchController.findUsuario)
routes.delete('/:id', matchController.delete)

module.exports = routes