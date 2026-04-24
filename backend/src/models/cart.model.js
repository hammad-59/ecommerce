import mongoose, {Schema} from "mongoose";

const cartSchema = new Schema ({
    
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    items: [{
        product: {
            type: Schema.Types.ObjectId,
            ref: "Product",
            required: true
        },
        quantity: {
            type: Number,
            min:1,
            default: 1,
            required: true
        }
        }
    ]

}, { timestamps : true })


export const Cart =  mongoose.model("Cart", cartSchema)