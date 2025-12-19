import { Product } from "../models/product.model.js";
import imagekit from "../config/imagekit.js";

export const createProduct = async(req, res) => {
    try {
        const {name, description, category} = req.body;
        const adminId = req.user._id;

        if(!req.files || !req.files.mainImage){
            return res.status(400).json({message: "Main image is required"})
        }

        const mainImageFile = req.files.mainImage[0];
        const mainImageUpload = await imagekit.upload({
            file: mainImageFile.buffer,
            fileName: mainImageFile.originalname,
        });

        const additionalImages = []
        if(req.files.images){
            for(const file of req.files.images){
                const upload = await imagekit.upload({
                    file: file.buffer,
                    fileName: file.originalname
                })
                additionalImages.push({
                    url: upload.url,
                    fileName: upload.name,
                })
            }
        }

        const product = await Product.create({
            admin: adminId,
            name, 
            description,
            category,
            mainImage: {
                url: mainImageUpload.url,
                fileName: mainImageUpload.name,
            },
            images: additionalImages
        })

        return res.status(201).json({message: "Product created", product})
    } catch (error) {
        console.error("created product error", error)
    }
}


export const editProduct = async (req, res) => {
    try {
        const { name, description } = req.body || {}; // safe default

        if (!name && !description) {
            return res.status(400).json({ message: "Nothing to update" });
        }

        const { productId } = req.params;
        const product = await Product.findById(productId);
        if (!product) return res.status(404).json({ message: "Product not found" });

        if (req.user._id.toString() !== product.admin.toString()) {
            return res.status(403).json({ message: "Access denied" });
        }

        if (name) product.name = name;
        if (description) product.description = description;

        await product.save();
        return res.status(200).json({ message: "Product updated", product });
    } catch (error) {
        console.error("Edit product error:", error);
        return res.status(500).json({ message: "Server error" });
    }
};


export const deleteProduct = async(req, res) => {
    try {
        const {productId} = req.params;
    
        const product = await Product.findById(productId)
        if(!product){
            return res.status(404).json({message: "Product not found"})
        }

        if(req.user._id.toString() !== product.admin.toString()){
            return res.status(403).json({message: "Access denied"})
        }
    
         await Product.findByIdAndDelete(productId);
        res.status(200).json({message: "Product deleted"})
    } catch (error) {
        console.log("Deleted product error: ", error)
    }


}