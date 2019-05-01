var express = require('express')
var app = express()

// SHOW LIST OF QUESTIONS
app.get('/', function(req, res, next) {
	req.getConnection(function(error, conn) {
		conn.query('SELECT * FROM questions ORDER BY id DESC',function(err, rows, fields) {
			//if(err) throw err
			if (err) {
				req.flash('error', err)
				res.render('main/questionList', {
					title: 'Question List',
					data: ''
				})
			} else {
				// render to views/user/list.ejs template file
				res.render('main/questionList', {
					title: 'Question List',
					data: rows
				})
			}
		})
	})
})

// SHOW ADD USER FORM
app.get('/questions', function(req, res, next){
	// render to views/main/questions.ejs
	res.render('main/questions', {
		title: 'Add New Question',
		questionType: '',
		questionText: '',
		answer1: '',
		answer1Text: '',
		answer2: '',
		answer2Text: '',
		answer3: '',
		answer3Text: '',
		answer4: '',
		answer4Text: '',
		correctAnswer: ''
	})
})

// ADD NEW QUESTION POST ACTION
app.post('/questions', function(req, res, next){
	req.assert('questionType', 'type is required').notEmpty()           //Validate username
	req.assert('questionText', 'text is required').notEmpty()             //Validate password
	req.assert('answer1', 'Type a, t, true').notEmpty()  //validate admin privilage
	req.assert('answer1Text', 'answer text is required').notEmpty()
	req.assert('answer2', 'Type b, f, false').notEmpty()
	req.assert('answer2Text', 'answer text is required').notEmpty()
	//req.assert('answer3', 'Type c').notEmpty()
	//req.assert('answer3Text', 'answer text is required').notEmpty()
	//req.assert('answer4', 'Type d').notEmpty()
	//req.assert('answer4Text', 'answer text is required').notEmpty()
	req.assert('correctAnswer', 'Type a, b, c, d, true, false, t, f').notEmpty()

    var errors = req.validationErrors()

    if( !errors ) {   //No errors were found.  Passed Validation!

		/********************************************
		 * Express-validator module

		req.body.comment = 'a <span>comment</span>';
		req.body.username = '   a user    ';

		req.sanitize('comment').escape(); // returns 'a &lt;span&gt;comment&lt;/span&gt;'
		req.sanitize('username').trim(); // returns 'a user'
		********************************************/
		var question = {
			questionType: req.sanitize('questionType').escape().trim(),
			questionText: req.sanitize('questionText').escape().trim(),
			answer1: req.sanitize('answer1').escape().trim(),
			answer1Text: req.sanitize('answer1Text').escape().trim(),
			answer2: req.sanitize('answer2').escape().trim(),
			answer2Text: req.sanitize('answer2Text').escape().trim(),
			answer3: req.sanitize('answer3').escape().trim(),
			answer3Text: req.sanitize('answer3Text').escape().trim(),
			answer4: req.sanitize('answer4').escape().trim(),
			answer4Text: req.sanitize('answer4Text').escape().trim(),
			correctAnswer: req.sanitize('correctAnswer').escape().trim()
		}

		req.getConnection(function(error, conn) {
			conn.query('INSERT INTO questions SET ?', question, function(err, result) {
				//if(err) throw err
				if (err) {
					req.flash('error', err)

					// render to views/main/questions.ejs
					res.render('main/questions', {
						title: 'Add New Question',
						questionType: user.body.questionType,
						questionText: user.body.questionText,
						answer1: user.body.answer1,
						answer1Text: user.body.answer1Text,
						answer2: user.body.answer2,
						answer2Text: user.body.answer2Text,
						answer3: user.body.answer3,
						answer3Text: user.body.answer3Text,
						answer4: user.body.answer4,
						answer4Text: user.body.answer4Text,
						correctAnswer: user.body.correctAnswer
					})
				} else {
					req.flash('success', 'Data added successfully!')

					// render to views/main/questions.ejs
					res.render('main/questions', {
						title: 'Add New Question',
						questionType: '',
						questionText: '',
						answer1: '',
						answer1Text: '',
						answer2: '',
						answer2Text: '',
						answer3: '',
						answer3Text: '',
						answer4: '',
						answer4Text: '',
						correctAnswer: ''
					})
				}
			})
		})
	}
	else {   //Display errors to user
		var error_msg = ''
		errors.forEach(function(error) {
			error_msg += error.msg + '<br>'
		})
		req.flash('error', error_msg)

		/**
		 * Using req.body.name
		 * because req.param('name') is deprecated
		 */
        res.render('main/questions', {
			title: 'Add New Question',
			questionType: req.body.questionType,
			questionText: req.body.questionText,
			answer1: req.body.answer1,
			answer1Text: req.body.answer1Text,
			answer2: req.body.answer2,
			answer2Text: req.body.answer2Text,
			answer3: req.body.answer3,
			answer3Text: req.body.answer3Text,
			answer4: req.body.answer4,
			answer4Text: req.body.answer4Text,
			correctAnswer: req.body.correctAnswer
		})
    }
	})

		// SHOW EDIT QUESTION FORM
		app.get('/edit/(:id)', function(req, res, next){
			req.getConnection(function(error, conn) {
				conn.query('SELECT * FROM questions WHERE id = ?', [req.params.id], function(err, rows, fields) {
					if(err) throw err

					// if user not found
					if (rows.length <= 0) {
						req.flash('error', 'question not found with id = ' + req.params.id)
						res.redirect('/admin')
					}
					else { // if user found
						// render to views/user/edit.ejs template file
						res.render('main/editQuestions', {
							title: 'Edit Question',
							//data: rows[0],
							id: rows[0].id,
							questionType: rows[0].questionType,
							questionText: rows[0].questionText,
							answer1: rows[0].answer1,
							answer1Text: rows[0].answer1Text,
							answer2: rows[0].answer2,
							answer2Text: rows[0].answer2Text,
							answer3: rows[0].answer3,
							answer3Text: rows[0].answer3Text,
							answer4: rows[0].answer4,
							answer4Text: rows[0].answer4Text,
							correctAnswer: rows[0].correctAnswer
						})
					}
				})
			})
		})

		// EDIT USER POST ACTION
		app.put('/edit/(:id)', function(req, res, next) {
			req.assert('questionType', 'type is required').notEmpty()           //Validate username
			req.assert('questionText', 'text is required').notEmpty()             //Validate password
			req.assert('answer1', 'Type a, t, true').notEmpty()  //validate admin privilage
			req.assert('answer1Text', 'answer text is required').notEmpty()
			req.assert('answer2', 'Type b, f, false').notEmpty()
			req.assert('answer2Text', 'answer text is required').notEmpty()
			//req.assert('answer3', 'Type c').notEmpty()
			//req.assert('answer3Text', 'answer text is required').notEmpty()
			//req.assert('answer4', 'Type d').notEmpty()
			//req.assert('answer4Text', 'answer text is required').notEmpty()
			req.assert('correctAnswer', 'Type a, b, c, d, true, false, t, f').notEmpty()

		    var errors = req.validationErrors()

		    if( !errors ) {   //No errors were found.  Passed Validation!

				/********************************************
				 * Express-validator module

				req.body.comment = 'a <span>comment</span>';
				req.body.username = '   a user    ';

				req.sanitize('comment').escape(); // returns 'a &lt;span&gt;comment&lt;/span&gt;'
				req.sanitize('username').trim(); // returns 'a user'
				********************************************/
				var question = {
					questionType: req.sanitize('questionType').escape().trim(),
					questionText: req.sanitize('questionText').escape().trim(),
					answer1: req.sanitize('answer1').escape().trim(),
					answer1Text: req.sanitize('answer1Text').escape().trim(),
					answer2: req.sanitize('answer2').escape().trim(),
					answer2Text: req.sanitize('answer2Text').escape().trim(),
					answer3: req.sanitize('answer3').escape().trim(),
					answer3Text: req.sanitize('answer3Text').escape().trim(),
					answer4: req.sanitize('answer4').escape().trim(),
					answer4Text: req.sanitize('answer4Text').escape().trim(),
					correctAnswer: req.sanitize('correctAnswer').escape().trim()
				}

				req.getConnection(function(error, conn) {
					conn.query('UPDATE questions SET ? WHERE id = ' + req.params.id, question, function(err, result) {
						//if(err) throw err
						if (err) {
							req.flash('error', err)

							// render to views/user/add.ejs
							res.render('main/editQuestions', {
								title: 'Edit Question',
								id: req.params.id,
								questionType: req.body.questionType,
								questionText: req.body.questionText,
								answer1: req.body.answer1,
								answer1Text: req.body.answer1Text,
								answer2: req.body.answer2,
								answer2Text: req.body.answer2Text,
								answer3: req.body.answer3,
								answer3Text: req.body.answer3Text,
								answer4: req.body.answer4,
								answer4Text: req.body.answer4Text,
								correctAnswer: req.body.correctAnswer
							})
						} else {
							req.flash('success', 'Data updated successfully!')

							// render to views/user/add.ejs
							res.render('main/editQuestions', {
								title: 'Edit Question',
								id: req.params.id,
								questionType: req.body.questionType,
								questionText: req.body.questionText,
								answer1: req.body.answer1,
								answer1Text: req.body.answer1Text,
								answer2: req.body.answer2,
								answer2Text: req.body.answer2Text,
								answer3: req.body.answer3,
								answer3Text: req.body.answer3Text,
								answer4: req.body.answer4,
								answer4Text: req.body.answer4Text,
								correctAnswer: req.body.correctAnswer
							})
						}
					})
				})
			}
			else {   //Display errors to user
				var error_msg = ''
				errors.forEach(function(error) {
					error_msg += error.msg + '<br>'
				})
				req.flash('error', error_msg)

				/**
				 * Using req.body.name
				 * because req.param('name') is deprecated
				 */
		        res.render('main/editQuestions', {
		            title: 'Edit Question',
								id: req.params.id,
								questionType: req.body.questionType,
								questionText: req.body.questionText,
								answer1: req.body.answer1,
								answer1Text: req.body.answer1Text,
								answer2: req.body.answer2,
								answer2Text: req.body.answer2Text,
								answer3: req.body.answer3,
								answer3Text: req.body.answer3Text,
								answer4: req.body.answer4,
								answer4Text: req.body.answer4Text,
								correctAnswer: req.body.correctAnswer
		        })
		    }
		})

		// DELETE Question
		app.delete('/delete/(:id)', function(req, res, next) {
			var question = { id: req.params.id }

			req.getConnection(function(error, conn) {
				conn.query('DELETE FROM questions WHERE id = ' + req.params.id, question, function(err, result) {
					//if(err) throw err
					if (err) {
						req.flash('error', err)
						// redirect to users list page
						res.redirect('/admin')
					} else {
						req.flash('success', 'Question deleted successfully! id = ' + req.params.id)
						// redirect to users list page
						res.redirect('/admin')
					}
				})
			})
		})

module.exports = app
