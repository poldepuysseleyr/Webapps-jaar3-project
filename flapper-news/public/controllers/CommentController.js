(function() {

    angular.module("flapperNews").controller('CommentController', CommentController)

    CommentController.$inject = ['$log', 'commentService', 'auth', '$stateParams', 'postService']

    function CommentController($log, commentService, auth, $stateParams, postService) {

        var vm = this;
        vm.allComments = [];
        vm.comments = [];
        vm.comment;
        vm.postid;
        vm.post;

        vm.getAllComments = getAllComments;
        vm.getComments = getComments;
        vm.addComment = addComment;
        vm.incrementUpvotes = incrementUpvotes;
        vm.incrementDownvotes = incrementDownvotes;
        vm.deleteComment = deleteComment;
        vm.getPost = getPost;
        vm.isLoggedIn = auth.isLoggedIn;

        activate();

        function activate() {
            getAllComments();
            getComments();

        }

        function getAllComments() {
            return commentService.getAllComments().then(function(data) {
                vm.allComments = data.data;
            });
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
            if (vm.body === '') {
                return;
            }
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
