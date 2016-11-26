(function(){
  'use strict';

  angular.module("flapperNews").factory('commentService', commentService );

  commentService.$inject = ['$log','$http','auth']

  function commentService($log,$http,auth){

    var service = {
      getAll:getAll,
      addComment:addComment,
      upvoteComment:upvoteComment,
      downvoteComment:downvoteComment,
      deleteComment: deleteComment
    }

    return service;

    ////////////

    function getAll(id){
      return $http.get('/posts/' + id + '/comments').success(function(data) {
          return data;
      });
    };

    function addComment(id,comment){
      $log.log("addComment aangeroepen");
      return $http.post('/posts/' + id + '/comments', comment, {
          headers: {
              Authorization: 'Bearer ' + auth.getToken()
          }
      });
    };

    function upvoteComment(postid,comment){
      return $http.put('/posts/' + postid + '/comments/' + comment._id + '/upvote', null, {
          headers: {
              Authorization: 'Bearer ' + auth.getToken()
          }
      }).success(function(data) {
          comment.upvotes += 1;
      });
    };

    function downvoteComment(postid,comment){
      return $http.put('/posts/' + postid + '/comments/' + comment._id + '/downvote', null, {
          headers: {
              Authorization: 'Bearer ' + auth.getToken()
          }
      }).success(function(data) {
          comment.upvotes -= 1;
      });
    };

    function deleteComment(postid,comment){
      return $http.delete('/posts/' + postid + '/comments/' + comment._id,{
        headers: {
          Authorization : 'Bearer ' + auth.getToken()
        }
      }).success(function(data){
        return data;
      });
    }


  }

})();
