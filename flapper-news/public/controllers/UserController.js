(function() {
    'use strict';

    angular.module("flapperNews").controller('UserController', UserController)

    UserController.$inject = ['$log', 'userService', 'auth', '$stateParams', 'postsUser', 'commentsUser', '$filter', '$state']

    function UserController($log, userService, auth, $stateParams, postsUser, commentsUser, $filter, $state) {
        var vm = this;

        vm.isLoggedIn = auth.isLoggedIn;
        vm.user = {};
        vm.userID;
        vm.username = auth.currentUser();
        vm.posts = $filter('filter')(postsUser.data, {
            author: vm.username
        });
        vm.comments = $filter('filter')(commentsUser.data, {
            author: vm.username
        });
        vm.getUser = getUser;
        vm.getUserID = getUserID;
        vm.updateUser = updateUser;
        vm.convertDate = convertDate;


        activate();

        function activate() {
            getUserID();
            getUser();
            $log.log(vm.username);
            $log.log(vm.posts);
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
            $log.log("binnengekomen");
            vm.userID = auth.currentUserId();
            if (!vm.user.username || vm.user.username === '' || !vm.user.firstname || vm.user.firstname === '' || !vm.user.lastname || vm.user.lastname === '') {
                return;
            }
            return userService.update(vm.userID, {
                username: vm.user.username,
                firstname: vm.user.firstname,
                lastname: vm.user.lastname,
                gender: vm.user.gender,
                email: vm.user.email,
                birthday: vm.user.birthday,
                address: vm.user.address,
            }).then($state.go("home"));
        };


        function convertDate(user) {
            var date = vm.user.birthday;
            vm.user.birthday = new Date(date);
        }




    };






    // function getPost() {
    //     return postService.get($stateParams.id).then(function(data) {
    //         vm.post = data;
    //     })
    // }
    //
    // function addPost() {
    //     if (!vm.title || vm.title === '') {
    //         return;
    //     }
    //     postService.create({
    //         title: vm.title,
    //         link: vm.link,
    //     });
    //     vm.title = '';
    //     vm.link = '';
    // };
    //
    // function incrementUpvotes(post) {
    //     postService.upvote(post);
    // }
    //
    // function incrementDownvotes(post){
    //   postService.downvote(post);
    // }





})();
