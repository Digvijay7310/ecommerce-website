import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    category: String,
    images: [
        {
        url: String,
        fileId: String,
        }
    ],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Admin"
    }
}, {timestamps: true});

export default mongoose.model("Product", productSchema)