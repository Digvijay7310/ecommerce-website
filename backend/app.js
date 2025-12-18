import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import adminAuthRoutes from './routes/adminAuth.routes.js'
import productRoutes from './routes/product.routes.js'

const app = express()

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));

app.use(express.json())
app.use(cookieParser())

app.use("/api/admin/auth", adminAuthRoutes)
app.use("/api/admin/products", productRoutes)

export default app