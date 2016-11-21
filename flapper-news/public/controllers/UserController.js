(function() {
    'use strict';

    angular.module("flapperNews").controller('UserController', UserController)

    UserController.$inject = ['$log', 'userService', 'auth', '$stateParams', 'postsUser', '$filter', '$state','commentService']

    function UserController($log, userService, auth, $stateParams, postsUser, $filter, $state,commentService) {
        var vm = this;

        vm.isLoggedIn = auth.isLoggedIn;
        vm.commentsOfPost = [];
        vm.user = {};
        vm.userID;
        vm.username = auth.currentUser();
        vm.posts = $filter('filter')(postsUser.data, {
            author: vm.username
        });
        vm.error;


        vm.getUser = getUser;
        vm.getUserID = getUserID;
        vm.updateUser = updateUser;
        vm.convertDate = convertDate;
        vm.getCommentsOfPost = getCommentsOfPost;


        activate();

        function activate() {
            getUserID();
            getUser();
        };

        function getUser() {
            userService.get(vm.userID).then(function(data) {
                vm.user = data.data;
                convertDate(vm.user);
                return vm.user;
            });
        };

        function getUserID() {
            vm.userID = auth.currentUserId();
            return vm.userID;
        };

        function updateUser() {
          $log.log("binnengekomen")
            vm.userID = auth.currentUserId();
            if(convertDate(vm.user.birthday) >= new Date()){
              vm.error = "Birthday must be in the past!"
            }
            vm.error = null;
            return userService.update(vm.userID, {
                username: vm.user.username,
                firstname: vm.user.firstname,
                lastname: vm.user.lastname,
                gender: vm.user.gender,
                email: vm.user.email,
                birthday: vm.user.birthday,
                address: vm.user.address
            }).then($state.go("home"));
        };


        function convertDate(user) {
            var date = vm.user.birthday;
            vm.user.birthday = new Date(date);
        };

        function getCommentsOfPost(post){
          var id = post._id;
          return commentService.getAll(id).then(function(data){
          vm.commentsOfPost = data.data;
          });
        };



    };

})();
