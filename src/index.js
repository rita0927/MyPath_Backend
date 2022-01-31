require('./models/User')
require('./models/Track')
require('dotenv').config('../.env')
const express = require('express')
const mongoose = require('mongoose')
const authRoutes = require('./routes/authRoutes')
const trackRoutes = require('./routes/TrackRoutes')
const requireAuth = require('./middlewares/requireAuth')


const app = express()
app.use(express.json())

app.use(authRoutes)
app.use(trackRoutes)

const mongoUri = process.env.MONGO_URI
mongoose.connect(mongoUri)

mongoose.connection.on('connected', () => {
  console.log('Connected to mongoDB')
})

mongoose.connection.on('error', (err) => {
  console.error('Error connecting to mongoDB', err)
})

app.get('/', requireAuth, (req, res) => {
  res.send(`Your email: ${req.user.email}`)
})

app.listen(3000, () => {
  console.log('Listening on port 3000')
})