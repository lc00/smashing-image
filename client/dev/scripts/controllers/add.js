(function(){
    angular
     .module('smashingImmage')
     .controller('Add', Add);

    Add.$inject = ['$scope', 'Upload', '$timeout', 'auth', 'alert', '$state'];

    function Add ($scope, Upload, $timeout, auth, alert, $state) {

$scope.progress = null;

        var token = auth.getToken();

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

            if ($scope.files && $scope.files.length) {
                Upload.upload({
                    url: '/api/v1/images',
                    data: {
                        files: $scope.files, 
                        albumName: $scope.albumName,                      
                        access_token: token,
                        isPublic: $scope.isPublic,
                        moreFileInfo: moreInfo
                    }
                }).then(function (response) {
                    alert('success', 'Great', 'Successfully saved');
                    $timeout(function() {
                        if($scope.albumName){
                            return $state.go('albumInner', {album: response.data});
                        }
                        $state.go('images'); 
                    }, 3000);

                }, function (response) {
                  if (response.status > 0)
                    // $scope.errorMsg = "problem with upload";
                    alert('warning', 'Opps', 'Problem with upload');

                }, function (evt) {
                  // Math.min is to fix IE which reports 200% sometimes
                  $scope.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
                  
                })
            }
        };
    }
})();


