var mysql = require('mysql');

var con = mysql.createConnection({
  host: "418mysqlserver.mysql.database.azure.com",
  user: "myadmin@418mysqlserver",
  password: "418IsHard",
  database: "418database"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "CREATE TABLE adminlogin (userid INT(11), username VARCHAR(255), password VARCHAR(255))";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Table created");
    });
  });

