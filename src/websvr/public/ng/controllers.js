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


controllers.controller('LoginCtrl', ['$rootScope', '$scope', '$location', 'UserManageService', function ($rootScope, $scope, $location, UserManageService) {
	$scope.loginData = {
		userName: '',
		password: '',
		checkCode: '',
		rememberMe: false
	};
	$scope.login = function () {
		UserManageService.signIn($rootScope.token, $scope.loginData.userName, $scope.loginData.password, checkCode, function(data){
			//todo			
			$location.path('/');//跳转到home页面
		}, function(msg){
			alert(msg);
		}); 
	};
}]);

controllers.controller('SignUpCtrl', ['$rootScope', '$scope', '$location', 'UserManageService', function ($rootScope, $scope, $location, UserManageService) {
	$scope.signUpData = {
		userName: '',
		password: '',
		cfmPassword: '',
		checkCode: ''
	};
	$scope.signUp = function () {
		if (cfmPassword !== password) {
			//todo: error and tip,return
		}
		UserManageService.signUp($scope.signUpData.userName, $scope.signUpData.password, checkCode, function(data) {
			$location.path('/login');//注册成功则跳转到login页面
		}, function(msg){
			alert(msg);
		}); 
	};
}]);