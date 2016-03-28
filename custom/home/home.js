app.config(function($stateProvider) {
    $stateProvider.state('home', {
        url: '',
        templateUrl: 'custom/home/home.html',
        controller: 'HomeCtrl'
    })
});

app.controller("HomeCtrl", function($scope, $rootScope, $state, Storage, SchemaFactory, $uibModal, ModalSvc) {
	if(!Storage.isProjLoaded()){
		ModalSvc.open();
		// var modalInstance = $uibModal.open({
		// 	      animation: true,
		// 	      templateUrl: 'custom/home/newprojmodal.html',
		// 	      controller: 'ModalInstanceCtrl',
		// 	      size: 'lg',
		// 	      backdrop: 'static',
		// 	      keyboard  : false,
		// 	      resolve: {
		// 	        items: function () {
		// 	          return [];
		// 	        }
		// 	      }
		// 	    });

		// 	    modalInstance.result.then(function (result) {
		// 	      if(result.action=="load"){
		// 	      	Storage.loadConfStore(result.dir);
		// 			SchemaFactory.initialize();
		// 			$rootScope.$broadcast('newSchema');
		// 			$state.go('visualizer');
		// 	      } 
		// 	      if(result.action=="new"){
		// 	      	Storage.newConfStore(result.projName, result.dirName);
		// 	      	SchemaFactory.initialize();
		// 	      	$rootScope.$broadcast('newSchema');
		// 	      	$state.go('visualizer');
		// 	      } 
		// 	    }, function (errMsg) {
		// 	      console.log('Modal dismissed at: ' + new Date(), " ", errMsg);
		// 	    });
	} else {
		$state.go('visualizer')
	}
});

app.service('ModalSvc', function($rootScope, $state, Storage, SchemaFactory, $uibModal) {

		return {

			open: function(){
				console.log("KAKALKALKALKA");
			    var modalInstance = $uibModal.open({
			      animation: true,
			      templateUrl: 'custom/home/newprojmodal.html',
			      controller: 'ModalInstanceCtrl',
			      size: 'lg',
			      backdrop: 'static',
			      keyboard  : false,
			      resolve: {
			        items: function () {
			          return [];
			        }
			      }
			    });

			    modalInstance.result.then(function (result) {
			      if(result.action=="load"){
			      	Storage.loadConfStore(result.dir);
					SchemaFactory.initialize();
					$rootScope.$broadcast('newSchema');
					$state.go('visualizer');
			      } 
			      if(result.action=="new"){
			      	Storage.newConfStore(result.projName, result.dirName);
			      	SchemaFactory.initialize();
			      	$rootScope.$broadcast('newSchema');
			      	$state.go('visualizer');
			      } 
			    }, function (errMsg) {
			      console.log('Modal dismissed at: ' + new Date(), " ", errMsg);
			    });
			}

		}

});

app.controller("ModalInstanceCtrl", function($scope, $uibModalInstance, Storage, $state) {
	
	$scope.makingNewProj = false;

	$scope.newProject = function (projName) {
		var remote = require('remote');
        var dialog = remote.require('dialog');
        dialog.showOpenDialog({ properties: ['openDirectory'] }, function(dirNamesArr) {
			$scope.makingNewProj = false;
	        if (dirNamesArr === undefined) return;
	        var dirName = dirNamesArr[0];
			$uibModalInstance.close({action:"new", projName: projName, dirName: dirName});
        });
	};

	$scope.loadProject = function () {
		var remote = require('remote');
        var dialog = remote.require('dialog');
        dialog.showOpenDialog({ properties: ['openDirectory'] }, function(dirNamesArr) {
	        if (dirNamesArr === undefined) return;
	        var dirName = dirNamesArr[0];
	        $uibModalInstance.close({action:"load", dir: dirName});
        });
	};

});