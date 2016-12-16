(function() {
    'use strict';

    angular.module("flapperNews").controller('MainController', MainController)

    MainController.$inject = ['$log', 'postService', 'auth', '$stateParams', '$state','$filter']

    function MainController($log, postService, auth, $stateParams, $state,$filter) {
        var vm = this;

        vm.isLoggedIn = auth.isLoggedIn;
        vm.user = auth.currentUser;
        vm.posts = [];
        vm.post;
        vm.error;
        vm.filter;

        vm.getPosts = getPosts;
        vm.getPost = getPost;
        vm.addPost = addPost;
        vm.incrementUpvotes = incrementUpvotes;
        vm.incrementDownvotes = incrementDownvotes;
        vm.deletePost = deletePost;
        vm.modifyPost = modifyPost;
        vm.filterPosts = filterPosts;


        activate();

        function activate() {
            return getPosts();

        };

        function getPosts() {
            postService.getAll().then(function(data) {
                vm.posts = data.data;
                if (vm.filter){
                  filterPosts(vm.posts);
                }
            });
        };

        function getPost() {
            return postService.get($stateParams.id).then(function(data) {
                vm.post = data;
            })
        };

        function addPost() {
            if (!vm.title || vm.title === '' || !vm.text || vm.text.trim() === "") {
                    vm.error = "You need to add a title or text before you can post!";
                    return;
            };
            vm.error = null;
            postService.create({
                title: vm.title,
                link: vm.link,
                text : vm.text,
            }).then(function(data) {
                vm.posts.push(data.data);
                vm.title = '';
                vm.link = '';
                vm.text = '';

            });
        };

        function incrementUpvotes(post) {
            postService.upvote(post);
        };

        function incrementDownvotes(post) {
            postService.downvote(post);
        };

        function deletePost(post) {
          if(post.author != auth.currentUser()){
            vm.error = "Unauthorized: only the author can remove this post.";
            return;
          }
          vm.error = null;
            return postService.deletePost(post).then(function() {
                $state.go('home');
                getPosts();
            });
        };

        function modifyPost() {
            if (!vm.post.title || vm.post.title === ''|| !vm.post.text || vm.post.text.trim() === "") {
                vm.error = "Title or text can not be empty!";
                return;
            }
            vm.error = null;
            return postService.update($stateParams.id, {
                title: vm.post.title,
                link: vm.post.link,
                text:vm.post.text
            }).then(function(){
              getPosts();
              $state.go("home");
            });
        };

        function filterPosts(){
          vm.posts = $filter('filter')(vm.posts, {
              author: auth.currentUser()
          });
          return vm.posts;
        };
    }
})();
