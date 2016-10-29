(function() {
	'use strict';

	angular.module('stickMarkerApp')
	  .config(function ($stateProvider) {
	    $stateProvider
	      .state('createArticle', {
	        url: '/article/create',
	        templateUrl: 'app/article/article.html',
	        controller: 'ArticleCtrl',
	        controllerAs: 'vm',
	        authenticate: true
	      })
	      .state('createResumeArticle', {
	        url: '/article/create/:resume',
	        templateUrl: 'app/article/article.html',
	        controller: 'ArticleCtrl',
	        controllerAs: 'vm',
	        authenticate: true
	      })
	      .state('editResumeArticle', {
	        url: '/article/edit/:resume/:articleId',
	        templateUrl: 'app/article/edit-article.html',
	        controller: 'EditArticleCtrl',
	        controllerAs: 'vm',
	        authenticate: true
	      })
	      .state('editArticle', {
	        url: '/article/edit/:articleId',
	        templateUrl: 'app/article/edit-article.html',
	        controller: 'EditArticleCtrl',
	        controllerAs: 'vm',
	        authenticate: true
	      })
	  });
})()