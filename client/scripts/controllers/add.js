(function(){
    angular
     .module('smashingImmage')
     .controller('Add', Add);

    Add.$inject = ['$scope', 'Upload', '$timeout', 'authToken'];

    function Add ($scope, Upload, $timeout, authToken) {
        $scope.files = null;
        $scope.albumName = null;

        var token = authToken.getToken();

        $scope.remove = function(file){
            var idx = $scope.files.indexOf(file);
            if(idx > -1) 
                $scope.files.splice(idx, 1);
        };

        $scope.submit = function() {

            // map over $scope.files to get the title and description of 
            // each file and store the info and pass through the data field
            var moreInfo = $scope.files.map(function(obj){
                var info = {title: obj.title, description: obj.description};     
                return info;
            });
console.log($scope.files)
console.log($scope.albumName)
            if ($scope.files && $scope.files.length) {
                Upload.upload({
                    url: '/api/v1/images/add',
                    data: {
                        files: $scope.files, 
                        albumName: $scope.albumName,                      
                        access_token: token,
                        isPublic: $scope.isPublic,
                        moreFileInfo: moreInfo
                    }
                }).then(function (response) {
                    $scope.successMsg = 'successfully saved';
                    console.log(response)
                }, function (response) {
                  if (response.status > 0)
                    $scope.errorMsg = response.status + ': ' + response.data;
                }, function (evt) {
                  // Math.min is to fix IE which reports 200% sometimes
                  $scope.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
                })
            }
        };
    }
})();


