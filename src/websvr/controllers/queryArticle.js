'use strict';
/**
* 此文件封装了发表文章相关的业务逻辑功能
* 由routes/contents.js调用
*/

var contents = require("../services/db").Contents;
var sessions = require('../services/cache').Sessions;
var uuid = require('uuid');
//创建新文章
exports.creatArticle = function(token, data, cb) {
    sessions.getSessionAttrs(token, ['uid'], function (err, dataObj) {
        if (err) {
            result.resultCode = 'F';
            result.errorCode ='1112';
            result.message = err.message;
            cb(result);
            return;
        }
        contents.createArticle(dataObj.uid, data, function (err, doc) {
            var result = {};
            if (!err) {
                result.resultCode = 'S';
                result.content = {id: doc.id};
            } else {
                result.resultCode = 'F';
                result.errorCode ='1112';
                result.message = err.message;
            }
            cb(result);
        });
    });
};

//load当前用户文章列表
exports.getAticles = function(token, keyWords,topic,cb) {
     // if(!topic){//包含topic null,undefined,false,''
     if(keyWords){ 
        var words = keyWords.split(' ');}  
        contents.queryArticles(words,topic, 0, 8, function (err, docs) {
        var result = {};
        if (!err) {
            result.resultCode = 'S';
            result.content = {
                articles: docs
            };
        } else {
            result.resultCode = 'F';
            result.errorCode ='1112';
            result.message = err.message;
        }
        cb(result);
    });
    };
//     else if(!keyWords){//包含keyWords null,undefined,false,''
//         contents.queryArticles(words,topic, 0, 8, function (err, docs) {
//         var result = {};
//         if (!err) {
//             result.resultCode = 'S';
//             result.content = {
//                 articles: docs
//             };
//         } else {
//             result.resultCode = 'F';
//             result.errorCode ='1112';
//             result.message = err.message;
//         }
//         cb(result);
//     });
//     }else{
//         var words = keyWords.split(' ');
//         contents.queryArticles(words,topic, 0, 8, function (err, docs) {
//         var result = {};
//         if (!err) {
//             result.resultCode = 'S';
//             result.content = {
//                 articles: docs
//             };
//         } else {
//             result.resultCode = 'F';
//             result.errorCode ='1112';
//             result.message = err.message;
//         }
//         cb(result);
//     });
//     }
// };