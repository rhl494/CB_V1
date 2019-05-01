var express = require('express')
var app = express()

// SHOW LIST OF adminlogin
app.get('/', function(req, res, next) {
	req.getConnection(function(error, conn) {
		conn.query('SELECT * FROM adminlogin ORDER BY id DESC',function(err, rows, fields) {
			//if(err) throw err
			if (err) {
				req.flash('error', err)
				res.render('main/adminlist', {
					title: 'admin List',
					data: ''
				})
			} else {
				// render to views/admin/list.ejs template file
				res.render('main/adminlist', {
					title: 'admin List',
					data: rows
				})
			}
		})
	})
})

// SHOW ADD admin FORM
app.get('/add_adminlogin', function(req, res, next){
	// render to views/admin/add.ejs
	res.render('main/add_adminlogin', {
		title: 'Add New admin',
		username: '',
		password: ''
	})
})

// ADD NEW USER POST ACTION
app.post('/add_adminlogin', function(req, res, next){
	req.assert('username', 'username is required').notEmpty()           //Validate username
	req.assert('password', 'password is required').notEmpty()             //Validate password

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
			password: req.sanitize('password').escape().trim()
		}

		req.getConnection(function(error, conn) {
			conn.query('INSERT INTO adminlogin SET ?', user, function(err, result) {
				//if(err) throw err
				if (err) {
					req.flash('error', err)

					// render to views/user/add.ejs
					res.render('main/add_adminlogin', {
						title: 'Add new admin',
						username: user.username,
						password: user.password
					})
				} else {
					req.flash('success', 'Data added successfully!')

					// render to views/user/add.ejs
					res.render('main/add_adminlogin', {
						title: 'Add new admin',
						username: '',
						password: ''
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
        res.render('main/add_adminlogin', {
            title: 'Add new admin',
            username: req.body.username,
            password: req.body.password
        })
    }
})

// SHOW EDIT USER FORM
app.get('/adminedit/(:id)', function(req, res, next){
	req.getConnection(function(error, conn) {
		conn.query('SELECT * FROM adminlogin WHERE id = ?', [req.params.id], function(err, rows, fields) {
			if(err) throw err

			// if user not found
			if (rows.length <= 0) {
				req.flash('error', 'User not found with id = ' + req.params.id)
				res.redirect('/adminlogin')
			}
			else { // if user found
				// render to views/user/edit.ejs template file
				res.render('main/adminedit', {
					title: 'Edit Admin',
					//data: rows[0],
					id: rows[0].id,
					username: rows[0].username,
					password: rows[0].password
				})
			}
		})
	})
})

// EDIT USER POST ACTION
app.put('/adminedit/(:id)', function(req, res, next) {
	req.assert('username', 'Username is required').notEmpty()           //Validate name
	req.assert('password', 'Password is required').notEmpty()             //Validate age

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
			password: req.sanitize('password').escape().trim()
		}

		req.getConnection(function(error, conn) {
			conn.query('UPDATE adminlogin SET ? WHERE id = ' + req.params.id, user, function(err, result) {
				//if(err) throw err
				if (err) {
					req.flash('error', err)

					// render to views/user/add.ejs
					res.render('main/adminedit', {
						title: 'Edit Admin',
						id: req.params.id,
						username: req.body.username,
						password: req.body.password
					})
				} else {
					req.flash('success', 'Data updated successfully!')

					// render to views/user/add.ejs
					res.render('main/adminedit', {
						title: 'Edit Admin',
						id: req.params.id,
						username: req.body.username,
						password: req.body.password
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
        res.render('main/adminedit', {
            title: 'Edit Admin',
			id: req.params.id,
			username: req.body.username,
			password: req.body.password
        })
    }
})

// DELETE USER
app.delete('/delete/(:id)', function(req, res, next) {
	var user = { id: req.params.id }

	req.getConnection(function(error, conn) {
		conn.query('DELETE FROM adminlogin WHERE id = ' + req.params.id, user, function(err, result) {
			//if(err) throw err
			if (err) {
				req.flash('error', err)
				// redirect to adminlogin list page
				res.redirect('/adminlogin')
			} else {
				req.flash('success', 'Admin deleted successfully! id = ' + req.params.id)
				// redirect to adminlogin list page
				res.redirect('/adminlogin')
			}
		})
	})
})

module.exports = app
