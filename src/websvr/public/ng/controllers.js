/*
 * angular.js file
 */
'use strict';

/* Controllers */

var controllers = angular.module('myApp.controllers', []);

controllers.controller('MyCtrl1', function () {
});


controllers.controller('MyCtrl2', ['$scope', '$location', function ($scope, $location) {
}]);

controllers.controller('HomeCtrl', ['$scope', '$location', function ($scope, $location) {
	$scope.data = ['haokai','zhengyi','nanssy'];
}]);


controllers.controller('LoginCtrl', ['$scope', '$location', 'UserManageService', function ($scope, $location, UserManageService) {
	$scope.loginData = {
		userName: '',
		password: '',
		rememberMe: false
	};
	$scope.login = function () {
		UserManageService.signIn($scope.loginData.userName, $scope.loginData.password, null, function(data){
			//todo			
			$location.path('/');
		}, function(msg){
			alert(msg);
		}); 
	};
}]);