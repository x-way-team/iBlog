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
		if (result.resultCode === 'S') {
			result.content = result.content || {};
			result.content.token = req.sessionID;
		} else {//(result.resultCode === 'F')
			result.errorCode = 1109;
			result.message = 'failed to auth';
		}
		res.json(result);
	});	
});

/* delete user session, user sign out */
router.delete('/', function(req, res){

});

router.get('/', function(req, res){
	res.json({resultCode:'F'});
});

module.exports = router;