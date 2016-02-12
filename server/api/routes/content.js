var express = require('express');
var AlbumController = require('../controllers/album');
var ImageController = require('../controllers/image');
var passport = require('../config/passport'); 

var ContentController = require('../controllers/content');
var contentController = new ContentController();

var albumController = new AlbumController();
var imageController = new ImageController();
var router = express.Router();

router.get('/', contentController.get);

module.exports = router;
	