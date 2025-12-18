import mongoose from 'mongoose'

const adminSchema = mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    email : {
        type: String, 
        unique: true,
        required: true
    },
    password: {
        type: String, 
        required: true,
    }
}, {timestamps: true});

export default mongoose.model("Admin", adminSchema);