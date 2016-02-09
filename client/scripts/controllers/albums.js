(function(){
    angular
     .module('smashingImmage')
     .controller('Albums', Albums);

    Albums.$inject = ['$scope', '$state', 'result'];

    function Albums ($scope, $state, result) {

		if(result.status != 200){
            console.log(result)
			alert('warning', 'Opps', 'Could not get albums');
       	    return;
        }
      
     	$scope.albums = result.data;

		$scope.start = function(album){
			$state.go('albumInner', {album: album});
		}; 

    }

})();


