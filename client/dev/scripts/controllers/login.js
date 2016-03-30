(function(){
	'use strict';

	angular
		.module('smashingImmage')
		.controller('LogIn', LogIn);

	LogIn.$inject = ['$scope', '$http', 'auth', '$state', 'alert'];

	function LogIn($scope, $http, auth, $state, alert){

		$scope.submit = function(user){
			$http
				.post('/api/v1/users/login', {
						email: user.email,
						password: user.password
				})
				.then(function successCallback(response){
					auth.setUser(response.data);	
					// var l = localStorage.getItem('currentUser')				
					// console.log(l)
					$state.go('images');
				},
				function errorCallback(response){
					$scope.status = response.data;
					alert('warning', 'Opps', 'Could not log in');
				});
		}
	};

})();

