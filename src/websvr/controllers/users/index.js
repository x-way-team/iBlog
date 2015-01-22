"use strict";
var user = require("../../services/db").User;

exports.verify = function(req, res) {
	var userName = req.params.userName;
	var password = req.params.password;
	var checkCode = req.params.checkCode;//ignore
	user.getToken(userName, password, function(result) {
		if (result.resultCode === 'S') {
			result.content = result.content || {};
			result.content.token = req.sessionID;
		} else {
			result.errorCode = 1109;
			result.message = 'can not find user sign info';
		}
		res.json(result);
	});	
};