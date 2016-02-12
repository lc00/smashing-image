var express = require('express');
var Image = require('../models/image');
var Album = require('../models/album');
var fs = require('fs');
var Chance = require('chance');
var Promise = require('bluebird');

var chance = new Chance();

var ImageController = function(){};

ImageController.prototype.saveImages = function(req){
	var promiseArr = [];
	var fileArr = req.files;

	fileArr.forEach(function(file){
		promiseArr.push(new Promise(function(resolve, reject){

			var moreFileInfo = req.body.moreFileInfo;
			var title;
			var description;

			if(moreFileInfo) {
				var f = moreFileInfo.shift();
				if(f.title) {	
					title = f.title;
				}
				if(f.description) {
				  description = f.description;
				}	
			}

			var fileName = file.filename;
			var contentType = file.mimetype;
			var albumName = req.body.albumName || null;
			var link = chance.string({pool: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'});
			var isPublic = req.body.isPublic;
			var userId = req.user._id;

			var image = new Image({
				fileName: fileName,
				contentType: contentType,
				albumName: albumName,
				link: link,
				isPublic: isPublic,
				userId: userId,
				title: title, 
				description: description
			});	

			image.save(function(err, image){
				if(err) return reject(err);
				return resolve(image);
			});
		}));
	});

	return Promise.all(promiseArr);
}


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

