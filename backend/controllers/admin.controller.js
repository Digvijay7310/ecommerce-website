import { Admin } from "../models/admin.model.js";


export const registerAdmin = async(req, res) => {
    try {
        const {fullName, email, password} = req.body;

        if(!fullName || !email || !password) {
            return res.status(400).json({message: "All fields are required"})
        }

        const existingEmail = await Admin.findOne({email})
        if(existingEmail){
            return res.status(400).json({message: "Admin already exist"})
        }

        const admin = await Admin.create({
            fullName, email, password
        })

        const accessToken = admin.generateAccessToken()
        const refreshToken = admin.generateRefreshToken()

        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            maxAge: 1 * 24 * 60 * 60 * 100
        })
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 60 * 100
        })

        res.status(201).json({message: `admin created: ${admin}`})
    } catch (error) {
        console.log("register admin error: ", error)
    }
}

export const logninAdmin = async(req, res) => {
    try {
        const {email, password} = req.body;

        const admin = await Admin.findOne({email})
        if(!admin){
            return res.status(404).json({message: "Invalid !credentials!"})
        }

        const isMatch  = admin.isPasswordCorrect(password);
        if(!isMatch){
            return res.status(404).json({message: "Invalid credentials!"})
        }

        const accessToken = admin.generateAccessToken()
        const refreshToken = admin.generateRefreshToken()

        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            maxAge:  1 * 24 * 60 * 60 * 1000
        })

         res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            maxAge:  7 * 24 * 60 * 60 * 1000
        })

        res.status(200).json({message: `Login successfull ${admin}`})

    } catch (error) {
     console.log("login admin error: ", error)   
    }
}

export const profileAdmin = async (req, res) => {
  try {
    const adminId = req.user._id; // _id directly

    const admin = await Admin.findById(adminId).select("-password");
    if (!admin) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    return res.status(200).json({ message: admin });
  } catch (error) {
    console.error("Profile admin error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const logoutAdmin = async(req, res) => {
    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
    })
    res.clearCookie("accessToken", {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
    })
    res.status(200).json({message: "logout successfull"})
}