'use strict';
var express = require('express');
var router = express.Router();
var subjects = require('../controllers/subjects.js');



/* create new subject */
router.post('/', function(req, res){
    //todo: verify title
    var token = req.body.params.token;
    var data = req.body.data;//subject
    subjects.createSubject(token,data, function(result) {
    res.json(result);
    });

});

/*get subject list*/
router.get('/', function(req, res){
    //todo: verify title
    var token = req.query.token;
    // var data = req.body.data;//user
    subjects.loadSubjects(token, function(result) {
        res.json(result);
    });
});
/* update subject info */
router.put('/:subjectID', function(req, res){
    var token = req.body.params.token;
    var objId=req.params.subjectID;
    var updateObj = req.body.data;
    subjects.updateSubject(token, objId,updateObj, function(result){
        res.json(result);
    });    
});

module.exports = router;
