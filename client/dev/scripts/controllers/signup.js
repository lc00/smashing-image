(function(){
	'use strict';

	angular
		.module('smashingImmage')
		.controller('SignUp', SignUp);

	SignUp.$inject = ['$scope', '$http', 'alert', '$state', 'auth'];

	function SignUp($scope, $http, alert, $state, auth){
		$scope.submit = function(user){
			$http
				.post('/api/v1/users', {
					email: user.email,
					username: user.username,
					password: user.password
				})
				.then(function successCallback(response){
					// alert('success', 'Ok', 'You are registered');
					auth.setUser(response.data);
					$state.go('images');
				},
				function errorCallback(response){
					// $scope.status = response.data;
					alert('warning', 'Opps', 'Could not register');
				});
		}
	};

})();
