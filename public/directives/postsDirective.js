(function() {

    'use strict';

    angular.module("flapperNews").directive('postsDirective', postsDirective);

    function postsDirective() {

        var directive = {
            restrict: 'EA',
            scope: {
                posts: '=?',
                filter: '@'
            },
            controller: 'MainController',
            controllerAs: 'vm',
            templateUrl: '/templates/posts.html',
            bindToController: true,
            link: function(scope, elem, attrs) {
                if (scope.vm.filter) {
                    scope.vm.filterPosts();
                };

                console.log(attrs);
            }
        };

        return directive;

    };



})();
