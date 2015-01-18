var express = require('express');
var router = express.Router();
var user = require('../services/user');
var mongoose = require('mongoose');
mongoose.connect('mongodb://root:root@localhost/iblogdb', function (error) {
    if (error) {
        console.log(error);
    }
});

// Mongoose Schema definition
var Schema = mongoose.Schema, 
	ObjectId = Schema.ObjectId;

var UserSchema = new Schema({
	uid: ObjectId,
    user_name: String,
    password: String,
    email: String,
    create_date: Date
});

var UserSessionSchema = new Schema({
	token: String,
	uid: String
});

// Mongoose Model definition
var User = mongoose.model('users', UserSchema);
var UserSession= mongoose.model('user_sessions', UserSessionSchema);

/* GET users listing. */
router.get('/token', function(req, res) {
	var userName = req.params.userName;
	var password = req.params.password;
	var checkCode = req.params.checkCode;//ignore
	User.find({ 
		userName: userName,
		password: password
	}, function (err, docs) {
		if (err) {
			console.log(err);
		}
		if (docs.length === 0) {
			var result= {resultCode:'F', errorCode:'1109', message:'get token failed'};
			res.json(result);
		} else {
			var result = {resultCode:'S', content:{token: req.sessionID}};
        	res.json(result);
		}
    });
});

module.exports = router;
