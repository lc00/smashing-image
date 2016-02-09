var express = require('express');

// create Express router
var router = express.Router();

// create router
router.get('/', function(req, res){
	res.json({"message":"heartbeat"});
});



module.exports = router;