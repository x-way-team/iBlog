'use strict';
var user = require("../services/db").Users;

exports.createSession = function(userName, password, webSessionID, cb) {
	var token = webSessionID;
	user.createSession(userName, password, token, function(err, doc){
		var result = {};
		if (!err) {
			result.resultCode = 'S';
			result.content = {token: doc.token, uid: doc.uid};
		} else {
			result.resultCode = 'F';
			result.errorCode = '1109';
			result.message = err.message;
		}
		cb(result);
	});
}