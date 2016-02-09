var mongoose = require('mongoose');

//Create a Mongoose schema which maps to a MongoDB 
//collection and defines the shape of the documents within that collection.
var AlbumSchema = new mongoose.Schema({
	title: String,
	description: String,
	content: Array,
	link: String,
	date: {
		type: Date, 
		default: Date.now 
	},
	isPublic: {
		type: Boolean,
		default: true
	},
	userId: String,
	url: String
});

// AlbumSchema.methods.add = function(image) {
	
// };

// create Album model with Album schema; a model is a class that is used to create a document
var Album = mongoose.model('Album', AlbumSchema);



module.exports = Album;

