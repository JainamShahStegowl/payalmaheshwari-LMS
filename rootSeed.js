const { Seeder } = require('mongo-seeding');


const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/LMS" , {useNewUrlParser: true, useUnifiedTopology: true})    
const db = mongoose.connection
db.on('open',()=>{
    console.log('connected with the database');
})

let {Users, Roles} = require('./models/users')

const faculty = new Roles({name: "Faculty"})
const student = new Roles({name: "Student"})

faculty.save()
student.save(()=>{
    console.log("Student and Faculty Role Created")
    mongoose.disconnect()
})

