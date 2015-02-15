'use strict';
var users = require("../services/db").Users;
var guid = require('guid');

exports.createSession = function(cb) {
	var token = guid.raw();
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
}