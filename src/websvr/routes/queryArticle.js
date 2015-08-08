'use strict';
var express = require('express');
var router = express.Router();
var queryArticle = require('../controllers/queryArticle.js');





/*get articls needed list from the whole*/
router.get('/', function(req, res){
    //todo: verify title
    var token = req.query.token;
    var  keyWords= req.query.keyWords;
    queryArticle.getAticleAll(token, keyWords, function(result) {
        res.json(result);
    });
});


/*get articls needed list from the specific topic*/
router.get('/:topic', function(req, res){
    var token = req.body.params.token;
    var topicName=req.params.topic;
    var queryObj = req.body.data;
    queryArticle.updateSubject(token, objId,updateObj, function(result){
        res.json(result);
    });    
});
module.exports = router;
