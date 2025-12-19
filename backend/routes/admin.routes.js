import express from 'express'
import { logninAdmin, logoutAdmin, profileAdmin, registerAdmin } from '../controllers/admin.controller.js'
import { adminAuth } from '../middleware/auth.middleware.js'


const router = express.Router()

router.post("/register", registerAdmin)
router.post("/login", logninAdmin)
router.get("/me", adminAuth, profileAdmin)
router.post("/logout", adminAuth, logoutAdmin)


export default router