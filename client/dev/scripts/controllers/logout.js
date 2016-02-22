(function(){
	'use strict';

	angular
		.module('smashingImmage')
		.controller('LogOut', LogOut);

	LogOut.$inject = ['auth', '$state', '$http', 'alert'];

	function LogOut(auth, $state, $http, alert){
		var token = auth.getToken();

		$http
				.post('/api/v1/users/logout', {
					access_token: token
				})
				.then(function successCallback(response){
					// alert('success', 'Ok', 'You are registered');
					auth.removeUser();
					$state.go('landing');
				},
				function errorCallback(response){
					// $scope.status = response.data;
					alert('warning', 'Opps', 'Could not logout');

				});
	};

})();

