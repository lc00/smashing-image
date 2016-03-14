angular
    .module('smashingImmage')
    .factory('SimpleService', SimpleService); 
  
SimpleService.$inject = ['$log'];
function SimpleService($log) {
    var service = {
        DoSomething: doSomething
    };

    return service;

    function doSomething() {
        $log.info('something done!');
    }
}