(function() {

    'use strict';

    angular.module("flapperNews").directive('errorsDirective', errorsDirective);

    function errorsDirective() {

        var directive = {
            restrict: 'EA',
            scope: {
                error: '@'
            },
            templateUrl: '/templates/errors.html'
        };

        return directive;

    };



})();
