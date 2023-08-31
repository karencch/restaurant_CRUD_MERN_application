const express = require('express');
const Restaurant = require('../models/restaurantModel'); //Must include this line because we used model in this file
const {getRestaurants, getRestaurant, createRestaurant, updateRestaurant, deleteRestsaurant} = require('../controllers/restaurantController');

const router = express.Router();  // Making this variable means I can just use "router" variable instead of app in app.get that I had previously

// ALL ROUTES WILL BE IN HERE

// Note: All the routes I previously declared in server.js to access the server, I moved them into this file:
  
  // GET ALL RESTAURANTS ********************************
  router.get('/', getRestaurants);
  
  // GET SINGLE RESTAURANT ********************************
  router.get('/:id', getRestaurant);
  
  // POST (i.e, CREATE A RESTAURANT) ********************************
  // Sample code; the grayed out code below works so I can check if connecting correctly, but I will not be using it for app
  // app.post('/restaurant', (req, res) => {
  //   console.log(req.body);
  //   res.send(req.body)
  // })
  router.post('/', createRestaurant);
  
  // PUT (i.e., UPDATE A RESTAURANT) ********************************
  router.put('/:id', updateRestaurant);
  
  // DELETE A RESTAURANT ********************************
  router.delete('/:id', deleteRestsaurant);

  // Must export the router out to server.js
  module.exports = router;