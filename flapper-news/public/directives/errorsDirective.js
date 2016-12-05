(function() {

    'use strict';

    angular.module("flapperNews").directive('errorsDirective', errorsDirective);

    function errorsDirective($timeout) {

        var directive = {
            restrict: 'EA',
            scope: {
                error: '@'
            },
            link: function(scope, elem, attrs) {
              var element = elem;
              var div = angular.element(elem[0].querySelector('.alert'));
                div.bind('click', function() {
                  div.addClass('animated hinge');
                  $timeout(function(){
                    elem.remove();
                  },2000);
                });
                elem.bind('mouseover', function() {
                    elem.css('cursor', 'pointer');
                });
            },
            templateUrl: '/templates/errors.html'
        };

        return directive;

    };



})();
