var express = require('express')

var app = express()

// SHOW quiz
app.get('/', function(req, res, next) {
	req.getConnection(function(error, conn) {
		conn.query('SELECT * FROM testbank ORDER BY id DESC',function(err, rows, fields) {
			//if(err) throw err
			if (err) {
				req.flash('error', err)
				res.render('main/home', {
					title: 'Quiz',
					data: ''
				})
			} else {
				// render to views/user/list.ejs template file
				res.render('main/home', {
					title: 'Quiz',
					data: rows
				})
			}
		})
	})
})

// ADD NEW USER POST ACTION CHANGES

app.post('/home', function(req, res, next){
	req.assert('Quiz1').notEmpty()           //Validate username
	req.assert('Quiz2').notEmpty()             //Validate password
    req.assert('Quiz3').notEmpty()  //validate admin privilage

    var errors = req.validationErrors()

    if( !errors ) {   //No errors were found.  Passed Validation!

		/********************************************
		 * Express-validator module

		req.body.comment = 'a <span>comment</span>';
		req.body.username = '   a user    ';

		req.sanitize('comment').escape(); // returns 'a &lt;span&gt;comment&lt;/span&gt;'
		req.sanitize('username').trim(); // returns 'a user'
		********************************************/
		var Quiz = {
			Quiz,1: req.sanitize('Quiz1').escape().trim(),
			Quiz,2: req.sanitize('Quiz2').escape().trim(),
			Quiz,3: req.sanitize('Quiz3').escape().trim()
		}

		req.getConnection(function(error, conn) {
			conn.query('SELECT * FROM testbank WHERE Quiz 1 = ? Quiz 2 = ?  Quiz 3 = ? ', [Quiz1, Quiz2, Quiz3], function(err, result) {
				//if(err) throw err
				if (err) {
					req.flash('error', err)

					// render to views/user/add.ejs
					res.render('main/home', {
						title: 'Quiz',
						Quiz1: Quiz.Quiz1,
						Quiz2: Quiz.Quiz2,
						Quiz3: Quiz.Quiz3
					})
				} else {
					req.flash('success', 'Data added successfully!')

					// render to views/user/add.ejs
					res.render('main/home', {
						title: 'Quiz',
						Quiz1: Quiz.Quiz1,
						Quiz2: Quiz.Quiz2,
						Quiz3: Quiz.Quiz3
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
        res.render('main/home', {
            title: 'Quiz',
            Quiz1: Quiz.Quiz1,
			Quiz2: Quiz.Quiz2,
			Quiz3: Quiz.Quiz3
        })
    }
})

// SHOW EDIT USER FORM
app.get('/edit/(:id)', function(req, res, next){
	req.getConnection(function(error, conn) {
		conn.query('SELECT * FROM testbank WHERE id = ?', [req.params.id], function(err, rows, fields) {
			if(err) throw err

			// if user not found
			if (rows.length <= 0) {
				req.flash('error', 'Quiz not found with id = ' + req.params.id)
				res.redirect('/login')
			}
			else { // if user found
				// render to views/user/edit.ejs template file
				res.render('main/home', {
					title: 'Edit User',
					//data: rows[0],
					id: rows[0].id,
					Quiz1: rows[0].Quiz1,
					Quiz2: rows[0].Quiz2,
					Quiz3: rows[0].Quiz3
				})
			}
		})
	})
})

//Post


module.exports = app