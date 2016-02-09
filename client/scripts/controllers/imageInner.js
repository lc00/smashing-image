(function(){
	angular
		.module('smashingImmage')
		.controller('ImageInner', ImageInner);

	ImageInner.$inject = ['$scope', '$stateParams'];

	function ImageInner($scope, $stateParams){

		$scope.image = $stateParams.param;

	};




})();