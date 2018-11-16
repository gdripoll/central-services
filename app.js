//
// Central Services
//
console.log("#\n#")
console.log("# Central Services")
console.log("# ----------------")
console.log("#")

//
// Requires
//
console.log("# + Requires")
var createError = require('http-errors')

var express = require('express')
var session = require('express-session')
var cors = require('cors')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
var fs = require('fs')

var app = express();

//
// Views
//
console.log("# + View engine setup")
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//
// Modules
//
console.log("# + Modules setup")
app.use(session({
	secret: 'ahivalabalaatajala',
	resave: false,
	saveUninitialized: true,
	cookie: {}
}))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
	extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//
// Middleware
//
console.log("# + Middleware")
var middleware = require('./src/middleware/auth').setup('./config/auth')
app.use((req, res, next) => {
	middleware.go(req, res, next);
})

//
// ROUTES
//
console.log("# + Routes")
items = fs.readdirSync('./routes')
items.forEach(element => {
	var name = element.split('.')[0]
	console.log(`\t/ aquiring`, ((name != 'index') ? `/${name}` : '/'), `[from ./routes/${name}]`);
	app.use((name != 'index') ? `/${name}` : '/', require(`./routes/${name}`))
	// app.use((name != 'index') ? `/${name}` : '/', middleware.go, require(`./routes/${name}`))
});

//
// catch 404 and forward to error handler
//
console.log("\t/ aquiring ERR 404 [from ./app]")
app.use(function (req, res, next) {
	next(createError(404));
});
console.log('# Routes: all routes initialized')

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

module.exports = app;