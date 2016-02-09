var express = require('express');
var Image = require('../models/image');
var Album = require('../models/album');

var AlbumController = function(){};

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

