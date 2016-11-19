(function() {
    'use strict';

    angular.module("flapperNews").controller('UserController', UserController)

    UserController.$inject = ['$log', 'userService', 'auth','$stateParams']

    function UserController($log, userService, auth, $stateParams) {
        var vm = this;

        vm.isLoggedIn = auth.isLoggedIn;
        vm.user = {};

        vm.getUser = getUser;
        // vm.getPost = getPost;
        // vm.addPost = addPost;
        // vm.incrementUpvotes = incrementUpvotes;
        // vm.incrementDownvotes = incrementDownvotes;

        activate();

        function activate() {
          return getUser();
      };

        function getUser() {
          userService.get($stateParams.id).then(function(data) {
                vm.user = data.data;
                return vm.user;
            });
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




    }
})();
