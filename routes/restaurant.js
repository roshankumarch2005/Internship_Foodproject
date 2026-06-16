const express = require ("express")
const router = express.Router()
const {getAllRestaurants,getRestaurant} = require ("../controllers/restaurantController")

router.route("/").get(getAllRestaurants)   //also same as => router.get("/",restaurantController.getAllRestaurants)
router.route("/:storeId").get(getRestaurant)


module.exports = router;