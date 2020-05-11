const db = require('../config/index')

module.exports = {
  getAllBook: (start, end) => {
    const sql = `SELECT * FROM lis_book LIMIT ${end} OFFSET ${start}`
    return new Promise((resolve, reject) => {
      db.query(sql, (error, results) => {
        if (error) {
          reject(Error(error))
        }
        resolve(results)
      })
    })
  },
  // addNewBook: (data) => {
  //   return new Promise((resolve, reject) => {
  //       connection.query('INSERT INTO lis_book SET ?', data, (error, result) => {
  //     // connection.query('INSERT INTO products SET ?', data)
  //     // connection.query('SELECT products.id, products.name, products.description, products.image, products.price, products.stock, category.name FROM products LEFT JOIN category ON products.id_category = category.id', (error, result) => {
  //       if (error) reject(new Error(error))
  //         resolve(result)
  //     })
  //   })
  // },
  addNewBook: (data) => {
    const sql = 'INSERT INTO lis_book SET ?'
    return new Promise((resolve, reject) => {
      db.query(sql, data, (error, results) => {
        if (error) {
          reject(Error(error))
        }
        console.log(results)
        resolve(results.insertId)
      })
    })
  },
  getBooksByCondition: (data) => {
    const sql = 'SELECT * FROM lis_book WHERE ?'
    return new Promise((resolve, reject) => {
      db.query(sql, data, (error, results) => {
        if (error) {
          reject(Error(error))
        }
        resolve(results)
      })
    })
  },
  updateBook: (data) => {
    const sql = 'UPDATE lis_book SET ? WHERE ?'
    return new Promise((resolve, reject) => {
      db.query(sql, data, (error, result) => {
        if (error) {
          reject(Error(error))
        }
        resolve(result.affectedRows)
      })
    })
  },
  deleteBook: (data) => {
    const sql = 'DELETE FROM lis_book WHERE ?'
    return new Promise((resolve, reject) => {
      db.query(sql, data, (error, result) => {
        if (error) {
          reject(Error(error))
        }
        resolve(result.affectedRows)
      })
    })
  }
}