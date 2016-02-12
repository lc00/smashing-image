var express = require('express');
var ImageController = require('../controllers/image');
var AlbumController = require('../controllers/album');
var passport = require('../config/passport'); 
var multer = require('multer');
var upload = multer({ dest: 'uploads' });


var imageController = new ImageController();
var albumController = new AlbumController();
var router = express.Router();

// multer saves the files to where dest is pointing to, in this case uploads folder
router.post('/add', upload.any(), passport.authenticate('bearer', {session: false}), function(req, res, next){
	imageController.saveImages(req)
		.then(function(result){
			if(result[0].albumName ) {
				return albumController.add(result, res);
			}

			return res.status(201).json(result);

		})
		.catch(function(error){
			console.log('error')
			console.log(error)
			return res.status(500).json(error);
		})
});


// get request from album
router.get('/get', imageController.get);

router.get('/user', passport.authenticate('bearer', {session: false}), imageController.getImagesByUser);

// get request for imageLink
router.get('/:link', imageController.getByImageLink);

module.exports = router;
	