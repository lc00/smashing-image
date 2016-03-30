(function(){
    angular
     .module('smashingImmage')
     .controller('Images', Images);

    Images.$inject = ['$scope', 'result', 'alert'];

    function Images ($scope, result, alert) {
      $scope.myInterval = 5000;
// console.log(result)
			if(result.status != 200){
        console.log(result)
				alert('warning', 'Opps', 'Could not get images');
       	return;
      }

			$scope.slides = result.data;	

    }

})();


