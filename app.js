var express = require('express');
var body = require('body-parser');
var connection = require('./public/javascripts/mysqlconnection');
var databaseFunctions = require('./public/javascripts/database');

// Start express
var app = express();

app.use(body.json()); // Parses html data to JSON
app.use(body.urlencoded({extended: true})); // If data is sent URL encoded, parse to JSON
connection.init();

//Instance variables
var accLevel;
var email;
var quizId;
var currQuizId;
var quesId;
var answers = [];
var no_Ques = 0;
var passwd;
var quizzes;

// Set static folder
app.use(express.static(__dirname + '/public'));

// View engine
app.set('view engine', 'ejs');

// Global variables
app.locals.pageTitle = "Chalkboard";

// Routes
/* Home/Login */
app.get('/', function(req, res) {
    res.render('index', {
        title: 'Home',
        classname: 'home'
    });
});

/* Admin */
app.get('/admin', function(req, res) {
    res.render('admin', {
        title: 'Admin',
        classname: 'admin'
    });
});

/* User */
app.get('/user', function(req, res) {
    connection.acquire(function (err, con) {
        con.query('SELECT name FROM user WHERE mail = ?', email ,function (err, rows) {
            con.release();
            if(err) {
                console.log(err);
            } else {
                user = JSON.parse(JSON.stringify(rows));
                res.render('user', {
                    title: 'User',
                    user: user,
                    classname: 'user'
                });
            }
        });
    });
});

/* Create Quiz */
app.get('/createquiz', function(req, res) {
    res.render('createquiz', {
        title: 'Create Quiz',
        classname: 'createquiz'
    });
});

/* Settings */
app.get('/settings', function(req, res) {
    connection.acquire(function (err, con) {
        con.query('SELECT * FROM user', function (err, rows) {
            if(err) {
                console.log(err);
            } else {
                con.query('SELECT * FROM quiz', function (err, quizzes) {
                    con.release();
                    if(err) {
                        console.log(err);
                    } else {
                        obj = JSON.parse(JSON.stringify(rows));
                        quiz = JSON.parse(JSON.stringify(quizzes));
                        res.render('settings', {
                            obj:obj,
                            quiz:quiz,
                            title: 'Settings',
                            classname: 'settings'
                        });
                    }
                });
            }
        });
    });
});

/* Take Quiz */
app.get('/takequiz', function(req, res) {
    connection.acquire(function (err, con) {
        con.query('SELECT * FROM quiz', function (err, rows) {
            con.release();
            if(err) {
                console.log(err);
            } else {
                loadquizzes = JSON.parse(JSON.stringify(rows));
                res.render('takeQuiz', {
                    loadquizzes:loadquizzes,
                    title: 'takequiz',
                    classname: 'takequiz'
                });
            }
        });
    });
});

app.get('/takequiz/:id', function(req, res) {
    connection.acquire(function (err, con) {
        var quizId = req.params.id;
        currQuizId = req.params.id;

        con.query('SELECT * FROM quiz WHERE quizId = ?', quizId, function (err, qid) {
            if(err) {
                console.log(err);
            } else {
                con.query('SELECT * FROM question WHERE questionQuizId = ?', quizId, function (err, question) {
                    if (err) {
                        console.log(err);
                    } else {
                        con.query('SELECT * FROM answers WHERE answerQuestionid IN (SELECT questionId FROM question WHERE questionQuizid = ?)', quizId, function (err, answer) {
                            con.release();
                            if (err) {
                                console.log(err);
                            } else {
                                loadQuizzes = JSON.parse(JSON.stringify(qid));
                                quizQuestions = JSON.parse(JSON.stringify(question));
                                answers = JSON.parse(JSON.stringify(answer));
                                res.render('takequizbyid', {
                                    loadQuizzes: loadQuizzes,
                                    quizQuestions: quizQuestions,
                                    answers: answers,
                                    title: 'Take quiz',
                                    classname: 'takequizbyid'
                                });
                            }
                        });
                    }
                });
            }
        });
    });
});



app.post('/takequiz/', function(req, res) {

    var scored = req.body.stored_quizScore;
    var postQuery = {quizTakenMail: email, QuizTakenQid: currQuizId , results: scored, elapTimes: 5};

    connection.acquire(function (err, con) {
        con.query("INSERT INTO quizTaken SET ?", postQuery, function (err, rows) {
            con.release();
            if(err) {
                console.log(err);
            } else {

            }
        });
    });
});

