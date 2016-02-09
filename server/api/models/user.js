// load required packages
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

// define user schema
var UserSchema = mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    username: {
    	type:	String,
    	unique: true,
    	required: true
    },
    password: {
    	type: String,
    	required: true
    }, 
    token: {
    	type: String
    },
    emailAuth: {
        type: Boolean,
        default: false
    }
});

/**
 * this allows us to hook into the pre-save DB flow. Our
 * callback will be called whenever a new user is about to
 * be saved to the database so that we can encrypt the password
 */
UserSchema.pre('save', function(next){

  // first, check to see if the password has been modified. If not, just move on
	if (!this.isModified('password')) return next();

  // store access to "this", which represents the current user document
  var user = this;

	bcrypt.genSalt(10, function(err, salt){

    // if there was an error, allow execution to move to the next middleware
		if(err) return next(err);
	
    // if we are successful, use the salt to run the encryption on the given password
		bcrypt.hash(user.password, salt, function(err, hash){
			// if there was an error, allow execution to move to the next middleware
			if(err) return next(err);

			// if the encryption succeeded, then replace the un-encrypted password
			// in the given document with the newly encrypted one
			user.password = hash;

			// allow execution to move to the next middleware
			return next();
		});
	});

});

UserSchema.methods.verifyPassword = function(password, next){
	bcrypt.compare(password, this.password, function(err, isMatch){
		if(err) return next(err);

    // If there is no error, move to the next middleware and inform
    // it of the match status (true or false)
		return next(null, isMatch);
	});
};

// create user model with user schema; a model is a class that is used to create a document
var User = mongoose.model('User', UserSchema);

module.exports = User;


