const mongoose = require("mongoose")

const cartSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",                                //"The ID stored in this field corresponds to a document inside the User collection."
    },
    restaurant:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Restaurant",     
    },
    items:[
        {
            foodItem:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"FoodItem",
            },
            quantity:{
                type: Number,
                required:true,
                default:1,
                min:1
            }
        }
    ],
    createdAt:{
        type: Date,
        default: Date.now,  //.now() is wrong (it creates fixed timestamp to the default value)
    }                                           

})              // Here u can use this { timestamps: true } instead of createAt and updatedAt

const Cart = mongoose.model("Cart",cartSchema)
module.exports = Cart