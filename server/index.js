const express = require('express')
const cors = require('cors')
require('dotenv').config()

const authRoutes = require('./routes/auth.js')

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded())

app.use('/auth', authRoutes)

app.listen(PORT, () => console.log(`Server running on port: ${PORT}...`))