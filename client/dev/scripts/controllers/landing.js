(function(){
	angular
		.module('smashingImmage')
		.controller('Landing', Landing);

	Landing.$inject = ['$scope', 'result', '$state'];

	function Landing($scope, result, $state){

		if(result.status && result.status != 200){
      console.log(result)
			// alert('warning', 'Opps', 'Could not get content');
     	return;
    }
		$scope.images = result[0];
		$scope.albums = result[1];

		$scope.start = function(album){
			$state.go('albumInner', {album: album, landing: true});
		} 


		// $scope.items = ['item1', 'item2', 'item3'];


	}


})();