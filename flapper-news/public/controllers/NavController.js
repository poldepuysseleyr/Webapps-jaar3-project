(function() {
    'use strict';

    angular.module('flapperNews').controller('NavController', NavController);

    NavController.$inject = ['$log', 'auth', 'userService', '$stateParams'];

    function NavController($log, auth, userService, $stateParams) {
        var vm = this;

        vm.isLoggedIn = auth.isLoggedIn;
        vm.currentUser = auth.currentUser;
        vm.logOut = auth.logOut;
        vm.getUser = getUser;
        vm.getUserID = getUserID;

        vm.user;
        vm.userID;


        activate();


        function activate(){
            getUserID();
            getUser();
        };


        function getUser() {
            userService.get(vm.userID).then(function(data) {
                vm.user = data;
            });
        };


        function getUserID(){
            vm.userID = auth.currentUserId();
          };
        };





})();
