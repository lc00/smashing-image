(function(){
	angular
		.module('smashingImmage')
		.controller('Landing', Landing);

	Landing.$inject = ['$scope', 'result', '$state'];

	function Landing($scope, result, $state){

		if(result.status != 200){
      console.log(result)
			// alert('warning', 'Opps', 'Could not get content');
     	return;
    }
		$scope.images = result.data[0];
		$scope.albums = result.data[1];

		$scope.start = function(album){
			$state.go('albumInner', {album: album, landing: true});
		} 


		// $scope.items = ['item1', 'item2', 'item3'];


	}


})();