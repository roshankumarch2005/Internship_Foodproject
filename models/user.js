//schema
const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const crypto = require("crypto")

//create schema (blueprint)
 
const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true,"please enter your name"],
        maxlength: [30,"Name cannot exceed 30 characters"]
    },
    email:{
        type: String,
        required: [true,"please enter your email"],
        unique:[true],
        lowercase: [true],
        validate:[validator.isEmail,"Enter valid email"]
    },
    password:{
        type: String,
        required: [true,"please enter your password"],
        minlength: [6],
        select: false, // very imp ( will not show pass while fetching data)
    },
    passwordConfirm:{
        type: String,
        required: [true,"Confirm password"],
        validate: {
            validator: function(el){
                return el ===  this.password
            },
            message: "passswords are not same"
        }
    },
    phoneNumber:{
        type: String,
        required: [true],
        match: [/^[0-9]{10}$/, "Enter valid phone number"], // this means digits from 0 to 9 must appear 10 times
    },
    role:{
        type: String,
        enum: ["user","admin"],  //enum restricts a field to a fixed set of allowed values.
        default: "user",
    },
    avatar:{
        public_id: String,
        url: String,
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
},
{ timestamps:true}
);

//hash password
//pre("save") => runs before data is saved

userSchema.pre("save",async function(){
    if(!this.isModified("password")) return; //basically skips hashing if pass is not changed
    this.password = await bcrypt.hash(this.password,12)
    this.passwordConfirm = undefined   //this bascially runs before saving in mangodb ( undefined used to not to store it in database)
})

//password compare at login time
userSchema.methods.correctPassword = async function( //canditae one is at the time of doing login and user one is storded during registration
    canditatePassword, userPassword
){
    return await bcrypt.compare(canditatePassword,userPassword);
}

//checks whether the user's password changes after getting jwt token 
//if yes then old token gets invalid and user must login again
userSchema.methods.changedPasswordAfter = async function(JWTTimeStamp){   // Here changedPasswordAfter is function name
    if(this.passwordChangedAt){
        const changedTimeStamp = parseInt(
            this.passwordChangedAt.getTime()/1000,10            // The 10 means “parse as base-10 (decimal)”
        )
        return JWTTimeStamp < changedTimeStamp
    }
    return false;
}

//coustom method to generate jwt token 
userSchema.methods.getJWTToken = function(){
    return jwt.sign(
        {id:this._id},
        process.env.JWT_SECRET,
        {expiresIn: process.env.JWT_EXPIRES}
    )
}

module.exports = mongoose.model("User",userSchema)