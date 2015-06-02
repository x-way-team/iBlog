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
       //登录成功时赋值
       $rootScope.user.userName = data.content.userName;
       $rootScope.user.uid = data.content.uid;
       $location.path('/');//跳转到home页面
        }, 
        function(msg){//失败
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

controllers.controller('ArticleEditCtrl', ['$rootScope','$scope','ArticleManageService','$location',function ($rootScope,$scope,ArticleManageService,$location) {
        //文章保存
     $scope.saveArticle = function() {
        ArticleManageService.saveArticle($rootScope.token,$scope.article, function(data){
            alert('文章保存成功！');
        }, function(msg){
            alert(msg);
        });
    };
    
    //发表文章并跳转至文章列表
    $scope.publishArticle = function() {
        ArticleManageService.saveArticle($rootScope.token,$scope.article, function(data){
            alert('文章保存成功！');
            $location.path('/myblog');//文章保存成功则跳转到myblog页面
            
        }, function(msg){
            alert(msg);
        });
    };
}]);
controllers.controller('MyblogCtrl', ['$scope','$rootScope', 'ArticleManageService', function ($scope, $rootScope,ArticleManageService) {
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
    //初始化加载文件列表
    ArticleManageService.loadArticles($rootScope.token, function(data){
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
        $scope.articles = data.content.articles;
    }, function(msg){//失败
        alert(msg);
    }); 
}]);