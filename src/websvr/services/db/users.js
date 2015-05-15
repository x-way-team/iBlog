'use strict';

var model = require('./model');
var uuid = require('uuid');

var userObj = exports = module.exports = {};
//方法
userObj.init = function(ap) {
    userObj.app = ap;
};

//用户登录，验证用户身份
userObj.auth = function(userName, password, cb) {
    model.UserModel.findOne({ 
        userName: userName,
        password: password
    }, function (err, doc) {
        if (err) {
            cb(err, doc);
        } else if(!doc){
            cb(new Error("auth user failed"), doc);
        } else {
            cb(null, doc);
        }
    });
};

userObj.createUser = function(userName, password, cb) {
    model.UserModel.findOne({ 
        userName: userName
    }, function (err, doc) {
        if (err || !doc) {
            var newDoc = {
                uid: uuid.v4(),
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

userObj.updateUser = function(userObject, cb) {
    model.UserModel.findOne({
        userName: userObject.userName
    }, function(err, doc) {
        if (err) {
            cb(err, null);
        } else if (!doc) {
            cb(new Error("User do not exist:" + userName), null);
        } else {
            for (var key in userObject) {
                doc[key] = userObject[key];
            }
            doc.save(function(err, user) {
                if (err) {
                    cb(err, null);
                } else {
                    cb(null, user);
                }
            });
        }
    });
};