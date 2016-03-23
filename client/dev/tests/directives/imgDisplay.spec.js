

describe('smashingImmage', function () {
    var scope;
    var element;
    var state;

    beforeEach(
        module('smashingImmage')
    );

    describe('Directive: imgDisplay', function () {
        beforeEach(inject(function ($rootScope, $compile) {
            scope = $rootScope.$new();
            element = angular.element('<img-display></img-display>');
            // state = $state;
            $compile(element)(scope);
        }));
        
        it('start function has been called', function(){
			spyOn(scope, 'start');
        	scope.start();
        	expect(scope.start).toHaveBeenCalled();
        }); 
  
    });
})