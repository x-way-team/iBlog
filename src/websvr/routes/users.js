var express = require('express');
var router = express.Router();
var users = require('../controllers/users.js');

/* get user info, user sign up. */
router.get('/', function(req, res){
	res.json({resultCode:'F'});
});
/* create user, user sign up. */
router.post('/', function(req, res){
	res.json({resultCode:'F'});
});

/* update user info, user setup*/
router.put('/', function(req, res){
	res.json({resultCode:'F'});
});

module.exports = router;
