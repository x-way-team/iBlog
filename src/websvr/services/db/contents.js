'use strict';

var model = require('./model');
var uuid = require('uuid');

var contentObj = exports = module.exports = {};

//操作
contentObj.init = function (ap) {
    contentObj.app = ap;    
};

//创建文章
//返回文章Id
contentObj.createArticle = function(uid, data, cb) {
    var newArticle = {
        id: uuid.v4(),
        author: uid
    };
    for (var key in data) {
        newArticle[key] = data[key];
    }
    var newData = new model.ArticleModel(newArticle);
    newData.save(function(err, newDoc) {//save接口的回调结果
        if (!err) {//save成功
            //同时创建评论容器
            var newComments = new model.CommentModel({
                id: uuid.v4(),
                commentTo: newDoc.id,
                comments: [],
            });

            cb(null, newDoc.id);
        } else {//save失败
        	console.log(err, newDoc.id);
            cb(new Error("internal error, failed to save this article:"+ title +","+ newDoc.id), null);
        }
    });
};

//更新文章
contentObj.updateArticle = function(id, articleObj, cb) {
    model.ArticleModel.findOne({
        id:id
    }, function(err, doc){
        if (!err && doc) {
            for (var key in articleObj) {
                doc[key] = articleObj[key];
                doc.modifyOn = Date.now();
            }
            doc.save(function(err, data){
                cb(err, data);
            });
        } else {
            cb(err, null);
        }
    });
};
//得到当前用户文章列表
contentObj.getArticles = function(userId, cb) {
    model.ArticleModel.find({author: userId})
    .select('id title status visits')
    .exec(function(err, docs){
        if (!err && docs) {
            cb(null, docs);
        } else {
            cb(err, null);
        }
    });
};
//得到文章数据
contentObj.getArticleDetail = function(id, cb) {
    model.ArticleModel.findOne({id: id})
    .select('id author modifyOn mark visits title keywords references content topic')
    .exec(function(err, doc){
        if (!err && doc) {
            model.CommentModel.findOne({id:id}, function(err, cdoc) {
                if (!err && cdoc) {
                    doc.comments = cdoc;
                    cb(null, doc);
                } else {
                    cb (err, null);
                }
            });
        } else {
            cb(err, null);
        }
    });
};

//公布文章
contentObj.commitArticle = function(id, cb) {
    //todo
    model.ArticleModel.findOne({id: id}, function(err, doc) {
        if (!err && doc) {
            if (doc.status !== 'staged') {
                cb(new Error('Forbidden to commit article'), null);
            } else {
                doc.status = 'committed';
                doc.save(function(err, doc){
                    if (!err) {
                        cb(null, true);
                    } else {
                        cb(err, null);
                    }
                });
            }
        } else {
            cb(err, null);
        }
    });
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