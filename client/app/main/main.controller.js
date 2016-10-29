(function(){
	'use strict',

	angular
		.module('stickMarkerApp')
		.controller('MainCtrl', main)

	main.$inject= ['$scope', 'Api', '$http']
	function main($scope, api, $http){
		var vm= this;
		vm.articles = [];
		init()

		function init() {
			getAllArticles()
		}

		function getAllArticles() {
			api.getArticles()
			.then(function(res) {
				vm.articles= res.docs
				console.log(vm.articles)
			})
			.catch(function() {
				console.warn("Error in get all articles.")
			})
		}

		function goToHome(){
			$location.path('/');
		}
	}
})()
