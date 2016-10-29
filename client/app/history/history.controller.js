(function() {
  'use strict';

  angular.module('stickMarkerApp')
    .controller('HistoryCtrl', History)

  History.$inject= ['$scope', '$state', 'Api', 'socket', 'localStorageService', 'NotiService']
  function History($scope, $state, api, socket, localStorageService, NotiService) {
    let vm= this;
    vm.revisions = [];
    vm.deleteHistory= deleteHistory;
    vm.articleId= $state.params.articleId;
    vm.isLoading= true;
    init()

    function init() {
      getAllHistory(vm.articleId)
    }

    function getAllHistory(articleId) {
      api.getHistories(articleId)
      .then(function(res) {
        vm.revisions= res.docs.map(function(revision) {
          revision.content= removeHtmlTags(revision.content)
          return revision;
        })
        vm.isLoading= false;
        console.log("Get all history.", res.docs)
      })
      .catch(function() {
        console.warn("Error in get all articles.")
      })
    }

    function removeHtmlTags(text) {
      return text? String(text).replace(/<[^>]+>/gm, '') : '';
    }

    function deleteHistory(revision) {
      api.deleteHistory(revision)
      .then(function(){
        getAllHistory(vm.articleId)
      })
      .catch(function() {
        console.warn("Error in deleting.")
      })
    }

    function successNoti(message) {
      console.log("Delete Success.")
      NotiService.successToast(message, 0) 
    }
  }

})()
