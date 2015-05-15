'use strict';
/**
* 此文件封装了发表文章相关的业务逻辑功能
* 由routes/contents.js调用
*/

var contents = require("../services/db").Contents;
var uuid = require('uuid');
//创建新文章
  exports.creatAticle = function(title, cb) {
  	var uid = uuid.v4();
	contents.createArticle(uid, title, function(err, doc){
		var result = {};
		if (!err) {
			result.resultCode = 'S';
			result.content = {id: doc.id};
		} else {
			result.resultCode = 'F';
			result.errorCode ='1112';
			result.message = err.message;
		}
		cb(result);
	});
};

