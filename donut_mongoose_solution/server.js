//======================
// REQUIREMENTS
//======================
// require express, mongoose, body-parser, method-override
var express = require("express");
var app = express();
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var hbs = require("hbs");


//======================
// MIDDLEWARE
//======================
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(methodOverride("_method"));

app.set("view engine", "hbs");
app.set('views', './views');

app.use(express.static('public'));
//======================
// CONTROLLERS
//======================
//for seed file, seed the database
var seedController = require('./controllers/seeds.js');
app.use('/seed', seedController);

//for root directory, show all products
var productsController = require('./controllers/products.js');
app.use('/', productsController);

//======================
// LISTENERS
//======================
mongoose.connect('mongodb://localhost:27017/mongoose_store');

mongoose.connection.once('open', function(err, data){
	console.log("**Mongoose is CONNECTED**");
	app.listen(3000, function(req, res){
		console.log("***LISTENING***");
	});
});
