'use strict';
var guid = require('guid');

var userObj = exports = module.exports = {};

userObj.init = function(ap) {
	this.app = ap;
	this.db = ap.DB;
	var Schema = db.Schema;
	this.UserSchema = new Schema({
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
	this.WebSessionSchema = new Schema({
		sid: String,
		uid: String,
		token: String
	});
	this.UserModel = mongoose.model('users', this.UserSchema);
	this.WebSessionModel = mongoose.model('websession', this.WebSessionSchema);
};

userObj.createSession = function(userName, password, token, cb) {
	this.UserModel.findOne({ 
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
			var newData = new this.WebSessionModel(newDoc);
        	cb(null, newDoc);
		}
    });
};