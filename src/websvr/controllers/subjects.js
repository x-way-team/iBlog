'use strict';
/**
* 此文件封装了发表文章相关的业务逻辑功能
* 由routes/contents.js调用
*/

var subjects = require("../services/db").Subjects;
var sessions = require('../services/cache').Sessions;
var uuid = require('uuid');
//创建新类别
exports.createSubject = function(token, data, cb) {
    sessions.getSessionAttrs(token, ['uid'], function (err, dataObj) {
        if (err) {
            result.resultCode = 'F';
            result.errorCode ='1113';
            result.message = err.message;
            cb(result);
            return;
        }
        subjects.createSubject(dataObj.uid,data,function (err, docs) {
            var result = {};
            if (!err) {
                result.resultCode = 'S';
                result.content = {articles: docs};
            } else {
                result.resultCode = 'F';
                result.errorCode ='1113';
                result.message = err.message;
            }
            cb(result);
        });
    });
};

//load当前用户类别列表
exports.loadSubjects = function(token,cb) {

    sessions.getSessionAttrs(token, ['uid'], function (err, dataObj) {
        if (err) {
            result.resultCode = 'F';
            result.errorCode ='1114';
            result.message = err.message;
            cb(result);
            return;
        }
        subjects.getSubjects(dataObj.uid,function (err, docs) {
            var result = {};
            if (!err) {
                result.resultCode = 'S';
                result.content = {
                    subjects: docs
                };
            } else {
                result.resultCode = 'F';
                result.errorCode ='1114';
                result.message = err.message;
            }
            cb(result);
        });
    });
};
//更新类别
exports.updateSubject = function(token,subjectID,subjectObj,cb) {

        subjects.updateSubject(subjectID,subjectObj, function(err, doc) {
        var result = {};
        if (!err) {
            sessions.updateSession(doc, function(err, data){             
                result.resultCode = 'S';
                result.content = data;
                cb(result);
            });
        } else {
            result.resultCode = 'F';
            result.errorCode ='1115';
            result.message = err.message;
            cb(result);
        }        
    });
};
