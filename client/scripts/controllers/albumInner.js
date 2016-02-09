(function(){
	angular
		.module('smashingImmage')
		.controller('AlbumInner', AlbumInner);

	AlbumInner.$inject = ['$scope', '$stateParams'];

	function AlbumInner($scope, $stateParams){
		console.log($stateParams)
		$scope.album = $stateParams.album;
		$scope.landing= $stateParams.landing;

	};




})();