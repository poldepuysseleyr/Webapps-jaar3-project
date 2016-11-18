(function() {
    'use strict';

    angular.module("flapperNews").controller('MainController', MainController)

    MainController.$inject = ['$log','postService', 'auth']

    function MainController($log,postService, auth) {
        var vm = this;

        vm.isLoggedIn = auth.isLoggedIn;
        vm.posts = [];
        vm.getPosts = getPosts;
        vm.addPost = addPost;
        vm.incrementUpvotes = incrementUpvotes;

        activate();

        function activate(){
          return getPosts().then(function(){
            $log.log("Posts were retrieved");
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
