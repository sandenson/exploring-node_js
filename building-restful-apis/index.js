import express from 'express'
import mongoose from 'mongoose'
import 'dotenv/config'
import path from 'path'
import routes from './src/routes/crm.routes'

const app = express()
const PORT = 3000

mongoose.connect(process.env.CRM_DB_URL)

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use('/jorge', express.static(path.join(__dirname, 'public')))

console.log(path.join(__dirname, 'public'))

routes(app)

app.get('/', (req, res) => {
    res.send(`Node and Express server is running in port ${PORT}`)
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
