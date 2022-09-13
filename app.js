require("dotenv").config();
const express = require('express')
const routes = require('./routes/index')
const mongoose = require('mongoose')
const jwt = require('./helpers/jwt')
const app = express()

// connecting with the database
mongoose.connect(process.env.DATABASE_URL , {useNewUrlParser: true, useUnifiedTopology: true})    
const db = mongoose.connection


// body parsers
app.use(express.json())
app.use(express.urlencoded({extended:false}))


// getting routes 
app.use(routes)
app.use((req,res)=>{
    res.sendStatus(404)
})

app.listen(process.env.PORT,()=>{
    console.log(`listening on  PORT ${process.env.PORT}`)
})
