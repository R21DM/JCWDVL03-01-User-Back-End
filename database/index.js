const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "test",
  password: "test",
  database: "db_pharmacy",
});

module.exports = connection;
