/*
 * angular.js file
 */
'use strict';


// Declare app level module which depends on filters, and services
var myApp = angular.module('myApp', ['ngRoute', 
            'myApp.controllers', 'myApp.filters', 'myApp.services', 'myApp.directives']);
myApp.config([
	'$routeProvider', 
	'$locationProvider',
	function($routeProvider, $locationProvider) {
	    $routeProvider.when('/', { templateUrl: ('partial/home'), controller: 'HomeCtrl' });
	    $routeProvider.when('/404', { templateUrl: ('partial/404'), controller: 'MyCtrl2' });
	    $routeProvider.when('/login', { templateUrl: ('partial/login'), controller: 'LoginCtrl' });
	    $routeProvider.when('/signup', { templateUrl: ('partial/signup'), controller: 'SignUpCtrl' });
	    $routeProvider.otherwise({ redirectTo: '/404' });
	    $locationProvider.html5Mode(true);
	}
]);
  
myApp.run(['$rootScope', '$location', '$window', 'UserManageService', function ($rootScope, $location, $window, UserManageService) {
	$rootScope.show = {//$rootScope全局变量
		userName:false,
		login: true,
		share: true,
		email: true,
		signup: true,
		search: true,
		logout:false,
	};
	$rootScope.user = {
		userName: ''
	};
	UserManageService.createSession(function(data){
		$rootScope.token = data.content.token;
	}, function(msg){
		alert(msg);
	})
}]);
