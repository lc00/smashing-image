var mongoose = require('mongoose');

//Create a Mongoose schema which maps to a MongoDB 
//collection and defines the shape of the documents within that collection.
var ImageSchema = new mongoose.Schema({
	fileName: String,
	contentType: String,
	title: String,
	description: String,
	link: String,
	date: {
		type: Date, 
		default: Date.now 
	},
	albumName: String,
	isPublic: {
		type: Boolean,
		default: true
	},
	userId: String,
	url: String
});

// create image model with image schema; a model is a class that is used to create a document
var Image = mongoose.model('Image', ImageSchema);

module.exports = Image;

