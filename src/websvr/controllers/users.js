'use strict';
/**
* 此文件封装了session和user相关的业务逻辑功能
* 由routes/session.js与routes/users.js调用
*/

var users = require("../services/db").Users;
var sessions = require('../services/cache').Sessions;

//用户首次访问网站，创建session，获取token
//此时的token不携带用户信息，可用于匿名访问

exports.createSession = function(cb) {
    sessions.createSession(function(err, data){
        var result = {};
        if (!err) {
            result.resultCode = 'S';
            result.content = {token: data};
        } else {
            result.resultCode = 'F';
            result.errorCode = '1109';
            result.message = err.message;
        }
        cb(result);
    });
};


exports.clearSession = function(token, cb) {
    sessions.clearSession(token, function(err, data){
        var result = {};
        if (!err) {
            result.resultCode = 'S';
        } else {
            result.resultCode = 'F';
            result.errorCode = '1111';
            result.message = err.message;
        }
        cb(result);
    });
};

exports.verifyToken = function(token, cb) {
    sessions.verifyToken(token, function(err, data){
        var result = {};
        if (err) {            
            result.resultCode = 'F';
        } else {                        
            result.resultCode = 'S';
        }
        cb(result);
    });
};

exports.getSession = function(token, cb) {
    sessions.getSessionObject(token, function(err, data){
        var result = {};
        if (!err) {
            result.resultCode = 'S';
            result.content = data;
        } else {
            result.resultCode = 'F';
            result.errorCode = '1111';
            result.message = err.message;
        }
        cb(result);
    });
};

//用户登录，验证用户身份
//登录成功后，token所代表的session上附加了用户信息
//登录用户会有更多权限，比如修改用户资料，发表文章等
exports.auth = function(token, userName, password, cb) {
    sessions.verifyToken(token, function(err, data) {
        var result = {};
        if (err) {            
            result.resultCode = 'F';
            result.errorCode = '1109';
            result.message = err.message;
            cb(result);
            return;
        } else if (!data) {                        
            result.resultCode = 'F';
            result.errorCode = '1109';
            result.message = 'Token ' + token + ' not found or out of date';
            cb(result);
            return;
        }
        users.auth(userName, password, function(err, doc){
            var result = {};
            if (!err) {
                var sObj = {
                    uid: doc.uid,
                    userName: doc.userName
                };
                sessions.updateSession(token, sObj, function(err, obj) {
                    if (err) {
                        result.resultCode = 'F';
                        result.errorCode = '1109';
                        result.message = err.message;
                        cb(result);
                    } else {                
                        result.resultCode = 'S';
                        result.content = sObj;
                        cb(result);
                    }
                });
            } else {
                result.resultCode = 'F';
                result.errorCode = '1109';
                result.message = err.message;
                cb(result);
            }
        });        
    });
};

//注册新用户，成功后用户需要再登录
exports.signUp = function(token, userName, password, cb) {
    //todo: verify token
    //valid token
    users.createUser(userName, password, function(err, doc){
        var result = {};
        if (!err) {
            result.resultCode = 'S';
            result.content = {uid: doc.uid, userName: doc.userName};
        } else {
            result.resultCode = 'F';
            result.errorCode ='1101';
            result.message = err.message;
        }
        cb(result);
    });
};

exports.updateUser = function(token, userObj, cb) {
	//sessions.verifyToken(token)
    user.updateUser(userObj, function(err, doc) {
        var result = {};
        if (!err) {
        	session.updateSession(doc, function(err, data){        		
	            result.resultCode = 'S';
	            result.content = data;
	            cb(result);
        	});
        } else {
            result.resultCode = 'F';
            result.errorCode ='1101';
            result.message = err.message;
            cb(result);
        }        
    });
};