DROP SCHEMA IF EXISTS quizdb;
	CREATE SCHEMA IF NOT EXISTS quizdb;
	USE quizdb;

DROP TABLE IF EXISTS user;
	CREATE TABLE user (
	mail VARCHAR(255) NOT NULL PRIMARY KEY,
	name VARCHAR(255) NOT NULL,
	password VARCHAR(255) NOT NULL,
	groups VARCHAR(255) NOT NULL,
	accountLevel VARCHAR(255) NOT NULL
	);

	INSERT INTO user (mail,name, password, groups, accountLevel) VALUES("admin@admin.se", "Admin Adminsson", "admin" ,"Group 1", "Admin");
	INSERT INTO user (mail,name, password, groups, accountLevel) VALUES("creator@creator.se", "Creator Creatorson", "creator" ,"Group 2", "Creator");
	INSERT INTO user (mail,name, password, groups, accountLevel) VALUES("user@user.se", "User Usersson", "user" ,"Group 3", "User");


DROP TABLE IF EXISTS quiz;
	CREATE TABLE quiz (
	quizId INT NOT NUll AUTO_INCREMENT PRIMARY KEY,
	quizName VARCHAR(255) NOT NULL,
	dateCreated TIMESTAMP NOT NULL,
	dateFinished DATE NOT NULL,
	times INT,
	score SMALLINT NOT NULL
	);

    INSERT INTO quiz (quizName, dateFinished, times, score) VALUES ('Solution to everything', '2017-04-03', 10, 5);
    INSERT INTO quiz (quizName, dateFinished, times, score) VALUES ('Bergskedjor', '2017-03-03', 20, 2);
	INSERT INTO quiz (quizName, dateFinished, times, score) VALUES ('Klockor', '2018-03-03', 30, 5);

DROP TABLE IF EXISTS question;
	CREATE TABLE question(
	questionId INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	question LONGTEXT NOT NULL,
	questionQuizid INT NOT NULL,
	FOREIGN KEY (questionQuizid) REFERENCES quiz(quizId)
	);

    INSERT INTO question (questionQuizid,question) VALUES (1,"What color is the Sky?");
	INSERT INTO question (questionQuizid,question) VALUES (2,"Vilket är världens högsta berg?");
	INSERT INTO question (questionQuizid,question) VALUES (2,"Vilket är världens tredje högsta berg?");
	INSERT INTO question (questionQuizid,question) VALUES (3,"Vilken är världens dyraste klocka?");
	INSERT INTO question (questionQuizid,question) VALUES (3,"När uppfanns klockan?");
	INSERT INTO question (questionQuizid,question) VALUES (3,"Vilket märke på klockan använder Sean Connery när han spelar James Bond?");
	INSERT INTO question (questionQuizid,question) VALUES (3,"Vilket märke på klockan använder Daniel Craig när han spelar James Bond?");

DROP TABLE IF EXISTS answers;
	CREATE TABLE answers(
	answerId INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	answer TEXT NOT NULL,
	correct BOOLEAN NOT NULL,
	answerQuestionid INT NOT NULL,
	FOREIGN KEY (answerQuestionid) REFERENCES question(questionId)
	);

	INSERT INTO answers (answerQuestionid,correct,answer) VALUES (1,0,"Red");
	INSERT INTO answers (answerQuestionid,correct,answer) VALUES (1,2,"Green");
	INSERT INTO answers (answerQuestionid,correct,answer) VALUES (1,5,"Blue");
	INSERT INTO answers (answerQuestionid,correct,answer) VALUES (1,3,"Pink");
	INSERT INTO answers (answerQuestionid,correct,answer) VALUES (1,0,"Red");
    INSERT INTO answers (answerQuestionid,correct,answer) VALUES (2,0,"Question 1 Answer 1");
    INSERT INTO answers (answerQuestionid,correct,answer) VALUES (2,1,"Question 1 Answer 2");
    INSERT INTO answers (answerQuestionid,correct,answer) VALUES (2,0,"Question 1 Answer 3");
    INSERT INTO answers (answerQuestionid,correct,answer) VALUES (3,0,"Question 2 Answer 1");
    INSERT INTO answers (answerQuestionid,correct,answer) VALUES (3,0,"Question 2 Answer 2");
    INSERT INTO answers (answerQuestionid,correct,answer) VALUES (3,1,"Question 2 Answer 3");
	INSERT INTO answers (answerQuestionid,correct,answer) VALUES (4,1,"201-KARAT CHOPARD");
	INSERT INTO answers (answerQuestionid,correct,answer) VALUES (4,0,"PATEK PHILIPPE SUPERCOMPLICATION");
	INSERT INTO answers (answerQuestionid,correct,answer) VALUES (5,0,"För 150 år sedan");
	INSERT INTO answers (answerQuestionid,correct,answer) VALUES (5,2,"För 4000 år sedan");
	INSERT INTO answers (answerQuestionid,correct,answer) VALUES (5,0,"För 3000 år sedan");
	INSERT INTO answers (answerQuestionid,correct,answer) VALUES (5,0,"För 2017 år sedan");
	INSERT INTO answers (answerQuestionid,correct,answer) VALUES (5,0,"För 3500 år sedan");
	INSERT INTO answers (answerQuestionid,correct,answer) VALUES (6,3,"Rolex Submariner");
	INSERT INTO answers (answerQuestionid,correct,answer) VALUES (6,0,"Omega-klocka");
	INSERT INTO answers (answerQuestionid,correct,answer) VALUES (7,3,"Omega-klocka");
	INSERT INTO answers (answerQuestionid,correct,answer) VALUES (7,0,"Rolex Submariner");


DROP TABLE IF EXISTS quiztaken;
	CREATE TABLE quiztaken(
	quiztakenId INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	quizTakenMail VARCHAR(100) NOT NULL,
	quizTakenQid INT NOT NULL,
	results SMALLINT NOT NULL,
	elapTimes INT NOT NULL,
	FOREIGN KEY (quizTakenQid) REFERENCES question(questionId),
	FOREIGN KEY (quizTakenMail) REFERENCES user(mail)
	);

	INSERT INTO quizTaken (quizTakenMail, QuizTakenQid, results, elapTimes) VALUES ("info@andreasekman.com",1,39,'10');
