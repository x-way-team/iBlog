var express = require('express');
var router = express.Router();
var users = require('../controllers/users.js');

/* get user info, user sign up. */
router.get('/', function(req, res){
    var token = req.query.token;
    users.getSession(token, function(result){
        res.json(result);
    });
});

/* create user, user sign up. */
router.post('/', function(req, res){
    var token = req.body.params.token;
    // var token = req.query.token;
    //todo: verify token
    var userName = req.body.data.userName;
    var password = req.body.data.password;
    var checkCode = req.body.data.checkCode;
    users.signUp(token, userName, password, function(result) {
        res.json(result);
    });
});

/* update user info, user setup*/
router.put('/', function(req, res){
    var token = req.body.params.token;
    var updateObj = req.body.data;
    users.updateUser(token, updateObj, function(result){
        res.json(result);
    });    
});

module.exports = router;
