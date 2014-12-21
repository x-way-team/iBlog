/*
 * angular.js file
 */
'use strict';


// Declare app level module which depends on filters, and services
var myApp = angular.module('myApp', ['ngRoute', 
            'myApp.controllers', 'myApp.filters', 'myApp.services', 'myApp.directives']);
myApp.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/', { redirectTo: '/home' });
    $routeProvider.when('/home', { templateUrl: 'home.ejs', controller: 'MyCtrl2' });
    $routeProvider.when('/404', { templateUrl: '404.ejs', controller: 'MyCtrl2' });
    $routeProvider.otherwise({ redirectTo: '/404' });
}]);
  
myApp.run(['$rootScope', '$location', '$window', function ($rootScope, $location, $window) { 
}]);
