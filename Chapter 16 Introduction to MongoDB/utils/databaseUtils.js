const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "GR@7796811",
  database: "airbnb",
});

module.exports = pool.promise();
