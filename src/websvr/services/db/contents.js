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
