(function () {
    angular.module('smashingImmage')

    .directive('imgDisplay', function () {
        return {
            restrict: 'EA',
            // template: '../views/imgDisplay.html',
            template: "<img ng-src='/contents/{{image.fileName}}' class='img-rounded' style='width: 200px; height: 200px'>",
            controller: function ($scope, $state, $log) {
              	$scope.start = function(){
              		$scope.message = 'clicked';
									$state.go('imageInner', {param: $scope.image})
								}
            }
        }
    });
})();