var express = require('express');
var router = express.Router();
var contents = require('../controllers/contents.js');



/* create new article */
router.post('/', function(req, res){
    //todo: verify title
    var token = req.body.params.token;
    var data = req.body.data;//article
    contents.creatArticle(token, data, function(result) {
        res.json(result);
    });
});
//load当前用户文章列表
router.get('/', function(req, res){
    //todo: verify title
    var token = req.query.token;
    // var data = req.body.data;//user
    contents.loadAticles(token, function(result) {
        res.json(result);
    });
});

//get指定文章
router.get('/:articleId', function(req, res){
    var articleId = req.params.articleId;
    contents.getAticle(token, articleId, function(result) {
        res.json(result);
    });
});
module.exports = router;
