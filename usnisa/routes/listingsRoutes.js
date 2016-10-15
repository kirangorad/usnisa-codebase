var express = require('express');
var router = express.Router();

//load up the item model
var Property = require('../models/property');

//to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.json({status:401,msg:'login first'});
}

module.exports = function(passport) {
	
	/* GET property listing. */
	router.get('/', function(req, res, next) {
		//Find all properties in db
		Property.find({}, function(err, property) {
			  if (err) { throw err; }
			  res.json(property);
		});
	});

	/* GET a property. */
	router.get('/:propertyname', function(req, res, next) {
		Property.find({'propertyname':req.params.propertyname}, function(err, property) {
			  if (err) { throw err; }

			  // object of all the property
			  //console.log(property);
			  res.json(property);
		});
	});

	/* POST add a property. */
	router.post('/', isLoggedIn, function(req, res, next) {
		
			var propertyToAdd = new Property();
			propertyToAdd.propertyName = req.body.propertyName;
			propertyToAdd.propertyCity = req.body.propertyCity;
			propertyToAdd.propertyArea = req.body.propertyArea;
			propertyToAdd.propertyType = req.body.propertyType;
			propertyToAdd.propertyCost = req.body.propertyCost;
			propertyToAdd.propertyDescription = req.body.propertyDescription;
			req.body.propertyPictures.forEach(function(imageValue){
				propertyToAdd.propertyPictures.push(imageValue);
			});
			
			
			propertyToAdd.save(function(err){
				if (err) { throw err; }
				res.json({status:200, msg:'Property created'});
				res.end();
			});
		
			
	});

	/* PUT update property. */
	router.put('/:property_id', isLoggedIn, function(req, res, next) {
		Property.findById(req.params.property_id, function(err, property) {
			  if (err) { throw err; }
			  
			  property.propertyName = req.body.propertyName;
			  property.propertyCity = req.body.propertyCity;
			  property.propertyArea = req.body.propertyArea;
			  property.propertyType = req.body.propertyType;
			  property.propertyPictures = req.body.propertyPictures;
			  
			  property.save(function(err){
				  if (err) { throw err; }
				  res.json({status:200, msg:'Property updated'});
			  });
		});
	});

	/* DELETE delete a property. */
	router.delete('/:property_id', isLoggedIn, function(req, res, next) {
	  res.send('delete property');
	});
	
	return router;
};

