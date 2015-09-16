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

controllers.controller('HeaderCtrl', ['$rootScope','$scope', '$location', function ($rootScope,$scope, $location) {
    $scope.headerData = {//HeaderCtrl的私有数据
         keyWords : null
    };
    $scope.query = function () {
        if($scope.headerData.keyWords==""||$scope.headerData.keyWords==null) {
         alert("请输入搜索关键字。。。");
            }
        else{
        var keywords=window.btoa($scope.headerData.keyWords);
        var search = {keywords: keywords}//'keywords='+keywords;
        $location.path('/query-article').search(search);
        $scope.headerData.keyWords==null//empty keywords
        }
    };
}]);
controllers.controller('TopicsCtrl', ['$rootScope','$scope', '$location','TopicService', function ($rootScope, $scope, $location,TopicService) {
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
    //初始化加载topic列表
    //调用接口
    TopicService.getTopics($rootScope.token, function(data){
        $scope.topics = data.content.topics;//绑定数据,将后台返回数据与对应controller绑定,用于前台ejs显示
    }, function(msg){//失败topics
        alert(msg);
    });             
     $scope.createTopic = function () {

        TopicService.create($rootScope.token, $scope.topic.name, $scope.topic.description, function(data) {
            alert('新话题添加成功');
            $scope.topic.name=null;
            $scope.topic.description=null;
        }, function(msg){
            alert(msg);
        });  
        //刷新话题列表
    TopicService.getTopics($rootScope.token, function(data){
        $scope.topics = data.content.topics;//绑定数据,将后台返回数据与对应controller绑定,用于前台ejs显示
    }, function(msg){//失败topics
        alert(msg);
    }); 
    };
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

controllers.controller('ArticleEditCtrl', ['$rootScope','$scope','ArticleManageService','$location', 'TopicService', function ($rootScope,$scope,ArticleManageService,$location, TopicService) {
    //文章保存
    $scope.topics = [];
    $scope.articleEditData = {};
    //下拉单选框初始化加载topic列表
    //调用接口
    TopicService.getTopics($rootScope.token, function(data){
        $scope.topics = data.content.topics;//绑定数据,将后台返回数据与对应controller绑定,用于前台ejs显示
    }, function(msg){//失败topics
        alert(msg);
    });
//
    var params = $location.search();
    if (params.articleId) {
        ArticleManageService.getArticle($rootScope.token, params.articleId, function(data) {
            $scope.articleEditData.title = data.title;
            $scope.articleEditData.keys = data.keys;
            $scope.articleEditData.content = data.content;
            $scope.articleEditData.topic = data.topic;
        }, function(msg){
            alert(msg);
        });
    }

    $scope.saveArticle = function() {
        ArticleManageService.saveArticle($rootScope.token,$scope.articleEditData, function(data){
            alert('文章保存成功！');
        }, function(msg){
            alert(msg);
        });
    };
    
    //发表文章并跳转至文章列表
    $scope.publishArticle = function() {
        ArticleManageService.saveArticle($rootScope.token,$scope.articleEditData, function(data){
            alert('文章发表成功！');
            $location.path('/myblog');//文章保存成功则跳转到myblog页面
            
        }, function(msg){
            alert(msg);
        });
    };

}]);

controllers.controller('MyblogCtrl', ['$scope','$rootScope', 'ArticleManageService','TopicService', function ($scope, $rootScope,ArticleManageService,TopicService) {
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
    //下拉单选框初始化加载topic列表
    //调用接口
    TopicService.getTopics($rootScope.token, function(data){
        $scope.topics = data.content.topics;//绑定数据,将后台返回数据与对应controller绑定,用于前台ejs显示
    }, function(msg){//失败topics
        alert(msg);
    });
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
       alert("修改类别成功！");
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
    $scope.newSub.name=null;//清空input
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

controllers.controller('QueryAtiCtrl', ['$rootScope', '$scope', '$location', 'QueryArticleService','TopicService', function ($rootScope, $scope, $location, QueryArticleService,TopicService) {
    
    if($rootScope.user.userName!=''){//登录或是注册成功
        $rootScope.show = {
            login: false,
            share: true,
            email: true,
            signup: false,
            search: false,
            logout:true,
            userName:true,
            client:false,
            myblog:true
        };
    }else{
        $rootScope.show = {//未登录或注册
            userName:false,
            login: true,
            share: true,
            email: true,
            signup: true,
            search: false,
            logout:false,
            client:true,
            myblog:false
        };
    }    
     $scope.queryActicleData = {//QueryActicleCtrl的私有数据
        keywords : null, //关键词的数组
        topic: null,     //所属分类
        keywordsStr: ''，//关键词字符串，从url取得
     };
     var params = $location.search();//从URL取出参数,包括keywords，topic
     if(params.keywords != null){
        var keys = window.atob(params.keywords);//decode keywords
        $scope.queryActicleData.keywords = keys;//关键字transfer to input
      }
     
        //搜索文章
      QueryArticleService.getAritcles($rootScope.token, keys, params.topic,function(data) {
          $scope.articles = data.content.articles.articles;//绑定数据,将后台返回数据与对应controller绑定,用于前台ejs显示
      }, function(msg){
        alert(msg);
      }); 
    //初始化加载topic列表   
    //调用接口
    TopicService.getTopics($rootScope.token, function(data){
        $scope.topics = data.content.topics;//绑定数据,将后台返回数据与对应controller绑定,用于前台ejs显示
    }, function(msg){//失败topics
        alert(msg);
    }); 

    $scope.queryArtilce = function () {
     if($scope.queryActicleData.keywords != null) { //查询关键字
       var key=window.btoa($scope.queryActicleData.keywords);
       var params = $location.search();
       params.keywords=key;//'keywords='+keywords
       $location.search(params);  //添加关键字keywords到URL
        } else {
            alert("请输入查询关键字！");
        }
    };
}]);