describe('Users factory', function() {
    var userService;
    var $scope;
    var $httpBackend, $http;

    var userList = [{
            id: '1',
            username: 'Jane',
            firstname: 'Jane',
            lastname: 'York',
            gender: 'female',
            email: 'string@string.com',
            birthday: '15-12-1994'
        }, {
            id: '2',
            username: 'BillyBob',
            firstname: 'Billy',
            lastname: 'York',
            gender: 'male',
            email: 'stringeling@stringeling.com',
            birthday: '14-02-1989'
        }

    ];


    var singleUser = {
        id: '2',
        username: 'BillyBob',
        firstname: 'Billy',
        lastname: 'York',
        gender: 'male',
        email: 'stringeling@stringeling.com',
        birthday: '14-02-1989'
    };

    // Before each test load our api.users module
    beforeEach(angular.mock.module('flapperNews'));

    // Before each test set our injected Users factory (_Users_) to our local Users variable
    beforeEach(function() {
        inject(function(_userService_) {
            userService = _userService_;
        });

        inject(function(_$http_) {
            $http = _$http_;
        });

        inject(function(_$httpBackend_) {
            $httpBackend = _$httpBackend_;
            $httpBackend.when('GET', '/users').respond(200, userList);


        });

        inject(function($rootScope) {
            $scope = $rootScope.$new();
        });
    });

    afterEach(function() { // Altijd plaatsen zodat alle calls die niet werden beantwoord errors geven
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    // A simple test to verify the Users factory exists
    it('should exist', function() {
        expect(userService).toBeDefined();
    });



    describe('.getAll()', function() {
        it('should exist', function() {
            expect(userService.getAll).toBeDefined();
        });

        it('should return a list of users', function() {
            var userResult;
            userService.getAll().then(function(result) {
              userResult = result.data;
            }

            );
            $httpBackend.flush();
            expect(userResult).toEqual(userList);


        });
        it('async', function(done) {
          var userResult;
          userService.getAll().then(function(result) {
            expect(result.data[0]).toEqual(...userList);
            done();
          });
        });
    });

    // describe('.get(id)', function() {
    //     // A simple test to verify the method findById exists
    //     it('should exist', function() {
    //         expect(userService.get).toBeDefined();
    //     });
    //
    //     it('should return one user object if it exists', function() {
    //         expect(userService.get('2')).toEqual(singleUser);
    //     });
    //
    //     it('should return undefined if the user cannot be found', function() {
    //         expect(userService.get('ABC')).not.toBeDefined();
    //     });
    // });
});
