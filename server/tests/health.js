var chai = require('chai');
var request = require('supertest');
var app = require('../app');

var should = chai.should();

describe('Sending a GET to /api/v1/health', function(){
	it('should get a heartbeat', function(done){
		request(app)
			.get('/api/v1/health')
			.expect(200)
			.end(function(err, res){
				if(err) return done(err);

				res.body.message.should.equal('heartbeat');

				done();
			});
	});
});