const mongoose = require("mongoose")

const foodSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true,"Please enter food item name"], //this is an array
        trim: true,//to remove blank spaces
        maxlength: [100,"Food Item cannot exceed more than 100 characters"]
    },
    price:{
        type: Number,
        required: [true,"Please enter food item price"],
        max: [999999, "Price cannot exceed 999999"]
    },
    description:{
        type: String,
        required: [true,"Please enter desc"],
    },
    ratings:{
        type: Number,
        default:0,
    },
    images:[
        {
            public_id:{
                type: String,
                required: true,
            },
            url:{
                type: String,
                required: true,
            }
        }
    ],
    menu:{                              
        type: mongoose.Schema.Types.ObjectId, // directly created documet is stored here
        ref: "Menu"                     // u dont need to import for just creating ref btw
    },
    stock:{
        type: Number,
        required: true,
        max: [10,"Food Items stock cannot be more than 10"], //maxlength does not work on type Number.
        default: 0,
    },
    restaurant:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Restaurant",
    },
    numOfReviews:{
        type: Number,
        default: 0,
    },
    reviews:[                    //this will be array 
       {
            name:{
                type:String,
                required: true,
            },
            rating:{
                type:Number,
                required: true,
            },
            Comment: {
                type:String,
                required:true,
            }
        }                       
    ],
    createdAt:{
        type: Date,
        default: Date.now,
    }

})

module.exports = mongoose.model("FoodItem",foodSchema)

//in database collections it will be formed as FoodItems ( note that plular form comes automatically and all be lower case)