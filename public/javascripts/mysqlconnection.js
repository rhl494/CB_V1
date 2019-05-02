var mysql = require('mysql');

function Connection() {
    this.pool = null;

    this.init = function() {
        this.pool = mysql.createPool({
            connectionLimit: 10,
            host: '418mysqlserver.mysql.database.azure.com',
            user: 'myadmin@418mysqlserver',
            password : '418IsHard',
            port: 3306,
            database: 'quizdb',
            dateStrings: 'date'
        });
    };

    this.acquire = function(callback) {
        this.pool.getConnection(function(err, connection) {
            callback(err, connection);
        });
    };
}
module.exports = new Connection();