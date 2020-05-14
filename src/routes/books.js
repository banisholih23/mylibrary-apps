const express = require('express')
const route = express.Router()
const upload = require('../config/multer')
const book_Controller = require('../controllers/books')

route
	.get("/", book_Controller.getAllBooks)
	//.post("/", book_Controller.addNewBook)
	.post("/", upload.single('book_img'), book_Controller.addNewBook)
	.patch('/:id', book_Controller.updateBook)
	.delete('/:id', book_Controller.deleteBook)

module.exports = route