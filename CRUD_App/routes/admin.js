var express = require('express')
var app = express()

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
	req.assert('answer3', 'Type c').notEmpty()
	req.assert('answer3Text', 'answer text is required').notEmpty()
	req.assert('answer4', 'Type d').notEmpty()
	req.assert('answer4Text', 'answer text is required').notEmpty()
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
		var user = {
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
			conn.query('INSERT INTO questions SET ?', user, function(err, result) {
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

module.exports = app
