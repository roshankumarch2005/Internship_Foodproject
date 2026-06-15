const User = require("../models/user.js");
const ErrorHandler = require("../utils/errorHandler.js")
const catchAsyncErrors = require("../middlewares/catchAsyncErrors.js");
const sendToken = require("../utils/sendToken.js");
const cloudinary = require("../config/cloudinary.js");


//signup
exports.signup = catchAsyncErrors(async(req, res, next) => {

    const {name, email, password, passwordConfirm, phoneNumber} = req.body; 
    
    let avatar = {};
    //avatar not provided
    if(!req.body.avatar || req.body.avatar === "/images/images.png") {
        avatar = {
            public_id :"default",
            url: "/images/images.png",
        }
    } else {

        const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
            folder: "avatar",
            width: 150,
            crop: "scale",
        });
        avatar = {
            public_id: result.public_id,
            url: result.url
        };
    }


    const user = await User.create({   
        name,
        email,
        password,
        passwordConfirm,
        phoneNumber,
        avatar
    });


    sendToken(user, 200, res);
});

//login controller
exports.login = catchAsyncErrors(async(req,res,next)=>{
    const {email,password} = req.body  //received from req.body
    if(!email || !password){
        return next(new ErrorHandler("please enter email and password",400))
    }
    const user = await User.findOne({email}).select("+password")  //User -> mongoose model , user -> saves user document from the database

    if(!user){
        return next(new ErrorHandler("invalid email or Password",401))
    }

    const isPasswordMatched = await user.correctPassword(password,user.password)

    if(!isPasswordMatched){
        return next(new ErrorHandler("invalid email or Password",401))
    }

    sendToken(user, 200, res);  // login response
})

