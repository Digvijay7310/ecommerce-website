import express from 'express'
import multer from 'multer'
import { adminAuth } from '../middleware/auth.middleware.js'
import { createProduct, editProduct } from '../controllers/product.controller.js'

const router = express.Router()
const upload = multer()

router.post("/", adminAuth, upload.fields([
    {name: "mainImage", maxCount: 1},
    {name: "images", maxCount: 10},
]), 
createProduct)

router.put("/:productId", adminAuth, editProduct)



export default router