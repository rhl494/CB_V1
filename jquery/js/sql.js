var mysql = require('mysql');

var con = mysql.createConnection({
  host: "418mysqlserver.mysql.database.azure.com",
  user: "myadmin@418mysqlserver",
  password: "418IsHard"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});