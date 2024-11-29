const mysql = require("mysql2/promise");

const connection = mysql.createPool({
  host: "65.109.94.168",
  user: "daman2",
  password: "daman2",
  database: "daman2",
});

export default connection;
