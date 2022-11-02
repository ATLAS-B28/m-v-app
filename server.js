require('dotenv').config()
const express = require('express')
const connectDb = require('./dbConnect')
const routes = require('./routes/movies')
const cors = require('cors')
const app = express()
connectDb()
app.use(express.json())
app.use(cors())
app.use('/movies',routes)
const PORT = process.env.PORT || 5000
app.listen(PORT,()=>{
    console.log(`Listening on port ${PORT}`)
})