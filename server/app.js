// load required packages
var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var healthRoute = require('./api/routes/health');
var web = require("./web/web");

var userRoute = require('./api/routes/user');
var imageRoute = require('./api/routes/image');
var albumRoute = require('./api/routes/album');

var contentRoute = require('./api/routes/content');

//connect to the smashingImmage MongoDB
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/smashingImmage');

// create Express application
var app = express();	


app.use(logger('dev'));
// parsing json data
app.use(bodyParser.json());
//parsing html form data
app.use(bodyParser.urlencoded({extended: true}));


// register all routes
app.use('/bower_components', express.static(__dirname + '/../bower_components'));
// app.use('/testLib', express.static(__dirname + '/../testing'));
app.use('/contents', express.static(__dirname + '/../uploads'));

app.use('/api/v1/health', healthRoute);


app.use('/api/v1/users', userRoute);

app.use('/api/v1/images', imageRoute);
app.use('/api/v1/albums', albumRoute);

app.use('/api/v1/contents', contentRoute);

// created a route
// app.post('/api/v1/err', function(req, res, next){
// 	var err = new Error(req.body.error);
// 	err.code = 502;
// 	next(err);
// })

app.use('/', web);

// error handling route
// note that express has a default error handling route where it
// logs the err.stack to console
// this one overwrites the express default error handling route
app.use(function(err, req, res, next){
	console.error(err.stack);
	res.json({
		message: err.message,
		code: err.code
	});
})

module.exports = app;