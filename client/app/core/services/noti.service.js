(function() {
	'use strict';

	angular
		.module('stickMarkerApp')
	  .factory('NotiService', Noti) 

	  Noti.$inject= ['$mdToast']
	  function Noti($mdToast){
	    const toastOption = {
	        bottom: false,
	        top: true,
	        left: false,
	        right: true
      };

	    return {
	    	successToast: successToast,
	    	showAlert: showAlert
	    }

      function toastPosition() {
        return Object.keys(toastOption)
          .filter(function(pos) { return toastOption[pos]; })
          .join(' ');
      };

      function successToast(content, delay= 0) {
        $mdToast.show(
          $mdToast.simple()
            .content(content)
            .position(toastOption)
            .hideDelay(delay)
        );
      };
	      
      function showAlert(ev, title= '', content= '', label, confirmText) {
        $mdDialog.show(
          $mdDialog.alert()
            .title(title)
            .content(content)
            .ariaLabel(label)
            .ok(confirmText)
            .targetEvent(ev)
        );
      };
	  }
})()