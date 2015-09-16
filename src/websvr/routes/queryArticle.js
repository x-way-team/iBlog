'use strict';
var express = require('express');
var router = express.Router();
var queryArticle = require('../controllers/queryArticle.js');





/*get articls needed list from the whole,and get articls needed list from the specific topic*/
router.post('/', function(req, res){
    //todo: verify title
    var token = req.params.token;
    var topic = req.body.data.topic;
    var keyWords= req.body.data.keyWords;
    queryArticle.getAticles(token, keyWords,topic, function(result) {
       res.json(result);
    });

});
module.exports = router;
