const { Router } = require('express')
const routes = Router()
const multer = require('multer')
const uploadConfig = require('../config/upload')

const upload = multer(uploadConfig)

const usuarioController = require('../controllers/usuarioController')


routes.post('/login', usuarioController.login)
routes.get('/pessoas', usuarioController.findAll)
routes.get('/:id', usuarioController.findOne)
routes.get('/pessoas/:busca', usuarioController.findPessoa)
routes.post('/', upload.array('imagens'), usuarioController.create)
routes.put('/', usuarioController.update)

module.exports = routes