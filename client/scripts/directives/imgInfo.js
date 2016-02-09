(function(){

	angular
		.module('smashingImmage')
		.directive('imgInfo', imgInfo);	

	function imgInfo(){
		return {
			templateUrl: '../views/imgInfo.html',
			restrict: 'EA',
			controller: function($scope, authToken, $http){
				var token = authToken.getToken();
				// console.log($scope)
				$http
					.get('/api/v1/images/get', {params: {"imageFileName": $scope.image, "access_token": token }})
					.then(function succssCallback(response){
						$scope.title = response.data[0].title;
						$scope.description = response.data[0].description;
					}, function errorCallback(response){
						console.log(response)
					});
			}
		}
	}

})();