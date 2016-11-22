(function() {

    'use strict';

    angular.module('flapperNews').factory('userService', userService);

    userService.$inject = ['$http', '$log','auth']

    function userService($http, $log, auth) {

        var service = {
            get:get,
            getAll:getAll,
            update:update,
            deleteUser: deleteUser
        };


        return service;

        function get(id) {
            return $http.get('/users/' + id).success(function(data){
              return data;
            });
        };
        function getAll() {
            return $http.get('/users').success(function(data) {
                return data;

            });
        };

        function update(id,user){
          $log.log("userservice update")
            return $http.put('/users/' + id, user, {
                headers: {
                    Authorization: 'Bearer' + auth.getToken()
                }
            }).success(function(data) {
                return data;
            });
        };

        function deleteUser(user){
            return $http.delete('/users/' + user._id, {
                headers: {
                    Authorization: 'Bearer' + auth.getToken()
                }
            }).then(function(res) {
                return res.data;
            })
        }


    }

})();
