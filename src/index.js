const express = require('express')
const route = express.Router()

const bookRoutes = require('./routes/books')
//const auth = require('./routes/auth')

route.use('/books', bookRoutes)
//route.use('/books/auth', auth)

module.exports = route