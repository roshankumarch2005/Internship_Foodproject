//import package to talk (which is mongoose)

const mongoose = require("mongoose");

const connectDatabase = () => {
    mongoose.connect(process.env.DB_URI)
    .then((con) => {  
        console.log(`MongoDB connected with HOST: ${con.connection.host}`);
    })
    // CATCH BLOCK
    .catch((err) => {
        console.error("🚨 Database connection failed:", err.message);
    });
}

module.exports = connectDatabase;