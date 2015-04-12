'use strict';

var mongoose = require('mongoose');

var userObj = exports = module.exports = {};
var Schema = mongoose.Schema;

//模型
var UserPropertySchema = new Schema({
	level: Number,  //等级，通过经验值计算得到
	points: Number, //经验值
	coins: Number,  //通过blog活动获取，用于在blog活动消费
});

var UserSchema = new Schema({
    uid: String,
    userName: String,
    password: String,
    createDate: Date,
	locked: Boolean, //管理员锁定账号
    property: UserPropertySchema,

});
var WebSessionSchema = new Schema({
    token: String,
    uid: String,
    userName: String
});
var UserModel = mongoose.model('iblog.users', UserSchema);
var WebSessionModel = mongoose.model('iblog.websession', WebSessionSchema);

//方法
userObj.init = function(ap) {
    userObj.app = ap;
    userObj.db = ap.DB;
};

userObj.createSession = function(token, cb) {
    WebSessionModel.findOne({ 
        token: token
    }, function (err, doc) {
        if (err || !doc) {
            var newDoc = {
                token: token
            };
            var newData = new WebSessionModel(newDoc);
            cb(null, newDoc);
        } else {
            cb(new Error("internal error, conflict token " + token), null);            
        }
    });
};

//删除当前session
userObj.deleteSession = function(token, cb) {
    WebSessionModel.remove({ 
        token: token
    }, function (err) {
        cb(err);
    });
};

userObj.auth = function(token, userName, password, cb) {
    UserModel.findOne({ 
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
            var newData = new WebSessionModel(newDoc);
            cb(null, newDoc);
        }
    });
};

userObj.createUser = function(userName, password, cb) {
    UserModel.findOne({ 
        userName: userName
    }, function (err, doc) {
        if (err || !doc) {
            var newDoc = {
                userName: userName,
                password: password
            };
            var newData = new UserModel(newDoc).save(function(err, user){
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