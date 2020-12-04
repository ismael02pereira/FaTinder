const { Router } = require('express')
const routes = Router()
const multer = require('multer')
const uploadConfig = require('../config/upload')

const upload = multer(uploadConfig)

const imagensController = require('../controllers/imagemController')

routes.get('/', imagensController.findAll)
routes.put('/', upload.array('imagens'), imagensController.update)
routes.delete('/:id', imagensController.delete)

module.exports = routes