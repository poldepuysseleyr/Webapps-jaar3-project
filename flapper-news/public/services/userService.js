(function() {

    'use strict';

    angular.module('flapperNews').factory('userService', userService);

    userService.$inject = ['$http', '$log','auth']

    function userService($http, $log, auth) {

        var auth = {};
        var service = {
            get:get,
            getAll:getAll,
            update:update,
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
            return $http.put('/users/' + id, user).success(function(data) {
                return data;
            });
        };


    }

})();
