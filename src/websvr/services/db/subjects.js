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
        creator: uid
    };
    for (var key in data) {
        newSubject[key] = data[key];
    }
    var newData = new model.SubjectModel(newSubject);
    newData.save(function(err, newDoc) {//save接口的回调结果
        if (!err) {//save成功
            cb(null, newDoc.id);
        } else {//save失败
            cb(err, null);
        }
    });
};
//更新类别
subjectObj.updateSubject = function(subjectID,subjectObj, cb) {
    model.SubjectModel.findOne({
        id:subjectID
    }, function(err, doc){
        if (!err && doc) {
            // for (var key in subjectObj) {
                doc.name= subjectObj.name;
                doc.modifyOn = Date.now();
            // }
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
    model.SubjectModel.find({creator: userId})
    .select('id name articles')
    .exec(function(err, docs){
        if (!err && docs) {
            cb(null, docs);
        } else {
            cb(err, null);
        }
    });
};