const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SubjectSchema = Schema({
  Name: { type: String, required: true },
  grade: { type: Number, required: true }
});

const Subject = mongoose.model("Subject", SubjectSchema)

module.exports = Subject