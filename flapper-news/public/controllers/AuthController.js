(function(){

  angular.module("flapperNews").controller('AuthController', AuthController)

  AuthController.$inject = ['$log','$state', 'auth']

  function AuthController($log, $state, auth) {
      var vm = this;
      vm.user = {};
      vm.register = register;
      vm.logIn = logIn;
      vm.logOut = logOut;



      function register(){
        auth.register(vm.user).error(function(error){
          vm.error = error;
          $log.log("Register is called in AuthController");
        }).then(function(){
          $state.go('home');
        })
      };


      function logIn(){
          auth.logIn(vm.user).error(function(error) {
              vm.error = error;
          }).then(function() {
              $state.go('home');
          });
      };

      function logOut(){
        auth.logOut();
      }
  };

})();
