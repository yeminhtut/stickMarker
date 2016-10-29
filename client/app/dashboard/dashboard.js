(function() {
	'use strict';

	angular.module('stickMarkerApp')
	  .config(function ($stateProvider) {
	    $stateProvider
	      .state('dashboard', {
	        url: '/dashboard',
	        templateUrl: 'app/dashboard/dashboard.html',
	        controller: 'DashboardCtrl',
	        controllerAs: 'vm',
	        authenticate: true
	      })
	  })
	  
})()