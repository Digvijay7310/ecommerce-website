import bcrypt from 'bcryptjs';
import Admin from '../models/Admin.js';
import { generateToken } from '../utils/generateToken.js';

export const registerAdmin = async(req, res) => {
    const {fullName, email, password} = req.body;

    const adminExists = await Admin.findOne({email});
    if(adminExists){
        return res.status(400).json({message: "Admin already exists"});
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await Admin.create({
        fullName,
        email,
        password: hashedPassword
    });
    generateToken(res.admin.id);

    res.status(200).json({
        message: "Admin registered successfully",
        admin: {
            id: admin._id,
            fullName: admin.fullName,
            email: admin.email,
        }
    });
};



export const loginAdmin = async(req, res) => {
    const {email, password} = req.body;

    const admin = await Admin.findOne({email})

    if(!admin){
        return res.status(400).json({message: "Invalid credentials"})
    }

    const isMatch = await bcrypt.compare(password, admin.password)

    if(!isMatch){
        return res.status(400).json({message: "Invalid credentials"})
    }

    generateToken(res, admin._id)

    res.json({
        message: "Login successfull",
        admin: {
            id: admin._id,
            fullName: admin.fullName,
            email: admin.email
        }
    })
}


export const logoutAdmin = (req, res) => {
    res.cookie('token', "", {
        httpOnly: true,
        expires: new Date(0)
    })
    res.json({message: "Logged out successfully"})
}


export const getAdminProfile = async (req, res) => {
    if (!req.admin) return res.status(404).json({ message: "Admin not found" });

    // convert to plain object
    const adminData = {
        _id: req.admin._id,
        fullName: req.admin.fullName,
        email: req.admin.email,
        role: req.admin.role || "admin" // optional
    };

    res.json(adminData);
}

