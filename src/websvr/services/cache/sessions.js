'use strict';
var uuid = require('uuid');
var redis = require('redis');
var config = require('../config').data.cache.sessions;

var client = null;
var cache = null;
var EXPIRE_TIME = 60*30;

exports.init = function(cacheMou, cb) {
    cache = cacheMou;
    if (!config) {
        cb(new Error('Failed to init cache, please check if config file exist.'));
        return;
    }
    var options = {};
    if (config.options) {
        options.auth_pass = config.options.password;
    }
    client = redis.createClient(config.port, config.host, options);
    if (!client) {
        cb(new Error('Failed to init cache, please check configuration or cache server'));
        return;
    }

    client.on("error", function (err) {
        cb(err);
    });

    client.select(config.dbNum, function(err, reply) {
        if (err) {
            cb(err);
        }
    });
}

exports.createSession = function(cb) {
    var token = uuid.v4();
    var date = Date.now();
    client.hset(token, "createOn", date, function(err, reply) {
        if (err) {
            cb(err, null);
        } else {
            client.expire(token, EXPIRE_TIME);
            cb(null, token);
        }
    });
};

exports.clearSession = function(token, cb) {
    client.exists(token, function(err, reply) {
        if (err) {
            cb(err, null);
        } else if (reply !== 1) {
            cb(new Error('token '+ token + ' is not exist, maybe expired.'), null);
        } else {
            client.hkeys(token, function(err, reply) {
                if (err) {
                    cb(err, null);
                } else {
                    var count = reply.length;
                    //ignore "createOn"
                    var delArr = [];
                    for (var i = 0; i < count; ++i) {
                        if (reply[i] !== 'createOn') {
                            delArr.push(reply[i]);
                        }
                    }
                    client.hdel(token, delArr);
                    client.expire(token, EXPIRE_TIME);
                    cb(null, true);
                }
            });    
        }
    });
};

exports.updateSession = function(token, obj, cb) {
    client.exists(token, function(err, reply) {
        if (err) {
            cb(err, null);
        } else if (reply !== 1) {
            cb(new Error('token '+ token + ' is not exist, maybe expired.'), null);
        } else {
            obj.modifyOn = Date.now();
            client.hmset(token, obj, function(err, reply) {
                if (err) {
                    cb(err, null);
                } else {
                    client.expire(token, EXPIRE_TIME);
                    cb(null, obj);
                }        
            });            
        }
    });
};

exports.getSessionObject = function(token, cb) {
    //return token
    client.hgetall(token, function(err, reply) {
        if (err) {
            cb(err, null);
        } else {
            client.expire(token, EXPIRE_TIME);
            cb(null, reply);
        }
    });
};

exports.getSessionAttrs = function(token, arr, cb) {
    client.hmget(token, arr, function(err, reply) {
        if (err) {
            cb(err, null);
        } else {
            var attrObj = {};
            var count = arr.length();
            for (var i = 0; i < count; ++i) {
                attrObj[arr[i]] = reply[i];
            }
            client.expire(token, EXPIRE_TIME);
            cb(null, attrObj);
        }
    });
};

exports.verifyToken = function(token, cb) {
    client.exists(token, function(err, reply) {
        if (err) {
            cb(err, null);
        } else if (reply !== 1) {
            cb(new Error('Token ' + token + ' not found'), null);
        } else {
            client.expire(token, EXPIRE_TIME);
            cb(null, true);
        }
    });
};
