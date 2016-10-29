(function() {
	'use strict';

	angular.module('stickMarkerApp')
	  .config(function ($stateProvider) {
	    $stateProvider
	      .state('admin', {
	        url: '/admin',
	        templateUrl: 'app/admin/admin.html',
	        controller: 'AdminCtrl',
	        controllerAs: 'vm'
	      });
	  });
})()