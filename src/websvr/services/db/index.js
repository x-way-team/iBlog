'use strict';
var users = require("./users.js");
var contents = require("./contents.js");
var orgs = require("./orgs.js");

var db = require('mongoose');

exports = module.exports = createApplication;

function createApplication() {
	this.Users = users;
	this.Contents = contents;
	this.Orgs = orgs;

	var config_data = {};
	this.config = function(dbUrl) {
		config_data.url = dbUrl;
		this.state = "config";
		return this;
	};
	//error callback
	var error_cb = null;
	this.error = function(fn) {
		this.errorcb = fn;
		return this;
	};

	this.state = "uninit";
	//mongodb://root:root@localhost/iblogdb
	this.start = function() {
		if (!config_data.url) {
			error_cb(new Error("db needs url"));
			return;
		}
		db.connect(config_data.url, function (error) {
		    if (error) {
		        console.log(error);
		        if (error_cb) {
		        	error_cb(error);
		        }	        
		    } else {
		    	this.Users.init(this);
		    	this.Contents.init(this);
		    	this.Orgs.init(this);
		    	this.state = "init";
		    }
		});
	};
	return this;
}