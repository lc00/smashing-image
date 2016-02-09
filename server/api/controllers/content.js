var express = require('express');
var Image = require('../models/image');
var Album = require('../models/album');
var ImageController = require('../controllers/image');
var AlbumController = require('../controllers/album');

var Promise = require("bluebird");

var ContentController = function(){};
var imageController = new ImageController();
var albumController = new AlbumController();

ContentController.prototype.get = function(req, res, next){
	var promiseArr = [];

	promiseArr.push(new Promise(function(resolve, reject){
		Image.find({isPublic: true, album: false})
					.sort('-date')
					.exec(function(err, images){
						if(err) return reject(err);
						resolve(images);
					})
	}));

	promiseArr.push(new Promise(function(resolve, reject){
		Album.find({isPublic: true})
					.sort('-date')
					.exec(function(err, albums){
						if(err) return reject(err);
						resolve(albums);
					})
	}));


	Promise.all(promiseArr)
		.then(function(result){
			res.json(result);
		})

};

module.exports = ContentController;