'use strict';

var mongoose = require('mongoose');

var contentObj = exports = module.exports = {};

//模型////////////////////////////////////////////////////
//文章模型
var Schema = mongoose.Schema;
var ArticleSchema = new Schema({
    //最基本的文章包含的元素
    id: String,
    author: String,         //作者的userid
    title: String,          //文章名
    keywords: [String],     //文章的关键字
    references: [String],   //引用的文章的id
    content: String,        //实际内容，markdown格式
    createDate: Date,       //创建日期
    modifyDate: Date,       //最后修改日期
    status: String,         //staged, committed, locked
    //附加元素
    forks: [String],        //从若干篇文章的副本组合而成
    mark: [String],         //由管理员打的标记，从网站活动中获取
});

//用户关联的文章集合
var CollectionSchema = new Schema({
    id: String,
    owner: String, //用户id
    name: String,  //集合名
    articles: [String], //文章的ids
});

//评论模型, 评论总是在上一个评论基础上加内容，形成一个队列
var CommentSchema = new Schema({
    id: String,
    author: String,         //作者的userid
    content: String,        //评论内容，markdown格式
    createDate: Date,       //创建日期
    modifyDate: Date        //最后修改日期
});

//针对一篇文章评论的容器
var CommentsSchema = new Schema({
    id: String,
    commentTo: String,        //评论文章的id
    comments: [CommentSchema],//所有的评论
});

//专题模型，是文章的容器
var SubjectSchema = new Schema({
    id: String,
    creator: String, //uid
    name: String,
    articles: [String], //article id array
    subjects: [String], //subjects id array,子文件夹
    createDate: Date,
    modifyDate: Date
});


//操作
contentObj.init = function (app) {
    contentObj.app = ap;
    contentObj.db = ap.DB;    
};

//创建文章
//返回文章Id
contentObj.createArticle = function(uid, title, cb) {
    //todo
};

//修改后保存文章
contentObj.updateArticle = function(id, articleObj, cb) {
    //todo
};

//公布文章
contentObj.commitArticle = function(id, cb) {
    //todo
};

//不公布文章
contentObj.stageArticle = function(id, cb) {
    //todo
};
