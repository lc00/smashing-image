var express = require('express');

var router = express.Router();

router.use('/', express.static(__dirname + '/../../client'));

router.get('/*', function(req, res){
	var options = {
		root: __dirname + '/../../client',
		dotfiles: 'deny'
	};

	res.sendFile('index.html', options, function(err){
		if(err) return res.sendStatus(err.status);
		console.log('index.html is sent');
	});

});

module.exports = router;