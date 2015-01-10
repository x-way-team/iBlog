var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
	res.render('index', { title: 'iBlog' });
});

router.get('/:spec', function(req, res) {
	res.render('index', { title: 'iBlog' });
});

router.get('/partial/:spec', function(req, res) {
	res.render(req.params.spec, { title: 'iBlog' });
});
module.exports = router;
