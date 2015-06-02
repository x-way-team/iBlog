var express = require('express');
var router = express.Router();
var contents = require('../controllers/contents.js');



/* create new article */
router.post('/', function(req, res){
    //todo: verify title
    var token = req.body.params.token;
    var data = req.body.data;//article
    contents.creatAticle(token, data, function(result) {
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

module.exports = router;
