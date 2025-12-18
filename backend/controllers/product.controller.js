import Product from "../models/Product.js";
import imageKit from "../config/imagekit.js";

export const createProduct = async(req, res) => {
    const {name, description, price, category} = req.body;

    const images = [];

    for(const file of req.files){
        const uploaded = await imageKit.upload({
            file: file.buffer,
            fileName: file.originalname
        })
        images.push({
            url: uploaded.url,
            fileId: uploaded.fileId
        })
    }

    const product = await Product.create({
        name,
        description,
        price,
        category,
        images,
        createdBy: req.admin._id
    })

    res.status(201).json(product);
}

export const updateProduct = async(req,res) => {
    const product = await Product.findById(req.params.id)
    if(!product){
        return res.status(401).json({message: "Not found"})
    }

    for (const img of product.images){
        await imageKit.deleteFile(img.fileId)
    }

    const newImages = [];
    for (const file of req.files){
        const uploaded = await imageKit.upload({
            file: file.buffer,
            fileName: file.originalname
        })
        newImages.push({
            url: uploaded.url,
            fileId: uploaded.fileId
        })
    }

    product.name = req.body.name;
    product.description = req.body.description;
    product.price = req.body.price;
    product.category = req.body.category;
    product.images = newImages;

    await product.save()
    res.json(product);
}



export const deleteProduct = async(req, res)=> {
    const product = await Product.findById(req.params.id);
    if(!product){
        return res.status(404).json({message: "Not found"})
    }

    for(const img of product.images){
        await imageKit.deleteFile(img.fileId)
    }

    await product.deleteOne()
    res.json({message: "Product deleted successfully"})
}


export const getProductCount = async(req, res) => {
    const totalProducts = await Product.countDocuments()
    res.json({totalProducts})
}

