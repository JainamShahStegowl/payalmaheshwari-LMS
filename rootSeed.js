require('dotenv').config()
const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('open', () => {
    console.log('connected with the database');
})

let Roles  = require('./models/users').Roles

async function createRoles() {
    const faculty = await Roles.find({ "name": "faculty" })
    const student = await Roles.find({ "name": "student" })
    const Role = await Roles.find()

    if (faculty.length < 1) {
        const faculty = new Roles({ "name": "faculty" })
        await faculty.save()
        console.log(faculty);
    }
    else{
        console.log(faculty[0]);
    }
    if (student.length < 1) {
        const student = new Roles({ "name": "student" })
        await student.save()
        console.log(student);
    }
    else{
        console.log(student[0]);
    }
    mongoose.disconnect()
}
createRoles()



