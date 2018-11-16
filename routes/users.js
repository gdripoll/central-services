var express = require('express');
var router = express.Router();

//
// User Listing
//
router.get('/', function (req, res, next) {
	/* GET users listing. */
	res.send('/users');
});

//
// Login
//
router.get('/login', function (req, res, next) {
	console.log("get:/login")
	// res.send('/users/login')
	res.render('users/login', {
		title: 'CS:Users',
		subtitle: 'Login'
	});
})
router.post('/login', function (req, res, next) {
	console.log("post:/login",req.body)
	var auth = require('../src/middleware/auth')
	if (auth.login(req, res, req.body['user'],req.body['pass'])) {
		res.redirect('/')
	}
})


module.exports = router;