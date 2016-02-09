(function(){
	'use strict';

	angular
		.module('smashingImmage')
		.controller('Header', Header);

	Header.$inject = ['authToken', '$state', '$scope', '$window'];

	function Header(authToken, $state, $scope, $window){
		// $scope.username = null;
	// if(currentUser) {
	// 		$scope.username = JSON.parse(currentUser).username;
	// 	}

		$scope.isAuthenticated = function(){
			var result = authToken.isAuthenticated();

			var storage = $window.localStorage;
			var currentUser = storage.getItem('currentUser');
			if(currentUser)
				$scope.username = JSON.parse(currentUser).username;

			return result;
		};

		// $scope.username = function(){
		
			
		// }
									
	};

})();

