(function(){
	'use strict';

	angular
		.module('smashingImmage')
		.controller('LogOut', LogOut);

	LogOut.$inject = ['authToken', '$state', '$http', 'alert'];

	function LogOut(authToken, $state, $http, alert){
		var token = authToken.getToken();

		$http
				.post('/api/v1/users/logout', {
					access_token: token
				})
				.then(function successCallback(response){
					// alert('success', 'Ok', 'You are registered');
					authToken.removeToken();
					$state.go('landing');
				},
				function errorCallback(response){
					// $scope.status = response.data;
					alert('warning', 'Opps', 'Could not logout');

				});
	};

})();

