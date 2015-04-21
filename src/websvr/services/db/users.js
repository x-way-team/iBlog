'use strict';

var model = require('./model');
var guid = require('guid');

var userObj = exports = module.exports = {};
//方法
userObj.init = function(ap) {
    userObj.app = ap;
};

userObj.createSession = function(token, cb) {
    model.WebSessionModel.findOne({ 
        token: token
    }, function (err, doc) {//findOne的回调结果
        if (err || !doc) {//成功
            var newDoc = {
                token: token
            };
            var newData = new model.WebSessionModel(newDoc);
            newData.save(function(err, sdata) {
                if (!err) {
                    cb(null, sdata);
                } else {
                    cb(new Error("internal error, failed to save token " + token), null);
                }
            });
            
        } else {//失败
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

userObj.verifyToken = function(token, cb) {
    model.WebSessionModel.findOne({ 
        token: token
    }, function (err, doc) {
        if (err || !doc) {
            cb(new Error("token " + token + ' not found'), null);       
        } else {            
            cb(null, doc);     
        }
    });
};


userObj.auth = function(token, userName, password, cb) {
    userObj.verifyToken(token, function(err, sdoc) {//接口verifyToken的回调结果进行处理
        if (err) {
            cb(err, sdoc);
        } else {
            if (sdoc.userName && sdoc.userName !== userName) {
                cb(new Error('auth user not match'), null);
            } else {
                model.UserModel.findOne({ 
                    userName: userName,
                    password: password
                }, function (err, doc) {
                    if (err) {
                        cb(err, doc);
                    } else if(!doc){
                        cb(new Error("check user failed"), doc);
                    } else {
                        sdoc.userName = doc.userName;
                        sdoc.uid = doc.uid;
                        sdoc.save(function(err, sessionDoc){
                            //console.log('user session saved');
                        });
                        var newDoc = {
                            token: token,
                            uid: doc.uid,
                            userName: doc.userName
                        };
                        cb(null, newDoc);
                    }
                });
            }
        }

    });
};

userObj.createUser = function(userName, password, cb) {
    model.UserModel.findOne({ 
        userName: userName
    }, function (err, doc) {
        if (err || !doc) {
            var newDoc = {
                uid: guid.raw(),
                userName: userName,
                password: password,
            };
            var newData = new model.UserModel(newDoc).save(function(err, user){
                if (!err) {
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