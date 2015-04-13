'use strict';

var model = require('./model');

var userObj = exports = module.exports = {};
//方法
userObj.init = function(ap) {
    userObj.app = ap;
};

userObj.createSession = function(token, cb) {
    model.WebSessionModel.findOne({ 
        token: token
    }, function (err, doc) {
        if (err || !doc) {
            var newDoc = {
                token: token
            };
            var newData = new model.WebSessionModel(newDoc);
            cb(null, newDoc);
        } else {
            cb(new Error("internal error, conflict token " + token), null);            
        }
    });
};

//删除当前session
userObj.deleteSession = function(token, cb) {
    model.WebSessionModel.remove({ 
        token: token
    }, function (err) {
        cb(err);
    });
};

userObj.auth = function(token, userName, password, cb) {
    model.UserModel.findOne({ 
        userName: userName,
        password: password
    }, function (err, doc) {
        if (err) {
            cb(err, doc);
        } else if(!doc){
            cb(new Error("check user failed"), doc);
        } else {
            var newDoc = {
                token: token,
                uid: doc.uid,
                userName: doc.userName
            };
            var newData = new model.WebSessionModel(newDoc);
            cb(null, newDoc);
        }
    });
};

userObj.createUser = function(userName, password, cb) {
    model.UserModel.findOne({ 
        userName: userName
    }, function (err, doc) {
        if (err || !doc) {
            var newDoc = {
                userName: userName,
                password: password
            };
            var newData = new model.UserModel(newDoc).save(function(err, user){
                if (!err) {
                    newDoc.uid = user._id;
                    cb(null, newDoc);
                } else {
                    console.log(err, user);
                }
            });            
        } else {
            cb(new Error("user exist:" + userName), null);            
        }
    });
};