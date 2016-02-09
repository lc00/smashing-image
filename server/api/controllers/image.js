var express = require('express');
var Image = require('../models/image');
var Album = require('../models/album');
var fs = require('fs');
// var jwt = require('jwt-simple');
// var payload = {payload: new Date()};
// var secret = 'lksdksdsdfsdfsd325987d8970dgs7';
var Chance = require('chance');

var chance = new Chance();

var ImageController = function(){};

ImageController.prototype.add = function(req, res, next){
	var message = null;
	var albumName = req.body.albumName;
	var files = req.files;
	var isPublic = req.body.isPublic;
	var arr = [];
	var userId = req.user._id;

	// array of objects
	var moreFileInfo = req.body.moreFileInfo;

	console.log(req.body)
console.log(req.files)
	if(albumName != 'null'){
		console.log('yes album')
		console.log(arr)
		saveImage(files, arr, isPublic, moreFileInfo);
/*!!!!!!!!!!!!!!!!!!!!!
		create promise for saveImage so to be able to
		save the album after getting the array of images' id
		back 
		*/

		// album save error

		// album save success
		// res.status(200).json({message: message});
	}

	else {
		console.log('no album')
		saveImage(files, null, isPublic, moreFileInfo);

		// images save error

		// images save success
		// res.status(200).json({message: message});
	}

	/* save with recursion  */
	function saveImage (files, result, isPublic, moreFileInfo) {

console.log( 'result: ' + result)
console.log('isPublic: ' + isPublic)

	// base case, when no more files
		if ( files.length == 0 ){
			message = 'images saved';
			if(result){

				var link = chance.string({pool: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'});
				var album = new Album(
					{
						title: albumName,
						link: link,
						isPublic: isPublic,
						userId: userId
					});
				album.content = result;
				album.save(function(err, data){
					if(err) return res.status(500).json(err);							
					message = 'album saved';
					res.status(200).json({message: message});
				});
			}

			else { 
				res.status(200).json({message: message});
			}
		}
	// else, keep going, get the next file and save it 
		else {

			// if it's an album
			if(result) {
				var file = files.shift();
				var fileName = file.filename;
				var link = chance.string({pool: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'});

				// if there's info about the file
				if(moreFileInfo) {
					var f = moreFileInfo.shift();
					if(f.title) {	
						var title = f.title;
					}
					if(f.description) {
						var description = f.description;
					}	
				}

				var image = new Image({
					fileName: fileName,
					contentType: file.mimetype,
					album: true,
					link: link,
					isPublic: isPublic,
					userId: userId,
					title: title, 
					description: description
				});	
			}

			else {
				var file = files.shift();
				var fileName = file.filename;
				var link = chance.string({pool: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'});

				// if there's info about the file
				if(moreFileInfo) {
					var f = moreFileInfo.shift();
					if(f.title) {	
						var title = f.title;
					}
					if(f.description) {
						var description = f.description;
					}	
				}

				var image = new Image({
					fileName: fileName,
					contentType: file.mimetype,
					link: link,
					isPublic: isPublic,
					userId: userId,
					title: title,
					description: description

				});
			}

			image.save(function(err, data){
				if(err) return res.status(500).json(err);
				if(data.album == true) {
					result.push(data.fileName);
					saveImage(files, result, isPublic, moreFileInfo);
				}
				else {
					saveImage(files, null, isPublic, moreFileInfo);
				}
			});
		}
	};

/* end of recusion   */		

	// if(albumName) {
	// 	var album = new Album({title: albumName});
	// 	for(var i=0; i<req.files.length; i++){
	// 		var image = new Image({
	// 			data: fs.readFileSync(req.files[i].path),
	// 			contentType: req.files[i].mimetype,
	// 			album: true
	// 		});

	// 		image.save(function(err, data){
	// 			if(err) return res.status(500).send(err);
	// 			album.content.push(data._id);

	// 		});
	// 	}
		
	// 	album.save(function(err, data){
	// 		if(err) return res.status(500).send(err);
					
	// 		message = 'album saved';
	// 		res.status(200).json({message: message});

	// 	})		


	// }

	// else {
	// 	for(var i=0; i<req.files.length; i++){
	// 		var image = new Image({
	// 			data: fs.readFileSync(req.files[i].path),
	// 			contentType: req.files[i].mimetype
	// 		});

	// 		image.save(function(err, data){
	// 			if(err) return res.status(500).send(err);
	// 		});
	// 	}
	// 			message = 'images saved';
	// res.status(200).json({message: message});
	// }


};

ImageController.prototype.getImagesByUser = function(req, res, next){
	Image.find({userId: req.user._id}, function(err, images){
		if(err) res.status(500).json(err);
		
		res.status(200).json(images);
	});	
};

// album request
ImageController.prototype.get = function(req, res, next){
	Image.find({fileName: req.query.imageFileName}, function(err, images){
		if(err) res.status(500).json(err);
		res.status(200).json(images);
	});
};

ImageController.prototype.getByImageLink = function(req, res, next){
	Image.findOne({link: req.params.link}, function(err, image){
		if(err) res.status(500).json(err);
		res.status(200).json(image);
	});
};

module.exports = ImageController;

