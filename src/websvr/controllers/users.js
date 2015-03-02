'use strict';
/**
* 此文件封装了session和user相关的业务逻辑功能
* 由routes/session.js与routes/users.js调用
*/

var users = require("../services/db").Users;
var guid = require('guid');

//用户首次访问网站，创建session，获取token
//此时的token不携带用户信息，可用于匿名访问
exports.createSession = function(sessionId, cb) {
	var token = sessionId?sessionId:guid.raw();
	users.createSession(token, function(err, doc){
		var result = {};
		if (!err) {
			result.resultCode = 'S';
			result.content = {token: token};
		} else {
			result.resultCode = 'F';
			result.errorCode = '1109';
			result.message = err.message;
		}
		cb(result);
	});
};

//用户登录，验证用户身份
//登录成功后，token所代表的session上附加了用户信息
//登录用户会有更多权限，比如修改用户资料，发表文章等
exports.auth = function(token, userName, password, cb) {
	users.auth(token, userName, password, function(err, doc){
		var result = {};
		if (!err) {
			result.resultCode = 'S';
			result.content = {uid: doc.uid, userName: doc.userName};
		} else {
			result.resultCode = 'F';
			result.errorCode = '1109';
			result.message = err.message;
		}
		cb(result);
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
			result.errorCode = '1109';
			result.message = err.message;
		}
		cb(result);
	});
};