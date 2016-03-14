// var chai = require('../bower_components/chai/chai');

var chai = require('chai');
var should = chai.should();

describe('Canary test', function(){
	it('should pass', function(){
		[].should.be.a('array');
	});
});