'use strict';

var model = require('./model');

var topicObj = exports = module.exports = {};
//方法
topicObj.init = function(ap) {
    topicObj.app = ap;
};

topicObj.create = function(name, description, cb) {
    var newTopic = {
        name: name,
        description: description
    };
    var newData = new model.TopicModel(newTopic);
    newData.save(function(err, newDoc) {//save接口的回调结果
        if (!err) {//save成功
            cb(null, newDoc.name);
        } else {//save失败
            cb(err, null);
        }
    });
};

topicObj.getList = function(cb) {
    model.TopicModel.find({}, function(err, docs){
        if (!err) {
        	if (!docs) {
        		docs = [];
        	}
            cb(null, docs);
        } else {
            cb(err, null);
        }
    });
};