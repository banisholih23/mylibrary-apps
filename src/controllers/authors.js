const configureAuthor = require('../models/authors')
const helper = require('../helpers/index')

module.exports = {
  getAuthors: async function (request, response) {
    try {
        const result = await configureAuthor.getAuthor()

        return helper.response(response, 200, result)
    } catch (error) {
        return helper.response(response, 500, error)

    }
  },
  postAuthors: async function (request, response) {

    try {

        const setData = request.body
        console.log(setData)
        const result = await configureAuthor.postAuthor(setData)

        return helper.response(response, 200, result)
    } catch (error) {
        return helper.response(response, 500, error)
    }
  },
  putAuthor: async function (request, response) {

    try {
        const setData = request.body
        const id = request.params.id
        console.log(setData)
        const result = await configureAuthor.putAuthor(setData, id)

        return helper.response(response, 200, result)
    } catch (error) {
        return helper.response(response, 500, error)
    }
  },
  deleteAuthor: async function (request, response) {
    try {
        const id = request.params.id
        const result = await configureAuthor.deleteAuthor(id)

        return helper.response(response, 200, result)
    } catch (error) {
        return helper.response(response, 500, error)
    }
  }
}