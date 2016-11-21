(function() {
    'use strict';

    angular.module('flapperNews').controller('NavController', NavController);

    NavController.$inject = ['$log', 'auth', 'userService', '$stateParams', '$state'];

    function NavController($log, auth, userService, $stateParams, $state) {
        var vm = this;

        vm.isLoggedIn = auth.isLoggedIn;
        vm.currentUser = auth.currentUser;
        vm.user;
        vm.userID;

        vm.logOut = logOut;
        vm.getUser = getUser;
        vm.getUserID = getUserID;




        activate();


        function activate() {
            getUserID();
            getUser();
        };

        function logOut() {
            $state.go('home').then(function(){
              auth.logOut();
            });
        };


        function getUser() {
            userService.get(vm.userID).then(function(data) {
                vm.user = data;
            });
        };


        function getUserID() {
            vm.userID = auth.currentUserId();
        };

    };

})();
