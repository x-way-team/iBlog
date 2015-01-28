var express = require('express');
var router = express.Router();
var users = require('../controllers/users.js');

/* create user session, user sign in */
router.post('/', function(req, res){
	var userName = req.body.data.userName;
	var password = req.body.data.password;
	var checkCode = req.body.data.checkCode;
	//todo: verify checkcode
	//...
	users.createSession(userName, password, req.sessionID, function(result) {
		if (result.resultCode === 'S') {
			result.content = result.content || {};
			result.content.token = req.sessionID;
		} else {//(result.resultCode === 'F')
			result.errorCode = 1109;
			result.message = 'failed to create session';
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