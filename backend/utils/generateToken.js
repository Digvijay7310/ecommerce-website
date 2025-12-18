import jwt from 'jsonwebtoken';

export const generateToken = (res, adminId) => {
    const token = jwt.sign({id: adminId}, process.env.JWT_SECRET, {
        expiresIn: '7d'
    });

    res.cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "strict"
    });
};