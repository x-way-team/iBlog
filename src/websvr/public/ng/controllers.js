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

controllers.controller('HomeCtrl', ['$rootScope','$scope', '$location', function ($rootScope, $scope, $location) {
	$scope.data = ['haokai','zhengyi','nanssy'];
}]);


controllers.controller('LoginCtrl', ['$rootScope', '$scope', '$location', 'UserManageService', function ($rootScope, $scope, $location, UserManageService) {
	//登录页面隐藏header部分按钮
	$rootScope.show = {
		login: false,
		share: false,
		email: false,
		signup: false,
		search: false,
		logout:false,
		userName:false,
	};
	$scope.loginData = {
		userName: '',
		password: '',
		checkCode: '',
		rememberMe: false
	};
	$scope.login = function () {
		UserManageService.signIn($rootScope.token, $scope.loginData.userName, $scope.loginData.password, $scope.loginData.checkCode, function(data){
		//登录成功后到HomePage隐藏header部分按钮
	   $rootScope.show = {
		login: false,
		share: true,
		email: true,
		signup: false,
		search: true,
		logout:true,
		userName:true,
	   };
	   $rootScope.user.userName = data.content.userName;
		$location.path('/');//跳转到home页面
		}, function(msg){
			alert(msg);
		}); 
	};
}]);

controllers.controller('SignUpCtrl', ['$rootScope', '$scope', '$location', 'UserManageService', function ($rootScope, $scope, $location, UserManageService) {
	$rootScope.show = {
		login: false,
		share: false,
		email: false,
		signup: false,
		search: false,
		logout:false,
		userName:false,
	};
	$scope.signUpData = {
		userName: '',
		password: '',
		cfmPassword: '',
		checkCode: ''
	};
	$scope.signUp = function () {
		if ($scope.signUpData.cfmPassword !== $scope.signUpData.password) {
			//todo: error and tip,return
		}
		UserManageService.signUp($rootScope.token, $scope.signUpData.userName, $scope.signUpData.password, $scope.signUpData.checkCode, function(data) {
			alert('用户注册成功');
			$location.path('/login');//注册成功则跳转到login页面
		}, function(msg){
			alert(msg);
		}); 
	};
}]);