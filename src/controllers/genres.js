const modelGenre = require('../models/genres')

const helper = require('../helpers/index')

module.exports = {
  getGenres: async (requset, response) => {
    try {
      const result = await modelGenre.getGenre()
      return helper.response(response, 200, result)
    } catch (error) {
      return helper.response(response, 500, error)
    }
  },
  
  postGenres: async (request, response) => {
    try {
      const data = request.body
      const result = await modelGenre.postGenre(data)

      return helper.response(response, 200, result)
    } catch (error) {
      return helper.response(response, 500, error)
    }
  },
  putGenres: async (request, response) => {
    try {
      const data = request.body
      const id = request.params.id
      const result = await modelGenre.putGenre(data, id)

      return helper.response(response, 200, result)
    } catch (error) {
      return helper.response(response, 500, error)
    }
  },
  deleteGenres: async (request, response) => {
    try {
      const id = request.params.id
      const result = await modelGenre.deleteGenre(d)

      return helper.response(response, 200, result)
    } catch (error) {
      return helper.response(response, 500, error)
    }
  }
}