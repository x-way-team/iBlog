'use strict';
var guid = require('guid');
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
	    email: String,
	    createDate: Date,
	    nickName: String,
	    settings: {
	    	active: Boolean,
	    	allowPub: Boolean,
	    }
	});
	userObj.WebSessionSchema = new Schema({
		sid: String,
		uid: String,
		token: String
	});
	userObj.UserModel = mongoose.model('users', userObj.UserSchema);
	userObj.WebSessionModel = mongoose.model('websession', userObj.WebSessionSchema);
};

userObj.createSession = function(userName, password, token, cb) {
	userObj.UserModel.findOne({ 
		userName: userName,
		password: password
	}, function (err, doc) {
		if (err) {
			cb(err, doc);
		} else {
			var newDoc = {
				sid: guid.raw(),
				uid: doc.uid,
				token: token
			};
			var newData = new userObj.WebSessionModel(newDoc);
        	cb(null, newDoc);
		}
    });
};