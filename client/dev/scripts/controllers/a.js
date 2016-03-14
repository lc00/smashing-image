(function(){
    angular
     .module('smashingImmage')
     .controller('A', A);

    A.$inject = ['$scope', '$stateParams', '$http', 'result'];

    function A ($scope, $stateParams, $http, result) {
       
        $scope.album = result.data;
            
    }

       
})();


