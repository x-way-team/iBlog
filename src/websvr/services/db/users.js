'use strict';
var userObj = exports = module.exports = {};

userObj.init = function(ap) {
	this.app = ap;
	this.db = ap.DB;
	var Schema = db.Schema;
	var ObjectId = Schema.ObjectId;
	this.UserSchema = new Schema({
		uid: ObjectId,
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
};

userObj.verify = function(userName, password, cb) {
	var User = mongoose.model('users', UserSchema);
	User.find({ 
		userName: userName,
		password: password
	}, function (err, docs) {
		if (err) {
			console.log(err);
		}
		if (docs.length === 0) {
			var result= {resultCode:'F'};
			cb(result);
		} else {
			var result = {resultCode:'S'};
        	cb(result);
		}
    });
};