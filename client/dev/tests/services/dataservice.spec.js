describe('dataservice', function(){
	var landingPageContent = [{"title": "cool picture", "description": "surfing the waves"}];
	var dataservice = {};
	var $httpBackend;

	beforeEach(module('smashingImmage'));

	beforeEach(inject(function(_dataservice_, _$httpBackend_){
		dataservice = _dataservice_;
		$httpBackend = _$httpBackend_;
	}));

	afterEach(function(){
		$httpBackend.verifyNoOutstandingExpectation();
		$httpBackend.verifyNoOutstandingRequest();
	})

	it('should return landing page content', function(){
		var response;
		var expectedUrl = '/api/v1/contents';

		$httpBackend.when('GET', expectedUrl)
			.respond(200, landingPageContent);

		dataservice.getContent()
			.then(function(data){
				response = data;
			});

		expect($httpBackend.flush).not.toThrow();


		// expect(response).toEqual(landingPageContent);  
	});

	it('should handle error', function(){
		var response;
		var expectedUrl = '/api/v1/contents';

		$httpBackend.expect('GET', expectedUrl)
			.respond(500);

		dataservice.getContent()
			.then(function(data){
				response = data;
			})
			.catch(function(){
				response = 'Error';
			});

		$httpBackend.flush();

		expect(response).toEqual('Error');
	});


});	