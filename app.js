require('dotenv/config')
const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')
const middlewaresError = require('./middlewares/error')
const routes = require('./routes')
const path = require('path')
const cors = require('cors')

app.use(cors())
app.use(morgan('dev')) // Monitora as requisições http
app.use(bodyParser.urlencoded({ extended: true })) // apenas dados simples
app.use(bodyParser.json())

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*') // configurando cors
  res.header('Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization')

  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
    return res.status(200).send({})
  }

  next()
})

app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')))
app.use(routes)
middlewaresError(app)

module.exports = app