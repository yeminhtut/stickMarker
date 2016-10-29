(function() {
  'use strict';

  angular.module('stickMarkerApp')
    .controller('EditArticleCtrl', EditArticle)

  EditArticle.$inject= ['Api', '$state', '$scope', '$http', 'socket', 'localStorageService', 'NotiService', 'Auth']
  function EditArticle(api, $state, $scope, $http, socket, localStorageService, NotiService, Auth) {
      let vm= this;
      vm.getCurrentUser = Auth.getCurrentUser;
      vm.articles = [];
      vm.save= saveArticle;
      vm.publish= publishArticle;
      vm.saveSection= saveSection;
      vm.articleId= $state.params.articleId;
      vm.resume= $state.params.resume;
      vm.resumeArticle= resumeArticle;
      vm.editExistingArticle= editExistingArticle;
      let savedData= {}
      init()

      function init(argument) {
        // getArticle();
        isPedingArticle();
        dataTableOptions();
      }

      function isPedingArticle() {
        savedData= localStorageService.get('editingArticle')
        if(savedData){
          if(vm.resume){
            vm.showArticleForm= !0;
            vm.article= savedData;
          }else{
            console.warn(vm.articleId, '5813495ee857845010cb5953')
            if(savedData._id===vm.articleId){
              console.log('savedData')
              vm.showArticleForm= !1;
            }else{
              vm.showArticleForm= !0;
              getArticle();
            }
          }
        }else{
          console.log('savedData else')
            vm.showArticleForm= !0;
            getArticle();
        }
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
        let saveSection={
          _id: vm.articleId,
          title: vm.article.title,
          content: vm.article.content
        }
        localStorageService.set('editingArticle', saveSection);
      }

      function getArticle() {
        api.getArticle(vm.articleId)
        .then(function(res) {
          vm.article= res;
        })
        .catch(function(error){
          console.warn(error);
        })
      }

      function resumeArticle() {
        vm.showArticleForm= !0;
        vm.article= savedData;
      }
      
      function editExistingArticle() {
        vm.showArticleForm= !0;
        getArticle();
        removeStorage('editingArticle');
      }

      function publishArticle(article) {
        api.updateArticle(article, true, vm.articleId)
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
        api.updateArticle(article, false, vm.articleId)
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
        api.createHistory(article)
      }

      vm.realTimePush= "Push";
      socket.syncArticleUpdate('test', vm.realTimePush)
    }
})()