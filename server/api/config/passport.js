var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var BearerStrategy = require('passport-http-bearer').Strategy;

// Since we will be using the user model to control access and
// persistence, we'll use that as well.
var User = require('../models/user');

//When Passport authenticates a request, it parses the credentials contained 
//in the request. It then invokes the verify callback with those credentials 
//as arguments, in this case email and password. If the credentials are valid, 
//the verify callback invokes done to supply Passport with the user that authenticated.
// done(err, user, info)
var localStrategy = new LocalStrategy({usernameField: 'email'},function(email, password, done){
	User.findOne({email: email}, function(err, user){
		if(err) { return done(err); }
		if(!user) {
			return done(null, false, {message: 'incorrect email'});
		}
		user.verifyPassword(password, function(err, isMatch){
			if(err) return done(err);

			if(!isMatch) { return done(null, false, {message: 'incorrect password'}); }
			return done(null, user);
		});
	});
});


var bearerStrategy = new BearerStrategy(
  function(token, done) {
    User.findOne({ token: token }, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      return done(null, user, { scope: 'all' });
    });
  }
);

passport.use(localStrategy);
passport.use(bearerStrategy);

module.exports = passport;
