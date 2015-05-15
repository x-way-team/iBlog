'use strict';
/* api:
* 
*
*/

var users = require("./users.js");
var contents = require("./contents.js");
var orgs = require("./orgs.js");

var mongoose = require('mongoose');

var app = exports = module.exports = {
	Users: users,
	Contents: contents,
	Orgs: orgs,

	config_data: {url:null},
	error_cb: null,
	state: "uninit",
};

app.config = function(dbUrl, dbOptions) {
	app.config_data.url = dbUrl;
	app.config_data.options = dbOptions;
	app.state = "config";
	return app;
};

app.error = function(fn) {
	app.error_cb = fn;
	return app;
};

app.start = function() {
	if (!app.config_data.url) {
		if (app.error_cb) {
			app.error_cb(new Error("db needs url"));
		}		
		return;
	}
	mongoose.connect(app.config_data.url, function (error) {
	    if (error) {
	        console.log(error);
	        if (app.error_cb) {
	        	app.error_cb(error);
	        }	        
	    } else {
	    	app.Users.init(app);
	    	app.Contents.init(app);
	    	app.Orgs.init(app);
	    	app.state = "init";
	    }
	});
};