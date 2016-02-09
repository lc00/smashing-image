(function(){
	'use strict';

	angular
		.module('smashingImmage')
		.controller('SignUp', SignUp);

	SignUp.$inject = ['$scope', '$http', 'alert', '$state', 'authToken'];

	function SignUp($scope, $http, alert, $state, authToken){
		$scope.submit = function(user){
			$http
				.post('/api/v1/users', {
					email: user.email,
					username: user.username,
					password: user.password
				})
				.then(function successCallback(response){
					// alert('success', 'Ok', 'You are registered');
					authToken.setToken(response.data);
					$state.go('images');
				},
				function errorCallback(response){
					// $scope.status = response.data;
					alert('warning', 'Opps', 'Could not register');
				});
		}
	};

})();
