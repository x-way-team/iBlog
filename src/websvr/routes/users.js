var express = require('express');
var router = express.Router();
var users = require('../controllers/users.js');

/* GET users listing. */
router.get('/token', users.signIn);

module.exports = router;
