(function(){

	angular
		.module('smashingImmage')
		.directive('imgInfo', imgInfo);	

	function imgInfo(dataservice){
		return {
			templateUrl: '../views/imgInfo.html',
			restrict: 'EA',
			controller: function($scope, auth, $http){
				var token = auth.getToken();

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
				var divs = el.find('div');

        var inputEl = el.find('input');
        
        scope.editable = function(item){
       	  	
          if(item == 'title') {
						divs[0].className += ' active'; 
            inputEl[0].focus();
          }

					else 	{
						divs[1].className += ' active'; 
            inputEl[1].focus();
          }
        };

        inputEl.on('blur', function(){
        	divs[0].className = 'edit-in-place';
        	divs[1].className = 'edit-in-place';

        	scope.imageInfo = {
        		path: scope.image,
        		title: scope.title,
        		description: scope.description
        	};

        	dataservice.updateImageInfo(scope.imageInfo)

        });

        inputEl.on('keypress', function(e){
            var keyCode = e.keyCode || e.which;
            if (keyCode == '13'){
              divs[0].className = 'edit-in-place'
        			divs[1].className = 'edit-in-place'

	        		dataservice.updateImageInfo(scope.imageInfo)

            }
        });

			}
		}
	}

})();