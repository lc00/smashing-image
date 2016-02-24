(function(){
    angular
        .module('smashingImmage')
        .directive('editInPlace', editInPlace);

    function editInPlace () {
        return {
            element: 'EA',
            scope: {
                info: '='
            },
            link: function(scope, el, attrs){
console.log(scope)
                el.addClass('edit-in-place');
                // var inputEl = el.find('input');
                
                // scope.editable = function(){
                //     console.log('clicked')
                //     el.addClass('active');
                //     inputEl[0].focus();
                // };

                // inputEl.on('blur', function(){
                //     el.removeClass('active');
                //     // saveUser(scope.user).then(function(result){
                //     //     scope.user = result;
                //     // });
                // });

                // inputEl.on('keypress', function(e){
                //     var keyCode = e.keyCode || e.which;
                //     if (keyCode == '13'){
                //         el.removeClass('active');
                //         // saveUser(scope.user).then(function(result){
                //         //     scope.user = result;
                //         // });
                //     }
                // });
            }
        }
    }
})();