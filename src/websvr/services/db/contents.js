'use strict';

var model = require('./model');
var guid = require('guid');

var contentObj = exports = module.exports = {};

//操作
contentObj.init = function (ap) {
    contentObj.app = ap;    
};

//创建文章
//返回文章Id
contentObj.createArticle = function(uid, title, cb) {
    var newArticle = {
        id: guid.raw(),
        author: uid,
        title: title,
    };
    var newData = new model.ArticleModel(newArticle);
    newData.save(function(err, arti) {//save接口的回调结果
        if (!err) {//save成功
            cb(null, arti.id);
        } else {//save失败
        	console.log(err, arti.id);
            cb(new Error("internal error, failed to save this article:"+ title +","+ arti.id), null);
        }
    });
};

//更新文章
contentObj.updateArticle = function(id, articleObj, cb) {
    //todo
};

//得到文章数据
contentObj.getArticle = function(id, cb) {
    //todo
};

//公布文章
contentObj.commitArticle = function(id, cb) {
    //todo
};

//封锁文章
contentObj.lockArticle = function(id, cb) {
    //todo
};

//解锁文章
contentObj.unlockArticle = function(id, cb) {
    //todo
};

//创建主题，管理员账号使用
contentObj.createTopic = function(name, description, cb) {
    var newTopic = {
        name: name,
        description: description,
    };
    var newData = new model.TopicModel(newTopic);
    newData.save(function(err, topic) {//save接口的回调结果
        if (!err) {//save成功
            cb(null);
        } else {//save失败
            cb(err);
        }
    });
};

//用于topic页面显示的所有分类的列表
contentObj.getTopics = function(cb) {
    model.TopicModel.find().exec(function (err, topics){
        if (!err){
            cb(null, topics); 
        } else {
            cb(err, null);
        }
    });
};

//页面点选topic后返回的数据
contentObj.getArticlesByTopic = function(topicName, cb) {
    model.ArticleModel.find({topic: topicName})
    .select('id author title modifyOn')
    .exec(function (err, articles){
        if (!err){
            cb(null, articles); 
        } else {
            cb(err, null);
        }
    });
};