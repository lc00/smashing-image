var express = require('express');
var Image = require('../models/image');
var Album = require('../models/album');
var Chance = require('chance');

var AlbumController = function(){};

AlbumController.prototype.add = function(fileObjArr, res){
	var chance = new Chance();
	var link = chance.string({pool: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'});
	
	var title = fileObjArr[0].albumName;
	var isPublic = fileObjArr[0].isPublic;
	var userId = fileObjArr[0].userId;
	var arr = fileObjArr.map(function(file){
		return file.fileName;
	});

	var album = new Album(
		{
			title: title,
			link: link,
			isPublic: isPublic,
			userId: userId,
			content: arr
		});

	album.save(function(err, data){
		if(err) return res.status(500).json(err);							

		res.status(201).json(data);
	});
}



// get public albums from most recent to the oldest
AlbumController.prototype.get = function(req, res, next){

	Album.find({isPublic: true}, function(err, albums){
		if(err) res.status(500).json(err);

		res.status(200).json(albums);
	});
};

AlbumController.prototype.getAlbumsByUser = function(req, res, next){	
	Album.find({userId: req.user._id}, function(err, albums){
		if(err) res.status(500).json(err);
// console.log(albums)
		res.status(200).json(albums);
	});	
};

AlbumController.prototype.getByAlbumLink = function(req, res, next){	
	Album.findOne({link: req.params.link}, function(err, album){
		if(err) res.status(500).json(err);
// console.log(albums)
		res.status(200).json(album);
	});	
};

module.exports = AlbumController;

