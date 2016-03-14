window.assert = chai.assert;


describe('SimpleService', function () {
    // define variables for the services we want to access in tests
    var SimpleService,
        $log;

    beforeEach(function () {
        // load the module we want to test
        module('smashingImmage');

        // inject the services we want to test
        inject(function (_SimpleService_, _$log_) {
            SimpleService = _SimpleService_;
            $log = _$log_;
        })
    });

    describe('#DoSomething', function () {
        it('should log the message "something done!"', function () {
            // Arrange
            sinon.spy($log, 'info');

            // Act
            SimpleService.DoSomething();
    
            // Assert
            assert($log.info.calledOnce);
            assert($log.info.calledWith('something done!'));

            // Cleanup
            $log.info.restore();
        });
    });
});