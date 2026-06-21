//start the server
//will load env variables
const dotenv = require("dotenv");

//loading env variable
dotenv.config({path:"./config/config.env"});

const app = require("./app");
const connectDatabase = require("./config/database.js"); 

//connecting to database
connectDatabase(); //calling is must

// 👉 FIX: Replaced process.env.PORT with hardcoded 4000 and 127.0.0.1
// start server
// app.listen(8080, "127.0.0.1", () => {
//     console.log(`SERVER STARTED ON http://127.0.0.1:8080`);
// });

app.listen(process.env.PORT,() => {
    console.log(`server is started on PORT: ${process.env.PORT}`);
})

//need to change aat last this is only for postman testing