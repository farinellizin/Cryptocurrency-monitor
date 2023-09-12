const mysql = require("mysql2");

// Estabelecendo conexão
const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "cryptoMonitor",
});

// Realizando conexã
conn.connect((err) => {
  if (err) {
    console.log(err);
  }

  console.log("Database connected.");
});

exports.databaseConnection = conn;
