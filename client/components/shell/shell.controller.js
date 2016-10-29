'use strict';

angular.module('stickMarkerApp')
  .controller('ShellCtrl', function ($mdSidenav, $state, localStorageService, $mdDialog, $scope, $location, Auth) {
    let vm= this;
    vm.isLoggedIn = Auth.isLoggedIn;
    vm.isAdmin = Auth.isAdmin;
    vm.getCurrentUser = Auth.getCurrentUser;
    vm.pauseArticle= localStorageService.get('editingArticle')
    vm.resumeWriting= resumeWriting;
    
    vm.logout = logout
    function logout() {
      Auth.logout();
      $location.path('/login');
    };

    function resumeWriting() {
      if(vm.pauseArticle._id){
        $state.go('editResumeArticle', {resume: true, articleId: vm.pauseArticle._id});
      }else{
        $state.go('createResumeArticle', {resume: true});
      }
    };

    vm.isActive = function(route) {
      return route === $location.path();
    };

    vm.toggleLeft = function() {
      $mdSidenav('left').toggle();
    };

    let originatorEv;
    vm.openMenu = function($mdOpenMenu, ev) {
      originatorEv = ev;
      $mdOpenMenu(ev);
    };

    vm.showAddDialog = function($event) {
      var parentEl = angular.element(document.body);
      $mdDialog.show({
        parent: parentEl,
        targetEvent: $event,
        templateUrl: 'components/shell/dialog/dialog.html',
        controller: 'DialogController'
      });
    };
  });
