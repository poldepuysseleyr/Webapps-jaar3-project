(function() {
    'use strict';

    angular.module("flapperNews").factory('postService', postService);

    postService.$inject = ['$log', '$http', 'auth']

    function postService($log, $http, auth) {

        var service = {
            getAll: getAll,
            create: create,
            upvote: upvote,
            downvote: downvote,
            get: get,
            deletePost: deletePost,
            update: update,
        }

        return service;

        ////////////

        function getAll() {
            return $http.get('/posts').success(function(data) {
                return data;
            });
        };

        function create(post) {
            return $http.post('/posts', post, {
                headers: {
                    Authorization: 'Bearer ' + auth.getToken()
                }
            }).success(function(data) {
                return data;
            });
        };

        function upvote(post) {
            return $http.put('/posts/' + post._id + '/upvote', null, {
                headers: {
                    Authorization: 'Bearer ' + auth.getToken()
                }
            }).success(function(data) {
                post.upvotes += 1;
            });
        };

        function downvote(post) {
            return $http.put('/posts/' + post._id + '/downvote', null, {
                headers: {
                    Authorization: 'Bearer ' + auth.getToken()
                }
            }).success(function(data) {
                post.upvotes -= 1;
            });
        };

        function get(id) {
            return $http.get('/posts/' + id).then(function(res) {
                return res.data;
            });
        };

        function deletePost(post) {
            return $http.delete('/posts/' + post._id, {
                headers: {
                    Authorization: 'Bearer' + auth.getToken()
                }
            }).then(function(res) {
                return res.data;
            })
        };

        function update(id, post) {
            return $http.put('/posts/' + id, post, {
                headers: {
                    Authorization: 'Bearer' + auth.getToken()
                }
            }).success(function(data) {
                return data;
            });

        };




    }

})();
