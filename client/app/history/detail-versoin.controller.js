(function() {
  'use strict';

  angular.module('stickMarkerApp')
    .controller('DetailVersionCtrl', detail)

  detail.$inject= ['$scope', '$state', 'Api', 'socket', 'localStorageService', 'NotiService']
  function detail($scope, $state, api, socket, localStorageService, NotiService) {
    let vm= this;
    vm.revisionId= $state.params.versionId;
    vm.articleId= $state.params.articleId;
    vm.revisionList= [];
    init()

    function init() {
      getHistory(vm.revisionId)
      getVersions(vm.articleId)
    }

    function getHistory(id) {
      api.getHistory(id)
      .then(function(res) {
        res.content= removeHtmlTags(res.content)
        vm.revision= res
      })
      .catch(function() {
        console.warn("Error in get all histories.")
      })
    }

    function removeHtmlTags(text) {
      return text? String(text).replace(/<[^>]+>/gm, '') : '';
    }

    function getVersions(articleId) {
      api.getVersions(articleId)
      .then(getSeclectionVerion)
      .catch(function() {
        console.warn("Error in get all articles.")
      })
    }

    function getSeclectionVerion(data) {
      vm.revisionList= data
      vm.selectedVersion= data
        .find(function(revision) {
          return vm.revisionId == revision._id
        })
    }

    function deleteVersion(id) {
      api.deleteVersion(id)
      .then(getHistory)
      .then(successNoti('Successfully delete the history'))
      .catch(function() {
        console.warn("Error in deleting.")
      })
    }

    function successNoti(message) {
      NotiService.successToast(message, 0) 
    }
  }
})()