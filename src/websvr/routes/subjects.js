'use strict';
var express = require('express');
var router = express.Router();
var contents = require('../controllers/contents.js');



/* create new subject */
router.post('/', function(req, res){
    //todo: verify title
    var token = req.body.params.token;
    var data = req.body.data;//subject
    //todo
});

/*get subject list*/
router.get('/', function(req, res){
    //todo: verify title
    var token = req.query.token;
    // var data = req.body.data;//user
    contents.loadAticles(token, function(result) {
        res.json(result);
    });
});

module.exports = router;
