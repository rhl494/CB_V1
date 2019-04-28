var express = require('express')
var app = express()

// SHOW LIST OF USERS
app.get('/', function(req, res, next) {
	req.getConnection(function(error, conn) {
		conn.query('SELECT * FROM users ORDER BY id DESC',function(err, rows, fields) {
			//if(err) throw err
			if (err) {
				req.flash('error', err)
				res.render('main/list', {
					title: 'User List',
					data: ''
				})
			} else {
				// render to views/user/list.ejs template file
				res.render('main/list', {
					title: 'User List',
					data: rows
				})
			}
		})
	})
})

// ADD NEW USER POST ACTION CHANGES

app.post('/add', function(req, res, next){
	req.assert('username', 'username is required').notEmpty()           //Validate username
	req.assert('password', 'password is required').notEmpty()             //Validate password
    req.assert('administrator', 'Type y/n').notEmpty()  //validate admin privilage

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
			username: req.sanitize('username').escape().trim(),
			password: req.sanitize('password').escape().trim(),
			administrator: req.sanitize('administrator').escape().trim()
		}

		req.getConnection(function(error, conn) {
			conn.query('SELECT * FROM users WHERE username = ? AND password =?', [username, password], function(err, result) {
				//if(err) throw err
				if (err) {
					req.flash('error', err)

					// render to views/user/add.ejs
					res.render('main/add', {
						title: 'Add New User',
						username: user.username,
						password: user.password,
						administrator: user.administrator
					})
				} else {
					req.flash('success', 'Data added successfully!')

					// render to views/user/add.ejs
					res.render('main/add', {
						title: 'Add New User',
						username: '',
						password: '',
						administrator: ''
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
        res.render('main/add', {
            title: 'Add New User',
            username: req.body.username,
            password: req.body.password,
            administrator: req.body.administrator
        })
    }
})

// SHOW EDIT USER FORM
app.get('/edit/(:id)', function(req, res, next){
	req.getConnection(function(error, conn) {
		conn.query('SELECT * FROM users WHERE id = ?', [req.params.id], function(err, rows, fields) {
			if(err) throw err

			// if user not found
			if (rows.length <= 0) {
				req.flash('error', 'User not found with id = ' + req.params.id)
				res.redirect('/users')
			}
			else { // if user found
				// render to views/user/edit.ejs template file
				res.render('main/edit', {
					title: 'Edit User',
					//data: rows[0],
					id: rows[0].id,
					username: rows[0].username,
					password: rows[0].password,
					administrator: rows[0].administrator
				})
			}
		})
	})
})

//Post


module.exports = app