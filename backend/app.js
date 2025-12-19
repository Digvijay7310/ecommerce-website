import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import adminRoutes from './routes/admin.routes.js'
import productRoutes from './routes/product.routes.js'

const app = express()
app.use(cors({
    origin: process.env.CORS || 'http://localhost:5173',
    credentials: true,
}))

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))
app.use(cookieParser())


app.use("/api/admin/auth", adminRoutes)
app.use("/api/admin/products", productRoutes)

app.get("/", (req, res) => {
    res.send("Server is running on PORT: ". process.env.PORT)
})




export default app;