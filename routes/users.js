var express = require('express');
var router = express.Router();

var auth = require('../src/middleware/auth')

//
// User Listing
//
router.get('/', function(req, res, next) {
    /* GET users listing. */
    res.send('/users');
});

//
// Login
//
router.get('/login', function(req, res, next) {
    console.log("get:/login")
        // res.send('/users/login')
    res.render('users/login', {
        title: 'Users',
        subtitle: 'Login'
    });
})
router.post('/login', function(req, res, next) {
    console.log("post:/login", req.body)
    if (auth.login(req, res, req.body['user'], req.body['pass'])) {
        res.redirect('/')
    } else {
        res.redirect('/users/login')
    }
})
router.get('/logout', function(req, res, next) {
    console.log("get:/logout")
    auth.logout(req, res)
    res.redirect("/users/login")
})

module.exports = router;