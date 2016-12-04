angular.module("flapperNews").config(flapperNewsState)

flapperNewsState.$inject = ['$stateProvider', '$urlRouterProvider']

function flapperNewsState($stateProvider, $urlRouterProvider) {

    $stateProvider.state('home', {
        url: '/home',
        templateUrl: '/templates/home.html',
        controller: 'MainController',
        controllerAs: 'ctrl'
    }).state('posts', {
        url: '/posts/{id}/comments',
        templateUrl: '/templates/posts.html',
        controller: 'CommentController',
        controllerAs: 'ctrl'
    }).state('login', {
        url: '/login',
        templateUrl: '/templates/login.html',
        controller: 'AuthController',
        controllerAs: 'ctrl',
        onEnter: ['$state', 'auth', function($state, auth) {
            if (auth.isLoggedIn()) {
                $state.go('home');
            }
        }]
    }).state('register', {
        url: '/register',
        templateUrl: '/templates/register.html',
        controller: 'AuthController',
        controllerAs: 'ctrl',
        onEnter: ['$state', 'auth', function($state, auth) {
            if (auth.isLoggedIn()) {
                $state.go('home');
            };
        }]
    }).state('myprofile', {
        url: '/myprofile/{id}',
        templateUrl: '/templates/myprofile.html',
        controller: 'UserController',
        controllerAs: 'ctrl',
        onEnter: ['$state', 'auth', function($state, auth) {
            if (!auth.isLoggedIn()) {
                $state.go('home');
            };
        }],
        resolve: {
            postsUser: ['postService', function(postService) {
                return postService.getAll();
            }]
        }
    }).state('modifypost', {
        url: '/posts/{id}',
        templateUrl: '/templates/modifypost.html',
        controller: 'MainController',
        controllerAs: 'ctrl',
        onEnter: ['$state', 'auth', function($state, auth) {
            if (!auth.isLoggedIn()) {
                $state.go('home');
            }
        }]
    }).state('modifyuser', {
        url: '/users/{id}',
        templateUrl: '/templates/modifyuser.html',
        controller: 'UserController',
        controllerAs: 'ctrl',
        onEnter: ['$state', 'auth', function($state, auth) {
            if (!auth.isLoggedIn()) {
                $state.go('home');
            }
        }],
        resolve: {
            postsUser: function(){
              return { data: []}
            }
        }
    });
    //ZET UIT VOOR TESTEN
    $urlRouterProvider.otherwise('home');
};
