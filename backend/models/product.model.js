import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    admin: {
        type:mongoose.Schema.Types.ObjectId,
        ref: "Admin",
        required: true,
    },
    name: {
        type: String,
        required: true,
        trim: true,
        index: true,
    },
    description: {
        type: String, 
        type: String,
        required: true,
        trim: true,
    },
    category: {
        type: String,
        required: true,
        trim: true,
    },
    images: [
        {
            url: {type: String, required: true},
            fileName: {type: String,},
        }
    ],
    mainImage:{
        url: {type: String, required: true},
        fileName: {type: String},
    },
}, {timestamps: true});

export const Product = mongoose.model("Product", productSchema)