/* Take Quiz */
app.get('/admintakequiz', function(req, res) {
    connection.acquire(function (err, con) {
        con.query('SELECT * FROM quiz', function (err, rows) {
            con.release();
            if(err) {
                console.log(err);
            } else {
                loadquizzes = JSON.parse(JSON.stringify(rows));
                res.render('admintakeQuiz', {
                    loadquizzes:loadquizzes,
                    title: 'admintakequiz',
                    classname: 'admintakequiz'
                });
            }
        });
    });
});

app.get('/admintakequiz/:id', function(req, res) {
    connection.acquire(function (err, con) {
        var adminquizId = req.params.id;
        admincurrQuizId = req.params.id;

        con.query('SELECT * FROM quiz WHERE quizId = ?', adminquizId, function (err, qid) {
            if(err) {
                console.log(err);
            } else {
                con.query('SELECT * FROM question WHERE questionQuizId = ?', adminquizId, function (err, question) {
                    if (err) {
                        console.log(err);
                    } else {
                        con.query('SELECT * FROM answers WHERE answerQuestionid IN (SELECT questionId FROM question WHERE questionQuizid = ?)', adminquizId, function (err, answer) {
                            con.release();
                            if (err) {
                                console.log(err);
                            } else {
                                loadQuizzes = JSON.parse(JSON.stringify(qid));
                                quizQuestions = JSON.parse(JSON.stringify(question));
                                answers = JSON.parse(JSON.stringify(answer));
                                res.render('admintakequizbyid', {
                                    loadQuizzes: loadQuizzes,
                                    quizQuestions: quizQuestions,
                                    answers: answers,
                                    title: 'Take quiz',
                                    classname: 'admintakequizbyid'
                                });
                            }
                        });
                    }
                });
            }
        });
    });
});

app.post('/admintakequiz/', function(req, res) {

    var scored = req.body.stored_quizScore;
    var postQuery = {quizTakenMail: email, QuizTakenQid: admincurrQuizId , results: scored, elapTimes: 5};

    connection.acquire(function (err, con) {
        con.query("INSERT INTO quizTaken SET ?", postQuery, function (err, rows) {
            con.release();
            if(err) {
                console.log(err);
            } else {

            }
        });
    });
});



/* Profile */
app.get('/profile', function(req, res) {
    res.render('profile', {
        title: 'Profile',
        classname: 'profile'
    });
});



/* Create question for quiz page */
app.get('/createquizquestions', function(req, res) {
    res.render('createquizquestions', {
        title: 'createquizquestions',
        classname: 'createquizquestions'
    });
});


/* User Profile */
app.get('/userprofile', function(req, res) {
    res.render('userprofile', {
        title: 'Profile',
        classname: 'userprofile'
    });
});


app.post('/', function (req, res) {
    var login = {
        mail: req.body.mail,
        password: req.body.password
    };
    console.log(login);
    email = login.mail;
    function getUserPassword() {
        connection.acquire(function (err, con) {
            con.query('SELECT password FROM user WHERE mail = ?', email, function (err, res) {
                con.release();
                if (err) {
                    console.log(err);
                } else {
                    obj = JSON.parse(JSON.stringify(res));
                    obj.forEach(function (resPassword) {
                        passwd = resPassword.password;
                    });
                    console.log("Stored Password " + passwd);
                }
            });
            if(passwd !== null || passwd !== "undefined"){
                connection.acquire(function (err, con) {
                    con.query('SELECT accountLevel FROM user WHERE mail = ?', email, function (err, res) {
                        if (err) {
                            console.log(err);
                        } else {
                            obj = JSON.parse(JSON.stringify(res));
                            obj.forEach(function (resAccountLevel) {
                               accLevel = resAccountLevel.accountLevel;
                            });
                            console.log("Account level: " + accLevel);
                        }
                    });
                });
            }
        });
    }

    function checkPassword() {
        if (login.password == passwd) {
            if (accLevel == "Admin") {
                return res.redirect('/admin');
            } else {
                return res.redirect('/user');
            }
        } else {
            console.log("Access Denied");
            return res.redirect(req.get("referer"));
        }
    }
    getUserPassword();
    setTimeout(checkPassword, 500);
});

/*  send the input data from settings --> createUser --> database */
app.post('/settings', function(req, res) {
    var user = {
        mail: req.body.mail,
        name: req.body.name,
        password: req.body.password,
        accountLevel: req.body.accountLevel
    };
    databaseFunctions.createUser(user);
    res.redirect(req.get('referer'));
});



/* Results */
app.get('/results', function(req, res) {
    connection.acquire(function (err, con) {
        con.query('SELECT * FROM quiztaken', function (err, rows) {
            con.release();
            if(err) {
                console.log(err);
            } else {
                loadResults = JSON.parse(JSON.stringify(rows));
                res.render('results', {
                    loadResults:loadResults,
                    title: 'Results',
                    classname: 'results'
                });
            }
        });
    });
});


