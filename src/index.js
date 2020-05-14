const express = require('express')
const route = express.Router()

const bookRoutes = require('./routes/books')
const authorRoutes = require('./routes/authors')
const genreRoutes = require('./routes/genres')
const statusRoutes = require('./routes/book_status')
const authentications = require('./routes/authentication')

route.use('/books', bookRoutes)
route.use('/books/author', authorRoutes)
route.use('/books/genres', genreRoutes)
route.use('/books/status', statusRoutes)
route.use('/books/auth', authentications)

module.exports = route