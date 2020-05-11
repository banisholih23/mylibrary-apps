const express = require('express')
const route = express.Router()

// const  { bookUpload }  = require('../helpers/upload')



const book_Controller = require('../controllers/books')
// const {authorization} = require('../middleware/auth')



route
	.get("/", book_Controller.getAllBooks)
	.post("/", book_Controller.addNewBook)
	.patch('/:id', book_Controller.updateBook)
	.delete('/:id', book_Controller.deleteBook)

module.exports = route