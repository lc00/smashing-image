(function(){
	'use strict';

	angular
		.module('smashingImmage')
		.controller('Header', Header);

	Header.$inject = ['auth', '$state', '$scope', '$window'];

	function Header(auth, $state, $scope, $window){
		// $scope.username = null;
	// if(currentUser) {
	// 		$scope.username = JSON.parse(currentUser).username;
	// 	}

		$scope.isAuthenticated = function(){
			var result = auth.isAuthenticated();

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

