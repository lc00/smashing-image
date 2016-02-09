(function(){
    angular
     .module('smashingImmage')
     .controller('I', I);

    I.$inject = ['$scope', 'result'];

    function I ($scope, result) {

        if(result.status != 200){
            console.log(result)
            alert('warning', 'Opps', 'Could not get the image');
            return;
        }

        $scope.image = result.data.fileName;
        $scope.title = result.data.title;
        $scope.description = result.data.description;
    
    }

       
})();


