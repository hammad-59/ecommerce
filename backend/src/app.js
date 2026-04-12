import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'


const app = express()

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}))

app.use(express.json({limit: "16kb"}))

app.use(express.urlencoded({extended: true, limit: "16kb"}));

app.use(express.static("public"))

app.use(cookieParser())


// Routes Import

import userRouter from "./routes/user.routes.js"
import productRouter from "./routes/product.routes.js"
import brandRouter from "./routes/brand.routes.js"

// Routes Declaretion


app.use("/api/v1/users", userRouter)
app.use("/api/v1/products", productRouter)
app.use("/api/v1/brands", brandRouter)

export { app }