var express = require('express');
var router = express.Router();
var contents = require('../controllers/contents.js');



/* create new article */
router.post('/', function(req, res){
    //todo: verify title
    var token = req.body.params.token;
    var data = req.body.data;
    contents.creatAticle(token, data, function(result) {
        res.json(result);
    });
});


module.exports = router;
