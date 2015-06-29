/*
 * angular.js file
 */
'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
var services = angular.module('myApp.services', []);
services.value('version', '0.1a');
var localeLang = 'zh-cn';

//使用Angular提供的API(factory)注册新的服务
services.factory('ErrCodeLangService', function () {
    var serviceData = {};//定义新服务为obj
    var errMsgTab = {
        "0001": { "zh-cn": "新增失败" },
        "0002": { "zh-cn": "更新失败" },
        "0003": { "zh-cn": "删除失败" },
        "0004": { "zh-cn": "查无资料" },
        "0005": { "zh-cn": "未传入要更新的资料，请确认填写完整，并重新提交" },
        "1101": { "zh-cn": "此用户已经注册过，请使用其它用户名" },
        "1102": { "zh-cn": "注册失效，可能超时，请重新申请" },
        "1103": { "zh-cn": "新增使用者账户失败，可能因为使用者已经存在，或者服务器忙碌，请检查后重试" },
        "1109": { "zh-cn": "登入失败，请检查用户名密码，重新登录" },
        "1110": { "zh-cn": "您有内容无权访问，可能是因为与服务器连接已经断开，请重新登录" },
        "1111": { "zh-cn": "此session已经过期" },
        "1112": { "zh-cn": "创建该文章失败" },
        "2001": { "zh-cn": "无法连接服务器，请稍后重试" }

    };
    var lang = 'zh-cn';
    serviceData.setLang = function (lang) {
        lang = 'zh-cn';
    };
    serviceData.getErrMsg = function (errcode) {
        var errItem = errMsgTab[errcode];
        return errItem[lang];
	};

    return serviceData;//新服务
});

//同上,封装了http请求
services.factory('ApiService', ['$http', 'ErrCodeLangService', function ($http, ErrCodeLangService) {
	var cfgData = {};
	cfgData.get = function(url, obj, successcb, failcb) {
        obj.timeout = (1000*30);
		$http.get(url, obj)
        .success(function (data) {
            if (data.resultCode === 'S') {
                successcb(data);
            } else {
                failcb(ErrCodeLangService.getErrMsg(data.errorCode));
                console.error(data.errorCode, data.message);
            }
        }).error(function (data,status, headers, config) {
            failcb('Request error!');
            console.error(data);
        });
	};

	cfgData.post = function(url, obj, successcb, failcb) {
		obj.timeout = (1000*30);
		$http.post(url, obj)
        .success(function (data) {
            if (data.resultCode === 'S') {
                successcb(data);
            } else {
                failcb(ErrCodeLangService.getErrMsg(data.errorCode));
                console.error(data.errorCode, data.message);
            }
        }).error(function (data,status, headers, config) {
            failcb('Request error!');
            console.error(data);
        });
	};

	cfgData.put = function(url, obj, successcb, failcb) {
		obj.timeout = (1000*30);
		$http.put(url, obj)
        .success(function (data) {
            if (data.resultCode === 'S') {
                successcb(data);
            } else {
                failcb(ErrCodeLangService.getErrMsg(data.errorCode));
                console.error(data.errorCode, data.message);
            }
        }).error(function (data,status, headers, config) {
            failcb('Request error!');
            console.error(data);
        });
	};

	cfgData.delete = function(url, obj, successcb, failcb) {
		obj.timeout = (1000*30);
		$http.delete(url, obj)
        .success(function (data) {
            if (data.resultCode === 'S') {
                successcb(data);
            } else {
                failcb(ErrCodeLangService.getErrMsg(data.errorCode));
                console.error(data.errorCode, data.message);
            }
        }).error(function (data, status, headers, config) {
            failcb('Request error!');
            console.error(data);
        });
	};

    cfgData.head = function(url, obj, successcb, failcb) {
        obj.timeout = (1000*30);
        $http.head(url, obj)
        .success(function (data, status) {
            if (status == 200) {
                successcb(data);
            } else {
                var errCode = status;
                var errMsg = 'Resource not found';
                failcb(errMsg);
                console.error(errCode, errMsg);
            }
        }).error(function (data,status, headers, config) {
            failcb('Request error!');
            console.error(data, status);
        });
    };

	return cfgData;
}]);