app.get('/userresults', function(req, res) {
    connection.acquire(function (err, con) {
        con.query('SELECT * FROM quiztaken', function (err, rows) {
            con.release();
            if(err) {
                console.log(err);
            } else {
                loadResults = JSON.parse(JSON.stringify(rows));
                res.render('userresults', {
                    loadResults:loadResults,
                    title: 'Results',
                    classname: 'userresults'
                });
            }
        });
    });
});

app.post('/del/:id', function(req, res) {
    
    var data = { quizId: req.params.id }
    quizzes = data.quizId;
    connection.acquire(function (err, con) {
        con.query('DELETE FROM quizdb.quiz WHERE quizId = ?', quizzes, function (err, rows) {
            con.release();
            if(err) {
                console.log(err);
            } else {
                console.log("Deleted!");
                res.redirect('/settings');
                }
        });
    });
});

app.post('/delete/:mail', function(req, res) {

    var user = { mail: req.params.mail }
    email = user.mail;
    connection.acquire(function (err, con) {
        con.query('DELETE FROM quizdb.user WHERE mail = ?', email, function (err, rows) {
            con.release();
            if(err) {
                console.log(err);
            } else {
                console.log("Deleted!");
                res.redirect('/settings');
                }
        });
    });
});

/* Logout */
app.get('/logout', function(req, res) {
    email = null;
    res.render('index', {
        title: 'Home',
        classname: 'home'
    });
});

//Taking in form for creating a question and connected answers.
app.post('/createquizquestions', function (req, res) {
    //Checking what button were pressed.
    if(req.body.hasOwnProperty("button1")){
        no_Ques ++;
        console.log("Quiz number added");
    } else {
        no_Ques = 0;
        console.log("Quiz number NOT added");
    }
    function createQuestion() {
        // Collection data from question form and creating an array.
        var question = {
            question: req.body.question,
            questionQuizid: quizId
        };
        // Sending the question array to function for creating a query and sending to database
        databaseFunctions.createQuestion(question);
    };
    function getQuestionId() {
            connection.acquire(function (err, con) {
            con.query('SELECT questionId FROM question ORDER BY questionId DESC LIMIT 1', function (err, questionIdRes) {
                con.release();
                if (err) {
                    console.log(err)
                } else {
                    obj = JSON.parse(JSON.stringify(questionIdRes));
                    obj.forEach(function (id) {
                        quesId = id.questionId;
                        console.log("Stored questionId: " + quesId);
                    });
                }
            });
        });
    };
    function createAnswrs() {
        // Collection answers and if they are correct or not and save to an array.
        var store_answers = req.body.answer;
        var store_correct = req.body.correct;

        //Looping trough answers and creating an object for each.
        for (var o = 0; o < store_answers.length; o++) {
            var answer = {
                answer: store_answers[o],
                correct: store_correct[o],
                answerQuestionid: quesId
            };
            answers.push(answer); //Pushing answer objects to answers array.
        }
        //Looping trough the answers and sending them to function for storing in database
        for (var i = 0; i < answers.length; i++) {
            databaseFunctions.createAnswer(answers[i]);
        }
};
    function redirect() {
        if(no_Ques > 0) {
            return res.redirect(req.get("referer"));
        } else {
            return res.redirect('/createquiz');
        }
    }

    createQuestion();
    setTimeout(getQuestionId, 500);
    setTimeout(createAnswrs, 1000);
    setTimeout(redirect, 1500);
    answers = [];
});

/*  send input data from Create quiz form */
app.post('/createquiz', function (req, res) {
    function createQuiz() {
        var quiz = {
            quizName: req.body.quizName,
            dateFinished: req.body.dateFinished,
            times: req.body.times,
            score: req.body.score
        };
        databaseFunctions.createQuiz(quiz);
    };
    function getQuizId() {
        connection.acquire(function (err, con) {
        con.query('SELECT quizId FROM quizdb.quiz ORDER BY quizId DESC LIMIT 1', function (err, quizIdres) {
            con.release();
            if (err) {
                console.log(err)
            } else {
                obj = JSON.parse(JSON.stringify(quizIdres));
                obj.forEach(function (id) {
                    quizId = id.quizId;
                    console.log("Stored QuizId: " + quizId);
                });
            }
        });
    });

};
    createQuiz();
    setTimeout(getQuizId, 500);
    return res.redirect('/createquizquestions');
});



// Start server on port 1337
app.set('port', process.env.PORT || 80); // use port 1337 unless there exists a preconfigured port
var server = app.listen(app.get('port'), function() {
    console.log('Listening on port:' +app.get('port'));
});