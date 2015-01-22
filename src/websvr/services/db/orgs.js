'use strict';

var app = null;
var db = null;
exports.init = function (ap){
	app = ap;
	db = app.DB;
};
