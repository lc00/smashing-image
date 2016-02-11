var express = require('express');
var AlbumController = require('../controllers/album');
var passport = require('../config/passport'); 

var albumController = new AlbumController();
var router = express.Router();


// router.post('/create', passport.authenticate('bearer', {session: false}), albumController.create);
router.get('/user', passport.authenticate('bearer', {session: false}), albumController.getAlbumsByUser);

// for share link
router.get('/:link', albumController.getByAlbumLink);

module.exports = router;
	

	