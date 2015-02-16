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
	userObj.UserModel = mongoose.model('users', userObj.UserSchema);
	userObj.WebSessionModel = mongoose.model('websession', userObj.WebSessionSchema);
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

userObj.createUser = function() {
	
};