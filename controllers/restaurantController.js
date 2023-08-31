// Controller-- All logic is in here
// Moved logic for the routes into here, so that restaurantRoute.js only has routes
const Restaurant = require('../models/restaurantModel');  // Must import model beecause we used Model below
const asyncHandler = require('express-async-handler');

// GET ALL RESTAURANTS
const getRestaurants = asyncHandler(async (req, res) => {
    try {
      const restaurants = await Restaurant.find({});
      res.status(200).json(restaurants);
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
  })

 // GET A SINGLE RESTAURANT
 const getRestaurant =  asyncHandler(async (req, res) => {
    try {
      const {id} = req.params;
      const restaurant = await Restaurant.findById(id);
      res.status(200).json(restaurant);
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
})
    
// CREATE A RESTAURANT
const createRestaurant = asyncHandler(async (req, res) => {
    try{
      const restaurant = await Restaurant.create(req.body);  // <-- This is what will be saved to database
      res.status(200).json(restaurant)
    } catch(error){
      res.status(500);
      throw new Error(error.message);
    }
  })

//UPDATE A RESTAURANT
const updateRestaurant = asyncHandler(async (req, res) => {
    try {
      const {id} = req.params;
      const restaurant = await Restaurant.findByIdAndUpdate(id, req.body);
      if(!restaurant){    // <-- This accounts for if we cannot find the restaurant with that ID
        res.status(404);
        throw new Error(`Cannot find restaurant with the ID ${id}`);
      }
      // If restaurant updated successfully:
      const updatedRestaurant = await Restaurant.findById(id);
      res.status(200).json(updatedRestaurant);
      
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
  })


// DELETE A RESTAURANT
const deleteRestsaurant = asyncHandler(async(req,res) => {
    try {
      const {id} = req.params;
      const restauraunt = await Restaurant.findByIdAndDelete(id);
      // If restaurant not found by ID:
      if(!restauraunt){
        res.status(404);
        throw new Error(`Cannot find restaurant with the ID ${id}`);
      }
      // If restaurant is successfully deleted, and the below will return in Postman the restaurant that we found/deleted:
      res.status(200).json(restauraunt);
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
  })

module.exports = {
    getRestaurants, getRestaurant, createRestaurant, updateRestaurant, deleteRestsaurant
}