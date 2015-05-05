/*
 * angular.js file
 */
'use strict';


// Declare app level module which depends on filters, and services
var myApp = angular.module('myApp', ['ngRoute', 'ngSanitize', 'btford.markdown',
            'myApp.controllers', 'myApp.filters', 'myApp.services', 'myApp.directives']);
// 针对ng-view的路由映射
myApp.config([
    '$routeProvider', 
    '$locationProvider',
    'markdownConverterProvider',
    function($routeProvider, $locationProvider, markdownConverterProvider) {
        $routeProvider.when('/', { templateUrl: ('partial/home'), controller: 'HomeCtrl' });
        $routeProvider.when('/404', { templateUrl: ('partial/404'), controller: 'MyCtrl2' });
        $routeProvider.when('/login', { templateUrl: ('partial/login'), controller: 'LoginCtrl' });
        $routeProvider.when('/signup', { templateUrl: ('partial/signup'), controller: 'SignUpCtrl' });
        $routeProvider.when('/aboutUs', { templateUrl: ('partial/aboutUs'), controller: 'HomeCtrl' });
        $routeProvider.when('/myblog', { templateUrl: ('partial/myblog'), controller: 'HomeCtrl' });
        $routeProvider.when('/topics-home', { redirectTo: 'topics/main'});//l路径重定向
        $routeProvider.when('/topics/:urlparam', { templateUrl:'topics.ejs', controller: 'TopicsCtrl' });
        $routeProvider.when('/article-editor', { templateUrl: ('partial/article-editor'), controller: 'ArticleEditCtrl' });
        $routeProvider.otherwise({ redirectTo: '/404' });
        $locationProvider.html5Mode(true);
        markdownConverterProvider.config({
            extensions: ['twitter']
        });
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
    $rootScope.signOut = function() {
        UserManageService.signOut($rootScope.token, function(data){
            alert('您已经成功退出');
            $location.path('/login');
        }, function(msg){
            alert(msg);
        });
    };

    if (typeof(Storage) !== 'undefined') {
    // Yes! localStorage and sessionStorage support!
        if (sessionStorage.iBlogToken) {
            $rootScope.token = sessionStorage.iBlogToken;
        } else {
            UserManageService.createSession(function(data){
                $rootScope.token = data.content.token;
                sessionStorage.iBlogToken = $rootScope.token;
            }, function(msg){
                alert(msg);
            });
        }
    } else {
    // Sorry! No web storage support..
        UserManageService.createSession(function(data){
            $rootScope.token = data.content.token;
        }, function(msg){
            alert(msg);
        });
    }
    
}]);
