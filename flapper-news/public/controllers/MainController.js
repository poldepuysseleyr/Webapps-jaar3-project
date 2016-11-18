(function() {
    'use strict';

    angular.module("flapperNews").controller('MainController', MainController)

    MainController.$inject = ['$log', 'postService', 'auth','$stateParams']

    function MainController($log, postService, auth,$stateParams) {
        var vm = this;

        vm.isLoggedIn = auth.isLoggedIn;
        vm.posts = [];
        vm.post;
        vm.getPosts = getPosts;
        vm.getPost = getPost;
        vm.addPost = addPost;
        vm.incrementUpvotes = incrementUpvotes;

        activate();

        function activate() {
          return getPosts();
      };

        function getPosts() {
            postService.getAll().then(function(data) {
                vm.posts = data.data;
                return vm.posts;
            });
        };

        function getPost() {
            return postService.get($stateParams.id).then(function(data) {
                vm.post = data;
            })
        }

        function addPost() {
            if (!vm.title || vm.title === '') {
                return;
            }
            postService.create({
                title: vm.title,
                link: vm.link,
            });
            vm.title = '';
            vm.link = '';
        };

        function incrementUpvotes(post) {
            postService.upvote(post);
        }




    }
})();
