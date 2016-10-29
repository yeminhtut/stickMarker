(function() {
  'use strict';

  angular.module('stickMarkerApp')
    .controller('LoginCtrl', function ($scope, Auth, $location) {
      let vm= this;
      vm.user = {};
      vm.errors = {};
      vm.login = login;

      function login(form) {
        console.log("login")
        vm.submitted = true;

        if(form.$valid) {
          Auth.login({
            email: vm.user.email,
            password: vm.user.password
          })
          .then( function() {
            // Logged in, redirect to dashboard
            $location.path('/dashboard');
          })
          .catch( function(err) {
            vm.errors.other = err.message;
          });
        }
      };
    });
})()