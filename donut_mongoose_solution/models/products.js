//requirements: mongoose
var mongoose = require("mongoose");

var newDonut = new mongoose.Schema({
	name: {type: String, required: true, unique: true},
    description: {type: String, required: true},
    img: String,
    price: Number,
    qty: Number
});

//create new Donut class
var Donut = mongoose.model('Donut', newDonut);

module.exports = Donut;
