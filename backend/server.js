import dotenv from 'dotenv'
dotenv.config()
import connectDB from './config/index.js'
import app from './app.js'



connectDB()
.then(() => {
    app.listen(process.env.PORT || 5000, () => {
        console.log('Server is running on port 5000')
    })
})
.catch((err) => {
    console.log("Database not connect", err)
})