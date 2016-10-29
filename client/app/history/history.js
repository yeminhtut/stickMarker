(function() {
	'use strict';

	angular.module('stickMarkerApp')
	  .config(function ($stateProvider) {
	    $stateProvider
	      .state('history', {
	        url: '/history',
	        templateUrl: 'app/history/history.html',
	        controller: 'HistoryCtrl'
	      })
	     .state('allHistory', {
	       url: '/history/:articleId',
	       templateUrl: 'app/history/history.html',
	       controller: 'HistoryCtrl',
	       controllerAs: 'vm',
	       authenticate: true
	     })
	     .state('compareVersion', {
	       url: '/history/:articleId/detail/:versionId',
	       templateUrl: 'app/history/detail-version.html',
	       controller: 'DetailVersionCtrl',
	       controllerAs: 'vm',
	       authenticate: true
	     })
	  })
	  
})()