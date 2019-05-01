var express = require('express')
var app = express()

// generate test not working just filler for homepage
app.get('/', function(req, res, next) {
	req.getConnection(function(error, conn) {
		conn.query('SELECT * FROM testbank ORDER BY id DESC',function(err, rows, fields) {
			//if(err) throw err
			if (err) {
				req.flash('error', err)
				res.render('main/home', {
					title: 'Student Homepage',
					data: ''
				})
			} else {
				// render to views/user/list.ejs template file
				res.render('main/home', {
					title: 'Student Homepage',
					data: rows
				})
			}
		})
	})
})