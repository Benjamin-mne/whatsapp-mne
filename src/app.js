import express from 'express'
import { qrRoutes } from './routes/qr.routes.js';

const app = express()

//config
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//routes
app.use('/qr', qrRoutes)

export default app
