var express = require('express');
var router = express.Router();
var users = require('../controllers/users.js');

/* create user session */
/* this happened when a client open site page*/
router.post('/', function(req, res){
	users.createSession(req.sessionID, function(result) {
		res.json(result);
	});	
});

/*user login*/
router.put('/user', function(req, res){
	var token=req.body.params.token;
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
router.delete('/user', function(req, res){
	var token = req.query.token;
	users.deleteSession(req.sessionID, function(result) {
		res.json(result);
	});
});

router.get('/', function(req, res){
	var token = req.query.token;
	//todo
	res.json({resultCode:'F'});
});

module.exports = router;