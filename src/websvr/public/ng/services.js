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


services.factory('ErrCodeLangService', function () {
    var serviceData = {};
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

    return serviceData;
});

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
            }
        }).error(function (data,status, headers, config) {
            failcb('Request error!');
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
            }
        }).error(function (data,status, headers, config) {
            failcb('Request error!');
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
            }
        }).error(function (data,status, headers, config) {
            failcb('Request error!');
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
            }
        }).error(function (data,status, headers, config) {
            failcb('Request error!');
        });
	};

	return cfgData;
}]);

services.factory('UserManageService', ['ApiService', 'ErrCodeLangService', function (ApiService, ErrCodeLangService) {
    var cfgData = {};

    cfgData.signIn = function (userName, password, checkCode, successcb, failcb) {
    	var obj = {
                param:{
                userName: userName,
                password: password,
                checkCode: checkCode
            }
    	};
        ApiService.post('/api/session', obj, successcb, failcb);
    };

    cfgData.signOut = function(token, successcb, failcb) {
    	var obj = {
            param : {
        		token: token
            }
    	};
        ApiService.delete('/api/session', obj, successcb, failcb);
    };

    cfgData.signUp = function (userName, password, email, successcb, failcb) {
    	var obj = {
            dataObj : {
        		userName: userName,
        		password: password,
        		email: email
            }
    	};
    	ApiService.post('/api/user', obj, successcb, failcb);
    };

    cfgData.updateUserDetail = function (token, detailObj, successcb, failcb) {
    	var obj = {
            paramObj: {
    		  token: token
            },
            data: detailObj
    	};
    	ApiService.put('/api/user', obj, detailObj, successcb, failcb);
    };

    return cfgData;
}]);