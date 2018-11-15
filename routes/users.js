var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('/users');
});

router.get('/login', function (req, res, next) {
  // res.send('/users/login')
  res.render('users/login', {
    title: 'CS:Users',
    subtitle:'Login'
  });  
})

module.exports = router;