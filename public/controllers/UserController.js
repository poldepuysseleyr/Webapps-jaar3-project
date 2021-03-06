(function() {
    'use strict';

    angular.module("flapperNews").controller('UserController', UserController)

    UserController.$inject = ['$log', 'userService', 'auth', '$stateParams','$state', 'commentService']

    function UserController($log, userService, auth, $stateParams, $state, commentService) {
        var vm = this;

        vm.isLoggedIn = auth.isLoggedIn;
        vm.commentsOfPost = [];
        vm.user = {};
        vm.userID;
        vm.username = auth.currentUser();
        vm.error;


        vm.getUser = getUser;
        vm.getUserID = getUserID;
        vm.updateUser = updateUser;
        vm.convertDate = convertDate;
        vm.deleteUser = deleteUser;
        vm.convertDateToString = convertDateToString;


        activate();

        function activate() {
            getUserID();
            getUser();
        };

        function getUser() {
            userService.get(vm.userID).then(function(data) {
                vm.user = data.data;
                if (vm.user.birthday == null) {
                    vm.user.birthday = "";
                } else {
                    convertDate(vm.user);
                }

                return vm.user;
            });
        };

        function getUserID() {
            vm.userID = auth.currentUserId();
            return vm.userID;
        };

        function updateUser() {
            vm.userID = auth.currentUserId();
            if (vm.user.birthday >= new Date() || vm.user.birthday.getFullYear() >= new Date().getFullYear()-13 ) {
                vm.error = "Your birthday can't be in the future and you must be atleast 14 years old!"
                return;
            };
            vm.error = null;
            return userService.update(vm.userID, {
                username: vm.user.username,
                firstname: vm.user.firstname,
                lastname: vm.user.lastname,
                gender: vm.user.gender,
                email: vm.user.email,
                birthday: vm.user.birthday,
                address: vm.user.address
            }).then($state.go("myprofile",{id: vm.userID}));
        };


        function convertDate(user) {
            var date = user.birthday;
            vm.user.birthday = new Date(date);
        };


        function deleteUser(user) {
            return userService.deleteUser(user).then(function() {
                $state.go("home");
                auth.logOut();
            });
        };

        function convertDateToString(birthday) {
            var date = new Date(birthday).toLocaleString().split(" ", 1)[0];
            return date;

        }



    };

})();
