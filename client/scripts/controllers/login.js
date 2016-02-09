(function(){
	'use strict';

	angular
		.module('smashingImmage')
		.controller('LogIn', LogIn);

	LogIn.$inject = ['$scope', '$http', 'authToken', '$state', 'alert'];

	function LogIn($scope, $http, authToken, $state, alert){

		$scope.submit = function(user){
			$http
				.post('/api/v1/users/login', {
						email: user.email,
						password: user.password
				})
				.then(function successCallback(response){
					authToken.setToken(response.data);					
					$state.go('images');
				},
				function errorCallback(response){
					$scope.status = response.data;
					alert('warning', 'Opps', 'Could not log in');
				});
		}
	};

})();

