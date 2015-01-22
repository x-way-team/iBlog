var express = require('express');
var router = express.Router();
var users = require('../controllers/users');

/* GET users listing. */
router.get('/token', users.signIn);

module.exports = router;
