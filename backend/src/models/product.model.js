
import mongoose, { Schema } from 'mongoose';

const productSchema = new Schema(
    {
        name: {
            type: String,
            trim: true,
            lowercase: true,
            required: true,
        },
        description: {
            type: String,
            required: true
        },
        stock: {
            type: Number,
            default: 0
        },
        price: {
            type: Number,
            default: 0,
            required: true
        },
        color: {
            type: String,
            required: true
        },
        category: {
            type: String,
            enum: ["clothing", "electronics"],
            required: true
        },
        subCategory: {
            type: String,
            enum: ["shirt", "jeans", "traditional wear", "mobile", "laptop", "accessories"],
            required: true
        },
        gender: {
            type: String,
            enum: ["male", "female"],
        },
        productSize: {
            type: String,
            enum: ["S","M","L", "XL"],
        },
        brand: {
            type: Schema.Types.ObjectId,
            ref: "Brand",
            required: true
        },
        images: [{
            _id: {
                type: mongoose.Schema.Types.ObjectId,
                auto: true
            },
            url: {
                type: String,
                required: true
            },
            public_id: {
                type: String,
                required: true
            }
            }]

    }, { timestamps : true }
)


export const Product = mongoose.model("Product", productSchema)