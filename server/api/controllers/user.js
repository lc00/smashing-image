
if(process.env.NODE_ENV == 'dev'){
	require('dotenv').load();
}

var User = require('../models/user');
var passport = require('passport');
var jwt = require('jwt-simple');
var payload = {payload: new Date()};
var secret = 'lksdklsadjsadfopuqpouer153498017';


var nodemailer = require('nodemailer');
var EmailTemplate = require('email-templates').EmailTemplate;
var path = require('path');
var templateDir = path.join(__dirname, '../../', 'templates', 'signUpEmail');
var signUpEmail = new EmailTemplate(templateDir);

var Promise = require('bluebird');
// var fs = Promise.promisifyAll(require('fs'));


var UserController = function(){};

UserController.prototype.signUp = function(req, res, next){

	var token = jwt.encode(payload, secret);

	var user = new User({
		email: req.body.email,
		username: req.body.username,
		password: req.body.password,
		token: token
	});

	user.save(function(err, user){
		if(err) {
			var errMessage = 'An error occurred, please try again';
			if(err.code === 11000){
				errMessage = 'This user already exists';
			}
			return res.status(500).json(errMessage);
		}

	return res.status(201).json({username: user.username, token: user.token});
		// return res.status(200).send('You are signed up');

		// signUpEmail.render(user, function (err, results) {
		// 	console.log(user)
		//   if (err) return console.log(err)
		  
		//   var transporter = nodemailer.createTransport({
		//     service: 'Mailgun',
		//     auth: {
		//       user: 'postmaster@ocean-views.net',
		//       pass: process.env.MailgunPass
		//     }
		//   }); 

		//   var mailOptions = {
		//       from: 'postmaster@ocean-views.net', // sender address
		//       to: user.email, // list of receivers
		//       subject: 'Email Verification', // Subject line,
		// 			html: results.html,
		// 			text: results.text
		// 	};

		//   // send mail with defined transport object
		//   transporter.sendMail(mailOptions, function(error, info){
		//       if(error){
		//           return console.log(error);
		//       }
		//       console.log('Message sent: ' + info.response);

		//   });

		// // });

		// });


	});
};

UserController.prototype.login = function(req, res, next){
	var token = jwt.encode(payload, secret);
	req.user.token = token;
	req.user.save(function(err, user){
		if(err) return next(err);
		return res.status(200).json({username: user.username, token: user.token});
	});
};

UserController.prototype.logout = function(req, res, next){
	req.user.token = null;
	req.user.save(function(err, user){
		if(err) return res.status(500).json(err);
		return res.sendStatus(200);
	});
};

module.exports = UserController;