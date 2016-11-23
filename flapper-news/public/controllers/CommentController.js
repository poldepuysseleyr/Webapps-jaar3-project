(function() {

    angular.module("flapperNews").controller('CommentController', CommentController)

    CommentController.$inject = ['$log', 'commentService', 'auth', '$stateParams', 'postService']

    function CommentController($log, commentService, auth, $stateParams, postService) {

        var vm = this;
        vm.comments = [];
        vm.comment;
        vm.postid;
        vm.post;
        vm.message;
        vm.error;

        vm.getComments = getComments;
        vm.addComment = addComment;
        vm.incrementUpvotes = incrementUpvotes;
        vm.incrementDownvotes = incrementDownvotes;
        vm.deleteComment = deleteComment;
        vm.getPost = getPost;
        vm.isLoggedIn = auth.isLoggedIn;

        activate();

        function activate() {
            getComments();

        }

        function getComments() {
            return commentService.getAll($stateParams.id).then(function(data) {
                vm.comments = data.data;
                vm.postid = $stateParams.id;
                getPost();
                return vm.comments;
            })
        }

        function addComment() {
            if (vm.body === ''  || !vm.body) {
                vm.message = "You can't post an empty comment!";
                return;
            };
            vm.message = null;
            commentService.addComment($stateParams.id, {
                body: vm.body,
                author: 'user',
            }).success(function(comment) {
                vm.comments.push(comment);
            });
            vm.body = '';
        };

        function incrementUpvotes(comment) {
            commentService.upvoteComment(vm.postid, comment);
        };

        function incrementDownvotes(comment) {
            commentService.downvoteComment(vm.postid, comment);
        };

        function deleteComment(comment) {
            if(comment.author != auth.currentUser()){
              vm.error = "Unauthorized: only the author can remove comments.";
              return;
            }
            vm.error = null;
            return commentService.deleteComment(vm.postid, comment).then(
                getComments());
        }

        function getPost() {
            return postService.get(vm.postid).then(function(data) {
                vm.post = data;
            })
        };


    };
})();
