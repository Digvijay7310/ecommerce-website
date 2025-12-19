import mongoose from "mongoose";

export const connectDB = async() => {
    try {
        const connectionInstance = await mongoose.connect(process.env.MONGO_URI)
        console.log(`Database connected: ${connectionInstance.connection.host}`)
    } catch (err) {
        console.log("Database connection failed: ", err)
        process.exit(1)
    }
}


export default connectDB