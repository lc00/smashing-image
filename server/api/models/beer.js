var mongoose = require('mongoose');

//Created a Mongoose schema which maps to a MongoDB 
//collection and defines the shape of the documents within that collection.
var BeerSchema = new mongoose.Schema({
	name: String,
	type: String,
	quantity: Number
});

module.exports = mongoose.model('Beer', BeerSchema);