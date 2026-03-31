const mysql = require("mysql2/promise")

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Passlol*123",
  database: "clickup"
})

module.exports = db