'use strict';

var model = require('./model');
var uuid = require('uuid');

var subjectObj = exports = module.exports = {};
//操作
subjectObj.init = function (ap) {
    subjectObj.app = ap;    
};
//创建类别
//返回类别Id
subjectObj.createSubject = function(uid, data, cb) {
    var newSubject = {
        id: uuid.v4(),
        author: uid
    };
    for (var key in data) {
        newSubject[key] = data[key];
    }
    var newData = new model.SubjectModel(newSubject);
    newData.save(function(err, newDoc) {//save接口的回调结果
        if (!err) {//save成功
            cb(null, newDoc.id);
        } else {//save失败
        	console.log(err, newDoc.id);
            cb(new Error("internal error, failed to save this subject:"+ title +","+ newDoc.id), null);
        }
    });
};
//更新类别
subjectObj.updateArticle = function(id, subjectObj, cb) {
    model.SubjdectModel.findOne({
        id:id
    }, function(err, doc){
        if (!err && doc) {
            for (var key in subjectObj) {
                doc[key] = subjectObj[key];
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
subjectObj.getSubjects = function(userId, cb) {
    model.SubjdectModel.find({author: userId})
    .select('id title status visits')
    .exec(function(err, docs){
        if (!err && docs) {
            cb(null, docs);
        } else {
            cb(err, null);
        }
    });
};