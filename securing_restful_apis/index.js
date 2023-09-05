import express from 'express'
import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import 'dotenv/config'
import path from 'path'
import contactRouter from './src/routes/crm.routes'
import authRouter from './src/routes/auth.routes'

const app = express()
const PORT = 3000

mongoose.connect(process.env.CRM_DB_URL)

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use('/', express.static(path.join(__dirname, 'public')))

app.use((req, res, next) => {
    const auth = req.headers?.authorization?.split(' ')
    
    if (req.header && auth && auth[0] === 'JWT') {
        try {
            req.user = jwt.verify(auth[1], process.env.JWT_SECRET)
        } catch (error) {
            req.user = undefined
        }
    } else {
        req.user = undefined
    }

    next()
})

app.use('/auth', authRouter)
app.use('/contact', contactRouter)

app.get('/', (req, res) => {
    res.send(`Node and Express server is running in port ${PORT}`)
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
