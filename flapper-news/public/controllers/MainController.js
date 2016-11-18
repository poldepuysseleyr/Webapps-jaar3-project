(function() {
    'use strict';

    angular.module("flapperNews").controller('MainController', MainController)

    MainController.$inject = ['$log','postService', 'auth']

    function MainController($log,postService, auth) {
        var vm = this;

        vm.isLoggedIn = auth.isLoggedIn;
        vm.posts = [];
        vm.post;
        vm.getPosts = getPosts;
        vm.getPost = getPost;
        vm.addPost = addPost;
        vm.incrementUpvotes = incrementUpvotes;

        activate();

        function activate(){
          return getPosts().then(function(){
            $log.log("Posts were retrieved");
          })
        };

        function getPosts(){
          postService.getAll().then(function(data){
            $log.log("getPosts in MainController was called");
            vm.posts = data.data;
            return vm.posts;
          })
        };

        function getPost(){
          return postService.get($stateParams.id).then(function(data){
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

        function incrementUpvotes(post){
          postService.upvote(post);
        }




    }
})();
