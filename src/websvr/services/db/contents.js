'use strict';

var model = require('./model');

var contentObj = exports = module.exports = {};

//操作
contentObj.init = function (ap) {
    contentObj.app = ap;    
};

//创建文章
//返回文章Id
contentObj.createArticle = function(uid, title, cb) {
    //todo
};

//更新文章
contentObj.updateArticle = function(id, articleObj, cb) {
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
