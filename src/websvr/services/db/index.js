'use strict';
/* api:
* 
*
*/

var users = require("./users.js");
var contents = require("./contents.js");
var orgs = require("./orgs.js");

var mongoose = require('mongoose');

var app = exports = module.exports = function() {
	this.Users = users;
	this.Contents = contents;
	this.Orgs = orgs;
	this.DB = mongoose;

	this.config_data = {url:null};
	this.error_cb = null;
	this.state = "uninit";
};

app.config_data = {url:null};

app.config = function(dbUrl) {
	this.config_data.url = dbUrl;
	this.state = "config";
	return this;
};

app.error = function(fn) {
	this.error_cb = fn;
	return this;
};

app.start = function() {
	if (!this.config_data.url) {
		if (this.error_cb) {
			this.error_cb(new Error("db needs url"));
		}		
		return;
	}
	mongoose.connect(this.config_data.url, function (error) {
	    if (error) {
	        console.log(error);
	        if (this.error_cb) {
	        	this.error_cb(error);
	        }	        
	    } else {
	    	this.Users.init(this);
	    	this.Contents.init(this);
	    	this.Orgs.init(this);
	    	this.state = "init";
	    }
	});
};