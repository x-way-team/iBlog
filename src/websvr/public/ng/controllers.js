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
controllers.controller('TopicsCtrl', ['$rootScope','$scope', '$location', function ($rootScope, $scope, $location) {
//点击Header部分Logo返回HomePage
if($rootScope.user.userName!=''){//登录或是注册成功
	 $rootScope.show = {
		login: false,
		share: true,
		email: true,
		signup: false,
		search: true,
		logout:true,
		userName:true,
		client:false,
		myblog:true
	   };
}else{
	$rootScope.show = {//未登录或注册
		userName:true,
		login: true,
		share: true,
		email: true,
		signup: true,
		search: true,
		logout:false,
		client:true,
		myblog:false
	};
}
}]);
controllers.controller('HomeCtrl', ['$rootScope','$scope', '$location', function ($rootScope, $scope, $location) {
//点击Header部分Logo返回HomePage
if($rootScope.user.userName!=''){//登录或是注册成功
	 $rootScope.show = {
		login: false,
		share: true,
		email: true,
		signup: false,
		search: true,
		logout:true,
		userName:true,
		client:false,
		myblog:true
	   };
}else{
	$rootScope.show = {//未登录或注册
		userName:true,
		login: true,
		share: true,
		email: true,
		signup: true,
		search: true,
		logout:false,
		client:true,
		myblog:false
	};
}
	$scope.data = ['haokai','zhengyi','nanssy'];
}]);


controllers.controller('LoginCtrl', ['$rootScope', '$scope', '$location', 'UserManageService', function ($rootScope, $scope, $location, UserManageService) {
	 //退出操作后将显示用户名赋值为空
	 $rootScope.user.userName = '';
	//登录页面隐藏header部分按钮
	$rootScope.show = {
		login: false,
		share: false,
		email: false,
		signup: false,
		search: false,
		logout:false,
		userName:false,
		client:true,
		myblog:false
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
		client:false,
		myblog:true
	   };
	   //显示用户名
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
		client:true,
		myblog:false
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

controllers.controller('ArticleEditCtrl', ['$scope', function ($scope) {
	$scope.content={};
}]);