services.factory('PermissionsService', function ($rootScope) {
    var permissionList;
        return {
            setPermissions: function(permissions) {
            permissionList = permissions;
            $rootScope.$broadcast('permissionsChanged')
        },
        hasPermission: function (permission) {
            permission = permission.trim();
            return _.some(permissionList, function(item) {
              if(_.isString(item.Name))
                return item.Name.trim() === permission
            });
        }
    };
});


//同上，注册新服务
services.factory('UserManageService', ['ApiService', 'ErrCodeLangService', function (ApiService, ErrCodeLangService) {
    var cfgData = {};
    cfgData.createSession = function(successcb, failcb) {
        ApiService.post('/api/session', {}, successcb, failcb);
    };
    cfgData.verifyToken = function(token, successcb, failcb) {
        ApiService.head('/api/session', {params: {token:token}}, successcb, failcb);
    };
    cfgData.signIn = function (token, userName, password, checkCode, successcb, failcb) {
    	var obj = {
            params: {
                token: token
            },
            data:{
                userName: userName,
                password: password,
                checkCode: checkCode
            }
    	};
        ApiService.put('/api/session/user', obj, successcb, failcb);
    };

    cfgData.signOut = function(token, successcb, failcb) {
    	var obj = {
            params : {
        		token: token
            }
    	};

        ApiService.delete('/api/session/user', obj, successcb, failcb);
    };

    cfgData.checkUserName = function (token, userName, successcb, failcb) {
        var obj = {
            params: {
                token: token,
                userName: userName
            }
        };
        ApiService.head('/api/user', obj, successcb, failcb);
    };

    cfgData.signUp = function (token, userName, password, checkCode, successcb, failcb) {
    	var obj = {
            params: {
                token: token
            },
            data : {
        		userName: userName,
        		password: password,
                checkCode: checkCode
            }
    	};
    	ApiService.post('/api/users', obj, successcb, failcb);
    };

    cfgData.updateUserDetail = function (token, detailObj, successcb, failcb) {
    	var obj = {
            params: {
                token: token
            },
            data: detailObj
    	};
    	ApiService.put('/api/users', obj, successcb, failcb);
    };
    return cfgData;
}]);

//注册新的服务
services.factory('ArticleManageService',['ApiService',function (ApiService) {
    var articleData = {};
    articleData.saveArticle = function (token, articleObj, successcb, failcb) {
        var obj = {
            params: {
                token: token
            },
            data: articleObj
        };
        ApiService.post('/api/articles', obj, successcb, failcb);
    };
    articleData.loadArticles = function (token, successcb, failcb) {
        var obj = {
            params: {
                token: token
            }
        };
        ApiService.get('/api/articles', obj, successcb, failcb);
    };
    return articleData;
}]);


//注册新的服务
services.factory('SubjectManageService',['ApiService',function (ApiService) {
    var subjectData = {};
    subjectData.createSubject = function (token, subjectObj, successcb, failcb) {
        var obj = {
            params: {
                token: token
            },
            data: subjectObj
        };
        ApiService.post('/api/subjects', obj, successcb, failcb);
    };
    subjectData.getSubjects = function (token, successcb, failcb) {
        var obj = {
            params: {
                token: token
            }
        };
        ApiService.get('/api/subjects', obj, successcb, failcb);
        // successcb({resultCode:'S', content:{subjects:[
        //     {id:'111111', name:'111111'},
        //     {id:'222222', name:'222222'},
        //     {id:'333333', name:'333333'}
        // ]}});
    };
    subjectData.getSubject = function (token, subjectId, successcb, failcb) {
        var obj = {
            params: {
                token: token
            }
        };
        ApiService.get('/api/subjects/' + subjectId, obj, successcb, failcb);
    };
    subjectData.updateSubject = function (token, subjectId, subjectObj, successcb, failcb) {
        var obj = {
            params: {
                token: token
            },
            data:subjectObj
        };
        ApiService.get('/api/subjects/' + subjectId, obj, successcb, failcb);
    };
    return subjectData;
}]);

