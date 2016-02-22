(function(){

	angular
		.module('smashingImmage')
		.directive('imgDisplay', imgDisplay);	

	function imgDisplay(){
		return {
			templateUrl: '../views/imgDisplay.html',
			restrict: 'EA',
			controller: function($scope, $state){			
				$scope.start = function(){
					$state.go('imageInner', {param: $scope.image})
				}

			}

		}
	}

})();