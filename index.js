const { APP_PORT } = process.env
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
// const mysql = require('mysql'); //

const route = require('./src/index')

var corsOption = {
  origin: 'http://localhost:5000/books',
  optionSuccessStatus: 200
}

const server = app.listen(5000, "localhost", () => {
  const host = server.address().address
  const port = server.address().port
  

  console.log("You' are connected at " + host + ":" + port);

})

// const conn = mysql.createConnection({ //
//   host: 'localhost',
//   user: 'root',
//   password: '',
//   database: 'banslibrary-rest-api'
// });
 
//connect to database
// conn.connect((err) =>{ //
//   if(err) throw err;
//   console.log('Mysql Connected...');
// });

// app.get('/',(req, res) => { //
//   let sql = "SELECT * FROM lis_book";
//   let query = conn.query(sql, (err, results) => {
//     if(err) throw err;
//     res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
//   });
// });

// app.listen(APP_PORT, () => {
//   console.log(`Express app is running on port ${APP_PORT}`)
// })

app.use(cors('*'))
app.options(cors(corsOption))

app.use(bodyParser.urlencoded( {
  extended: true
}))

app.use('/', cors(), route)