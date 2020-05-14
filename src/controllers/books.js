const book = require('../models/books')
const qs = require('querystring')

const getPage = (_page) => {
  const page = parseInt(_page)
  if (_page > 0) {
    return page
  } else {
    return 1
  }
}

const getPerPage = (_perPage) => {
  const perPage = parseInt(_perPage)
  if (perPage && perPage > 0) {
    return perPage
  } else {
    return 5
  }
}

const getNextLinkQueryString = (page, totalPage, currentQuery) => {
  if(page < totalPage) {
    const generatedPage = {
      page: page + 1
    }
    return qs.stringify({...currentQuery, ...generatedPage })
  } else {
    return null
  }
}

const getPrevLinkQueryString = (page, currentQuery) => {
  if (page > 1) {
    const generatedPage = {
      page: page - 1
    }
    return qs.stringify({...currentQuery, ...generatedPage })
  } else {
    return null
  }
}

module.exports = {
  getAllBooks: async (request, response) => {
    const { page, limit, search, sort} = request.query
    const condition = {
      search,
      sort
    }

    const sliceStart = (getPage(page) * getPerPage(limit)) - getPerPage(limit)
    const sliceEnd = (getPage(page) * getPerPage(limit))
    const totalData = await book.countData(sliceStart, sliceEnd, condition)
    const totalPage = Math.ceil(totalData / getPerPage(limit))

    const prevLink = getPrevLinkQueryString(getPage(page), request.query)
    const nextLink = getNextLinkQueryString(getPage(page), totalPage, request.query)
    const userData = await book.getAllBook(sliceStart, sliceEnd)

    const data = {
      success: true,
      msg: 'List all books data',
      data: userData,
      pageInfo: {
        page: getPage(page),
        totalPage,
        perPage: getPerPage(limit),
        totalData,
        nextLink: nextLink && `http://localhost:5000/books?${nextLink}`,
        prevLink: prevLink && `http://localhost:5000/books?${prevLink}`
      }
    }
    response.status(200).send(data)
    // const result = await book.countData(condition)
    // if ( result ) {
    //   const data = {
    //     success: true,
    //     msg: 'buku yang ditemukan',
    //     data: userData.condition
    //   }
    //   response.status(201).send(data)
    // } else {
    //   const data = {
    //     success: false,
    //     msg: 'buku tidak ditemukan',
    //   }
    //   response.status(400).send(data)
    // }
  },
  addNewBook: async (request, response) => {
    const { book_title, book_desc, book_genre, book_author, book_status } = request.body
    console.log(request.file)
    if (book_title && book_desc && book_genre && book_author && book_status && book_title !== '' && book_desc !== '' && book_genre !== '' && book_author !== '' && book_status !== '') {
      // melakukan check apakah ada user dengan email yang sama
      const isExists = await book.getBooksByCondition({ book_title })
      // jika tidak ada user dengan email yang sama
      if (isExists.length < 1) {
        const userData = {
          book_title,
          book_desc,
          book_img: `http://localhost:5000/profile_picture/${request.file.filename}`,
          book_genre,
          book_author,
          book_status,
          created_at: new Date(),
          updated_at: new Date()
        }
        // membuat user menggunakan model create user
        const result = await book.addNewBook(userData)
        userData.id = result.insertId
        if (result) {
          // response success: true
          const data = {
            success: true,
            msg: 'book has been added',
            data: userData
          }
          response.status(201).send(data)
        } else { // jika createUser gagal
          const data = {
            success: false,
            msg: 'failed to add book',
            data: request.body
          }
          response.status(400).send(data)
        }
      } else {
        const data = {
          success: false,
          msg: 'book title has been created'
        }
        response.status(400).send(data)
      }
    } else {
      const data = {
        success: false,
        msg: 'All from must be filled'
      }
      response.status(400).send(data)
    }
  },
  updateBook: async (request, response) => {
    const { id } = request.params
    const { book_title, book_desc, book_img, book_genre, book_author, book_status, date } = request.body
    const fetchBook = await book.getBooksByCondition({ id: parseInt(id) })
    if (fetchBook.length > 0) {
      if (id && book_title && book_desc && book_img && book_genre && book_author && book_status && date && id !== '' && book_title !== '' && book_desc !== '' && book_img !== '' && book_genre !== '' && book_author !== '' && book_status !== '' && date !== '') {
        const bookData = [
          { book_title, book_desc, book_img, book_genre, book_author, book_status, date },
          { id: parseInt(id) }
        ]
        const result = await book.updateBook(bookData)
        if (result) {
          console.log(result)
          const data = {
            success: true,
            msg: `Book with id ${id} has been updated`,
            data: bookData[0]
          }
          response.status(200).send(data)
        } else {
          const data = {
            success: false,
            msg: 'failed to update'
          }
          response.status(400).send(data)
        }
      }
    } else {
      const data = {
        success: false,
        msg: `Book with id ${request.params.id} not found!`
      }
      response.status(400).send(data)
    }
  },
  deleteBook: async (request, response) => {
    const { id } = request.params
    const _id = { id: parseInt(id) }
    const isExsist = await book.getBooksByCondition(_id)
    if (isExsist.length > 0) {
      const result = await book.deleteBook(_id)
      if (result) {
        const data = {
          success: true,
          msg: `Book with id ${id} has been deleted`
        }
        response.status(200).send(data)
      } else {
        const data = {
          success: false,
          msg: 'failed to delete'
        }
        response.status(400).send(data)
      }
    } else {
      const data = {
        success: false,
        msg: `Cannot delete, Book not found`
      }
      response.status(400).send(data)
    }
  },
}
