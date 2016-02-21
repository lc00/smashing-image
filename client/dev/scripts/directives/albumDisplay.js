(function(){

	angular
		.module('smashingImmage')
		.directive('albumDisplay', albumDisplay);	


	function albumDisplay(){
		return {
			templateUrl: '../views/albumDisplay.html',
			restrict: 'E',
			controller: function($scope, $state, $http, authToken){		

				var token = authToken.getToken();

				$scope.start = function(){
					// console.log($scope.album)
					$state.go('albumInner', {param: $scope.album.content})
				}

			}

		}
	}

})();