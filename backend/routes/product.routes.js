import express from 'express'
import { protectAdmin } from '../middlewares/auth.middleware.js'
import upload from '../middlewares/multer.js'

import { createProduct, deleteProduct, getProductCount, updateProduct } from "../controllers/product.controller.js"

const router = express.Router()

router.post("/", protectAdmin, upload.array("images"), createProduct)
router.put("/:id", protectAdmin, upload.array("images", updateProduct))
router.delete("/:id", protectAdmin, deleteProduct)
router.get("/count", protectAdmin, getProductCount)

export default router