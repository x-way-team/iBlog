'use strict';

var topics = require("../services/db").Topics;
exports.create = function(name, desc, cb) {
    topics.create(name, desc, function (err, doc) {
        var result = {};
        if (!err) {
            result.resultCode = 'S';
            result.content = {};
        } else {
            result.resultCode = 'F';
            result.errorCode ='1120';
            result.message = err.message;
        }
        cb(result);
    });
};

exports.getList = function(cb) {
    topics.getList(function (err, docs) {
        var result = {};
        if (!err) {
            result.resultCode = 'S';
            result.content = {topics: docs};
        } else {
            result.resultCode = 'F';
            result.errorCode ='1121';
            result.message = err.message;
        }
        cb(result);
    });
};