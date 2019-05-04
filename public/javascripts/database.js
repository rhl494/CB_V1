var connection = require('./mysqlconnection');

function User() {
    /*  function that gets data from database table user*/
    this.get = function (res) {
        connection.acquire(function (err, con) {
            con.query('SELECT mail, name FROM user', function (err, result) {
                con.release();
                res.send(result);
            });
        });    
    };

    /* Insert user data into mySQL database */
    this.getUsers = function (req, res) {
        connection.acquire(function (err, con) {
            con.query('SELECT * FROM user', function (err, rows) {
                con.release();
                if(err) {
                    console.log(err);
                } else {
                    obj = JSON.parse(JSON.stringify(rows));
                }
            });
        });
    };

    // Creating a user function
    this.createUser = function (user) {
        console.log(user);
        connection.acquire(function (err, con) {
            con.query("INSERT INTO user SET ?", user, function (err) {
                con.release();
                if(err) {
                    console.log(err);
                } else {
                    console.log('User created successfully');
                }
            });
        });
    };

    // Deleting a user function
    this.deleteUser = function (user) {
        console.log(user);
        connection.acquire(function (err, con) {
            con.query("DELETE FROM user WHERE main = ?", user, function (err) {
                con.release();
                if(err) {
                    console.log(err);
                } else {
                    console.log('User deleted successfully');
                }
            });
        });
    };

     //Create question function
    this.createQuestion = function (question) {
        console.log(question);
        connection.acquire(function (err, con) {
            con.query("INSERT INTO question SET ?", question, function (err) {
                con.release();
                if(err) {
                    console.log(err);
                } else {
                    console.log('Question created successfully');
                }
            });
        });
    };

    

    //Create answer function
    this.createAnswer = function (answer) {
        console.log(answer);
        connection.acquire(function (err, con) {
            con.query("INSERT INTO answers SET ?", answer, function (err) {
                con.release();
                if(err) {
                    console.log(err);
                } else {
                    console.log('Answer created successfully');
                }
            });
        });
    };

    //Create quiz function, and returning the ID from the last created quiz
    this.createQuiz = function (quiz) {
        console.log(quiz);
        connection.acquire(function (err, con) {
            con.query("INSERT INTO quiz SET ?", quiz, function (err) {
                con.release();
                if(err) {
                    console.log(err);
                } else {
                    con.query("SELECT LAST_INSERT_ID();", function (err, result) {
                });
                }
            });
        });
    };

    // Deleting a user function
    this.deleteQuiz = function (user) {
        console.log(user);
        connection.acquire(function (err, con) {
            con.query("DELETE FROM quiz WHERE quizId = ?", user, function (err) {
                con.release();
                if(err) {
                    console.log(err);
                } else {
                    console.log('Quiz deleted successfully');
                }
            });
        });
    };

}


module.exports = new User();