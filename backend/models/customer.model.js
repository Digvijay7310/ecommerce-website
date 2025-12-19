import mongoose from "mongoose";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const customerSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
    },
    email: {
        type: String,
        trim: true,
        required: true,
        index: true,
    },
    phone: {
        type: Number,
        required: true,
    },
    address:[
        {
            line1: {
                type: String,
                required: true,
            },
            line2:{
                type: String,
                required: true,
            },
            landmark: {
                type: String,
                required: true,
            },
            pincode: {
                type: String,
                required: true,
            },
            city: {
                type: String,
                required: true,
            },
        },
    ]
}, {timestamps: true})

customerSchema.pre("save", async function(next){
    if(!this.isModified("password")) return next()
        this.password = bcrypt.hash(this.password, 10)
})

customerSchema.methods.isPasswordCorrect = async function (password) {
    return bcrypt.compare(this.password, password)
}

customerSchema.methods.generateAccessToken = async function () {
    return jwt.sign({
        _id: this._id
    },
process.env.ACCESS_TOKEN_SECRET,
{
    expiresIn: process.env.ACCESS_TOKEN_EXPIRY
}
)
}

customerSchema.methods.generateRefreshToken = async function () {
    return jwt.sign({
        _id: this._id
    },
process.env.REFRESH_TOKEN_SECRET,
{
    expiresIn: process.env.REFRESH_TOKEN_EXPIRY
}
)
}

const Customer = mongoose.model("Customer", customerSchema)

export default Customer