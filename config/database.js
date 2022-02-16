const dotenv = require("dotenv");
dotenv.config({ path: "/QUESTRONIX NODEJS EXAM/config/config.env" });

const mysql = require("mysql");

var mysqlConnection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASS,
  database: process.env.DB,
});

mysqlConnection.connect((err) => {
  if (!err) {
    console.log("Successfully connected to MySQL");
  } else {
    console.log(
      "Connection failed \n Error: " + JSON.stringify(err, undefined, 2)
    );
  }
});

module.exports = mysqlConnection;
