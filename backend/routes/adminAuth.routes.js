import express from 'express'
import { getAdminProfile, loginAdmin, logoutAdmin, registerAdmin } from '../controllers/adminAuth.controller.js'
import { protectAdmin } from '../middlewares/auth.middleware.js'

const router = express.Router()

router.post('/register', registerAdmin)
router.post('/login', loginAdmin)
router.post('/logout', logoutAdmin)
router.get('/me', protectAdmin, getAdminProfile)


export default router;