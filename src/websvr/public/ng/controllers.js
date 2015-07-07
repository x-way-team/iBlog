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
            alert('文章发表成功！');
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
        $scope.articles = data.content.articles;//绑定数据,将后台返回数据与对应controller绑定,用于前台ejs显示
        $scope.articles.length=data.content.articles.length;
    }, function(msg){//失败
        alert(msg);
    }); 
}]);


controllers.controller('SubjectManageCtrl', ['$scope','$rootScope','SubjectManageService', function ($scope, $rootScope,SubjectManageService) {
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
    //先定义
    $scope.previousSub = null;
    $scope.tempSub = {}; //用于编辑时的临时变量，对应当前编辑的subject
    $scope.newSub = {};
    //初始化加载文件列表
    //调用接口
    SubjectManageService.getSubjects($rootScope.token, function(data){
        $scope.subjects = data.content.subjects;//绑定数据,将后台返回数据与对应controller绑定,用于前台ejs显示
    }, function(msg){//失败
        alert(msg);
    }); 

    $scope.editSubjectName = function(subject) {//传递对象不是值传递，而是传递引用。javascipt中所有的参数传递都是值传递，传递对象也是值传递：传递指向地址的引用
        //先将之前的Subject Edit状态disable
        if($scope.previousSub) {
            $scope.previousSub.editEn=false;
        }
        //再将当前subject edit启用
        subject.editEn=true;
        //替换上一次的Subject
        $scope.previousSub = subject;
        $scope.tempSub.name = subject.name;
    }

    $scope.saveEdit = function(subject) {
        subject.name = $scope.tempSub.name;
        subject.editEn = false;
        //重新定义对象，前后台传输
        var newObj={name:subject.name};
        SubjectManageService.updateSubject($rootScope.token, subject.id, newObj, function(data){
        $scope.subjects = data.content.subjects;//绑定数据,将后台返回数据与对应controller绑定,用于前台ejs显示
       alert("新增的类别成功！");
       //重新加载类别列表
       SubjectManageService.getSubjects($rootScope.token, function(data){
        $scope.subjects = data.content.subjects;//绑定数据,将后台返回数据与对应controller绑定,用于前台ejs显示
    }, function(msg){//加载类别列表失败
        alert(msg);
    });
       
    }, function(msg){//新增类别失败
        alert(msg);
    });
    };

    $scope.cancelEdit = function(subject) {
        subject.editEn = false;
    }
    //增加类别subject
    $scope.creatSubject = function() {
     if($scope.newSub.name!=null){ 
    var newSubject = {
        name:$scope.newSub.name
    };
    SubjectManageService.createSubject($rootScope.token,newSubject, function(data){
    $scope.subjects = data.content.subjects;//绑定数据,将后台返回数据与对应controller绑定,用于前台ejs显示
       alert("新增的类别成功！");
     //重新加载类别列表
       SubjectManageService.getSubjects($rootScope.token, function(data){
        $scope.subjects = data.content.subjects;//绑定数据,将后台返回数据与对应controller绑定,用于前台ejs显示
    }, function(msg){//加载类别列表失败
        alert(msg);
    });
       
    }, function(msg){//新增类别失败
        alert(msg);
    }); 
    }else{alert("请输入新增的类别名称！");}
    }
}]);