const User = require("../models/user.js");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors.js");
const sendToken = require("../utils/sendToken.js");
const cloudinary = require("../config/cloudinary.js");

exports.signup = catchAsyncErrors(async(req, res, next) => {

    const {name, email, password, passwordConfirm, phoneNumber} = req.body; 
    
    let avatar = {};
    
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