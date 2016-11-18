(function() {

    angular.module("flapperNews").controller('CommentController', CommentController)

    CommentController.$inject = ['$log','commentService', 'auth', '$stateParams']

    function CommentController($log, commentService, auth, $stateParams) {

        var vm = this;
        vm.comments = [];
        vm.comment;



        vm.getComments = getComments;
        vm.addComment = addComment;
        vm.incrementUpvotes = incrementUpvotes;
        vm.isLoggedIn = auth.isLoggedIn;

        activate();

        function activate() {
            getComments();
            $log.log("aangeroepen");
        }

        function getComments(){
          return commentService.getAll($stateParams.id).then(function(data){
            vm.comments = data.data;
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
            commentService.upvoteComment(post, comment);
        };


    };
})();
