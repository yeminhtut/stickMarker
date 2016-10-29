(function() {
  'use strict';

  angular.module('stickMarkerApp')
    .controller('SettingsCtrl', function ($scope, $state, User, Auth) {
      let vm= this;
      vm.errors = {};
      vm.changePassword= changePassword;

      function changePassword(form) {
        vm.submitted = true;
        if(form.$valid) {
          Auth.changePassword( vm.user.oldPassword, vm.user.newPassword )
          .then( function() {
            vm.message = 'Password successfully changed.';
            $state.go('dashboard')
          })
          .catch( function() {
            form.password.$setValidity('mongoose', false);
            vm.errors.other = 'Incorrect password';
            vm.message = '';
          });
        }
      };
    });

})()