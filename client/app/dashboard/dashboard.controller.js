(function(){
	'use strict',

	angular
		.module('stickMarkerApp')
		.controller('DashboardCtrl', dashboard)

	dashboard.$inject= ['$scope', 'Api', '$http','$q']
	function dashboard($scope, api, $http,$q){
		let vm= this;
		vm.articles = [];
		vm.deleteArticle= deleteArticle;
		vm.isLoading= true;
		init()

		function init() {
			getAllArticles()
		}

		function getAllArticles() {
			api.getArticles()
			.then(function(res) {
				vm.articles= res.docs;
				vm.articlesCount = res.total;
				vm.isLoading= false;
			})
			.catch(function() {
				console.warn("Error in get all articles.")
			})
		}

		function deleteArticle(id) {
			api.deleteArticle(id)
			.then(getAllArticles)
			.catch(function() {
				console.warn("Error in deleting.")
			})
		}

		  $scope.selected = [];
		  $scope.limitOptions = [5, 10, 15];
		  
		  $scope.options = {
		    rowSelection: true,
		    multiSelect: true,
		    autoSelect: true,
		    decapitate: false,
		    largeEditDialog: false,
		    boundaryLinks: false,
		    limitSelect: true,
		    pageSelect: true
		  };
		  
		  $scope.query = {
		    order: 'title',
		    limit: 5,
		    page: 1
		  };
	}
})()