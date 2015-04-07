'use strict';

var mongoose = require('mongoose');

var userObj = exports = module.exports = {};

userObj.init = function(ap) {
	userObj.app = ap;
	userObj.db = ap.DB;
	var Schema = userObj.db.Schema;
	userObj.UserSchema = new Schema({
		uid: String,
	    userName: String,
	    password: String,
	    createDate: Date
	});
	userObj.WebSessionSchema = new Schema({
		token: String,
		uid: String,
		userName: String
	});
	userObj.UserModel = mongoose.model('iblog.users', userObj.UserSchema);
	userObj.WebSessionModel = mongoose.model('iblog.websession', userObj.WebSessionSchema);
};

userObj.createSession = function(token, cb) {
	userObj.WebSessionModel.findOne({ 
		token: token
	}, function (err, doc) {
		if (err || !doc) {
			var newDoc = {
				token: token
			};
			var newData = new userObj.WebSessionModel(newDoc);
        	cb(null, newDoc);
		} else {
			cb(new Error("internal error, conflict token " + token), null);			
		}
    });
};

//删除当前session
userObj.deleteSession = function(token, cb) {
	userObj.WebSessionModel.remove({ 
		token: token
	}, function (err) {
		cb(err);
    });
};

userObj.auth = function(token, userName, password, cb) {
	userObj.UserModel.findOne({ 
		userName: userName,
		password: password
	}, function (err, doc) {
		if (err) {
			cb(err, doc);
		} else if(!doc){
			cb(new Error("check user failed"), doc);
		} else {
			var newDoc = {
				token: token,
				uid: doc.uid,
				userName: doc.userName
			};
			var newData = new userObj.WebSessionModel(newDoc);
        	cb(null, newDoc);
		}
    });
};

userObj.createUser = function(userName, password, cb) {
	userObj.UserModel.findOne({ 
		userName: userName
	}, function (err, doc) {
		if (err || !doc) {
			var newDoc = {
				userName: userName,
				password: password
			};
			var newData = new userObj.UserModel(newDoc).save(function(err, user){
				if (!err) {
					newDoc.uid = user._id;
					cb(null, newDoc);
				} else {
					console.log(err, user);
				}
			});        	
		} else {
			cb(new Error("user exist:" + userName), null);			
		}
    });
};