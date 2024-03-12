require('dotenv').config()
const express = require('express'),
app = express(),
cors = require('cors'),
mongoose = require('mongoose'),
route = require('./Router/route'),
FakeLoading = require('./Middleware/FakeLoading')

mongoose.connect(process.env.MONGO_URL)
mongoose.connection.on('connected', () => console.log('Connected MongoDB'))
mongoose.connection.on('error', e => console.log(e))

app.use(express.json())
app.use(cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET, POST, PUT, DELETE"],
    credentials: true
}))
app.use(FakeLoading)
app.use(route)

app.listen(process.env.API_PORT, () => console.log(`API Started at http://localhost:${process.env.API_PORT}`))