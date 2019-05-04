DROP SCHEMA IF EXISTS quizdb;
	CREATE SCHEMA IF NOT EXISTS quizdb;
	USE quizdb;

DROP TABLE IF EXISTS user;
	CREATE TABLE user (
	mail VARCHAR(255) NOT NULL PRIMARY KEY,
	name VARCHAR(255) NOT NULL,
	password VARCHAR(255) NOT NULL,
	 -- groups VARCHAR(255) NOT NULL,
	accountLevel VARCHAR(255) NOT NULL
	);

	INSERT INTO user (mail, name, password, accountLevel) VALUES("admin@admin.com", "Admin", "admin" , "Admin");
	-- INSERT INTO user (mail,name, password, groups, accountLevel) VALUES("creator@creator.com", "Creator", "creator" ,"Group 2", "Creator");
	INSERT INTO user (mail, name, password, accountLevel) VALUES("user@user.com", "User", "user" , "User");


DROP TABLE IF EXISTS quiz;
	CREATE TABLE quiz (
	quizId INT NOT NUll AUTO_INCREMENT PRIMARY KEY,
	quizName VARCHAR(255) NOT NULL,
	-- dateCreated TIMESTAMP NOT NULL,
	dateFinished DATE NOT NULL,
	times INT,
	score SMALLINT NOT NULL
	);

    INSERT INTO quiz (quizName, dateFinished, times, score) VALUES ('Test 1', '2020-04-03', 10, 5);
    INSERT INTO quiz (quizName, dateFinished, times, score) VALUES ('Test 2', '2019-10-10', 20, 2);
	INSERT INTO quiz (quizName, dateFinished, times, score) VALUES ('Test 3', '2020-05-03', 30, 5);

DROP TABLE IF EXISTS question;
	CREATE TABLE question(
	questionId INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	question LONGTEXT NOT NULL,
	questionQuizid INT NOT NULL,
	FOREIGN KEY (questionQuizid) REFERENCES quiz(quizId) ON UPDATE CASCADE ON DELETE CASCADE
	);

    INSERT INTO question (questionQuizid,question) VALUES (1,"Select a for test purposes.");
	INSERT INTO question (questionQuizid,question) VALUES (2,"q1?");
	INSERT INTO question (questionQuizid,question) VALUES (2,"q2?");
	INSERT INTO question (questionQuizid,question) VALUES (3,"4/4=?");
	INSERT INTO question (questionQuizid,question) VALUES (3,"2+2=?");
	INSERT INTO question (questionQuizid,question) VALUES (3,"3>2");
	INSERT INTO question (questionQuizid,question) VALUES (3,"2>3");

DROP TABLE IF EXISTS answers;
	CREATE TABLE answers(
	answerId INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	answer TEXT NOT NULL,
	correct BOOLEAN NOT NULL,
	answerQuestionid INT NOT NULL,
	FOREIGN KEY (answerQuestionid) REFERENCES question(questionId) ON UPDATE CASCADE ON DELETE CASCADE
	);

	INSERT INTO answers (answerQuestionid,correct,answer) VALUES (1,5,"a");
	INSERT INTO answers (answerQuestionid,correct,answer) VALUES (1,1,"b");
	INSERT INTO answers (answerQuestionid,correct,answer) VALUES (1,1,"c");
	INSERT INTO answers (answerQuestionid,correct,answer) VALUES (1,2,"d");
	INSERT INTO answers (answerQuestionid,correct,answer) VALUES (1,3,"e");
    INSERT INTO answers (answerQuestionid,correct,answer) VALUES (2,0,"q1 a1");
    INSERT INTO answers (answerQuestionid,correct,answer) VALUES (2,5,"q1 a2");
    INSERT INTO answers (answerQuestionid,correct,answer) VALUES (2,0,"q1 a3");
    INSERT INTO answers (answerQuestionid,correct,answer) VALUES (3,0,"q2 a1");
    INSERT INTO answers (answerQuestionid,correct,answer) VALUES (3,0,"q2 a2");
    INSERT INTO answers (answerQuestionid,correct,answer) VALUES (3,5,"q2 a3");
	INSERT INTO answers (answerQuestionid,correct,answer) VALUES (4,5,"1");
	INSERT INTO answers (answerQuestionid,correct,answer) VALUES (4,0,"0");
	INSERT INTO answers (answerQuestionid,correct,answer) VALUES (5,0,"2");
	INSERT INTO answers (answerQuestionid,correct,answer) VALUES (5,2,"4");
	INSERT INTO answers (answerQuestionid,correct,answer) VALUES (5,0,"22");
	INSERT INTO answers (answerQuestionid,correct,answer) VALUES (5,0,"21");
	INSERT INTO answers (answerQuestionid,correct,answer) VALUES (5,0,"12");
	INSERT INTO answers (answerQuestionid,correct,answer) VALUES (6,5,"T");
	INSERT INTO answers (answerQuestionid,correct,answer) VALUES (6,0,"F");
	INSERT INTO answers (answerQuestionid,correct,answer) VALUES (7,0,"T");
	INSERT INTO answers (answerQuestionid,correct,answer) VALUES (7,5,"F");


DROP TABLE IF EXISTS quiztaken;
	CREATE TABLE quiztaken(
	quiztakenId INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	quizTakenMail VARCHAR(100) NOT NULL,
	quizTakenQid INT NOT NULL,
	results SMALLINT NOT NULL,
	elapTimes INT NOT NULL,
	FOREIGN KEY (quizTakenQid) REFERENCES question(questionId) ON UPDATE CASCADE ON DELETE CASCADE,
	FOREIGN KEY (quizTakenMail) REFERENCES user(mail) ON UPDATE CASCADE ON DELETE CASCADE
	);

	-- INSERT INTO quizTaken (quizTakenMail, QuizTakenQid, results, elapTimes) VALUES ("info@andreasekman.com",1,39,'10');
