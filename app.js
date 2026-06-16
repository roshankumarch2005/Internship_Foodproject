//configure express and middleware
//import packages
//create express app
    //client => app => route => response
//configure middlware (runs btw req and res)
    //req => middleware => route => res
//export the app

const express = require("express");
const app = express();
const cors = require("cors"); 
const auth = require("./routes/auth.js"); 
const restaurant = require("./routes/restaurant.js")

app.use(cors()); 

// Increased limit for Base64 image uploads
app.use(express.json({ limit: "50mb" })); 
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use("/api/v1/users", auth);
app.use("/api/v1/eats/stores", restaurant);
 

// GLOBAL ERROR HANDLER
app.use((err, req, res, next) => {
    console.log("ERROR CAUGHT IN APP.JS:", err.message); 
    res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || "Internal Server Error"
    });
});

module.exports = app;

