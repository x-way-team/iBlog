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


//搜索文章
contentObj.queryArticles = function(attrsObj,topic,offset, limit, cb) {
    var queryObj={};
    if(attrsObj&&topic){//keywords && topic
     var queryOrObj = {};
     var queryItem={};
    if(attrsObj.length!=0){//new RegExp("^.*"+attrsObj+".*$")用于动态的生成以包含输入关键字的正则表达式
        queryItem['$in']=[];
        for(var i=0;i<attrsObj.length;i++){
                queryItem['$in'].push(new RegExp("^.*"+attrsObj[i]+".*$"));
            }
        queryOrObj={"$or":[{title:queryItem},{content:queryItem}]};
        }
        queryObj={"$and":[queryOrObj,{topic: topic}]};
    }
    else if(!topic){//only keywords 构造查询条件,!topic包含topic null,undefined,false,''
       var queryObj = {};
       var queryItem={};
      if(attrsObj.length!=0){
          queryItem['$in']=[];
          for(var i=0;i<attrsObj.length;i++){
            queryItem['$in'].push(new RegExp("^.*"+attrsObj[i]+".*$"));
        }
          queryObj={"$or":[{title:queryItem},{content:queryItem}]};
    }
    //  queryObj={"$or":[{title:new RegExp("^.*"+attrsObj[attr]+".*$")},{content:new RegExp("^.*"+attrsObj[attr]+".*$")}]};
    }
    else {//only topic 构造查询条件,!keyWords包含keyWords null,undefined,false,''
        var queryObj={topic: topic};
    }
    //开始查询
        var query = model.ArticleModel.find(queryObj);
        query.skip(offset)
        .limit(limit)
        .select('id author title status visits modifyOn')
        .exec(function (err, articles){
            if (!err){
                cb(null, {
                    // total:total, 
                    offset:offset, 
                    count:articles.length, 
                    articles:articles
                }); 
            } else {
                cb(err, null);
            }
        });
    // var count = textArr.length;
    // if (count !== 0) {
    //     queryObj['$and'] = [];
    //     for (var i = 0; i < count; ++i) {
    //         var queryElem = {'$or': []};
    //         queryElem['$or'].push({title: new RegExp(textArr[i], 'i')});            
    //         queryElem['$or'].push({content: new RegExp(textArr[i], 'i')});
    //         queryObj['$and'].push(queryElem);
    //     }
    // }
    // queryObj={"$or":[{"title":{"$in":[/attrsObj/,/^attrsObj/,/attrsObj^/]}},{"content":{"$in":[/attrsObj/,/^attrsObj/,/attrsObj^/]}}]};

};