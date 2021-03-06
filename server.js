// Dependencies
const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()

// Config
const app = express()
const PORT = process.env.PORT
const MONGODB_URI = process.env.MONGODB_URI

// Cloudinary Image Uploader & File Uploader
const fileupload = require('express-fileupload');
const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
})

// Middleware
app.use(fileupload({
    useTempFiles : true,
}))
app.use(express.json())
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))

// Controllers
const tripsController = require('./controllers/trips_controller.js')
app.use('/trips', tripsController)

// Connect to DB
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
mongoose.connection.on('error', (err) =>
    console.log(err.message,' is Mongod not running?/Problem with Atlas Connection?'))
mongoose.connection.on('connected', () =>
    console.log('mongo connected: ', MONGODB_URI))
mongoose.connection.on('disconnected', () =>
    console.log('mongo disconnected'))

// Listener
app.listen(PORT, () => {
    console.log("listening on port:" + PORT)
})
