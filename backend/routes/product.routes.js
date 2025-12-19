import express from 'express'
import multer from 'multer'
import { adminAuth } from '../middleware/auth.middleware.js'
import { createProduct, editProduct, searchProducts } from '../controllers/product.controller.js'
import { totalCustomersAndProducts } from '../controllers/admin.controller.js'

const router = express.Router()
const upload = multer()

router.get("/search", searchProducts)
router.post("/", adminAuth, upload.fields([
    {name: "mainImage", maxCount: 1},
    {name: "images", maxCount: 10},
]), 
createProduct)

router.put("/:productId", adminAuth, editProduct)

router.get("/", adminAuth, totalCustomersAndProducts);



export default router