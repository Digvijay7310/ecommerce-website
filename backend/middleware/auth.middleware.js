import jwt from 'jsonwebtoken'
import { Admin } from '../models/admin.model.js'

export const adminAuth = async(req, res, next) => {
    try {
        const token = req.cookies?.accessToken;
        if(!token){
            return res.status(401).json({message: "Not authorized, no token"})
        }
        const decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

        const admin = await Admin.findById(decode._id).select("-password")

        if(!admin){
            return res.status(401).json({message: "Admin not found"})
        }

        if(admin.role !== "admin"){
            return res.status(403).json({message: "Access denied, Admin only"});
        }
        req.user = admin;
        next()
    } catch (error) {
        console.error(error)
        return res.status(401).json({message: "Invalid or expires token"})
    }
}