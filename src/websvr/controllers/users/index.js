"use strict";
var db = require("../../services/db")
.error(function(err){
	console.log(err);
}).config("mongodb://root:root@localhost/iblogdb")
.start();

exports.signIn = function(userName, password, checkCode, cb){
	db.User.getToken(userName, password, cb);
};