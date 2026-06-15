const express = require ("express")
const router = express.Router()
const {getAllRestaurants} = require ("../controllers/restaurantController")

router.route("/").get(getAllRestaurants)   //also same as => router.get("/",restaurantController.getAllRestaurants)

module.exports = router;