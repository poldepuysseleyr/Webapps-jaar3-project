(function(){

angular.module("flapperNews").controller('CommentController', CommentController)

CommentController.$inject = ['commentService', 'post', 'auth']

function CommentController(commentService, post, auth) {

    var vm = this;
    vm.isLoggedIn = auth.isLoggedIn;
    vm.post = post;
    vm.addComment = addComment;
    vm.incrementUpvotes = incrementUpvotes;


    function addComment(){
      if (vm.body === '') {
          return;
      }
      commentService.addComment(post._id, {
          body: vm.body,
          author: 'user',
      }).success(function(comment) {
          vm.post.comments.push(comment);
      });
      vm.body = '';
    };

    function incrementUpvotes(comment){
      commentService.upvoteComment(post,comment);
    };


};
})();
