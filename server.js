//start the server
//will load env variables
const dotenv = require("dotenv");

//loading env variable
dotenv.config({path:"./config/config.env"});

const app = require("./app");
const connectDatabase = require("./config/database.js"); 

//connecting to database
connectDatabase(); //calling is must

app.listen(process.env.PORT,() => {
    console.log(`server is started on PORT: ${process.env.PORT}`);
})