var chai = require('chai');
var request = require('supertest');
var app = require('../app');

var token = null;

var should = chai.should();

// describe('Sending a POST to signup', function(){
// 	it('should succeed', function(done){
// 		request(app)
// 			.post('/api/v1/users/signup')
// 			.send({
// 				email: 'a@a.com',
// 				username: 'a',
// 				password: 'a'
// 			})
// 			.expect(200)
// 			.end(function(err, res){
// 				if(err) return done(err);
// 				res.body.message.should.equal('A new user has been added');
// 				done();
// 			});
// 	});
// });

describe('Sending a POST to login', function(){
	it('should succeed', function(done){
		request(app)
			.post('/api/v1/users/login')
			.send({
				email: 'a@a.com',
				password: 'a'
			})
			.expect(200)
			.end(function(err, res){
				if(err) return done(err);
				res.body.message.should.equal('logged in');
				token = res.body.token;
				done();
			});
	});
});

describe('Sending a POST to logout', function(){
	it('should succeed', function(done){
		request(app)
			.post('/api/v1/users/logout')
			.send({
				access_token: token
			})
			.expect(201)
			.end(function(err, res){
				if(err) return done(err);
				done();
			})
	});
});