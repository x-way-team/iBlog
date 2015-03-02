var express = require('express');
var router = express.Router();
var users = require('../controllers/users.js');

/* create user session */
/* this happened when a client open site page*/
router.post('/', function(req, res){
	users.createSession(function(result) {
		res.json(result);
	});	
});

/*user login*/
router.put('/user', function(req, res){
	var token = req.body.data.token;
	var userName = req.body.data.userName;
	var password = req.body.data.password;
	var checkCode = req.body.data.checkCode;
	//todo: verify checkcode
	//...
	users.auth(token, userName, password, function(result) {
		res.json(result);
	});	
});

/* delete user session, user sign out */
router.delete('/', function(req, res){
	//todo
});

router.get('/', function(req, res){
	res.json({resultCode:'F'});
});

module.exports = router;