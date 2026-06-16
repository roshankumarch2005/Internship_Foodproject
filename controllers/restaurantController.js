const Restaurant = require("../models/restaurant.js");
const ErrorHandler = require("../utils/errorHandler.js")
const catchAsyncErrors = require("../middlewares/catchAsyncErrors.js");
const APIFeatures = require("../utils/apiFeatures.js")

//get all restaurants
exports.getAllRestaurants = catchAsyncErrors(async(req,res,next) => {
    const apiFeatures = new APIFeatures(Restaurant.find(),req.query).search().sort() //basically search functionality

    const restaurants = await apiFeatures.query  //query becomes accepted only after all the filters are applied

   //basically req from client => restaurants.find() => APIFeatures if any  => Excute query => Send response back to client


    res.status(200).json({              //sending successful response back to client
        status: "Success",
        count: restaurants.length,
        restaurant: restaurants
    })
})

//get restaurants by id
exports.getRestaurant = catchAsyncErrors(async(req,res,next) => {
    const restaurant = await Restaurant.findById(req.params.storeId);
    if(!restaurant){
        return next(new ErrorHandler("No Restaurant found",404))
    }

    res.status(200).json({         //basically else part
        status: "Success",
        data: restaurant
    })
})