(function(){

	angular
		.module('smashingImmage')
		.directive('imgInfo', imgInfo);	

	function imgInfo(){
		return {
			templateUrl: '../views/imgInfo.html',
			restrict: 'EA',
			controller: function($scope, auth, $http){
				var token = auth.getToken();
				// console.log($scope)
				$http
					.get('/api/v1/images/get', {params: {"imageFileName": $scope.image }})
					.then(function succssCallback(response){
						$scope.title = response.data[0].title;
						$scope.description = response.data[0].description;
					}, function errorCallback(response){
						console.log(response)
					});
			},
			link: function(scope, el, attrs){
el.addClass('edit-in-place');
        var inputEl = el.find('input');
        
        scope.editable = function(item){
            console.log(item)
            el.addClass('active');
            inputEl[0].focus();
        };

        inputEl.on('blur', function(){
            el.removeClass('active');
            // saveUser(scope.user).then(function(result){
            //     scope.user = result;
            // });
        });

        inputEl.on('keypress', function(e){
            var keyCode = e.keyCode || e.which;
            if (keyCode == '13'){
                el.removeClass('active');
                // saveUser(scope.user).then(function(result){
                //     scope.user = result;
                // });
            }
        });

			}
		}
	}

})();