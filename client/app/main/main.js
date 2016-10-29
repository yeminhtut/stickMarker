(function() {
  'use strict';

  angular.module('stickMarkerApp')
    .config(function ($stateProvider) {
      $stateProvider
        .state('main', {
          url: '/',
          templateUrl: 'app/main/main.html',
          controllerAs: 'vm',
          controller: 'MainCtrl'
        })
        .state('changePassword', {
          url: '/settings',
          templateUrl: 'app/account/settings/settings.html',
          controller: 'SettingsCtrl',
          authenticate: true
        })
    });
})()