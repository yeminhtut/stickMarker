(function() {
  'use strict';

  angular.module('stickMarkerApp')
    .controller('ArticleCtrl', Article)

  Article.$inject= ['Api', '$state', '$scope', '$http', 'socket', 'localStorageService', 'NotiService', 'Auth']
  function Article(api, $state, $scope, $http, socket, localStorageService, NotiService, Auth) {
      let vm= this;
      vm.getCurrentUser = Auth.getCurrentUser;
      vm.articles = [];
      vm.save= saveArticle;
      vm.publish= publishArticle;
      vm.saveSection= saveSection;
      vm.starNewArticle= starNewArticle;
      vm.resumeArticle= resumeArticle;
      vm.showArticleForm= !1;
      vm.resume= $state.params.resume;
      let savedData= {}
      init()

      function init(argument) {
        savedData= localStorageService.get('editingArticle')
        dataTableOptions();
        isPedingArticle()
      }

      function isPedingArticle() {
        if(savedData){
          if(vm.resume && !savedData._id){
            vm.showArticleForm= !0;
            vm.article= savedData;
          }else{
            vm.showArticleForm= !1;
          }
        }else{
            vm.showArticleForm= !0;
        }
      }

      function resumeArticle() {
        vm.showArticleForm= !0;
        vm.article= savedData
      }

      function starNewArticle() {
        vm.showArticleForm= !0;
        vm.article= {};
        removeStorage('editingArticle');
      }

      function dataTableOptions() {
        vm.query = {
          order: 'title',
          limit: 5,
          page: 1
        };
        vm.selected = [];
      }

      function saveSection(){
        localStorageService.set('editingArticle', vm.article);
      }

      function publishArticle(article) {
        api.createArticle(article, true)
        .then(createHistory)
        .then(removeStorage('editingArticle'))
        .then(redirectToDashboard)
        .then(function() {
          console.warn("success all")
        })
        .catch(function(error){
          console.warn(error);
        })
      }

      function removeStorage(key) {
         return localStorageService.remove(key);
      }

      function saveArticle(article) {
        api.createArticle(article, false)
        .then(createHistory)
        .then(removeStorage('editingArticle'))
        .then(redirectToDashboard)
        .then(function() {
          console.warn("success all")
        })
        .catch(function(error){
          console.warn(error);
        })
      }

      function redirectToDashboard() {
        NotiService.successToast('Successfully saved the article', 0) 
        $state.go('dashboard');
      }

      function createHistory(article) {
        api.updateHistory(article)
      }

      let testSocket= socket.syncArticleUpdate('articleUpdate', vm.article)

    }
})()