angular.module("flapperNews").config(flapperNewsState)

flapperNewsState.$inject = ['$stateProvider', '$urlRouterProvider']

function flapperNewsState($stateProvider, $urlRouterProvider) {

    $stateProvider.state('home', {
        url: '/home',
        templateUrl: '/home.html',
        controller: 'MainController',
        controllerAs: 'ctrl'
    }).state('posts', {
        url: '/posts/{id}/comments',
        templateUrl: '/posts.html',
        controller: 'CommentController',
        controllerAs: 'ctrl'
    }).state('login', {
        url: '/login',
        templateUrl: '/login.html',
        controller: 'AuthController',
        controllerAs: 'ctrl',
        onEnter: ['$state', 'auth', function($state, auth) {
            if (auth.isLoggedIn()) {
                $state.go('home');
            }
        }]
    }).state('register', {
        url: '/register',
        templateUrl: '/register.html',
        controller: 'AuthController',
        controllerAs: 'ctrl',
        onEnter: ['$state', 'auth', function($state, auth) {
            if (auth.isLoggedIn()) {
                $state.go('home');
            }
        }]
    });
    $urlRouterProvider.otherwise('home');
};
