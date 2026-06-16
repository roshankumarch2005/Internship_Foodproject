const mongoose = require ("mongoose")

const menuSchema = new mongoose.Schema({
    menu:[
        {
            category:{type: String},
            items:[
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "FoodItem",
                }
            ]
        }
    ],
    restaurant:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Restaurant",
    },
},

    {                                 //It tells Mongoose to include virtual fields when converting documents to JSON or plain objects.
        toJSON:{virtuals:true},
        toObject:{virtuals:true},
    }

// Normal field → stored in MongoDB.
// Virtual field → not stored, calculated on demand.
// toJSON: { virtuals: true } → include virtuals in API responses.
  
)


const Menu = mongoose.model("Menu", menuSchema)
module.exports = Menu

//same as module.exports = mongoose.model("Menu",menuSchema)