'use strict';

angular.module('stickMarkerApp')
  .controller('AdminCtrl', function ($scope, $http, Auth, User) {
    let vm= this;
    vm.users = User.query();
    vm.delete = deleteUser;

    function deleteUser(user) {
      User.remove({ id: user._id });
      angular.forEach(vm.users, function(u, i) {
        if (u === user) {
          vm.users.splice(i, 1);
        }
      });
    };
  });
