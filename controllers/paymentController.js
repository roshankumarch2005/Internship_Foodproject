const catchAsyncErrors = require("../middlewares/catchAsyncErrors")

const dotenv = require("dotenv")
dotenv.config({path:"./config/config.env"})

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY) // dont get confused this can also be written in two different spteps 
console.log("KEY",process.env.STRIPE_SECRET_KEY)

//process payment api
exports.processPayment = catchAsyncErrors(async (req, res, next) => {

    console.log(req.body);

    const session = await stripe.checkout.sessions.create({

        customer_email: req.user.email,

        phone_number_collection: {
            enabled: true,
        },

        mode: "payment",

        line_items: req.body.items.map((item) => ({

            price_data: {
                currency: "inr",
                product_data: {
                    name: item.foodItem.name,
                    images: [item.foodItem.images[0].url],
                },
                // Stripe expects amount in paise
                unit_amount: item.foodItem.price * 100,
            },
            quantity: item.quantity,

        })),
        shipping_address_collection:{
            allowed_countries:["US","IN"]
        },
        shipping_options:[
            {
                shipping_rate_data:{
                    display_name:"Delivery Charges",
                    type: "fixed_amount",
                    fixed_amount:{
                        amount:5500, //in paise
                        currency:"inr",
                    },
                    delivery_estimate:{
                        minimum:{
                            unit:"hour",
                            value:1,
                        },
                        maximum:{
                            unit:"hour",
                            value:3,
                        }
                    }

                }
            }
        ],
        success_url:`${process.env.FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url:`${process.env.FRONTEND_URL}/cart`, //basically re-direction
    });

    res.status(200).json({url:session.url})   //most imp after creating u need to send response back to user
    //stripe creates the url itself
});

//send the strip api key
exports.SendStripeApi = catchAsyncErrors(async(req, res, next)=>{
    res.status(200).json({
        stripeApiKey: process.env.STRIPE_API_KEY
    })
    //frontend needs this for integration
})
 