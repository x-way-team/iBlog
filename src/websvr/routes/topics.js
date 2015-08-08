'use strict';
var express = require('express');
var router = express.Router();
var topics = require('../controllers/topics.js');

/* create new topic */
router.post('/', function(req, res) {
    var data = req.body.data;//subject
    topics.create(data.name, data.description, function(result) {
    	res.json(result);
    });
});

/* get topics */
router.get('/', function(req, res) {
    var data = req.body.data;//subject
    topics.getList(function(result) {
    	res.json(result);
    });
});

module.exports = router;
