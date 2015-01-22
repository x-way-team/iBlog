var express = require('express');
var router = express.Router();
var users = require('../controllers/users');

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
	users.signIn(userName, password, checkCode, function(result){
		res.json(result);
	});
});

module.exports = router;
