var express = require('express');
var router = express.Router();
var contents = require('../controllers/contents.js');



/* create new article */
router.post('/', function(req, res){
	//todo: verify title
	var title = req.body.data.title;
	contents.creatAticle(title, function(result) {
		res.json(result);
	});
});


module.exports = router;