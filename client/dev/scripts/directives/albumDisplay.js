(function(){

	angular
		.module('smashingImmage')
		.directive('albumDisplay', albumDisplay);	


	function albumDisplay(){
		return {
			templateUrl: '../views/albumDisplay.html',
			restrict: 'E',
			controller: function($scope, $state, $http, auth){		

				var token = auth.getToken();

				$scope.start = function(){
					// console.log($scope.album)
					$state.go('albumInner', {param: $scope.album.content})
				}

			}

		}
	}

})();