//======================
// REQUIREMENTS
//======================
//require express, mongoose, Donut schema, user
var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var Donut = require("../models/products.js");
var User = require("../models/users.js");


//======================
// INDEX
//======================
router.get('/', function(req, res){
	Donut.find({}, function(err, donut){
		res.render("products/index.hbs", {
			donut: donut
		});
	});
});



//======================
// NEW
//======================
router.get('/new', function(req, res){
	res.render("products/new.hbs");
});

//======================
// SHOW
//======================
// this is for user /check out
router.get('/user', function(req, res){

	User.findOne({username: "Christine"}, function(err, user){
		console.log("found the user: ", user);
			res.render("users/user.hbs", {
				user: user
			});

	//saving a user into db
	// var newUser = new User({
	// 	username: "Christine",
	// 	shopping_cart: []
	// 	});
	//
	// console.log(newUser);
	//
	// newUser.save(function(err, user){
	//
	// 	})
	});
});

// this is for each Donuts page
router.get('/:id', function(req, res){
	Donut.findById(req.params.id, function(err, donut){
		console.log("found donuts");
		res.render("products/show.hbs", {
			donut: donut
		});
	});
});

//======================
// CREATE
//======================
router.post('/', function(req, res){

	console.log(req.body);

	var newDonut = new Donut(req.body);
	newDonut.save(function(err, data){
		res.redirect('/');
	});
});

//======================
// EDIT
//======================
router.get('/:id/edit', function(req, res){
	Donut.findById(req.params.id, function(err, donut){
		res.render("products/edit.hbs", {
			donut: donut
		});
	});
});

//======================
// UPDATE
//======================
// Click BUY will: update donut.qty and push into user.shopping_cart
router.put("/:id", function(req, res){
	req.body.qty = (req.body.qty - 1);
	Donut.findByIdAndUpdate(req.params.id, req.body, function(err, donut){
		console.log(donut);
		User.findOneAndUpdate({username: "Christine"},
			{$push: {shopping_cart: donut.name}},
			function(err, data){
				res.redirect('/' + req.params.id);
			});
	});
});



//======================
// DELETE
//======================
router.delete('/:id', function(req, res){
	Donut.findByIdAndRemove(req.params.id, function(err, donut){
		res.redirect('/');
	});
});

//======================
// EXPORTS
//======================
module.exports = router;
